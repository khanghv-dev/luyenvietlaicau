// ─── Helpers ────────────────────────────────────────────────────────────────

const GEMINI_MODEL = "gemini-2.0-flash";
const GEMINI_URL = (apiKey) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

/**
 * Extracts the first valid JSON value (object or array) from an arbitrary string.
 * Handles cases where the model wraps output in markdown, adds prose, etc.
 */
function extractJson(text) {
  if (!text || typeof text !== "string") throw new Error("Phản hồi từ AI trống");

  // Strategy 1: strip markdown code fences
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidate = fenceMatch ? fenceMatch[1].trim() : text.trim();

  try { return JSON.parse(candidate); } catch (_) {}

  // Strategy 2: extract first {...} or [...]
  const objMatch = candidate.match(/(\{[\s\S]*\})/);
  if (objMatch) { try { return JSON.parse(objMatch[1]); } catch (_) {} }

  const arrMatch = candidate.match(/(\[[\s\S]*\])/);
  if (arrMatch) { try { return JSON.parse(arrMatch[1]); } catch (_) {} }

  throw new Error("Không thể đọc JSON từ AI: " + candidate.slice(0, 100));
}

/**
 * Calls the Gemini API with auto-retry (up to maxAttempts times).
 */
async function callGemini(apiKey, prompt, generationConfig, maxAttempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(GEMINI_URL(apiKey), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig
        })
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`Gemini ${res.status}: ${errText.slice(0, 150)}`);
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("AI trả về kết quả rỗng");
      return text;
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts) await new Promise(r => setTimeout(r, 1200 * attempt));
    }
  }
  throw lastError;
}

// ─── Public API ──────────────────────────────────────────────────────────────

async function generateQuestionFromGemini(structure, difficulty, apiKey) {
  const results = await generateQuestionsFromGeminiBatch([{ structure, difficulty }], apiKey);
  if (results.length === 0) throw new Error("Không tạo được câu hỏi");
  return results[0];
}

async function generateQuestionsFromGeminiBatch(requests, apiKey) {
  const diffMap = {
    easy:   "dễ (câu ngắn, từ vựng đơn giản, A2)",
    medium: "trung bình (B1)",
    hard:   "khó (câu dài và phức tạp hơn, B2)",
    all:    "đa dạng (mix dễ, trung bình, khó)"
  };

  const questionList = requests.map((r, i) =>
    `${i + 1}. Cấu trúc: "${r.structure.name}" | Độ khó: ${diffMap[r.difficulty] || r.difficulty}`
  ).join("\n");

  const prompt = `You are an English teacher creating sentence transformation exercises for Vietnamese high school students preparing for the AVCĐ1 exam.

Generate exactly ${requests.length} multiple-choice sentence transformation question(s) based on the list below:

${questionList}

Rules:
- Use real-life contexts: school, family, food, travel, sports, hobbies, work
- Make ALL original sentences different from each other
- Each question must have exactly 3 wrong options with plausible but specific grammar errors
- Instructions ("question" field) must be in Vietnamese
- Vary subjects and contexts — never repeat the same topic twice
- All string values must be on a single line (no newlines inside strings)

Return ONLY a raw JSON array, no markdown, no explanation:
[{"original":"...","question":"...","correct":"...","wrong":["...","...","..."]}]`;

  const text = await callGemini(apiKey, prompt, {
    temperature: 0.7,
    maxOutputTokens: 4096
  });

  const parsed = extractJson(text);
  if (!Array.isArray(parsed)) throw new Error("AI không trả về mảng câu hỏi");

  const valid = parsed.filter(q =>
    q.original && q.correct && Array.isArray(q.wrong) && q.wrong.length >= 3
  );
  if (valid.length === 0) throw new Error("AI trả về mảng rỗng hoặc không hợp lệ");
  return valid;
}

async function explainAnswer(original, correct, chosen, isCorrect, structureName, apiKey) {
  const mistakeLine = !isCorrect
    ? `\n4. Explain specifically what grammar mistake is in this wrong answer: "${chosen}"`
    : "";

  const prompt = `You are an English teacher helping Vietnamese students understand sentence transformations.

Original: "${original}"
Grammar structure: "${structureName}"
Correct answer: "${correct}"
Student's answer: "${chosen}"
Was student correct: ${isCorrect}

Reply in Vietnamese. Keep every value on ONE line (no newlines inside strings). Output ONLY raw JSON:
{"translation":"<Vietnamese translation of original>","why_correct":"<brief grammar explanation>","tip":"<short memory tip>"${!isCorrect ? ',"mistake":"<specific error in student answer>"' : ""}}
${mistakeLine}`;

  const text = await callGemini(apiKey, prompt, {
    temperature: 0.3,
    maxOutputTokens: 600
  });

  return extractJson(text);
}
