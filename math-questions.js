'use strict';

// Grade-specific mathematics question bank: MATH_BANK[grade][skillId] -> questions.
// Every question needs a unique id, a prompt (q), choices, an answer that exactly matches
// one choice, a hint and an explanation. Mark a deliberate cross-grade repeat with review: true.
// Run `node tests/check-question-bank.js` after editing.

const MATH_GRADE_FOCUS = {
  1: { counting: 'Count to 120, compare numbers, tens and ones.', addition: 'Add within 20 using make-ten strategies.', subtraction: 'Take away and find the difference within 20.', multiplication: 'Skip count and make equal groups.', fractions: 'Halves and fourths of a whole.', geometry: 'Name flat and solid shapes.' },
  2: { counting: 'Place value to 1,000, odd and even numbers.', addition: 'Add within 100 and 1,000.', subtraction: 'Subtract with regrouping within 100 and 1,000.', multiplication: 'Arrays, equal groups and repeated addition.', fractions: 'Halves, thirds and fourths.', geometry: 'Sides, angles and faces of shapes.' },
  3: { counting: 'Rounding and four-digit place value.', addition: 'Add within 1,000 and estimate sums.', subtraction: 'Subtract within 1,000 and estimate differences.', multiplication: 'Times tables, word problems and division facts.', fractions: 'Unit fractions, equivalence and comparing.', geometry: 'Perimeter, area and quadrilaterals.' },
  4: { counting: 'Place value to the hundred thousands and rounding.', addition: 'Multi-digit addition and adding tenths.', subtraction: 'Multi-digit subtraction and like fractions.', multiplication: 'Multi-digit multiplication, factors and multiples.', fractions: 'Equivalent fractions, comparing and decimals.', geometry: 'Angles, lines and symmetry.' },
  5: { counting: 'Decimal place value and powers of 10.', addition: 'Add decimals to hundredths.', subtraction: 'Subtract decimals to hundredths.', multiplication: 'Multi-digit and decimal multiplication.', fractions: 'Unlike denominators and multiplying fractions.', geometry: 'Volume, the coordinate plane and classifying shapes.' },
  6: { counting: 'Negative numbers, exponents and common factors.', addition: 'Integers, mixed numbers and like terms.', subtraction: 'Integers, mixed numbers and decimals.', multiplication: 'Distributive property, decimals and ratios.', fractions: 'Dividing fractions and percents.', geometry: 'Area, surface area and volume.' }
};

