async function generateQuestionFromGemini(structure, difficulty, apiKey) {
  // Single-question wrapper — delegates to batch if called individually
  const results = await generateQuestionsFromGeminiBatch([{ structure, difficulty }], apiKey);
  if (results.length === 0) throw new Error("No question generated");
  return results[0];
}

async function generateQuestionsFromGeminiBatch(requests, apiKey) {
  const diffMap = {
    easy: "dễ (câu ngắn, từ vựng đơn giản, A2)",
    medium: "trung bình (B1)",
    hard: "khó (câu dài và phức tạp hơn, B2)",
    all: "đa dạng (mix dễ, trung bình, khó)"
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

Return ONLY a valid JSON array (no extra text, no markdown):
[
  {
    "original": "English sentence here.",
    "question": "Hướng dẫn bằng tiếng Việt",
    "correct": "Correctly transformed sentence.",
    "wrong": ["Wrong option 1", "Wrong option 2", "Wrong option 3"]
  }
]`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { 
          temperature: 1.0, 
          maxOutputTokens: 4096,
          responseMimeType: "application/json"
        }
      })
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API ${response.status}: ${errText.slice(0, 200)}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
  const cleanText = text.replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim();

  let parsed = [];
  try {
    parsed = JSON.parse(cleanText);
  } catch (err) {
    throw new Error("Lỗi đọc dữ liệu JSON từ AI: " + err.message);
  }

  if (!Array.isArray(parsed)) throw new Error("Expected JSON array");

  return parsed.filter(q =>
    q.original && q.correct && Array.isArray(q.wrong) && q.wrong.length >= 3
  );
}

async function explainAnswer(original, correct, chosen, isCorrect, structureName, apiKey) {
  const mistakePart = !isCorrect
    ? `\n4. **Lỗi sai**: Giải thích ngắn lỗi ngữ pháp cụ thể trong câu sai: "${chosen}"`
    : '';

  const mistakeJson = !isCorrect ? `,\n  "mistake": "Giải thích lỗi sai cụ thể"` : '';

  const prompt = `You are an English teacher helping Vietnamese students understand sentence transformations.

Original sentence: "${original}"
Grammar structure: "${structureName}"
Correct answer: "${correct}"
Student's answer: "${chosen}"
Was student correct: ${isCorrect}

Provide a concise response in Vietnamese with these parts:
1. Translate the original English sentence to natural Vietnamese.
2. Explain briefly WHY the correct answer is grammatically correct (focus on the specific rule).
3. One short memory tip for this grammar structure.${mistakePart}

Return ONLY valid JSON (no markdown):
{
  "translation": "Bản dịch tiếng Việt của câu gốc",
  "why_correct": "Giải thích ngắn gọn tại sao đáp án đúng",
  "tip": "Mẹo nhớ ngắn"${mistakeJson}
}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { 
          temperature: 0.7, 
          maxOutputTokens: 512,
          responseMimeType: "application/json"
        }
      })
    }
  );

  if (!response.ok) throw new Error(`Gemini explain API ${response.status}`);
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  const cleanText = text.replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim();
  
  try {
    return JSON.parse(cleanText);
  } catch (err) {
    throw new Error("Lỗi đọc JSON từ AI: " + err.message);
  }
}
