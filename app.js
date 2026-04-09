// ═══════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════
const state = {
  mode: 'bank',          // 'bank' | 'ai'
  structureId: 0,        // 0 = random
  difficulty: 'all',     // 'easy' | 'medium' | 'hard' | 'all'
  count: 10,
  apiKey: '',

  sessionQuestions: [],  // array of {original, question, correct, wrong[], structureName}
  currentIndex: 0,
  score: 0,
  answers: [],           // {original, structureName, chosen, correct, isCorrect}
};

// ═══════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getGradeInfo(pct) {
  if (pct === 100) return { label: '🏆 Xuất sắc!', color: '#22d3a5' };
  if (pct >= 80)  return { label: '🌟 Giỏi!', color: '#6c63ff' };
  if (pct >= 60)  return { label: '👍 Khá!', color: '#fbbf24' };
  if (pct >= 40)  return { label: '📖 Cần ôn thêm', color: '#fb923c' };
  return { label: '💪 Cố gắng thêm nhé!', color: '#f87171' };
}

// ═══════════════════════════════════════════
//  SCREEN ROUTER
// ═══════════════════════════════════════════
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

// ═══════════════════════════════════════════
//  HOME SCREEN
// ═══════════════════════════════════════════
function initHome() {
  // Restore saved API key
  const saved = localStorage.getItem('gemini_api_key') || '';
  document.getElementById('apiKeyInput').value = saved;
  state.apiKey = saved;

  // Mode toggle
  document.querySelectorAll('.mode-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.mode = card.dataset.mode;
      document.getElementById('apiKeySection').style.display = state.mode === 'ai' ? 'block' : 'none';
    });
  });

  // Structure select
  const structSel = document.getElementById('structureSelect');
  STRUCTURES.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = `${s.id}. ${s.name}`;
    structSel.appendChild(opt);
  });
  structSel.addEventListener('change', () => { state.structureId = +structSel.value; });

  // Difficulty chips
  document.querySelectorAll('[data-diff]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('[data-diff]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.difficulty = chip.dataset.diff;
    });
  });

  // Count chips
  document.querySelectorAll('[data-count]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('[data-count]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.count = +chip.dataset.count;
    });
  });

  // Toggle API key visibility
  document.getElementById('toggleKey').addEventListener('click', () => {
    const inp = document.getElementById('apiKeyInput');
    inp.type = inp.type === 'password' ? 'text' : 'password';
  });

  document.getElementById('apiKeyInput').addEventListener('input', e => {
    state.apiKey = e.target.value.trim();
  });

  // History nav
  document.getElementById('btnHistory').addEventListener('click', () => {
    renderHistory();
    showScreen('screenHistory');
  });

  // Start
  document.getElementById('btnStart').addEventListener('click', startSession);

  showScreen('screenHome');
}

// ═══════════════════════════════════════════
//  START SESSION
// ═══════════════════════════════════════════
async function startSession() {
  const btn = document.getElementById('btnStart');
  btn.disabled = true;
  btn.textContent = 'Đang tải...';

  // Save API key
  if (state.apiKey) localStorage.setItem('gemini_api_key', state.apiKey);

  state.currentIndex = 0;
  state.score = 0;
  state.answers = [];
  state.sessionQuestions = [];

  if (state.mode === 'ai') {
    if (!state.apiKey) {
      alert('Bạn chưa nhập Gemini API Key! Vui lòng nhập hoặc chọn chế độ "Ngân hàng câu hỏi".');
      btn.disabled = false; btn.textContent = '▶ Bắt đầu làm bài';
      return;
    }
    await loadAIQuestions();
  } else {
    loadBankQuestions();
  }

  btn.disabled = false; btn.textContent = '▶ Bắt đầu làm bài';

  if (state.sessionQuestions.length === 0) {
    alert('Không đủ câu hỏi với lựa chọn này. Hãy thử mức độ hoặc cấu trúc khác.');
    return;
  }
  renderQuestion();
  showScreen('screenQuiz');
}

// ─── Load from static bank ───
function loadBankQuestions() {
  let pool = [...QUESTIONS];

  if (state.structureId !== 0)
    pool = pool.filter(q => q.structure === state.structureId);
  if (state.difficulty !== 'all')
    pool = pool.filter(q => q.difficulty === state.difficulty);

  pool = shuffle(pool);
  const picked = pool.slice(0, state.count);

  state.sessionQuestions = picked.map(q => {
    const struct = STRUCTURES.find(s => s.id === q.structure);
    return {
      original: q.original,
      question: q.question,
      correct: q.correct,
      wrong: q.wrong,
      structureName: struct ? struct.name : '',
      source: 'bank'
    };
  });
}