const MATH_BANK = {
  1: {
    counting: [
      { id: 'm1-cnt-01', q: 'Which number comes next? 12, 13, 14, ___', detail: 'Look at the counting pattern.', choices: ['12', '14', '15', '17'], answer: '15', explain: 'The numbers go up by 1: 12, 13, 14, 15.', hint: 'Count forward one number at a time.' },
      { id: 'm1-cnt-02', q: 'Which number is greatest?', detail: 'Compare 28, 82, 38 and 23.', choices: ['28', '82', '38', '23'], answer: '82', explain: '82 has 8 tens, which is more than the tens in the other numbers.', hint: 'Compare the tens digit first.' },
      { id: 'm1-cnt-03', q: 'How many tens are in 46?', detail: 'Think about place value.', choices: ['4', '6', '40', '46'], answer: '4', explain: '46 is made of 4 tens and 6 ones.', hint: 'Look at the digit in the tens place.' },
      { id: 'm1-cnt-04', q: 'Count by tens: 10, 20, 30, ___', choices: ['31', '35', '40', '50'], answer: '40', explain: 'Counting by tens adds one more ten each time: 30 + 10 = 40.', hint: 'Add one more ten to 30.' },
      { id: 'm1-cnt-05', q: 'What number is 1 ten and 7 ones?', choices: ['7', '10', '71', '17'], answer: '17', explain: '1 ten is 10. 10 and 7 more ones make 17.', hint: 'Start at 10 and count 7 more.' }
    ],
    addition: [
      { id: 'm1-add-01', q: 'What is 7 + 5?', choices: ['10', '11', '12', '13'], answer: '12', explain: 'Start at 7 and count up 5 more: 8, 9, 10, 11, 12.', hint: 'Try making 10 first: 7 + 3 + 2.' },
      { id: 'm1-add-02', q: 'A basket has 14 apples. You add 8 more. How many apples are there?', choices: ['20', '21', '22', '24'], answer: '22', explain: '14 + 8 = 22 apples.', hint: 'Add 6 to reach 20, then add the remaining 2.' },
      { id: 'm1-add-03', q: 'What is 9 + 4?', choices: ['12', '13', '14', '15'], answer: '13', explain: '9 + 1 = 10, and 3 more makes 13.', hint: 'Make 10: take 1 from the 4 and give it to the 9.' },
      { id: 'm1-add-04', q: 'Sam has 3 red balloons and 6 blue balloons. How many balloons does Sam have?', choices: ['3', '8', '9', '10'], answer: '9', explain: '3 + 6 = 9 balloons.', hint: 'Start at the bigger number, 6, and count on 3.' },
      { id: 'm1-add-05', q: 'Which pair of numbers makes 10?', choices: ['4 + 5', '1 + 8', '3 + 7', '2 + 6'], answer: '3 + 7', explain: '3 + 7 = 10. The other pairs make 9 or 8.', hint: 'Use your fingers: hold up 3, then count how many more make 10.' }
    ],
    subtraction: [
      { id: 'm1-sub-01', q: 'What is 15 − 6?', choices: ['7', '8', '9', '11'], answer: '9', explain: '15 take away 6 leaves 9.', hint: 'Count backwards six steps from 15.' },
      { id: 'm1-sub-02', q: 'What is 10 − 4?', choices: ['4', '5', '6', '7'], answer: '6', explain: '4 + 6 = 10, so 10 − 4 = 6.', hint: 'Think: 4 plus what makes 10?' },
      { id: 'm1-sub-03', q: 'There are 12 ducks in a pond. 5 swim away. How many ducks are left?', choices: ['17', '6', '7', '8'], answer: '7', explain: '12 − 5 = 7 ducks are left.', hint: 'Take away 2 to get to 10, then take away 3 more.' },
      { id: 'm1-sub-04', q: 'What is 18 − 10?', choices: ['8', '9', '10', '28'], answer: '8', explain: '18 is 1 ten and 8 ones. Taking away the ten leaves 8.', hint: 'Take away one ten.' },
      { id: 'm1-sub-05', q: 'Which number makes this true? 9 − ___ = 5', choices: ['3', '4', '5', '14'], answer: '4', explain: '9 − 4 = 5, because 5 + 4 = 9.', hint: 'Count up from 5 to 9.' }
    ],
    multiplication: [
      { id: 'm1-mul-01', q: 'Count by 2s: 2, 4, 6, 8, ___', choices: ['9', '10', '11', '12'], answer: '10', explain: 'Counting by 2s adds 2 each time: 8 + 2 = 10.', hint: 'Skip one number each time.' },
      { id: 'm1-mul-02', q: 'Count by 5s: 5, 10, 15, ___', choices: ['16', '25', '20', '30'], answer: '20', explain: 'Counting by 5s adds 5 each time: 15 + 5 = 20.', hint: 'Think of the fingers on one more hand.' },
      { id: 'm1-mul-03', q: 'There are 3 plates with 2 cookies on each plate. How many cookies are there?', choices: ['5', '6', '7', '8'], answer: '6', explain: '3 equal groups of 2 make 2 + 2 + 2 = 6 cookies.', hint: 'Add 2 + 2 + 2.' },
      { id: 'm1-mul-04', q: 'Which shows 4 groups of 2?', choices: ['4 + 2', '2 + 2 + 2 + 2', '4 + 4 + 4', '2 + 4 + 2'], answer: '2 + 2 + 2 + 2', explain: 'Four groups with 2 in each group is 2 + 2 + 2 + 2.', hint: 'Write the number 2 four times.' },
      { id: 'm1-mul-05', q: '5 friends each hold up 2 hands. How many hands are up?', choices: ['7', '8', '10', '12'], answer: '10', explain: 'Count by 2s five times: 2, 4, 6, 8, 10.', hint: 'Count by 2s, once for each friend.' }
    ],
    fractions: [
      { id: 'm1-frac-01', q: 'A pizza is cut into 4 equal slices. You eat 1 slice. What fraction did you eat?', choices: ['1/2', '1/3', '1/4', '4/1'], answer: '1/4', explain: 'One out of four equal slices is one quarter, written 1/4.', hint: 'The bottom number tells how many equal pieces there are.' },
      { id: 'm1-frac-02', q: 'A sandwich is cut into 2 equal parts. What is each part called?', choices: ['One half', 'One third', 'One fourth', 'One whole'], answer: 'One half', explain: 'When a whole is cut into 2 equal parts, each part is one half.', hint: 'Two equal parts are called halves.' },
      { id: 'm1-frac-03', q: 'How many halves make one whole?', choices: ['1', '2', '3', '4'], answer: '2', explain: 'Two halves fit together to make one whole.', hint: 'Think of putting a cut apple back together.' },
      { id: 'm1-frac-04', q: 'Mia cuts a paper square into 4 equal pieces. What is each piece called?', choices: ['A half', 'A third', 'A fourth', 'A whole'], answer: 'A fourth', explain: 'Each of 4 equal parts is called a fourth, or a quarter.', hint: 'Four equal parts are called fourths.' },
      { id: 'm1-frac-05', q: 'Which is bigger: one half of an apple or one fourth of the same apple?', choices: ['One fourth', 'One half', 'They are the same', 'Cannot tell'], answer: 'One half', explain: 'Cutting the apple into fewer equal parts makes each part bigger, so one half is bigger.', hint: 'Fewer pieces means bigger pieces.' }
    ],
    geometry: [
      { id: 'm1-geo-01', q: 'How many sides does a triangle have?', choices: ['2', '3', '4', '5'], answer: '3', explain: 'A triangle has 3 straight sides and 3 corners.', hint: '“Tri” means three.' },
      { id: 'm1-geo-02', q: 'Which shape has no corners?', choices: ['Square', 'Triangle', 'Circle', 'Rectangle'], answer: 'Circle', explain: 'A circle is round all the way around, so it has no corners.', hint: 'Think of a shape that can roll.' },
      { id: 'm1-geo-03', q: 'How many corners does a rectangle have?', choices: ['3', '4', '5', '6'], answer: '4', explain: 'A rectangle has 4 sides and 4 corners.', hint: 'Look at a door or a book and count its corners.' },
      { id: 'm1-geo-04', q: 'Which solid shape looks like a ball?', choices: ['Cube', 'Cone', 'Cylinder', 'Sphere'], answer: 'Sphere', explain: 'A sphere is round in every direction, just like a ball.', hint: 'It has no flat faces at all.' },
      { id: 'm1-geo-05', q: 'Which solid shape looks like a can of soup?', choices: ['Cylinder', 'Cube', 'Sphere', 'Pyramid'], answer: 'Cylinder', explain: 'A cylinder has two flat circle faces and a curved side, like a can.', hint: 'Look for two circles joined by a curved side.' }
    ]
  },
  2: {
    counting: [
      { id: 'm2-cnt-01', q: 'What is the value of the 3 in 352?', choices: ['3', '30', '300', '352'], answer: '300', explain: 'The 3 is in the hundreds place, so it means 3 hundreds, or 300.', hint: 'Name the place of each digit: hundreds, tens, ones.' },
      { id: 'm2-cnt-02', q: 'Which number has 4 hundreds, 0 tens and 7 ones?', choices: ['47', '470', '407', '4,007'], answer: '407', explain: '4 hundreds, 0 tens and 7 ones is written 407. The 0 holds the tens place.', hint: 'Write one digit for each place, even when it is zero.' },
      { id: 'm2-cnt-03', q: 'Count by 5s: 35, 40, 45, ___', choices: ['46', '50', '55', '60'], answer: '50', explain: 'Counting by 5s adds 5 each time: 45 + 5 = 50.', hint: 'Numbers counted by 5s end in 0 or 5.' },
      { id: 'm2-cnt-04', q: 'Which number is odd?', choices: ['14', '22', '40', '37'], answer: '37', explain: '37 ends in 7, so it cannot be split into two equal groups. It is odd.', hint: 'Odd numbers end in 1, 3, 5, 7 or 9.' },
      { id: 'm2-cnt-05', q: 'Which comparison is true?', choices: ['519 > 591', '519 < 591', '519 = 591', '591 < 519'], answer: '519 < 591', explain: 'Both have 5 hundreds. 519 has 1 ten and 591 has 9 tens, so 519 is less than 591.', hint: 'The hundreds are the same, so compare the tens.' }
    ],
    addition: [
      { id: 'm2-add-01', q: 'What is 36 + 27?', choices: ['53', '63', '64', '73'], answer: '63', explain: '30 + 20 = 50, and 6 + 7 = 13. Then 50 + 13 = 63.', hint: 'Add tens and ones, then combine.' },
      { id: 'm2-add-02', q: 'What is 45 + 30?', choices: ['48', '65', '75', '85'], answer: '75', explain: 'Add 3 tens to 45: 55, 65, 75.', hint: 'Only the tens change when you add 30.' },
      { id: 'm2-add-03', q: 'A class read 58 pages on Monday and 34 pages on Tuesday. How many pages did they read in all?', choices: ['82', '92', '94', '24'], answer: '92', explain: '50 + 30 = 80 and 8 + 4 = 12. 80 + 12 = 92 pages.', hint: 'Add the tens, then the ones, then combine.' },
      { id: 'm2-add-04', q: 'What is 200 + 350?', choices: ['250', '500', '550', '650'], answer: '550', explain: '2 hundreds + 3 hundreds = 5 hundreds. 500 + 50 = 550.', hint: 'Add the hundreds first.' },
      { id: 'm2-add-05', q: 'Which is the same as 48 + 25?', choices: ['48 + 20 + 50', '40 + 20 + 8 + 5', '40 + 25 + 5', '4 + 8 + 2 + 5'], answer: '40 + 20 + 8 + 5', explain: 'Split each number into tens and ones: 48 = 40 + 8 and 25 = 20 + 5.', hint: 'Break each number into tens and ones.' }
    ],
    subtraction: [
      { id: 'm2-sub-01', q: 'There are 32 birds. 14 fly away. How many remain?', choices: ['16', '18', '20', '22'], answer: '18', explain: '32 − 14 = 18 birds remain.', hint: 'Subtract 10 first, then subtract 4.' },
      { id: 'm2-sub-02', q: 'What is 100 − 46?', choices: ['44', '54', '64', '56'], answer: '54', explain: '100 − 40 = 60, then 60 − 6 = 54.', hint: 'Subtract 40, then subtract 6.' },
      { id: 'm2-sub-03', q: 'What is 85 − 30?', choices: ['45', '55', '65', '82'], answer: '55', explain: 'Take away 3 tens from 85: 75, 65, 55.', hint: 'Only the tens digit changes when you subtract 30.' },
      { id: 'm2-sub-04', q: 'Ben had 73 stickers. He gave away 25. How many stickers does he have now?', choices: ['52', '48', '58', '98'], answer: '48', explain: '73 − 20 = 53, then 53 − 5 = 48 stickers.', hint: 'Subtract 20 first, then subtract 5.' },
      { id: 'm2-sub-05', q: 'What is 450 − 200?', choices: ['230', '250', '350', '650'], answer: '250', explain: '4 hundreds − 2 hundreds = 2 hundreds, so 450 − 200 = 250.', hint: 'Subtract the hundreds and keep the 50.' }
    ],
    multiplication: [
      { id: 'm2-mul-01', q: 'What is 4 × 3?', detail: 'The × sign means “groups of”.', choices: ['7', '10', '12', '16'], answer: '12', explain: 'Four groups of three make 3 + 3 + 3 + 3 = 12.', hint: 'Think of four groups with three in each group.' },
      { id: 'm2-mul-02', q: 'An array has 3 rows with 5 stars in each row. How many stars are there?', choices: ['8', '10', '15', '20'], answer: '15', explain: '3 rows of 5 is 5 + 5 + 5 = 15 stars.', hint: 'Add 5 once for every row.' },
      { id: 'm2-mul-03', q: 'Which addition sentence matches 2 rows of 6 chairs?', choices: ['2 + 6', '6 + 6', '6 + 6 + 6', '2 + 2'], answer: '6 + 6', explain: 'Each row has 6 chairs and there are 2 rows, so add 6 two times.', hint: 'Add the number in one row, once for each row.' },
      { id: 'm2-mul-04', q: 'Each pack has 5 pencils. How many pencils are in 4 packs?', choices: ['9', '15', '20', '25'], answer: '20', explain: '4 groups of 5: 5, 10, 15, 20 pencils.', hint: 'Count by 5s four times.' },
      { id: 'm2-mul-05', q: 'What is 2 × 9?', choices: ['11', '16', '18', '20'], answer: '18', explain: '2 groups of 9 is the same as doubling 9: 9 + 9 = 18.', hint: 'Double 9.' }
    ],
    fractions: [
      { id: 'm2-frac-01', q: 'A pie is cut into 3 equal pieces. What is one piece called?', choices: ['One half', 'One third', 'One fourth', 'Three wholes'], answer: 'One third', explain: 'Each of 3 equal parts is called one third.', hint: 'Three equal parts are called thirds.' },
      { id: 'm2-frac-02', q: 'How many thirds make one whole?', choices: ['2', '3', '4', '6'], answer: '3', explain: 'Three thirds fit together to make one whole.', hint: 'How many equal parts are in a whole cut into thirds?' },
      { id: 'm2-frac-03', q: 'A rectangle is split into 4 equal parts. 2 parts are shaded. How many fourths are shaded?', choices: ['One fourth', 'Two fourths', 'Three fourths', 'Four fourths'], answer: 'Two fourths', explain: 'Each part is one fourth. 2 shaded parts make two fourths.', hint: 'Count the shaded parts. Each one is a fourth.' },
      { id: 'm2-frac-04', q: 'A whole is cut into halves, and the same whole is cut into fourths. Which has more equal parts?', choices: ['Halves', 'Fourths', 'They have the same number', 'Cannot tell'], answer: 'Fourths', explain: 'Halves give 2 parts and fourths give 4 parts, so fourths has more parts.', hint: 'Count: halves means 2 parts, fourths means 4 parts.' },
      { id: 'm2-frac-05', q: 'Which part is larger: one third or one fourth of the same cake?', choices: ['One fourth', 'They are equal', 'One third', 'Cannot tell'], answer: 'One third', explain: 'Sharing a cake among 3 gives bigger pieces than sharing it among 4.', hint: 'The more equal parts you make, the smaller each part is.' }
    ],
    geometry: [
      { id: 'm2-geo-01', q: 'How many sides does a hexagon have?', choices: ['4', '5', '6', '8'], answer: '6', explain: 'A hexagon is a polygon with six sides.', hint: 'The prefix “hexa-” means six.' },
      { id: 'm2-geo-02', q: 'Which shape has four equal sides and four right angles?', choices: ['Triangle', 'Rectangle only', 'Square', 'Pentagon'], answer: 'Square', explain: 'A square has four equal sides and four right angles.', hint: 'Think of a shape often drawn like a tile.' },
      { id: 'm2-geo-03', q: 'How many faces does a cube have?', choices: ['4', '5', '6', '8'], answer: '6', explain: 'A cube has 6 square faces: top, bottom, front, back, left and right.', hint: 'Think of a dice and count its sides.' },
      { id: 'm2-geo-04', q: 'A shape has 5 sides and 5 angles. What is it?', choices: ['Hexagon', 'Pentagon', 'Quadrilateral', 'Triangle'], answer: 'Pentagon', explain: 'A polygon with 5 sides and 5 angles is a pentagon.', hint: '“Penta” means five.' },
      { id: 'm2-geo-05', q: 'Which shape is a quadrilateral?', choices: ['Triangle', 'Circle', 'Pentagon', 'Rectangle'], answer: 'Rectangle', explain: 'A quadrilateral has 4 sides. A rectangle has 4 sides.', hint: '“Quad” means four.' }
    ]
  },
  3: {
    counting: [
      { id: 'm3-cnt-01', q: 'Round 47 to the nearest ten.', choices: ['40', '45', '50', '100'], answer: '50', explain: '47 is between 40 and 50, and it is closer to 50.', hint: 'Look at the ones digit. 5 or more rounds up.' },
      { id: 'm3-cnt-02', q: 'Round 362 to the nearest hundred.', choices: ['300', '360', '370', '400'], answer: '400', explain: '362 is between 300 and 400. The tens digit is 6, so it rounds up to 400.', hint: 'Look at the tens digit to decide.' },
      { id: 'm3-cnt-03', q: 'What is the value of the 6 in 6,421?', choices: ['6', '60', '600', '6,000'], answer: '6,000', explain: 'The 6 is in the thousands place, so its value is 6,000.', hint: 'Count the places from the right: ones, tens, hundreds, thousands.' },
      { id: 'm3-cnt-04', q: 'Write 3,000 + 500 + 20 + 8 as a number.', choices: ['3,582', '3,528', '30,528', '3,258'], answer: '3,528', explain: '3 thousands, 5 hundreds, 2 tens and 8 ones make 3,528.', hint: 'Put one digit in each place, from thousands to ones.' },
      { id: 'm3-cnt-05', q: 'Round 815 to the nearest ten.', choices: ['800', '810', '820', '900'], answer: '820', explain: 'The ones digit is 5, so 815 rounds up to 820.', hint: 'When the ones digit is 5, round up.' }
    ],
    addition: [
      { id: 'm3-add-01', q: 'What is 248 + 136?', choices: ['374', '384', '394', '484'], answer: '384', explain: '200 + 100 = 300, 40 + 30 = 70, 8 + 6 = 14. 300 + 70 + 14 = 384.', hint: 'Add hundreds, tens and ones separately.' },
      { id: 'm3-add-02', q: 'What is 567 + 285?', choices: ['742', '752', '862', '852'], answer: '852', explain: '7 + 5 = 12 (regroup 1 ten), 6 + 8 + 1 = 15 (regroup 1 hundred), 5 + 2 + 1 = 8. The sum is 852.', hint: 'Remember to regroup when a column adds to 10 or more.' },
      { id: 'm3-add-03', q: 'A school sold 315 tickets on Friday and 409 on Saturday. How many tickets did it sell in all?', choices: ['714', '724', '734', '794'], answer: '724', explain: '315 + 409 = 724 tickets.', hint: 'Add 400 first, then add 9.' },
      { id: 'm3-add-04', q: 'Estimate 298 + 403 by rounding each number to the nearest hundred.', choices: ['600', '701', '700', '800'], answer: '700', explain: '298 rounds to 300 and 403 rounds to 400. 300 + 400 = 700.', hint: 'Round first, then add.' },
      { id: 'm3-add-05', q: 'Which number makes this true? 350 + ___ = 1,000', choices: ['550', '650', '750', '1,350'], answer: '650', explain: '350 + 50 = 400, and 400 + 600 = 1,000. 50 + 600 = 650.', hint: 'Count up from 350 to the next hundred, then to 1,000.' }
    ],
    subtraction: [
      { id: 'm3-sub-01', q: 'What is 503 − 278?', choices: ['225', '235', '325', '375'], answer: '225', explain: '503 − 278 = 225. Check: 225 + 278 = 503.', hint: 'You will need to regroup across the zero.' },
      { id: 'm3-sub-02', q: 'What is 640 − 215?', choices: ['435', '425', '455', '855'], answer: '425', explain: '640 − 200 = 440, then 440 − 15 = 425.', hint: 'Subtract the hundreds first, then the rest.' },
      { id: 'm3-sub-03', q: 'A library has 912 books. 347 are checked out. How many books are still on the shelves?', choices: ['565', '575', '635', '665'], answer: '565', explain: '912 − 347 = 565 books.', hint: 'Subtract 300, then 40, then 7.' },
      { id: 'm3-sub-04', q: 'What is 700 − 360?', choices: ['340', '360', '440', '1,060'], answer: '340', explain: '700 − 300 = 400, then 400 − 60 = 340.', hint: 'Subtract 300, then subtract 60.' },
      { id: 'm3-sub-05', q: 'Which is the best estimate of 589 − 312?', choices: ['200', '300', '400', '900'], answer: '300', explain: '589 rounds to 600 and 312 rounds to 300. 600 − 300 = 300.', hint: 'Round each number to the nearest hundred first.' }
    ],
    multiplication: [
      { id: 'm3-mul-01', q: 'There are 5 bags with 6 marbles in each. How many marbles are there altogether?', choices: ['11', '25', '30', '35'], answer: '30', explain: '5 groups of 6 make 5 × 6 = 30.', hint: 'Add 6 five times, or use the 5 times table.' },
      { id: 'm3-mul-02', q: 'What is 8 × 7?', choices: ['48', '54', '56', '64'], answer: '56', explain: '8 groups of 7 equal 56.', hint: 'You can use 7 × 4 = 28 and double it.' },
      { id: 'm3-mul-03', q: 'What is 9 × 6?', choices: ['45', '54', '56', '63'], answer: '54', explain: '10 × 6 = 60, and 60 − 6 = 54.', hint: 'Find 10 × 6, then take away one group of 6.' },
      { id: 'm3-mul-04', q: 'What is 24 ÷ 4?', choices: ['4', '5', '8', '6'], answer: '6', explain: '4 × 6 = 24, so 24 ÷ 4 = 6.', hint: 'Think: 4 times what number equals 24?' },
      { id: 'm3-mul-05', q: 'A garden has 6 rows of 8 tomato plants. How many plants are there?', choices: ['14', '42', '48', '56'], answer: '48', explain: '6 rows of 8 is 6 × 8 = 48 plants.', hint: 'Double 3 × 8 = 24.' }
    ],
    fractions: [
      { id: 'm3-frac-01', q: 'Which fraction is equal to one half?', choices: ['2/3', '2/4', '1/4', '3/4'], answer: '2/4', explain: 'Two out of four equal parts make the same amount as one half.', hint: 'Imagine splitting each half into two equal parts.' },
      { id: 'm3-frac-02', q: 'Which is greater: 1/4 or 3/4?', choices: ['1/4', '3/4', 'They are equal', 'Cannot tell'], answer: '3/4', explain: 'When the denominators are equal, the fraction with the larger numerator is greater.', hint: 'Both fractions have four equal parts. Compare how many parts are shaded.' },
      { id: 'm3-frac-03', q: 'Which fraction is equal to one whole?', choices: ['1/3', '2/3', '3/3', '0/3'], answer: '3/3', explain: '3/3 means all 3 of the 3 equal parts, which is the whole thing.', hint: 'When the top and bottom numbers match, you have every part.' },
      { id: 'm3-frac-04', q: 'Which unit fraction is the largest?', choices: ['1/8', '1/3', '1/6', '1/2'], answer: '1/2', explain: 'With one part each, the fraction with the fewest equal parts has the biggest part: 1/2.', hint: 'A smaller denominator means bigger pieces.' },
      { id: 'm3-frac-05', q: 'A number line from 0 to 1 is split into 6 equal parts. What fraction is at the 5th mark after 0?', choices: ['1/6', '5/6', '6/5', '5/1'], answer: '5/6', explain: 'Each jump is 1/6. Five jumps from 0 land on 5/6.', hint: 'Each equal part is one sixth. Count the jumps.' }
    ],
    geometry: [
      { id: 'm3-geo-01', q: 'What is the perimeter of a rectangle that is 5 cm long and 3 cm wide?', choices: ['8 cm', '15 cm', '16 cm', '30 cm'], answer: '16 cm', explain: 'Perimeter is the distance around: 5 + 3 + 5 + 3 = 16 cm.', hint: 'Add all four sides.' },
      { id: 'm3-geo-02', q: 'A rectangle is 4 units long and 6 units wide. What is its area?', choices: ['10 square units', '20 square units', '24 square units', '48 square units'], answer: '24 square units', explain: 'Area = length × width = 4 × 6 = 24 square units.', hint: 'Multiply the length by the width.' },
      { id: 'm3-geo-03', q: 'A square has sides of 7 m. What is its perimeter?', choices: ['14 m', '21 m', '49 m', '28 m'], answer: '28 m', explain: 'A square has 4 equal sides: 4 × 7 = 28 m.', hint: 'All four sides are the same length.' },
      { id: 'm3-geo-04', q: 'Which of these is NOT a quadrilateral?', choices: ['Square', 'Rhombus', 'Triangle', 'Trapezoid'], answer: 'Triangle', explain: 'A quadrilateral has 4 sides. A triangle has only 3.', hint: 'Count the sides of each shape.' },
      { id: 'm3-geo-05', q: 'A rug covers 3 rows of 9 square tiles. How many square tiles does it cover?', choices: ['12', '24', '27', '36'], answer: '27', explain: '3 rows × 9 tiles = 27 square tiles. That is the rug’s area in tiles.', hint: 'Multiply the number of rows by the tiles in each row.' }
    ]
  },
  4: {
    counting: [
      { id: 'm4-cnt-01', q: 'What is the value of the 7 in 274,315?', choices: ['700', '7,000', '70,000', '700,000'], answer: '70,000', explain: 'The 7 is in the ten-thousands place, so its value is 70,000.', hint: 'Count places from the right: ones, tens, hundreds, thousands, ten thousands.' },
      { id: 'm4-cnt-02', q: 'Round 48,612 to the nearest thousand.', choices: ['48,000', '48,600', '49,000', '50,000'], answer: '49,000', explain: 'The hundreds digit is 6, so 48,612 rounds up to 49,000.', hint: 'Look at the hundreds digit to decide.' },
      { id: 'm4-cnt-03', q: 'Which number is ten times as much as 350?', choices: ['360', '3,050', '3,500', '35,000'], answer: '3,500', explain: 'Multiplying by 10 moves each digit one place to the left: 350 × 10 = 3,500.', hint: 'Each digit moves one place to the left.' },
      { id: 'm4-cnt-04', q: 'Write “six hundred two thousand, fifty” as a number.', choices: ['602,500', '602,050', '620,050', '6,002,050'], answer: '602,050', explain: '602 thousands is 602,000. Adding fifty gives 602,050.', hint: 'Write the thousands part, then the hundreds, tens and ones.' },
      { id: 'm4-cnt-05', q: 'Which list is ordered from least to greatest?', choices: ['10,002; 9,875; 10,020', '9,875; 10,002; 10,020', '10,020; 10,002; 9,875', '9,875; 10,020; 10,002'], answer: '9,875; 10,002; 10,020', explain: '9,875 has only four digits, so it is least. 10,002 is less than 10,020.', hint: 'Fewer digits means a smaller whole number.' }
    ],
    addition: [
      { id: 'm4-add-01', q: 'What is 3,456 + 2,789?', choices: ['5,245', '6,145', '6,245', '6,345'], answer: '6,245', explain: 'Add column by column with regrouping: 3,456 + 2,789 = 6,245.', hint: 'Line up the places and regroup when a column is 10 or more.' },
      { id: 'm4-add-02', q: 'What is 12,507 + 8,694?', choices: ['20,201', '21,101', '21,201', '21,211'], answer: '21,201', explain: '12,507 + 8,694 = 21,201.', hint: 'Start with the ones column and regroup carefully.' },
      { id: 'm4-add-03', q: 'A stadium had 18,450 fans on Saturday and 21,375 on Sunday. How many fans came in total?', choices: ['39,825', '38,825', '39,725', '40,825'], answer: '39,825', explain: '18,450 + 21,375 = 39,825 fans.', hint: 'Add the thousands, then the rest.' },
      { id: 'm4-add-04', q: 'Estimate 4,912 + 3,078 by rounding each number to the nearest thousand.', choices: ['7,000', '7,990', '8,000', '9,000'], answer: '8,000', explain: '4,912 rounds to 5,000 and 3,078 rounds to 3,000. 5,000 + 3,000 = 8,000.', hint: 'Round each number first.' },
      { id: 'm4-add-05', q: 'What is 0.4 + 0.3?', choices: ['0.07', '0.7', '7', '0.43'], answer: '0.7', explain: '4 tenths + 3 tenths = 7 tenths, written 0.7.', hint: 'Think of tenths like fractions: 4/10 + 3/10.' }
    ],
    subtraction: [
      { id: 'm4-sub-01', q: 'What is 5,002 − 1,768?', choices: ['3,234', '3,244', '3,334', '4,234'], answer: '3,234', explain: '5,002 − 1,768 = 3,234. Check: 3,234 + 1,768 = 5,002.', hint: 'Regroup across the zeros carefully.' },
      { id: 'm4-sub-02', q: 'What is 9,400 − 3,650?', choices: ['5,850', '5,750', '6,250', '6,750'], answer: '5,750', explain: '9,400 − 3,000 = 6,400, then 6,400 − 650 = 5,750.', hint: 'Subtract the thousands first.' },
      { id: 'm4-sub-03', q: 'A truck can carry 12,000 kg. It is already carrying 7,485 kg. How many more kilograms can it carry?', choices: ['4,515', '4,525', '5,515', '19,485'], answer: '4,515', explain: '12,000 − 7,485 = 4,515 kg.', hint: 'Count up from 7,485 to 12,000.' },
      { id: 'm4-sub-04', q: 'Which addition checks that 8,215 − 3,940 = 4,275?', choices: ['4,275 + 8,215', '8,215 + 3,940', '4,275 + 3,940', '4,275 + 4,275'], answer: '4,275 + 3,940', explain: 'Adding the difference and the number subtracted should give the start number: 4,275 + 3,940 = 8,215.', hint: 'Addition undoes subtraction.' },
      { id: 'm4-sub-05', q: 'What is 3/5 − 1/5?', choices: ['2/10', '2/5', '4/5', '1/5'], answer: '2/5', explain: 'The denominators match, so subtract the numerators: 3 − 1 = 2. The answer is 2/5.', hint: 'Keep the denominator. Subtract the numerators.' }
    ],
    multiplication: [
      { id: 'm4-mul-01', q: 'What is 34 × 6?', choices: ['184', '194', '204', '214'], answer: '204', explain: '30 × 6 = 180 and 4 × 6 = 24. 180 + 24 = 204.', hint: 'Split 34 into 30 and 4.' },
      { id: 'm4-mul-02', q: 'What is 23 × 15?', choices: ['335', '345', '355', '445'], answer: '345', explain: '23 × 10 = 230 and 23 × 5 = 115. 230 + 115 = 345.', hint: 'Split 15 into 10 and 5.' },
      { id: 'm4-mul-03', q: 'Which number is a factor of 36?', choices: ['5', '7', '9', '10'], answer: '9', explain: '9 × 4 = 36, so 9 is a factor of 36.', hint: 'A factor divides 36 with nothing left over.' },
      { id: 'm4-mul-04', q: 'Which number is a multiple of 8?', choices: ['18', '28', '58', '48'], answer: '48', explain: '8 × 6 = 48, so 48 is a multiple of 8.', hint: 'Skip count by 8s.' },
      { id: 'm4-mul-05', q: 'A bakery packs 12 muffins in each box. How many muffins fit in 25 boxes?', choices: ['250', '275', '300', '312'], answer: '300', explain: '10 × 25 = 250 and 2 × 25 = 50. 250 + 50 = 300 muffins.', hint: 'Find 10 × 25 and 2 × 25, then add.' }
    ],
    fractions: [
      { id: 'm4-frac-01', q: 'Which fraction is equivalent to 2/3?', choices: ['4/6', '3/4', '2/6', '4/3'], answer: '4/6', explain: 'Multiply the numerator and denominator by 2: 2/3 = 4/6.', hint: 'Multiply the top and bottom by the same number.' },
      { id: 'm4-frac-02', q: 'Which is greater: 3/8 or 1/2?', choices: ['3/8', '1/2', 'They are equal', 'Cannot tell'], answer: '1/2', explain: '1/2 = 4/8, and 4/8 is greater than 3/8.', hint: 'Write 1/2 in eighths.' },
      { id: 'm4-frac-03', q: 'What is 2/7 + 3/7?', choices: ['5/14', '5/7', '6/7', '1/7'], answer: '5/7', explain: 'The denominators match, so add the numerators: 2 + 3 = 5. The answer is 5/7.', hint: 'Keep the denominator. Add the numerators.' },
      { id: 'm4-frac-04', q: 'What is 3/10 written as a decimal?', choices: ['0.03', '0.3', '3.10', '3.0'], answer: '0.3', explain: '3/10 is 3 tenths, written 0.3.', hint: 'The first digit after the decimal point is the tenths place.' },
      { id: 'm4-frac-05', q: 'What is 3 × 1/4?', choices: ['1/12', '3/12', '3/4', '4/3'], answer: '3/4', explain: '3 groups of 1/4 is 1/4 + 1/4 + 1/4 = 3/4.', hint: 'Add 1/4 three times.' }
    ],
    geometry: [
      { id: 'm4-geo-01', q: 'How many degrees are in a right angle?', choices: ['45°', '90°', '180°', '360°'], answer: '90°', explain: 'A right angle measures exactly 90 degrees.', hint: 'It is the angle at the corner of a square.' },
      { id: 'm4-geo-02', q: 'An angle measures 130°. What kind of angle is it?', choices: ['Acute', 'Right', 'Obtuse', 'Straight'], answer: 'Obtuse', explain: 'An obtuse angle is greater than 90° and less than 180°. 130° fits.', hint: 'Compare 130° with 90° and 180°.' },
      { id: 'm4-geo-03', q: 'How many lines of symmetry does a square have?', choices: ['1', '2', '4', '8'], answer: '4', explain: 'A square has 2 diagonal lines and 2 lines through the middle of opposite sides: 4 lines.', hint: 'Remember the diagonals too.' },
      { id: 'm4-geo-04', q: 'Lines that never meet and stay the same distance apart are called…', choices: ['Perpendicular lines', 'Parallel lines', 'Intersecting rays', 'Line segments'], answer: 'Parallel lines', explain: 'Parallel lines run side by side and never cross, like railway tracks.', hint: 'Think of railway tracks.' },
      { id: 'm4-geo-05', q: 'A right angle is split into two angles. One measures 35°. What does the other measure?', choices: ['35°', '45°', '55°', '145°'], answer: '55°', explain: 'The two parts add up to 90°: 90° − 35° = 55°.', hint: 'The two angles together make 90°.' }
    ]
  },
  5: {
    counting: [
      { id: 'm5-cnt-01', q: 'What is the value of the 4 in 2.348?', choices: ['4 ones', '4 tenths', '4 hundredths', '4 thousandths'], answer: '4 hundredths', explain: 'After the decimal point the places are tenths, hundredths, thousandths. The 4 is second, so it is 4 hundredths.', hint: 'Count places to the right of the decimal point.' },
      { id: 'm5-cnt-02', q: 'What is 10³?', choices: ['30', '100', '1,000', '10,000'], answer: '1,000', explain: '10³ = 10 × 10 × 10 = 1,000.', hint: 'The small 3 tells how many tens to multiply.' },
      { id: 'm5-cnt-03', q: 'Round 6.482 to the nearest tenth.', choices: ['6.4', '6.48', '6.5', '7'], answer: '6.5', explain: 'The hundredths digit is 8, so the tenths digit rounds up from 4 to 5: 6.5.', hint: 'Look at the hundredths digit to decide.' },
      { id: 'm5-cnt-04', q: 'Which decimal is greatest?', choices: ['0.45', '0.405', '0.5', '0.054'], answer: '0.5', explain: '0.5 has 5 tenths, more than the 4 tenths or 0 tenths in the others.', hint: 'Compare the tenths digits first.' },
      { id: 'm5-cnt-05', q: 'Which shows 5.06 in expanded form?', choices: ['5 + 0.6', '5 + 0.06', '5 + 0.006', '50 + 0.6'], answer: '5 + 0.06', explain: '5.06 is 5 ones, 0 tenths and 6 hundredths: 5 + 0.06.', hint: 'The 0 is in the tenths place.' }
    ],
    addition: [
      { id: 'm5-add-01', q: 'What is 4.75 + 2.6?', choices: ['6.81', '7.35', '7.81', '6.135'], answer: '7.35', explain: 'Line up the decimal points: 4.75 + 2.60 = 7.35.', hint: 'Write 2.6 as 2.60 so the places line up.' },
      { id: 'm5-add-02', q: 'What is 12.08 + 3.95?', choices: ['15.03', '15.93', '16.13', '16.03'], answer: '16.03', explain: '12.08 + 3.95 = 16.03.', hint: 'Line up the decimal points and regroup.' },
      { id: 'm5-add-03', q: 'Maya ran 2.4 km on Monday and 3.85 km on Tuesday. How far did she run in total?', choices: ['5.25 km', '6.25 km', '6.29 km', '6.89 km'], answer: '6.25 km', explain: '2.40 + 3.85 = 6.25 km.', hint: 'Write 2.4 as 2.40.' },
      { id: 'm5-add-04', q: 'What is 0.9 + 0.25?', choices: ['0.34', '1.15', '1.25', '0.115'], answer: '1.15', explain: '0.90 + 0.25 = 1.15.', hint: 'Write 0.9 as 0.90.' },
      { id: 'm5-add-05', q: 'Which expression has a value of exactly 10?', choices: ['6.5 + 4.5', '6.5 + 3.5', '7.25 + 3.25', '5.9 + 4.2'], answer: '6.5 + 3.5', explain: '6.5 + 3.5 = 10. The others make 11, 10.5 and 10.1.', hint: 'Look for decimal parts that add to a whole.' }
    ],
    subtraction: [
      { id: 'm5-sub-01', q: 'What is 8.4 − 3.75?', choices: ['4.65', '4.75', '5.35', '5.65'], answer: '4.65', explain: 'Write 8.4 as 8.40. 8.40 − 3.75 = 4.65.', hint: 'Add a zero so both numbers have hundredths.' },
      { id: 'm5-sub-02', q: 'What is 10 − 2.36?', choices: ['8.36', '7.64', '8.74', '7.74'], answer: '7.64', explain: 'Write 10 as 10.00. 10.00 − 2.36 = 7.64.', hint: 'Write 10 as 10.00.' },
      { id: 'm5-sub-03', q: 'A bottle holds 1.5 L of juice. Leo pours out 0.65 L. How much juice is left?', choices: ['0.85 L', '0.9 L', '0.95 L', '1.15 L'], answer: '0.85 L', explain: '1.50 − 0.65 = 0.85 L.', hint: 'Write 1.5 as 1.50.' },
      { id: 'm5-sub-04', q: 'What is 6.02 − 0.5?', choices: ['1.02', '5.97', '5.52', '6.52'], answer: '5.52', explain: '6.02 − 0.50 = 5.52.', hint: 'Write 0.5 as 0.50 and line up the decimal points.' },
      { id: 'm5-sub-05', q: 'Which is the best estimate of 19.87 − 6.12?', choices: ['12', '13', '14', '26'], answer: '14', explain: '19.87 rounds to 20 and 6.12 rounds to 6. 20 − 6 = 14.', hint: 'Round each number to the nearest whole number.' }
    ],
    multiplication: [
      { id: 'm5-mul-01', q: 'What is 324 × 26?', choices: ['7,424', '8,324', '8,424', '8,524'], answer: '8,424', explain: '324 × 20 = 6,480 and 324 × 6 = 1,944. 6,480 + 1,944 = 8,424.', hint: 'Multiply by 20 and by 6, then add.' },
      { id: 'm5-mul-02', q: 'What is 0.6 × 4?', choices: ['0.24', '1.0', '2.4', '24'], answer: '2.4', explain: '6 tenths × 4 = 24 tenths = 2.4.', hint: 'Find 6 × 4, then think in tenths.' },
      { id: 'm5-mul-03', q: 'What is 1.5 × 1.2?', choices: ['0.18', '1.8', '2.7', '18'], answer: '1.8', explain: '15 × 12 = 180. There are 2 decimal places in total, so 1.80 = 1.8.', hint: 'Multiply as whole numbers, then count decimal places.' },
      { id: 'm5-mul-04', q: 'What is 4.72 × 10?', choices: ['0.472', '47.2', '472', '4.720'], answer: '47.2', explain: 'Multiplying by 10 moves each digit one place left: 47.2.', hint: 'Each digit moves one place to the left.' },
      { id: 'm5-mul-05', q: 'A ticket costs $14.50. How much do 6 tickets cost?', choices: ['$84.00', '$86.50', '$87.00', '$90.00'], answer: '$87.00', explain: '6 × $14 = $84 and 6 × $0.50 = $3. $84 + $3 = $87.00.', hint: 'Multiply the dollars and the cents separately.' }
    ],
    fractions: [
      { id: 'm5-frac-01', q: 'What is 1/2 + 1/3?', choices: ['2/5', '5/6', '2/6', '1/6'], answer: '5/6', explain: 'Use sixths: 1/2 = 3/6 and 1/3 = 2/6. 3/6 + 2/6 = 5/6.', hint: 'Find a common denominator first.' },
      { id: 'm5-frac-02', q: 'What is 3/4 − 1/8?', choices: ['2/4', '1/2', '5/8', '2/8'], answer: '5/8', explain: '3/4 = 6/8. 6/8 − 1/8 = 5/8.', hint: 'Write 3/4 in eighths.' },
      { id: 'm5-frac-03', q: 'What is 2/3 × 6?', choices: ['4', '8/3', '12', '2/18'], answer: '4', explain: '1/3 of 6 is 2, so 2/3 of 6 is 4.', hint: 'Find 1/3 of 6 first.' },
      { id: 'm5-frac-04', q: 'What is 1/2 × 3/5?', choices: ['4/7', '3/10', '4/10', '5/6'], answer: '3/10', explain: 'Multiply the numerators and the denominators: (1 × 3)/(2 × 5) = 3/10.', hint: 'Top times top, bottom times bottom.' },
      { id: 'm5-frac-05', q: 'Write 7/4 as a mixed number.', choices: ['1 1/4', '1 3/4', '3 1/4', '7 1/4'], answer: '1 3/4', explain: '7/4 is 4/4 + 3/4, which is 1 whole and 3/4: 1 3/4.', hint: 'How many whole groups of 4 fit in 7?' }
    ],
    geometry: [
      { id: 'm5-geo-01', q: 'What is the volume of a box 4 cm long, 3 cm wide and 2 cm high?', choices: ['9 cubic cm', '14 cubic cm', '24 cubic cm', '26 cubic cm'], answer: '24 cubic cm', explain: 'Volume = length × width × height = 4 × 3 × 2 = 24 cubic cm.', hint: 'Multiply all three measurements.' },
      { id: 'm5-geo-02', q: 'Which point is 3 units right and 5 units up from the origin?', choices: ['(5, 3)', '(3, 5)', '(3, 0)', '(0, 5)'], answer: '(3, 5)', explain: 'The first number is across (x) and the second is up (y): (3, 5).', hint: 'Go across first, then up.' },
      { id: 'm5-geo-03', q: 'A triangle has three sides of different lengths. What is it called?', choices: ['Equilateral', 'Isosceles', 'Scalene', 'Right'], answer: 'Scalene', explain: 'A scalene triangle has no equal sides.', hint: 'Equilateral means all sides equal; isosceles means at least two.' },
      { id: 'm5-geo-04', q: 'A cube has edges of 5 inches. What is its volume?', choices: ['15 cubic inches', '25 cubic inches', '75 cubic inches', '125 cubic inches'], answer: '125 cubic inches', explain: '5 × 5 × 5 = 125 cubic inches.', hint: 'All three edges of a cube are the same length.' },
      { id: 'm5-geo-05', q: 'Which statement is always true?', choices: ['Every rectangle is a square', 'Every square is a rectangle', 'Every rhombus is a square', 'Every trapezoid is a parallelogram'], answer: 'Every square is a rectangle', explain: 'A square has four right angles, so it is a special kind of rectangle.', hint: 'Think about what a rectangle needs: four right angles.' }
    ]
  },
  6: {
    counting: [
      { id: 'm6-cnt-01', q: 'Which number is greater: −8 or −3?', choices: ['−8', '−3', 'They are equal', 'Cannot tell'], answer: '−3', explain: 'On a number line, −3 is to the right of −8, so −3 is greater.', hint: 'The number closer to zero is greater when both are negative.' },
      { id: 'm6-cnt-02', q: 'What is the absolute value of −12?', choices: ['−12', '0', '12', '1/12'], answer: '12', explain: 'Absolute value is the distance from zero. −12 is 12 units from zero.', hint: 'Distance is never negative.' },
      { id: 'm6-cnt-03', q: 'What is 2⁵?', choices: ['10', '25', '32', '64'], answer: '32', explain: '2⁵ = 2 × 2 × 2 × 2 × 2 = 32.', hint: 'Multiply 2 by itself five times.' },
      { id: 'm6-cnt-04', q: 'Which list puts these integers in order from least to greatest?', choices: ['0, −1, −5, 4', '−1, −5, 0, 4', '−5, −1, 0, 4', '4, 0, −1, −5'], answer: '−5, −1, 0, 4', explain: 'On a number line from left to right: −5, −1, 0, 4.', hint: 'Picture the numbers on a number line.' },
      { id: 'm6-cnt-05', q: 'What is the greatest common factor of 18 and 24?', choices: ['2', '3', '6', '12'], answer: '6', explain: 'Factors of 18: 1, 2, 3, 6, 9, 18. Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. The greatest shared factor is 6.', hint: 'List the factors of each number and find the biggest match.' }
    ],
    addition: [
      { id: 'm6-add-01', q: 'What is −7 + 4?', choices: ['−11', '−3', '3', '11'], answer: '−3', explain: 'Start at −7 and move 4 to the right: −6, −5, −4, −3.', hint: 'Adding a positive number moves right on the number line.' },
      { id: 'm6-add-02', q: 'What is 2 1/2 + 1 3/4?', choices: ['3 4/6', '3 1/4', '4 1/2', '4 1/4'], answer: '4 1/4', explain: '2 + 1 = 3, and 1/2 + 3/4 = 2/4 + 3/4 = 5/4 = 1 1/4. 3 + 1 1/4 = 4 1/4.', hint: 'Add the whole numbers, then the fractions using fourths.' },
      { id: 'm6-add-03', q: 'What is 3.25 + 4.8 + 0.07?', choices: ['7.40', '8.02', '8.12', '12.05'], answer: '8.12', explain: '3.25 + 4.80 = 8.05, then 8.05 + 0.07 = 8.12.', hint: 'Line up all three decimal points.' },
      { id: 'm6-add-04', q: 'The temperature was −6°C. It rose by 9 degrees. What is the new temperature?', choices: ['−15°C', '−3°C', '3°C', '15°C'], answer: '3°C', explain: '−6 + 9 = 3. It takes 6 degrees to reach 0, then 3 more.', hint: 'How many degrees to get to 0? How many are left?' },
      { id: 'm6-add-05', q: 'Which expression is equivalent to 3x + 5x?', choices: ['15x', '8x²', '8x', '35x'], answer: '8x', explain: '3 x’s plus 5 x’s is 8 x’s: 8x.', hint: 'Combine like terms by adding the numbers in front of x.' }
    ],
    subtraction: [
      { id: 'm6-sub-01', q: 'What is 5 − 9?', choices: ['−14', '−4', '4', '14'], answer: '−4', explain: 'Start at 5 and move 9 left: you pass 0 after 5 steps and go 4 more to −4.', hint: 'Subtracting moves left on the number line.' },
      { id: 'm6-sub-02', q: 'What is −2 − 6?', choices: ['−8', '−4', '4', '8'], answer: '−8', explain: 'Start at −2 and move 6 more to the left: −8.', hint: 'You are moving further below zero.' },
      { id: 'm6-sub-03', q: 'What is 5 1/3 − 2 2/3?', choices: ['2 1/3', '2 2/3', '3 1/3', '3 2/3'], answer: '2 2/3', explain: 'Regroup: 5 1/3 = 4 4/3. 4 4/3 − 2 2/3 = 2 2/3.', hint: 'You cannot take 2/3 from 1/3, so regroup one whole.' },
      { id: 'm6-sub-04', q: 'A submarine is at −120 m. A bird is flying at 45 m. How far apart are they vertically?', choices: ['−75 m', '75 m', '120 m', '165 m'], answer: '165 m', explain: '45 − (−120) = 45 + 120 = 165 m.', hint: 'Find each distance from sea level (0) and add them.' },
      { id: 'm6-sub-05', q: 'What is 15.2 − 7.86?', choices: ['7.34', '7.46', '8.34', '8.66'], answer: '7.34', explain: 'Write 15.2 as 15.20. 15.20 − 7.86 = 7.34.', hint: 'Add a zero so both numbers have hundredths.' }
    ],
    multiplication: [
      { id: 'm6-mul-01', q: 'Which expression is equal to 6 × (10 + 3)?', choices: ['6 × 10 + 3', '6 × 10 + 6 × 3', '6 + 10 × 3', '60 + 3'], answer: '6 × 10 + 6 × 3', explain: 'The distributive property multiplies 6 by each part: 6 × 10 + 6 × 3 = 60 + 18 = 78.', hint: 'Multiply 6 by both numbers inside the brackets.' },
      { id: 'm6-mul-02', q: 'What is 3.4 × 0.25?', choices: ['0.085', '0.85', '1.35', '8.5'], answer: '0.85', explain: '0.25 is one quarter, and one quarter of 3.4 is 0.85.', hint: 'Multiplying by 0.25 is the same as dividing by 4.' },
      { id: 'm6-mul-03', q: 'What is 2/3 × 3/8?', choices: ['5/11', '1/4', '1/2', '9/16'], answer: '1/4', explain: '(2 × 3)/(3 × 8) = 6/24, which simplifies to 1/4.', hint: 'Multiply, then simplify.' },
      { id: 'm6-mul-04', q: 'What is 5² × 2?', choices: ['20', '25', '50', '100'], answer: '50', explain: 'Exponents come first: 5² = 25. Then 25 × 2 = 50.', hint: 'Work out the exponent before multiplying.' },
      { id: 'm6-mul-05', q: 'A recipe uses 3 cups of flour for every 2 cups of sugar. How much flour is needed for 8 cups of sugar?', choices: ['9 cups', '11 cups', '12 cups', '16 cups'], answer: '12 cups', explain: '8 cups of sugar is 4 times 2 cups, so use 4 × 3 = 12 cups of flour.', hint: 'How many times bigger is 8 than 2?' }
    ],
    fractions: [
      { id: 'm6-frac-01', q: 'What is 3/4 ÷ 1/8?', choices: ['3/32', '4', '6', '8/3'], answer: '6', explain: 'There are 6 eighths in 3/4, because 3/4 = 6/8. So 3/4 ÷ 1/8 = 6.', hint: 'How many 1/8 pieces fit into 3/4?' },
      { id: 'm6-frac-02', q: 'What is 5/6 ÷ 2/3?', choices: ['5/9', '10/18', '4/5', '1 1/4'], answer: '1 1/4', explain: 'Multiply by the reciprocal: 5/6 × 3/2 = 15/12 = 5/4 = 1 1/4.', hint: 'Flip the second fraction and multiply.' },
      { id: 'm6-frac-03', q: 'What is 35% of 80?', choices: ['24', '28', '35', '45'], answer: '28', explain: '10% of 80 is 8, so 30% is 24 and 5% is 4. 24 + 4 = 28.', hint: 'Find 10% first, then build up to 35%.' },
      { id: 'm6-frac-04', q: 'Which fraction is equal to 0.375?', choices: ['3/75', '3/8', '37/5', '5/8'], answer: '3/8', explain: '0.375 = 375/1000. Dividing top and bottom by 125 gives 3/8.', hint: '1/8 = 0.125. How many eighths make 0.375?' },
      { id: 'm6-frac-05', q: 'Write 3/5 as a percent.', choices: ['35%', '53%', '60%', '65%'], answer: '60%', explain: '3/5 = 6/10 = 60/100 = 60%.', hint: 'Make the denominator 100.' }
    ],
    geometry: [
      { id: 'm6-geo-01', q: 'What is the area of a triangle with base 10 cm and height 6 cm?', choices: ['16 square cm', '30 square cm', '32 square cm', '60 square cm'], answer: '30 square cm', explain: 'Area of a triangle = 1/2 × base × height = 1/2 × 10 × 6 = 30 square cm.', hint: 'A triangle is half of a rectangle with the same base and height.' },
      { id: 'm6-geo-02', q: 'What is the area of a parallelogram with base 9 m and height 4 m?', choices: ['13 square m', '18 square m', '26 square m', '36 square m'], answer: '36 square m', explain: 'Area of a parallelogram = base × height = 9 × 4 = 36 square m.', hint: 'Use the height, not the slanted side.' },
      { id: 'm6-geo-03', q: 'What is the surface area of a cube with edges of 3 cm?', choices: ['18 square cm', '27 square cm', '54 square cm', '36 square cm'], answer: '54 square cm', explain: 'Each face is 3 × 3 = 9 square cm, and a cube has 6 faces: 6 × 9 = 54 square cm.', hint: 'Find the area of one face, then multiply by the number of faces.' },
      { id: 'm6-geo-04', q: 'A rectangular prism is 2.5 cm long, 2 cm wide and 4 cm high. What is its volume?', choices: ['8.5 cubic cm', '10 cubic cm', '20 cubic cm', '40 cubic cm'], answer: '20 cubic cm', explain: '2.5 × 2 × 4 = 20 cubic cm.', hint: 'Multiply length × width × height.' },
      { id: 'm6-geo-05', q: 'The points (2, 3) and (2, −5) are plotted on a coordinate plane. How far apart are they?', choices: ['2 units', '3 units', '5 units', '8 units'], answer: '8 units', explain: 'Both points have x = 2, so count vertically: 3 units down to 0, then 5 more to −5. That is 8 units.', hint: 'Same x-coordinate: find the distance between 3 and −5.' }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) module.exports = { MATH_BANK, MATH_GRADE_FOCUS };
