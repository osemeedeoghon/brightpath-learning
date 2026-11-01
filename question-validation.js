'use strict';

// Question bank validation, shared by app.js (browser) and tests/check-question-bank.js (Node).

function validateQuestion(q) {
  const problems = [];
  if (!q || typeof q !== 'object') return ['is not an object'];
  if (typeof q.id !== 'string' || !q.id.trim()) problems.push('is missing an id');
  ['q', 'hint', 'explain'].forEach(field => {
    if (typeof q[field] !== 'string' || !q[field].trim()) problems.push(`is missing "${field}"`);
  });
  if (!Array.isArray(q.choices) || q.choices.length < 2) {
    problems.push('needs at least 2 choices');
  } else {
    if (q.choices.some(choice => typeof choice !== 'string' || !choice.trim())) problems.push('has an empty or non-text choice');
    if (new Set(q.choices).size !== q.choices.length) problems.push('has duplicate choices');
  }
  if (typeof q.answer !== 'string' || !q.answer.trim()) problems.push('is missing an answer key');
  else if (Array.isArray(q.choices) && !q.choices.includes(q.answer)) problems.push(`has answer "${q.answer}" which is not one of its choices`);
  return problems;
}

// Returns { errors: string[], invalid: Set<question> }. Questions in `invalid` should not be shown.
function validateMathBank(bank, grades, skillIds, minPerSkill) {
  const errors = [];
  const invalid = new Set();
  const seenIds = new Map();
  const seenText = new Map();
  grades.forEach(grade => {
    const gradeBank = bank && bank[grade];
    if (!gradeBank) { errors.push(`Grade ${grade}: no math questions`); return; }
    skillIds.forEach(skillId => {
      const where = `Grade ${grade} ${skillId}`;
      const questions = gradeBank[skillId];
      if (!Array.isArray(questions) || questions.length === 0) { errors.push(`${where}: no questions`); return; }
      if (questions.length < minPerSkill) errors.push(`${where}: has ${questions.length} questions, needs at least ${minPerSkill}`);
      questions.forEach((q, i) => {
        const label = `${where} #${i + 1}${q && q.id ? ` (${q.id})` : ''}`;
        const problems = validateQuestion(q);
        if (problems.length) { invalid.add(q); problems.forEach(problem => errors.push(`${label} ${problem}`)); }
        if (!q || typeof q !== 'object') return;
        if (q.id) {
          if (seenIds.has(q.id)) errors.push(`${label}: duplicate id, also used in ${seenIds.get(q.id)}`);
          else seenIds.set(q.id, where);
        }
        const text = String(q.q || '').trim().toLowerCase().replace(/\s+/g, ' ');
        if (text && !q.review) {
          if (seenText.has(text)) errors.push(`${label}: same question text as ${seenText.get(text)} (set review: true if this repeat is deliberate)`);
          else seenText.set(text, label);
        }
      });
    });
    Object.keys(gradeBank).filter(skillId => !skillIds.includes(skillId)).forEach(skillId => errors.push(`Grade ${grade}: unknown skill "${skillId}"`));
  });
  return { errors, invalid };
}

if (typeof module !== 'undefined' && module.exports) module.exports = { validateQuestion, validateMathBank };
