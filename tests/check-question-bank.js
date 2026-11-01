'use strict';

// Checks the grade-specific math question bank. No dependencies: run `node tests/check-question-bank.js`.

const path = require('path');
const { MATH_BANK, MATH_GRADE_FOCUS } = require(path.join(__dirname, '..', 'math-questions.js'));
const { validateMathBank } = require(path.join(__dirname, '..', 'question-validation.js'));

const GRADES = [1, 2, 3, 4, 5, 6];
const SKILL_IDS = ['counting', 'addition', 'subtraction', 'multiplication', 'fractions', 'geometry'];
const MIN_PER_SKILL = 5;

let failures = 0;
function check(name, ok, details) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
  if (!ok) { failures++; (details || []).forEach(line => console.log(`      ${line}`)); }
}

// 1. The real bank passes validation.
const result = validateMathBank(MATH_BANK, GRADES, SKILL_IDS, MIN_PER_SKILL);
check('math bank passes validation (ids, answer keys, choices, hints, explanations, no cross-grade repeats)', result.errors.length === 0, result.errors);

// 2. The validator catches each kind of broken data.
function expectError(name, bank, pattern) {
  const { errors } = validateMathBank(bank, [1], ['addition'], 1);
  check(`validator catches ${name}`, errors.some(error => pattern.test(error)), [`errors were: ${JSON.stringify(errors)}`]);
}
const good = { id: 'x-1', q: 'What is 1 + 1?', choices: ['1', '2'], answer: '2', hint: 'h', explain: 'e' };
expectError('a missing grade', {}, /no math questions/);
expectError('a missing skill', { 1: {} }, /no questions/);
expectError('an answer not in the choices', { 1: { addition: [{ ...good, answer: '3' }] } }, /not one of its choices/);
expectError('a missing answer key', { 1: { addition: [{ ...good, answer: undefined }] } }, /missing an answer key/);
expectError('a missing id', { 1: { addition: [{ ...good, id: '' }] } }, /missing an id/);
expectError('duplicate ids', { 1: { addition: [good, { ...good, q: 'Other?' }] } }, /duplicate id/);
expectError('duplicate choices', { 1: { addition: [{ ...good, choices: ['2', '2'] }] } }, /duplicate choices/);
expectError('a missing hint', { 1: { addition: [{ ...good, hint: '' }] } }, /missing "hint"/);
expectError('repeated question text', { 1: { addition: [good, { ...good, id: 'x-2' }] } }, /same question text/);
const reviewOk = validateMathBank({ 1: { addition: [good, { ...good, id: 'x-2', review: true }] } }, [1], ['addition'], 1);
check('validator allows a repeat marked review: true', reviewOk.errors.length === 0, reviewOk.errors);

// 3. Each grade has its own questions and focus text.
const idPrefixErrors = [];
GRADES.forEach(grade => SKILL_IDS.forEach(skill => (MATH_BANK[grade][skill] || []).forEach(q => {
  if (!q.id.startsWith(`m${grade}-`)) idPrefixErrors.push(`${q.id} is in Grade ${grade}`);
})));
check('every question id matches its grade (m<grade>-...)', idPrefixErrors.length === 0, idPrefixErrors);
const focusMissing = [];
GRADES.forEach(grade => SKILL_IDS.forEach(skill => { if (!(MATH_GRADE_FOCUS[grade] || {})[skill]) focusMissing.push(`Grade ${grade} ${skill}`); }));
check('every grade and skill has a focus description', focusMissing.length === 0, focusMissing);

// 4. Recompute answers for questions written as "What is <a> <op> <b>?".
function toNumber(text) {
  const t = String(text).replace(/−/g, '-').replace(/[,$]/g, '').trim();
  let m = t.match(/^(-?\d+) (\d+)\/(\d+)$/);
  if (m) return Number(m[1]) + Math.sign(Number(m[1]) || 1) * Number(m[2]) / Number(m[3]);
  m = t.match(/^(-?\d+)\/(\d+)$/);
  if (m) return Number(m[1]) / Number(m[2]);
  return /^-?\d+(\.\d+)?$/.test(t) ? Number(t) : NaN;
}
const OPS = { '+': (a, b) => a + b, '−': (a, b) => a - b, '×': (a, b) => a * b, '÷': (a, b) => a / b };
const NUM = '(−?[\\d,]+(?:\\.\\d+)?(?: \\d+\\/\\d+|\\/\\d+)?)';
const pattern = new RegExp(`^What is ${NUM} ([+−×÷]) ${NUM}\\?$`);
const mathErrors = [];
let verified = 0;
GRADES.forEach(grade => SKILL_IDS.forEach(skill => (MATH_BANK[grade][skill] || []).forEach(q => {
  const m = q.q.match(pattern);
  if (!m) return;
  const expected = OPS[m[2]](toNumber(m[1]), toNumber(m[3]));
  const given = toNumber(q.answer);
  verified++;
  if (!(Math.abs(expected - given) < 1e-9)) mathErrors.push(`${q.id}: "${q.q}" expects ${expected}, answer key says ${q.answer}`);
})));
check(`arithmetic answer keys are correct (${verified} "What is a op b?" questions recomputed)`, verified > 0 && mathErrors.length === 0, mathErrors);

const total = GRADES.reduce((sum, grade) => sum + SKILL_IDS.reduce((s, skill) => s + (MATH_BANK[grade][skill] || []).length, 0), 0);
console.log(`\n${total} math questions across ${GRADES.length} grades. ${failures ? `${failures} check(s) FAILED.` : 'All checks passed.'}`);
process.exit(failures ? 1 : 0);
