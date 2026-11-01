'use strict';

const SUBJECTS = [
  { id: 'math', name: 'Mathematics', icon: '＋', color: '#e8f4e9', description: 'Numbers, shapes & patterns' },
  { id: 'english', name: 'English', icon: 'Aa', color: '#fff0e5', description: 'Words, grammar & reading' },
  { id: 'science', name: 'Science', icon: '⚗', color: '#efebff', description: 'Nature, matter & discovery' },
  { id: 'other', name: 'More subjects', icon: '◎', color: '#fff5d9', description: 'Geography & general knowledge' }
];
const GRADES = [1, 2, 3, 4, 5, 6];
const SKILLS = {
  math: [
    { id: 'counting', title: 'Numbers & counting', description: 'Build number sense and practise place value.', topic: 'Number sense' },
    { id: 'addition', title: 'Addition adventures', description: 'Add numbers and find friendly strategies.', topic: 'Operations' },
    { id: 'subtraction', title: 'Subtraction steps', description: 'Find the difference and solve problems.', topic: 'Operations' },
    { id: 'multiplication', title: 'Multiplication patterns', description: 'Explore equal groups and times tables.', topic: 'Operations' },
    { id: 'fractions', title: 'Fraction explorers', description: 'Understand parts of a whole.', topic: 'Fractions' },
    { id: 'geometry', title: 'Shapes & geometry', description: 'Discover shapes, sides and angles.', topic: 'Geometry' }
  ],
  english: [
    { id: 'grammar', title: 'Grammar garden', description: 'Choose the right words to make a sentence.', topic: 'Grammar' },
    { id: 'vocabulary', title: 'Word explorers', description: 'Grow your vocabulary with meanings and synonyms.', topic: 'Vocabulary' },
    { id: 'spelling', title: 'Spelling stars', description: 'Practise spelling and word patterns.', topic: 'Spelling' },
    { id: 'reading', title: 'Reading detectives', description: 'Read a short passage and find the answer.', topic: 'Reading' }
  ],
  science: [
    { id: 'living', title: 'Living things', description: 'Explore plants, animals and life cycles.', topic: 'Life science' },
    { id: 'matter', title: 'Matter all around', description: 'Learn about solids, liquids and gases.', topic: 'Physical science' },
    { id: 'earth', title: 'Our amazing Earth', description: 'Discover weather, rocks and our planet.', topic: 'Earth science' },
    { id: 'forces', title: 'Forces in action', description: 'Explore pushes, pulls, light and sound.', topic: 'Physical science' }
  ],
  other: [
    { id: 'geography', title: 'World explorer', description: 'Discover maps, landforms and places.', topic: 'Geography' },
    { id: 'community', title: 'People & communities', description: 'Learn how communities work together.', topic: 'Social studies' },
    { id: 'thinking', title: 'Logic & patterns', description: 'Use clues and reasoning to solve puzzles.', topic: 'Critical thinking' }
  ]
};
// Math questions are grade-specific and live in math-questions.js (MATH_BANK).
const BANK = {
  english: {
    grammar: [
      { q: 'Choose the correct word: “The puppies ___ playing.”', choices: ['is', 'are', 'was', 'be'], answer: 'are', explain: '“Puppies” is plural, so “are” agrees with the subject.', hint: 'The subject is more than one puppy.' },
      { q: 'Which word is a noun in this sentence: “Maya reads a book”?', choices: ['reads', 'a', 'Maya', 'quickly'], answer: 'Maya', explain: 'Maya is a name, so it is a proper noun. “Book” is also a noun.', hint: 'A noun names a person, place, thing or idea.' },
      { q: 'Choose the sentence with correct punctuation.', choices: ['where are we going.', 'Where are we going?', 'where are we going?', 'Where are we going'], answer: 'Where are we going?', explain: 'A question starts with a capital letter and ends with a question mark.', hint: 'This sentence asks something.' }
    ],
    vocabulary: [
      { q: 'Which word means almost the same as “tiny”?', choices: ['Huge', 'Small', 'Loud', 'Quick'], answer: 'Small', explain: '“Tiny” and “small” both describe something little in size.', hint: 'Think of the opposite of huge.' },
      { q: 'What is the opposite of “ancient”?', choices: ['Old', 'Historic', 'Modern', 'Past'], answer: 'Modern', explain: 'Ancient means very old; modern means of the present or recent times.', hint: 'Which word describes something new or current?' },
      { q: 'A person who is “generous” likes to…', choices: ['Share with others', 'Keep every gift', 'Avoid helping', 'Hide from friends'], answer: 'Share with others', explain: 'Generous people are willing to give or share with others.', hint: 'Think of someone who gladly gives.' }
    ],
    spelling: [
      { q: 'Which spelling is correct?', choices: ['Frend', 'Freind', 'Friend', 'Friand'], answer: 'Friend', explain: 'The correct spelling is friend: f-r-i-e-n-d.', hint: 'Remember: “i” comes before “e” in this word.' },
      { q: 'Which word completes the sentence? “We went to the ___ to borrow books.”', choices: ['libary', 'library', 'librery', 'liberry'], answer: 'library', explain: 'Library is spelled l-i-b-r-a-r-y.', hint: 'Listen for the “brar” sound in the middle.' },
      { q: 'Which word is spelled correctly?', choices: ['Beautiful', 'Beautifull', 'Beutiful', 'Beautifal'], answer: 'Beautiful', explain: 'Beautiful is spelled b-e-a-u-t-i-f-u-l, with one l at the end.', hint: 'The word has “beauty” at its beginning.' }
    ],
    reading: [
      { q: 'Read: “Rain tapped the window. Nia put on her boots and opened her umbrella.” What is the weather like?', choices: ['Sunny', 'Windy and dry', 'Rainy', 'Snowy'], answer: 'Rainy', explain: 'The rain, boots and umbrella all suggest that it is raining.', hint: 'Look for clues in the first sentence.' },
      { q: 'Read: “Omar watered the seed every day. Soon, two green leaves appeared.” What helped the seed grow?', choices: ['Water', 'A loud sound', 'A toy', 'Cold ice'], answer: 'Water', explain: 'The passage tells us Omar watered the seed every day before leaves appeared.', hint: 'What did Omar do each day?' },
      { q: 'Read: “Lena packed a towel, sunscreen and a bucket. She could hear waves.” Where is Lena most likely going?', choices: ['A library', 'A beach', 'A bakery', 'A classroom'], answer: 'A beach', explain: 'Waves, a towel, sunscreen and a bucket are clues that Lena is going to the beach.', hint: 'Which place has waves and sand?' }
    ]
  },
  science: {
    living: [
      { q: 'Which part of a plant usually takes in water from the soil?', choices: ['Flower', 'Roots', 'Petals', 'Fruit'], answer: 'Roots', explain: 'Roots absorb water and minerals from the soil and help anchor the plant.', hint: 'This part is usually below the ground.' },
      { q: 'Which of these is a mammal?', choices: ['Frog', 'Salmon', 'Dolphin', 'Butterfly'], answer: 'Dolphin', explain: 'Dolphins are mammals: they breathe air, are warm-blooded and feed their young milk.', hint: 'Which animal breathes air and feeds its young milk?' },
      { q: 'What do most green plants use sunlight for?', choices: ['Making food', 'Finding a home', 'Making soil', 'Moving to a new place'], answer: 'Making food', explain: 'Plants use sunlight in photosynthesis to make sugars from water and carbon dioxide.', hint: 'Plants make their own food through a process called photosynthesis.' }
    ],
    matter: [
      { q: 'Which state of matter has a fixed shape?', choices: ['Gas', 'Liquid', 'Solid', 'Vapour only'], answer: 'Solid', explain: 'A solid keeps its own shape, while a liquid takes the shape of its container.', hint: 'Think of an ice cube.' },
      { q: 'What happens to ice when it warms above its melting point?', choices: ['It becomes liquid water', 'It becomes rock', 'It disappears instantly', 'It becomes sand'], answer: 'It becomes liquid water', explain: 'Ice melts and changes from a solid to liquid water.', hint: 'Think about an ice cube left on a warm plate.' },
      { q: 'Which material is attracted to a magnet?', choices: ['Paper', 'Iron', 'Rubber', 'Wood'], answer: 'Iron', explain: 'Iron is a magnetic material and is attracted to a magnet.', hint: 'Many steel objects contain this metal.' }
    ],
    earth: [
      { q: 'What causes day and night on Earth?', choices: ['Earth spinning on its axis', 'The Moon disappearing', 'Clouds moving', 'The Sun orbiting Earth daily'], answer: 'Earth spinning on its axis', explain: 'As Earth rotates, the side facing the Sun has day while the other side has night.', hint: 'Earth makes one full turn in about 24 hours.' },
      { q: 'Which instrument measures temperature?', choices: ['Compass', 'Thermometer', 'Ruler', 'Rain gauge'], answer: 'Thermometer', explain: 'A thermometer measures how hot or cold something is.', hint: 'Weather reports use this to report degrees.' },
      { q: 'Which is a natural source of fresh water?', choices: ['Ocean water', 'River', 'Soft drink', 'Swimming pool with chemicals'], answer: 'River', explain: 'Rivers carry fresh water, although it may still need treatment before drinking.', hint: 'This body of water flows across land.' }
    ],
    forces: [
      { q: 'What force pulls objects toward Earth?', choices: ['Gravity', 'Sound', 'Light', 'Magnetism only'], answer: 'Gravity', explain: 'Gravity attracts objects with mass toward one another; Earth pulls objects toward its centre.', hint: 'It is why a dropped ball falls down.' },
      { q: 'Which action is a push?', choices: ['Pulling a wagon toward you', 'Pressing a door away from you', 'Lifting a bag by its handle', 'Tugging a rope toward you'], answer: 'Pressing a door away from you', explain: 'A push moves something away from the person or object applying the force.', hint: 'A push moves something away.' },
      { q: 'Which object makes sound when its stretched string vibrates?', choices: ['A guitar', 'A pillow', 'A glass of still water', 'A closed book'], answer: 'A guitar', explain: 'Plucked guitar strings vibrate and make the air vibrate, creating sound.', hint: 'It is a musical instrument with strings.' }
    ]
  },
  other: {
    geography: [
      { q: 'What does a map key or legend explain?', choices: ['The map symbols', 'Tomorrow’s weather only', 'A book’s characters', 'The time of day'], answer: 'The map symbols', explain: 'A map key explains what the colours and symbols on a map represent.', hint: 'It helps you understand the signs on a map.' },
      { q: 'Which is the largest ocean on Earth?', choices: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'], answer: 'Pacific Ocean', explain: 'The Pacific Ocean is the largest and deepest of Earth’s ocean basins.', hint: 'It lies between Asia/Australia and the Americas.' },
      { q: 'A compass is most useful for finding…', choices: ['Direction', 'Temperature', 'Weight', 'Time'], answer: 'Direction', explain: 'A compass helps identify directions such as north, south, east and west.', hint: 'It can help you find north.' }
    ],
    community: [
      { q: 'Who helps keep a community library organised and useful?', choices: ['Librarian', 'Pilot only', 'Dentist only', 'Farmer only'], answer: 'Librarian', explain: 'Librarians help people find resources and manage library collections.', hint: 'This person works with books and information.' },
      { q: 'Why do communities have traffic lights?', choices: ['To help manage road traffic safely', 'To decorate roads only', 'To make cars faster', 'To tell the weather'], answer: 'To help manage road traffic safely', explain: 'Traffic lights coordinate road users and help reduce collisions.', hint: 'They tell road users when to stop and go.' },
      { q: 'Which is an example of being a responsible community member?', choices: ['Dropping litter', 'Helping keep a shared park clean', 'Damaging a sign', 'Ignoring every safety rule'], answer: 'Helping keep a shared park clean', explain: 'Caring for shared spaces helps make a community healthier and more welcoming.', hint: 'Choose the action that helps everyone.' }
    ],
    thinking: [
      { q: 'What comes next in the pattern: circle, square, circle, square, ___?', choices: ['Triangle', 'Circle', 'Square', 'Star'], answer: 'Circle', explain: 'The pattern alternates circle, square. The next shape is a circle.', hint: 'The two shapes take turns.' },
      { q: 'All glims are blue. This object is a glim. What can you conclude?', choices: ['It is blue', 'It is red', 'It is made of wood', 'It is very large'], answer: 'It is blue', explain: 'If every glim is blue and this object is a glim, it must be blue.', hint: 'Use both facts given in the question.' },
      { q: 'Which number does not belong: 2, 4, 6, 9, 8?', choices: ['2', '6', '9', '8'], answer: '9', explain: 'The other numbers are even. Nine is odd.', hint: 'Think about numbers that divide evenly by 2.' }
    ]
  }
};

const MIN_QUESTIONS_PER_SKILL = 5;
const MATH_CHECK = validateMathBank(MATH_BANK, GRADES, SKILLS.math.map(skill => skill.id), MIN_QUESTIONS_PER_SKILL);
if (MATH_CHECK.errors.length) console.error(`BrightPath math question bank has ${MATH_CHECK.errors.length} problem(s):\n${MATH_CHECK.errors.join('\n')}`);

const STORAGE_KEY = 'brightpath-progress-v1';
let state = loadState();
let selectedGrade = 3;
let selectedSubject = 'math';
let activeSkill = null;
let session = null;
let toastTimer = null;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return { points: Number(saved.points) || 0, answered: Number(saved.answered) || 0, correct: Number(saved.correct) || 0, bySkill: saved.bySkill && typeof saved.bySkill === 'object' ? saved.bySkill : {}, lastDate: saved.lastDate || '', streak: Number(saved.streak) || 0 };
  } catch (error) {
    return { points: 0, answered: 0, correct: 0, bySkill: {}, lastDate: '', streak: 0 };
  }
}
function saveState() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (error) { showToast('Progress could not be saved in this browser.'); } }
function esc(value) { return String(value).replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch])); }
function getSkill(subject, skillId) { return (SKILLS[subject] || []).find(skill => skill.id === skillId); }
function getQuestions(grade, subject, skillId) {
  if (subject === 'math') return ((MATH_BANK[grade] || {})[skillId] || []).filter(q => !MATH_CHECK.invalid.has(q));
  return (BANK[subject] && BANK[subject][skillId]) || [];
}
function skillDescription(grade, subject, skill) {
  const focus = subject === 'math' && MATH_GRADE_FOCUS[grade] && MATH_GRADE_FOCUS[grade][skill.id];
  return focus || skill.description;
}
function skillStats(key) { return state.bySkill[key] || { answered: 0, correct: 0, points: 0, best: 0 }; }
function skillKey(grade, subject, skillId) { return `${grade}-${subject}-${skillId}`; }
function gradeLabel(grade) { return `Grade ${grade}`; }
function setView(name) {
  document.querySelectorAll('.view').forEach(el => el.classList.add('hidden'));
  const view = document.getElementById(`${name}-view`);
  if (view) view.classList.remove('hidden');
  document.querySelectorAll('.nav-link').forEach(btn => btn.classList.toggle('active', btn.dataset.view === (name === 'progress' ? 'progress' : 'learn')));
  if (name === 'progress') renderProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function renderGrades() {
  document.getElementById('grade-list').innerHTML = GRADES.map(grade => `<button class="grade-card ${grade === selectedGrade ? 'selected' : ''}" data-grade="${grade}" aria-pressed="${grade === selectedGrade}"><strong>${grade}</strong><span>Grade ${grade}</span></button>`).join('');
}
function renderSubjects() {
  document.getElementById('subject-list').innerHTML = SUBJECTS.map(subject => `<button class="subject-card ${subject.id === selectedSubject ? 'selected' : ''}" data-subject="${subject.id}" aria-pressed="${subject.id === selectedSubject}"><span class="subject-icon" style="background:${subject.color}">${subject.icon}</span><span><strong>${subject.name}</strong><small>${subject.description}</small></span><span class="subject-arrow">›</span></button>`).join('');
}
function renderSkills() {
  const skills = SKILLS[selectedSubject] || [];
  const subject = SUBJECTS.find(item => item.id === selectedSubject);
  document.getElementById('skills-title').textContent = `${subject.name} skills for Grade ${selectedGrade}`;
  document.getElementById('skills-subtitle').textContent = `${skills.length} skills to explore`;
  document.getElementById('skill-list').innerHTML = skills.map(skill => {
    const stats = skillStats(skillKey(selectedGrade, selectedSubject, skill.id));
    const accuracy = stats.answered ? Math.round(stats.correct / stats.answered * 100) : 0;
    return `<article class="skill-card"><div class="skill-meta"><span class="skill-tag">${esc(skill.topic)}</span><span class="skill-count">${stats.answered ? `${accuracy}% accuracy` : 'Ready to try'}</span></div><h3>${esc(skill.title)}</h3><p>${esc(skillDescription(selectedGrade, selectedSubject, skill))}</p><button class="skill-start" data-start-skill="${skill.id}">Start practising&nbsp; →</button></article>`;
  }).join('');
}
function renderHeader() {
  document.getElementById('header-points').textContent = state.points;
  document.getElementById('streak-count').textContent = state.streak;
}
function startPractice(skillId) {
  const skill = getSkill(selectedSubject, skillId);
  const bank = getQuestions(selectedGrade, selectedSubject, skillId);
  if (!skill || bank.length === 0) { showToast('This skill is being prepared. Try another one!'); return; }
  activeSkill = { grade: selectedGrade, subject: selectedSubject, skillId, skill, key: skillKey(selectedGrade, selectedSubject, skillId) };
  const questions = [...bank].sort(() => Math.random() - 0.5).slice(0, Math.min(5, bank.length));
  session = { questions, index: 0, correct: 0, answered: false, earned: 0, hintShown: false };
  setView('practice');
  renderQuestion();
}
function renderQuestion() {
  const root = document.getElementById('practice-view');
  if (!session || session.index >= session.questions.length) { renderFinish(); return; }
  const q = session.questions[session.index];
  session.answered = false;
  session.hintShown = false;
  const subject = SUBJECTS.find(item => item.id === activeSkill.subject);
  root.innerHTML = `<div class="practice-wrap"><div class="practice-top"><button class="back-button" id="leave-practice">← All skills</button><div class="practice-label">${esc(gradeLabel(activeSkill.grade))} · ${esc(subject.name)}<br><b>${esc(activeSkill.skill.title)}</b></div></div><div class="question-progress"><div style="width:${session.index / session.questions.length * 100}%"></div></div><article class="question-card"><span class="question-number">QUESTION ${session.index + 1} OF ${session.questions.length}</span><h1>${esc(q.q)}</h1>${q.detail ? `<p class="question-prompt">${esc(q.detail)}</p>` : '<p class="question-prompt">Take your time and choose the best answer.</p>'}<div id="answer-area" class="answer-options">${q.choices ? q.choices.map((choice, i) => `<button class="answer-option" data-answer="${esc(choice)}"><span class="option-letter">${String.fromCharCode(65+i)}</span><span>${esc(choice)}</span></button>`).join('') : `<input class="typed-answer" id="typed-answer" autocomplete="off" placeholder="Type your answer here" aria-label="Your answer">`}</div><div id="feedback" aria-live="polite"></div><div class="question-actions"><button class="hint-button" id="hint-button">☼&nbsp; Give me a hint</button><button class="check-button" id="check-answer" disabled>Check answer</button></div></article></div>`;
  root.querySelector('#leave-practice').addEventListener('click', () => { session = null; setView('learn'); });
  root.querySelectorAll('[data-answer]').forEach(btn => btn.addEventListener('click', () => {
    if (session.answered) return;
    root.querySelectorAll('[data-answer]').forEach(option => option.classList.remove('selected'));
    btn.classList.add('selected');
    session.selection = btn.dataset.answer;
    root.querySelector('#check-answer').disabled = false;
  }));
  const typed = root.querySelector('#typed-answer');
  if (typed) typed.addEventListener('input', () => { session.selection = typed.value.trim(); root.querySelector('#check-answer').disabled = !session.selection; });
  root.querySelector('#check-answer').addEventListener('click', checkAnswer);
  root.querySelector('#hint-button').addEventListener('click', showHint);
}
function showHint() {
  if (!session || session.answered) return;
  const q = session.questions[session.index];
  const feedback = document.getElementById('feedback');
  feedback.innerHTML = `<div class="feedback" style="background:#fff9e8;color:#876b27"><strong>Here's a hint</strong>${esc(q.hint || 'Read the question carefully and look for clues.')}</div>`;
  session.hintShown = true;
}
function checkAnswer() {
  if (!session || session.answered) return;
  const q = session.questions[session.index];
  const raw = String(session.selection || '').trim();
  if (!raw) return;
  const isCorrect = raw.toLocaleLowerCase() === String(q.answer).trim().toLocaleLowerCase();
  session.answered = true;
  if (isCorrect) session.correct++;
  const key = activeSkill.key;
  const stats = skillStats(key);
  stats.answered++;
  if (isCorrect) stats.correct++;
  const earned = isCorrect ? (session.hintShown ? 5 : 10) : 0;
  stats.points += earned;
  session.earned += earned;
  stats.best = Math.max(stats.best || 0, Math.round(stats.correct / stats.answered * 100));
  state.bySkill[key] = stats;
  state.answered++;
  if (isCorrect) state.correct++;
  state.points += earned;
  updateStreak();
  saveState();
  renderHeader();
  const feedback = document.getElementById('feedback');
  feedback.innerHTML = `<div class="feedback ${isCorrect ? 'good' : 'try'}"><strong>${isCorrect ? `That's right! +${earned} points ✦` : 'Good try — keep learning!'}</strong>${esc(q.explain || `The correct answer is ${q.answer}.`)}${!isCorrect ? `<br><b>Correct answer:</b> ${esc(q.answer)}` : ''}</div>`;
  document.querySelectorAll('[data-answer]').forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.answer === q.answer) btn.classList.add('correct');
    else if (btn.classList.contains('selected')) btn.classList.add('wrong');
  });
  const typed = document.getElementById('typed-answer');
  if (typed) { typed.disabled = true; typed.style.borderColor = isCorrect ? '#65a67b' : '#d88a7e'; }
  document.getElementById('check-answer').disabled = false;
  document.getElementById('check-answer').textContent = session.index === session.questions.length - 1 ? 'See results' : 'Next question';
  document.getElementById('check-answer').onclick = nextQuestion;
  document.getElementById('hint-button').disabled = true;
}
function nextQuestion() { if (!session || !session.answered) return; session.index++; renderQuestion(); }
function updateStreak() {
  const today = new Date().toLocaleDateString('en-CA');
  if (state.lastDate === today) return;
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  state.streak = state.lastDate === yesterday.toLocaleDateString('en-CA') ? state.streak + 1 : 1;
  state.lastDate = today;
}
function renderFinish() {
  const root = document.getElementById('practice-view');
  const total = session.questions.length;
  const accuracy = Math.round(session.correct / total * 100);
  root.innerHTML = `<div class="practice-wrap"><div class="practice-top"><button class="back-button" id="finish-home">← Back to skills</button><div class="practice-label">${esc(activeSkill.skill.title)}</div></div><article class="question-card finish-card"><div class="finish-icon">✦</div><span class="eyebrow">PRACTICE COMPLETE</span><h1>Look at you go!</h1><p>You finished ${total} questions in ${esc(activeSkill.skill.title)}.<br>Every practice session helps your skills grow.</p><div class="finish-score">${accuracy}%</div><p><b>${session.correct} of ${total}</b> correct · <b>+${session.earned}</b> points earned</p><div class="finish-actions"><button class="check-button" id="practice-again">Practise again</button><button class="secondary-button" id="finish-progress">View my progress</button></div></article></div>`;
  document.getElementById('finish-home').addEventListener('click', () => { session = null; setView('learn'); renderSkills(); });
  document.getElementById('practice-again').addEventListener('click', () => startPractice(activeSkill.skillId));
  document.getElementById('finish-progress').addEventListener('click', () => { session = null; setView('progress'); });
}
function renderProgress() {
  document.getElementById('progress-points').textContent = state.points;
  document.getElementById('progress-answered').textContent = state.answered;
  document.getElementById('progress-accuracy').textContent = `${state.answered ? Math.round(state.correct / state.answered * 100) : 0}%`;
  document.getElementById('progress-streak').textContent = state.streak;
  const entries = Object.entries(state.bySkill).filter(([, stats]) => stats.answered > 0).sort((a,b) => b[1].answered - a[1].answered);
  document.getElementById('skill-progress-list').innerHTML = entries.length ? entries.map(([key, stats]) => {
    const [grade, subjectId, ...rest] = key.split('-');
    const skill = getSkill(subjectId, rest.join('-'));
    const subject = SUBJECTS.find(item => item.id === subjectId);
    const accuracy = Math.round(stats.correct / stats.answered * 100);
    return `<div class="progress-row"><div><strong>${esc(skill ? skill.title : 'Practice skill')}</strong><small>${esc(`Grade ${grade} · ${subject ? subject.name : subjectId} · ${stats.answered} questions`)}</small></div><div class="progress-track"><div class="progress-fill" style="width:${accuracy}%"></div></div><div class="progress-percent">${accuracy}% correct</div></div>`;
  }).join('') : '<div class="empty-state">Your learning journey starts with one question. Choose a skill and try a practice session!</div>';
}
function showToast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}
function resetProgress() {
  if (!window.confirm('Reset all BrightPath practice progress on this browser? This cannot be undone.')) return;
  state = { points: 0, answered: 0, correct: 0, bySkill: {}, lastDate: '', streak: 0 };
  saveState(); renderHeader(); renderProgress(); renderSkills(); showToast('Progress reset. A fresh start!');
}

document.querySelectorAll('.nav-link').forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
document.getElementById('grade-list').addEventListener('click', event => { const button = event.target.closest('[data-grade]'); if (!button) return; selectedGrade = Number(button.dataset.grade); renderGrades(); renderSkills(); });
document.getElementById('subject-list').addEventListener('click', event => { const button = event.target.closest('[data-subject]'); if (!button) return; selectedSubject = button.dataset.subject; renderSubjects(); renderSkills(); });
document.getElementById('skill-list').addEventListener('click', event => { const button = event.target.closest('[data-start-skill]'); if (button) startPractice(button.dataset.startSkill); });
document.getElementById('reset-progress').addEventListener('click', resetProgress);
renderGrades(); renderSubjects(); renderSkills(); renderHeader();