// ─── Load from Gemini AI (single batch call) ───
async function loadAIQuestions() {
  showScreen('screenLoading');

  const target = state.count;
  const loadBar = document.getElementById('loadProgress');
  const loadText = document.getElementById('loadText');

  if (loadText) loadText.textContent = 'Gemini đang tạo câu hỏi…';
  if (loadBar)  loadBar.style.width = '20%';

  // Build request list (one entry per question, cycling structures)
  let structList = state.structureId === 0
    ? shuffle([...STRUCTURES])
    : Array(target).fill(STRUCTURES.find(s => s.id === state.structureId));

  const diffChoices = ['easy', 'medium', 'hard'];
  const requests = Array.from({ length: target }, (_, i) => ({
    structure: structList[i % structList.length],
    difficulty: state.difficulty === 'all'
      ? diffChoices[i % 3]
      : state.difficulty
  }));

  let aiQuestions = [];
  try {
    if (loadText) loadText.textContent = `Gemini đang tạo ${target} câu hỏi (1 lần gọi)…`;
    aiQuestions = await generateQuestionsFromGeminiBatch(requests, state.apiKey);
    if (loadBar) loadBar.style.width = '90%';
  } catch (e) {
    console.warn('Batch AI generation failed:', e);
  }

  // Map AI results back, fallback to bank for any missing
  const sessionQuestions = [];
  for (let i = 0; i < target; i++) {
    const req = requests[i];
    const aiQ = aiQuestions[i];
    if (aiQ) {
      sessionQuestions.push({
        original: aiQ.original,
        question: aiQ.question,
        correct: aiQ.correct,
        wrong: aiQ.wrong,
        structureName: req.structure.name,
        source: 'ai'
      });
    } else {
      // Fallback to bank
      const pool = QUESTIONS.filter(q => q.structure === req.structure.id);
      const q = pool.length ? shuffle(pool)[0] : shuffle(QUESTIONS)[0];
      sessionQuestions.push({
        original: q.original, question: q.question,
        correct: q.correct, wrong: q.wrong,
        structureName: req.structure.name, source: 'bank'
      });
    }
  }

  if (loadBar) loadBar.style.width = '100%';
  if (loadText) loadText.textContent = `Tạo xong ${target} câu hỏi!`;

  state.sessionQuestions = sessionQuestions;
}

