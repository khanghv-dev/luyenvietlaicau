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
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 1.0, maxOutputTokens: 4096 }
      })
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API ${response.status}: ${errText.slice(0, 200)}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  // Strip markdown code blocks if present
  const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("Invalid JSON array from Gemini");

  const parsed = JSON.parse(jsonMatch[0]);
  if (!Array.isArray(parsed)) throw new Error("Expected JSON array");

  return parsed.filter(q =>
    q.original && q.correct && Array.isArray(q.wrong) && q.wrong.length >= 3
  );
}
