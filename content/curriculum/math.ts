// Math Curriculum for Grades 1-4
// Aligned with Common Core State Standards

export interface MathProblem {
  id: string;
  question: string;
  type: "multiple-choice" | "fill-in" | "drag-drop" | "true-false";
  options?: string[];
  correctAnswer: number | string;
  hint: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  visual?: string;
}

export interface MathSkill {
  id: string;
  title: string;
  description: string;
  grade: 1 | 2 | 3 | 4;
  domain: string;
  icon: string;
  estimatedMinutes: number;
  standards: string[];
  prerequisites: string[];
  problems: MathProblem[];
}

export const mathCurriculum: MathSkill[] = [
  // ========================================
  // GRADE 1
  // ========================================
  
  // Counting & Cardinality
  {
    id: "g1-counting-20",
    title: "Counting to 20",
    description: "Count objects up to 20 and understand number names",
    grade: 1,
    domain: "counting",
    icon: "🔢",
    estimatedMinutes: 10,
    standards: ["1.NBT.A.1"],
    prerequisites: [],
    problems: [
      {
        id: "g1c1",
        question: "How many apples are there? 🍎🍎🍎🍎🍎",
        type: "multiple-choice",
        options: ["3", "5", "6", "4"],
        correctAnswer: 1,
        hint: "Count each apple one by one",
        explanation: "There are 5 apples. Count: 1, 2, 3, 4, 5!",
        difficulty: "easy",
      },
      {
        id: "g1c2",
        question: "What number comes after 7?",
        type: "multiple-choice",
        options: ["6", "8", "9", "5"],
        correctAnswer: 1,
        hint: "Count: 5, 6, 7, __?",
        explanation: "8 comes after 7. The sequence is 5, 6, 7, 8, 9...",
        difficulty: "easy",
      },
      {
        id: "g1c3",
        question: "Count the stars: ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐",
        type: "multiple-choice",
        options: ["10", "11", "12", "13"],
        correctAnswer: 2,
        hint: "Try counting in groups of 5",
        explanation: "There are 12 stars. You can count 5, then 5 more (10), then 2 more (12)!",
        difficulty: "medium",
      },
      {
        id: "g1c4",
        question: "Which number is bigger: 13 or 9?",
        type: "multiple-choice",
        options: ["13", "9", "They're the same"],
        correctAnswer: 0,
        hint: "Which number would be further along if you were counting?",
        explanation: "13 is bigger than 9. When we count, we say 9 before 13, so 13 is more!",
        difficulty: "medium",
      },
    ],
  },

  // Addition
  {
    id: "g1-addition-10",
    title: "Adding Numbers to 10",
    description: "Learn to add single digit numbers with sums up to 10",
    grade: 1,
    domain: "addition",
    icon: "➕",
    estimatedMinutes: 12,
    standards: ["1.OA.A.1", "1.OA.C.6"],
    prerequisites: ["g1-counting-20"],
    problems: [
      {
        id: "g1a1",
        question: "3 + 2 = ?",
        type: "multiple-choice",
        options: ["4", "5", "6", "3"],
        correctAnswer: 1,
        hint: "Start at 3 and count up 2 more",
        explanation: "3 + 2 = 5. Start at 3, then count 4, 5!",
        difficulty: "easy",
      },
      {
        id: "g1a2",
        question: "4 + 4 = ?",
        type: "multiple-choice",
        options: ["7", "8", "9", "6"],
        correctAnswer: 1,
        hint: "This is a doubles fact!",
        explanation: "4 + 4 = 8. Doubles are special: 4 groups of 2 things = 8!",
        difficulty: "easy",
      },
      {
        id: "g1a3",
        question: "You have 5 crayons and get 3 more. How many do you have now?",
        type: "multiple-choice",
        options: ["7", "8", "9", "6"],
        correctAnswer: 1,
        hint: "Start with 5 and add 3 more",
        explanation: "5 + 3 = 8 crayons! When we get more, we add.",
        difficulty: "medium",
      },
      {
        id: "g1a4",
        question: "6 + 4 = ?",
        type: "multiple-choice",
        options: ["9", "10", "11", "8"],
        correctAnswer: 1,
        hint: "What number makes 10 with 6?",
        explanation: "6 + 4 = 10. This is a 'make 10' fact!",
        difficulty: "medium",
      },
    ],
  },

  // Subtraction
  {
    id: "g1-subtraction-10",
    title: "Subtracting to 10",
    description: "Learn to subtract single digit numbers",
    grade: 1,
    domain: "subtraction",
    icon: "➖",
    estimatedMinutes: 12,
    standards: ["1.OA.A.1", "1.OA.C.6"],
    prerequisites: ["g1-addition-10"],
    problems: [
      {
        id: "g1s1",
        question: "5 - 2 = ?",
        type: "multiple-choice",
        options: ["2", "3", "4", "1"],
        correctAnswer: 1,
        hint: "Start at 5 and count back 2",
        explanation: "5 - 2 = 3. Start at 5, count back: 4, 3!",
        difficulty: "easy",
      },
      {
        id: "g1s2",
        question: "You have 7 cookies. You eat 3. How many are left?",
        type: "multiple-choice",
        options: ["5", "4", "3", "6"],
        correctAnswer: 1,
        hint: "When we take away, we subtract",
        explanation: "7 - 3 = 4 cookies left!",
        difficulty: "medium",
      },
    ],
  },

  // Shapes
  {
    id: "g1-shapes-2d",
    title: "2D Shapes",
    description: "Identify and describe circles, squares, rectangles, and triangles",
    grade: 1,
    domain: "shapes",
    icon: "🔷",
    estimatedMinutes: 10,
    standards: ["1.G.A.1"],
    prerequisites: [],
    problems: [
      {
        id: "g1sh1",
        question: "How many sides does a triangle have?",
        type: "multiple-choice",
        options: ["2", "3", "4", "5"],
        correctAnswer: 1,
        hint: "'Tri' means three!",
        explanation: "A triangle has 3 sides. Tri means three!",
        difficulty: "easy",
      },
      {
        id: "g1sh2",
        question: "Which shape has 4 equal sides?",
        type: "multiple-choice",
        options: ["Circle", "Triangle", "Square", "Rectangle"],
        correctAnswer: 2,
        hint: "This shape is like a box with all sides the same",
        explanation: "A square has 4 equal sides. All sides are the same length!",
        difficulty: "medium",
      },
    ],
  },

  // ========================================
  // GRADE 2
  // ========================================

  // Two-Digit Addition
  {
    id: "g2-addition-100",
    title: "Adding Two-Digit Numbers",
    description: "Add numbers up to 100 with and without regrouping",
    grade: 2,
    domain: "additionSubtraction",
    icon: "🔢",
    estimatedMinutes: 15,
    standards: ["2.NBT.B.5", "2.NBT.B.6"],
    prerequisites: ["g1-addition-10"],
    problems: [
      {
        id: "g2a1",
        question: "23 + 14 = ?",
        type: "multiple-choice",
        options: ["36", "37", "38", "35"],
        correctAnswer: 1,
        hint: "Add the ones first, then the tens",
        explanation: "23 + 14 = 37. (3 + 4 = 7 ones, 2 + 1 = 3 tens)",
        difficulty: "easy",
      },
      {
        id: "g2a2",
        question: "45 + 28 = ?",
        type: "multiple-choice",
        options: ["63", "73", "72", "83"],
        correctAnswer: 1,
        hint: "5 + 8 = 13, so you'll need to regroup!",
        explanation: "45 + 28 = 73. 5+8=13 (write 3, carry 1), 4+2+1=7 tens",
        difficulty: "medium",
      },
      {
        id: "g2a3",
        question: "67 + 25 = ?",
        type: "multiple-choice",
        options: ["82", "92", "91", "93"],
        correctAnswer: 1,
        hint: "7 + 5 = 12, remember to carry!",
        explanation: "67 + 25 = 92. 7+5=12 (write 2, carry 1), 6+2+1=9 tens",
        difficulty: "hard",
      },
    ],
  },

  // Money
  {
    id: "g2-money",
    title: "Counting Money",
    description: "Count and add coins and dollar bills",
    grade: 2,
    domain: "money",
    icon: "💰",
    estimatedMinutes: 12,
    standards: ["2.MD.C.8"],
    prerequisites: ["g2-addition-100"],
    problems: [
      {
        id: "g2m1",
        question: "How much is a quarter worth?",
        type: "multiple-choice",
        options: ["5 cents", "10 cents", "25 cents", "50 cents"],
        correctAnswer: 2,
        hint: "It's the largest coin before the half-dollar",
        explanation: "A quarter is worth 25 cents. Four quarters make $1.00!",
        difficulty: "easy",
      },
      {
        id: "g2m2",
        question: "You have 2 dimes and 3 nickels. How much money?",
        type: "multiple-choice",
        options: ["25 cents", "30 cents", "35 cents", "40 cents"],
        correctAnswer: 2,
        hint: "Dimes = 10¢, Nickels = 5¢",
        explanation: "2 dimes = 20¢, 3 nickels = 15¢. 20¢ + 15¢ = 35¢!",
        difficulty: "medium",
      },
    ],
  },

  // Time
  {
    id: "g2-time",
    title: "Telling Time",
    description: "Read analog clocks and tell time to the nearest 5 minutes",
    grade: 2,
    domain: "time",
    icon: "🕐",
    estimatedMinutes: 15,
    standards: ["2.MD.C.7"],
    prerequisites: [],
    problems: [
      {
        id: "g2t1",
        question: "What time does a clock show when both hands point to 12?",
        type: "multiple-choice",
        options: ["12:00", "6:00", "3:00", "9:00"],
        correctAnswer: 0,
        hint: "This happens at noon and midnight",
        explanation: "When both hands point to 12, it's 12:00!",
        difficulty: "easy",
      },
      {
        id: "g2t2",
        question: "The hour hand points to 3 and minute hand to 6. What time is it?",
        type: "multiple-choice",
        options: ["3:00", "3:30", "6:03", "6:30"],
        correctAnswer: 1,
        hint: "When the minute hand is on 6, it's :30",
        explanation: "Hour hand on 3, minute hand on 6 = 3:30 (half past 3)",
        difficulty: "medium",
      },
    ],
  },

  // ========================================
  // GRADE 3
  // ========================================

  // Multiplication Introduction
  {
    id: "g3-multiplication-intro",
    title: "Introduction to Multiplication",
    description: "Understand multiplication as groups and arrays",
    grade: 3,
    domain: "multiplication",
    icon: "✖️",
    estimatedMinutes: 15,
    standards: ["3.OA.A.1"],
    prerequisites: ["g2-addition-100"],
    problems: [
      {
        id: "g3mi1",
        question: "What does 3 × 4 mean?",
        type: "multiple-choice",
        options: ["3 + 4", "3 groups of 4", "4 - 3", "3 taken away 4 times"],
        correctAnswer: 1,
        hint: "The × symbol means 'groups of'",
        explanation: "3 × 4 means 3 groups of 4. Picture 3 bags with 4 apples each!",
        difficulty: "easy",
      },
      {
        id: "g3mi2",
        question: "🍎🍎🍎 🍎🍎🍎 🍎🍎🍎 🍎🍎🍎 - How many apples? (Write as multiplication)",
        type: "multiple-choice",
        options: ["3 × 4 = 12", "4 × 3 = 12", "Both are correct!", "12 × 1 = 12"],
        correctAnswer: 2,
        hint: "You can see this as 4 groups of 3 OR 3 groups of 4",
        explanation: "Both 3 × 4 and 4 × 3 equal 12! This is the commutative property.",
        difficulty: "medium",
      },
    ],
  },

  // Multiplication Facts
  {
    id: "g3-multiplication-facts",
    title: "Multiplication Facts 0-10",
    description: "Master multiplication facts from 0 to 10",
    grade: 3,
    domain: "multiplication",
    icon: "🧮",
    estimatedMinutes: 20,
    standards: ["3.OA.C.7"],
    prerequisites: ["g3-multiplication-intro"],
    problems: [
      {
        id: "g3mf1",
        question: "5 × 5 = ?",
        type: "multiple-choice",
        options: ["20", "25", "30", "10"],
        correctAnswer: 1,
        hint: "This is a square number!",
        explanation: "5 × 5 = 25. Five fives make twenty-five!",
        difficulty: "easy",
      },
      {
        id: "g3mf2",
        question: "7 × 8 = ?",
        type: "multiple-choice",
        options: ["54", "56", "64", "48"],
        correctAnswer: 1,
        hint: "5, 6, 7, 8 → 56 = 7 × 8",
        explanation: "7 × 8 = 56. Remember: 5, 6, 7, 8 sounds like 56 = 7 × 8!",
        difficulty: "medium",
      },
      {
        id: "g3mf3",
        question: "9 × 6 = ?",
        type: "multiple-choice",
        options: ["45", "54", "63", "56"],
        correctAnswer: 1,
        hint: "9 times any number: the digits add up to 9!",
        explanation: "9 × 6 = 54. Check: 5 + 4 = 9! This works for all 9s facts.",
        difficulty: "medium",
      },
      {
        id: "g3mf4",
        question: "Any number × 0 = ?",
        type: "multiple-choice",
        options: ["The same number", "1", "0", "10"],
        correctAnswer: 2,
        hint: "Zero groups of anything is...",
        explanation: "Any number × 0 = 0. Zero groups means nothing!",
        difficulty: "easy",
      },
    ],
  },

  // Fractions Introduction
  {
    id: "g3-fractions-intro",
    title: "Understanding Fractions",
    description: "Learn about parts of a whole and fraction notation",
    grade: 3,
    domain: "fractions",
    icon: "🥧",
    estimatedMinutes: 15,
    standards: ["3.NF.A.1"],
    prerequisites: [],
    problems: [
      {
        id: "g3f1",
        question: "A pizza is cut into 4 equal pieces. You eat 1 piece. What fraction did you eat?",
        type: "multiple-choice",
        options: ["1/2", "1/3", "1/4", "1/5"],
        correctAnswer: 2,
        hint: "The bottom number is how many pieces total",
        explanation: "1/4 - You ate 1 piece out of 4 total pieces!",
        difficulty: "easy",
      },
      {
        id: "g3f2",
        question: "Which is bigger: 1/2 or 1/4?",
        type: "multiple-choice",
        options: ["1/2", "1/4", "They're the same"],
        correctAnswer: 0,
        hint: "Imagine cutting a cake into 2 pieces vs 4 pieces",
        explanation: "1/2 is bigger! The smaller the denominator, the bigger each piece.",
        difficulty: "medium",
      },
    ],
  },

  // Area and Perimeter
  {
    id: "g3-area-perimeter",
    title: "Area and Perimeter",
    description: "Calculate area and perimeter of rectangles",
    grade: 3,
    domain: "areaPerimeter",
    icon: "📐",
    estimatedMinutes: 18,
    standards: ["3.MD.C.5", "3.MD.D.8"],
    prerequisites: ["g3-multiplication-facts"],
    problems: [
      {
        id: "g3ap1",
        question: "A rectangle is 4 units long and 3 units wide. What is its perimeter?",
        type: "multiple-choice",
        options: ["12 units", "14 units", "7 units", "24 units"],
        correctAnswer: 1,
        hint: "Perimeter = add all sides",
        explanation: "Perimeter = 4 + 3 + 4 + 3 = 14 units. Add all sides!",
        difficulty: "medium",
      },
      {
        id: "g3ap2",
        question: "A rectangle is 5 units by 4 units. What is its area?",
        type: "multiple-choice",
        options: ["9 square units", "18 square units", "20 square units", "24 square units"],
        correctAnswer: 2,
        hint: "Area = length × width",
        explanation: "Area = 5 × 4 = 20 square units!",
        difficulty: "medium",
      },
    ],
  },

  // ========================================
  // GRADE 4
  // ========================================

  // Multi-Digit Multiplication
  {
    id: "g4-multi-digit-multiplication",
    title: "Multi-Digit Multiplication",
    description: "Multiply multi-digit numbers using strategies",
    grade: 4,
    domain: "multiDigitOps",
    icon: "🔢",
    estimatedMinutes: 20,
    standards: ["4.NBT.B.5"],
    prerequisites: ["g3-multiplication-facts"],
    problems: [
      {
        id: "g4mm1",
        question: "23 × 4 = ?",
        type: "multiple-choice",
        options: ["82", "92", "102", "72"],
        correctAnswer: 1,
        hint: "Break it down: (20 × 4) + (3 × 4)",
        explanation: "23 × 4 = 92. (20 × 4 = 80) + (3 × 4 = 12) = 92",
        difficulty: "medium",
      },
      {
        id: "g4mm2",
        question: "15 × 12 = ?",
        type: "multiple-choice",
        options: ["170", "180", "190", "160"],
        correctAnswer: 1,
        hint: "15 × 12 = 15 × 10 + 15 × 2",
        explanation: "15 × 12 = 180. (15 × 10 = 150) + (15 × 2 = 30) = 180",
        difficulty: "hard",
      },
    ],
  },

  // Fraction Operations
  {
    id: "g4-fraction-operations",
    title: "Adding and Subtracting Fractions",
    description: "Add and subtract fractions with like denominators",
    grade: 4,
    domain: "fractionOps",
    icon: "➗",
    estimatedMinutes: 18,
    standards: ["4.NF.B.3"],
    prerequisites: ["g3-fractions-intro"],
    problems: [
      {
        id: "g4fo1",
        question: "1/4 + 2/4 = ?",
        type: "multiple-choice",
        options: ["3/8", "3/4", "1/2", "2/4"],
        correctAnswer: 1,
        hint: "When denominators are the same, just add numerators",
        explanation: "1/4 + 2/4 = 3/4. Add the tops, keep the bottom!",
        difficulty: "easy",
      },
      {
        id: "g4fo2",
        question: "5/6 - 2/6 = ?",
        type: "multiple-choice",
        options: ["3/6", "3/0", "7/6", "2/6"],
        correctAnswer: 0,
        hint: "Subtract the numerators, keep the denominator",
        explanation: "5/6 - 2/6 = 3/6 (which simplifies to 1/2!)",
        difficulty: "medium",
      },
    ],
  },

  // Decimals
  {
    id: "g4-decimals",
    title: "Understanding Decimals",
    description: "Learn decimal notation and place value",
    grade: 4,
    domain: "decimals",
    icon: "🔵",
    estimatedMinutes: 15,
    standards: ["4.NF.C.6", "4.NF.C.7"],
    prerequisites: ["g4-fraction-operations"],
    problems: [
      {
        id: "g4d1",
        question: "What decimal is the same as 1/2?",
        type: "multiple-choice",
        options: ["0.2", "0.5", "0.25", "0.12"],
        correctAnswer: 1,
        hint: "Half of 1.0 is...",
        explanation: "1/2 = 0.5. One half equals five tenths!",
        difficulty: "medium",
      },
      {
        id: "g4d2",
        question: "Which is bigger: 0.3 or 0.25?",
        type: "multiple-choice",
        options: ["0.3", "0.25", "They're equal"],
        correctAnswer: 0,
        hint: "Think of them as money: 30 cents vs 25 cents",
        explanation: "0.3 (30 cents) is bigger than 0.25 (25 cents)!",
        difficulty: "medium",
      },
    ],
  },

  // Angles
  {
    id: "g4-angles",
    title: "Measuring Angles",
    description: "Identify and measure angles in degrees",
    grade: 4,
    domain: "angles",
    icon: "📐",
    estimatedMinutes: 15,
    standards: ["4.MD.C.5", "4.MD.C.6"],
    prerequisites: ["g1-shapes-2d"],
    problems: [
      {
        id: "g4an1",
        question: "A right angle measures how many degrees?",
        type: "multiple-choice",
        options: ["45°", "90°", "180°", "360°"],
        correctAnswer: 1,
        hint: "It looks like the corner of a square",
        explanation: "A right angle is 90°. It's like the corner of a book!",
        difficulty: "easy",
      },
      {
        id: "g4an2",
        question: "An angle less than 90° is called:",
        type: "multiple-choice",
        options: ["Right angle", "Acute angle", "Obtuse angle", "Straight angle"],
        correctAnswer: 1,
        hint: "Acute means 'sharp' or 'small'",
        explanation: "An acute angle is less than 90°. Think 'a-cute little angle'!",
        difficulty: "medium",
      },
    ],
  },
];

// Helper function to get problems by grade
export function getMathSkillsByGrade(grade: 1 | 2 | 3 | 4): MathSkill[] {
  return mathCurriculum.filter((skill) => skill.grade === grade);
}

// Helper function to get a skill by ID
export function getMathSkillById(id: string): MathSkill | undefined {
  return mathCurriculum.find((skill) => skill.id === id);
}

// Helper to generate a random problem set
export function getRandomMathProblems(
  grade: 1 | 2 | 3 | 4,
  count: number = 5,
  difficulty?: "easy" | "medium" | "hard"
): MathProblem[] {
  const skills = getMathSkillsByGrade(grade);
  const allProblems = skills.flatMap((skill) => skill.problems);
  
  const filtered = difficulty
    ? allProblems.filter((p) => p.difficulty === difficulty)
    : allProblems;
  
  // Shuffle and take count
  return [...filtered]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