// ═══════════════════════════════════════════
//  QUIZ SCREEN
// ═══════════════════════════════════════════
function renderQuestion() {
  const q = state.sessionQuestions[state.currentIndex];
  const total = state.sessionQuestions.length;
  const pct = (state.currentIndex / total) * 100;

  // Header
  document.getElementById('quizCounter').textContent = `Câu ${state.currentIndex + 1} / ${total}`;
  document.getElementById('quizScore').textContent = `✓ ${state.score}`;
  document.getElementById('progressBar').style.width = pct + '%';

  // Structure tag
  document.getElementById('structureTag').textContent = `⚡ ${q.structureName}`;

  // AI badge
  const aiBadge = document.getElementById('aiBadge');
  aiBadge.style.display = q.source === 'ai' ? 'inline-flex' : 'none';

  // Sentence & instruction
  document.getElementById('originalSentence').textContent = q.original;
  document.getElementById('instructionText').textContent = q.question;

  // Options (shuffle)
  const allOptions = shuffle([
    { text: q.correct, isCorrect: true },
    ...q.wrong.slice(0, 3).map(w => ({ text: w, isCorrect: false }))
  ]);

  const letters = ['A', 'B', 'C', 'D'];
  const container = document.getElementById('optionsContainer');
  container.innerHTML = '';

  allOptions.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt.text}</span>`;
    btn.addEventListener('click', () => handleAnswer(btn, opt, allOptions, q));
    container.appendChild(btn);
  });

  // Hide feedback
  const fb = document.getElementById('resultFeedback');
  fb.className = 'result-feedback';
  fb.innerHTML = '';

  document.getElementById('btnNext').style.display = 'none';
}

function handleAnswer(clickedBtn, chosen, allOptions, q) {
  // Disable all buttons
  document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);

  const isCorrect = chosen.isCorrect;
  if (isCorrect) state.score++;

  // Highlight options
  document.querySelectorAll('.option-btn').forEach((btn, i) => {
    if (allOptions[i].isCorrect) btn.classList.add('correct');
    else if (btn === clickedBtn && !isCorrect) btn.classList.add('wrong');
  });

  // Feedback
  const fb = document.getElementById('resultFeedback');
  fb.innerHTML = isCorrect
    ? `<div class="fb-title">✅ Chính xác!</div><div class="fb-note">Rất tốt, tiếp tục phát huy nhé! 🎉</div>`
    : `<div class="fb-title">❌ Chưa đúng</div>
       <div class="fb-answer">✔ Đáp án đúng: <strong>${q.correct}</strong></div>
       <div class="fb-note">Ôn lại cấu trúc: ${q.structureName}</div>`;
  fb.className = `result-feedback show ${isCorrect ? 'correct-fb' : 'wrong-fb'}`;

  // Record answer
  state.answers.push({
    original: q.original,
    structureName: q.structureName,
    chosen: chosen.text,
    correct: q.correct,
    isCorrect
  });

  document.getElementById('btnNext').style.display = 'flex';
}

function nextQuestion() {
  state.currentIndex++;
  if (state.currentIndex >= state.sessionQuestions.length) {
    finishSession();
  } else {
    renderQuestion();
  }
}

// ═══════════════════════════════════════════
//  FINISH / SCORE SCREEN
// ═══════════════════════════════════════════
function finishSession() {
  const total = state.sessionQuestions.length;
  const pct = Math.round((state.score / total) * 100);
  const grade = getGradeInfo(pct);

  document.getElementById('scoreGrade').textContent = grade.label;
  document.getElementById('scoreGrade').style.color = grade.color;
  document.getElementById('scoreText').textContent = `${state.score} / ${total} câu đúng`;

  // Ring
  const r = 54;
  const circ = 2 * Math.PI * r;
  const ring = document.getElementById('scoreRingFg');
  ring.style.strokeDasharray = circ;
  ring.style.stroke = grade.color;
  setTimeout(() => {
    ring.style.strokeDashoffset = circ * (1 - pct / 100);
  }, 50);
  document.getElementById('scorePercent').textContent = pct + '%';
  document.getElementById('scoreLabel').textContent = `${state.score}/${total}`;

  // Save to history
  const session = {
    id: Date.now(),
    date: new Date().toLocaleString('vi-VN'),
    structureName: state.structureId === 0 ? 'Ngẫu nhiên' : STRUCTURES.find(s => s.id === state.structureId)?.name,
    difficulty: state.difficulty === 'all' ? 'Tất cả' : { easy: 'Dễ', medium: 'Trung bình', hard: 'Khó' }[state.difficulty],
    mode: state.mode,
    score: state.score,
    total,
    pct,
    answers: state.answers
  };
  const history = JSON.parse(localStorage.getItem('quiz_history') || '[]');
  history.unshift(session);
  if (history.length > 50) history.pop();
  localStorage.setItem('quiz_history', JSON.stringify(history));

  // Render review
  const reviewList = document.getElementById('reviewList');
  reviewList.innerHTML = '';
  state.answers.forEach((ans, i) => {
    const div = document.createElement('div');
    div.className = `review-item ${ans.isCorrect ? 'correct-item' : 'wrong-item'}`;
    div.innerHTML = `
      <div class="ri-label">${ans.isCorrect ? '✓ Đúng' : '✗ Sai'} — Câu ${i + 1}</div>
      <div class="ri-original">📝 ${ans.original}</div>
      <div class="ri-correct">✔ ${ans.correct}</div>
      ${!ans.isCorrect ? `<div class="ri-yours">✗ Bạn chọn: ${ans.chosen}</div>` : ''}
      <div class="ri-note">Cấu trúc: ${ans.structureName}</div>
    `;
    reviewList.appendChild(div);
  });

  showScreen('screenScore');
}

// ═══════════════════════════════════════════
//  HISTORY SCREEN
// ═══════════════════════════════════════════
function renderHistory() {
  const history = JSON.parse(localStorage.getItem('quiz_history') || '[]');
  const list = document.getElementById('historyList');
  list.innerHTML = '';

  if (history.length === 0) {
    list.innerHTML = `<div class="empty-history"><div class="eh-icon">📋</div><div>Chưa có lịch sử bài làm</div></div>`;
    return;
  }

  history.forEach(s => {
    const grade = getGradeInfo(s.pct);
    const div = document.createElement('div');
    div.className = 'history-item';
    div.innerHTML = `
      <div class="hi-dot" style="background:${grade.color}22; color:${grade.color}">${s.pct}%</div>
      <div class="hi-info">
        <div class="hi-title">${s.structureName}</div>
        <div class="hi-sub">${s.date} · ${s.difficulty} · ${s.mode === 'ai' ? '✨ AI' : '📚 Ngân hàng'} · ${s.total} câu</div>
      </div>
      <div class="hi-score" style="color:${grade.color}">${s.score}/${s.total}</div>
    `;
    list.appendChild(div);
  });
}

// ═══════════════════════════════════════════
//  INIT APP
// ═══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Wire up quiz buttons
  document.getElementById('btnNext').addEventListener('click', nextQuestion);
  document.getElementById('btnQuit').addEventListener('click', () => {
    if (confirm('Bỏ qua bài làm hiện tại?')) showScreen('screenHome');
  });
  document.getElementById('btnRestart').addEventListener('click', () => showScreen('screenHome'));
  document.getElementById('btnGoHome').addEventListener('click', () => showScreen('screenHome'));
  document.getElementById('btnClearHistory').addEventListener('click', () => {
    if (confirm('Xoá toàn bộ lịch sử?')) {
      localStorage.removeItem('quiz_history');
      renderHistory();
    }
  });

  initHome();
});
