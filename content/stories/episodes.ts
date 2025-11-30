// Story Mode Episodes
// Adventures with Professor Atom, Digit, Luna, and Cosmo

export interface DialogueLine {
  character: "professor" | "digit" | "luna" | "cosmo" | "narrator";
  text: string;
  emotion?: "happy" | "surprised" | "thinking" | "excited" | "worried";
}

export interface StoryProblem {
  question: string;
  options: string[];
  correctAnswer: number;
  successResponse: string;
  hintResponse: string;
}

export interface StoryScene {
  id: string;
  background: string;
  dialogue: DialogueLine[];
  problem?: StoryProblem;
  animation?: string;
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  description: string;
  grade: 1 | 2 | 3 | 4;
  subject: "math" | "science";
  concept: string;
  thumbnail: string;
  estimatedMinutes: number;
  scenes: StoryScene[];
}

export const episodes: Episode[] = [
  // Episode 1: Counting Stars (Grade 1 Math)
  {
    id: "ep-1",
    number: 1,
    title: "The Star Counter",
    description: "Help Luna count the stars in Professor Atom's magical telescope!",
    grade: 1,
    subject: "math",
    concept: "Counting to 20",
    thumbnail: "⭐",
    estimatedMinutes: 8,
    scenes: [
      {
        id: "s1",
        background: "observatory",
        dialogue: [
          { character: "narrator", text: "It was a clear night at Professor Atom's observatory..." },
          { character: "luna", text: "Wow, Professor! Look at all those stars!", emotion: "excited" },
          { character: "professor", text: "Indeed, Luna! Tonight is perfect for star counting. Want to help me?", emotion: "happy" },
          { character: "digit", text: "BEEP BOOP! I love counting! Numbers are my favorite!", emotion: "excited" },
          { character: "cosmo", text: "Woof! Woof!", emotion: "happy" },
        ],
      },
      {
        id: "s2",
        background: "telescope-view",
        dialogue: [
          { character: "professor", text: "Look through the telescope, Luna. Can you count the stars in that group?" },
          { character: "luna", text: "Let me see... 1, 2, 3...", emotion: "thinking" },
        ],
        problem: {
          question: "How many stars can you count? ⭐⭐⭐⭐⭐⭐⭐",
          options: ["5", "6", "7", "8"],
          correctAnswer: 2,
          successResponse: "That's right! 7 stars! You're a natural star counter!",
          hintResponse: "Try counting each star one by one, pointing as you go!",
        },
      },
      {
        id: "s3",
        background: "telescope-view",
        dialogue: [
          { character: "digit", text: "EXCELLENT! Now here's another group!", emotion: "excited" },
        ],
        problem: {
          question: "Count these stars: ⭐⭐⭐⭐⭐ ⭐⭐⭐⭐⭐ ⭐⭐",
          options: ["10", "11", "12", "13"],
          correctAnswer: 2,
          successResponse: "12 stars! You counted perfectly!",
          hintResponse: "Count the first group of 5, then the next 5, then the last ones!",
        },
      },
      {
        id: "s4",
        background: "observatory",
        dialogue: [
          { character: "professor", text: "Wonderful work! You've helped us catalog 19 stars tonight!", emotion: "happy" },
          { character: "luna", text: "That was so much fun! Can we do more tomorrow?", emotion: "excited" },
          { character: "digit", text: "BEEP! I recorded all the numbers. 19 stars! Amazing!", emotion: "happy" },
          { character: "narrator", text: "And so, Luna learned that counting stars is just like counting anything else - one by one!" },
        ],
      },
    ],
  },

  // Episode 2: The Growing Garden (Grade 1 Science)
  {
    id: "ep-2",
    number: 2,
    title: "The Growing Garden",
    description: "Learn what plants need to grow in Professor Atom's magical garden!",
    grade: 1,
    subject: "science",
    concept: "What plants need",
    thumbnail: "🌱",
    estimatedMinutes: 8,
    scenes: [
      {
        id: "s1",
        background: "garden",
        dialogue: [
          { character: "narrator", text: "In Professor Atom's garden, something was wrong..." },
          { character: "luna", text: "Professor, why are these plants looking so sad?", emotion: "worried" },
          { character: "professor", text: "Hmm, let's be plant detectives! Plants need certain things to be healthy.", emotion: "thinking" },
        ],
      },
      {
        id: "s2",
        background: "garden",
        dialogue: [
          { character: "digit", text: "My sensors detect a problem! These plants are missing something!", emotion: "surprised" },
        ],
        problem: {
          question: "What do plants need from the soil?",
          options: ["Air", "Water", "Music", "Darkness"],
          correctAnswer: 1,
          successResponse: "Yes! Plants need water from the soil. Their roots drink it up!",
          hintResponse: "Think about what comes out when you water plants!",
        },
      },
      {
        id: "s3",
        background: "garden-sunny",
        dialogue: [
          { character: "professor", text: "Good! But plants need more than just water!", emotion: "happy" },
        ],
        problem: {
          question: "What do leaves use to make food for the plant?",
          options: ["Moonlight", "Sunlight", "Starlight", "Lamplight"],
          correctAnswer: 1,
          successResponse: "Correct! Sunlight helps leaves make food for the plant!",
          hintResponse: "Plants love the daytime when the sun is shining!",
        },
      },
      {
        id: "s4",
        background: "garden-healthy",
        dialogue: [
          { character: "luna", text: "Look! After water and sunshine, the plants are happy again!", emotion: "excited" },
          { character: "cosmo", text: "Woof!", emotion: "happy" },
          { character: "professor", text: "Remember: Water, sunlight, and air - that's what every plant needs!", emotion: "happy" },
        ],
      },
    ],
  },

  // Episode 3: The Cookie Problem (Grade 2 Math)
  {
    id: "ep-3",
    number: 3,
    title: "The Cookie Problem",
    description: "Help Digit solve addition problems at the bakery!",
    grade: 2,
    subject: "math",
    concept: "Addition strategies",
    thumbnail: "🍪",
    estimatedMinutes: 10,
    scenes: [
      {
        id: "s1",
        background: "bakery",
        dialogue: [
          { character: "narrator", text: "At the BrainBlast Bakery, Digit was helping count cookies..." },
          { character: "digit", text: "BEEP! The baker needs help! Too many cookies to count!", emotion: "worried" },
          { character: "luna", text: "Don't worry, Digit! We can add them up together!", emotion: "happy" },
        ],
      },
      {
        id: "s2",
        background: "bakery",
        dialogue: [
          { character: "professor", text: "There are 23 chocolate cookies and 14 vanilla cookies. How many total?" },
        ],
        problem: {
          question: "23 + 14 = ?",
          options: ["35", "36", "37", "38"],
          correctAnswer: 2,
          successResponse: "37 cookies! You added the ones (3+4=7) and tens (20+10=30)!",
          hintResponse: "Add the ones place first (3+4), then the tens place (2+1)!",
        },
      },
      {
        id: "s3",
        background: "bakery",
        dialogue: [
          { character: "digit", text: "More cookies coming! This batch is trickier!", emotion: "thinking" },
        ],
        problem: {
          question: "45 + 28 = ?",
          options: ["63", "73", "83", "72"],
          correctAnswer: 1,
          successResponse: "73 cookies! When 5+8=13, we write 3 and carry the 1!",
          hintResponse: "5+8=13, so write 3 in ones place and add 1 to the tens!",
        },
      },
      {
        id: "s4",
        background: "bakery",
        dialogue: [
          { character: "digit", text: "BEEP BOOP! All cookies counted! The bakery is saved!", emotion: "excited" },
          { character: "luna", text: "Adding is so useful! We can count anything!", emotion: "happy" },
          { character: "cosmo", text: "Woof! *tries to eat a cookie*", emotion: "happy" },
        ],
      },
    ],
  },

  // Episode 4: Animal Homes (Grade 2 Science)
  {
    id: "ep-4",
    number: 4,
    title: "Animal Homes",
    description: "Explore different habitats with the BrainBlast crew!",
    grade: 2,
    subject: "science",
    concept: "Animal habitats",
    thumbnail: "🏠",
    estimatedMinutes: 10,
    scenes: [
      {
        id: "s1",
        background: "nature",
        dialogue: [
          { character: "narrator", text: "The BrainBlast crew was on a nature adventure!" },
          { character: "professor", text: "Today we'll learn about habitats - the places where animals live!", emotion: "excited" },
          { character: "luna", text: "Like how birds live in nests?", emotion: "thinking" },
          { character: "professor", text: "Exactly! Every animal has a perfect home!", emotion: "happy" },
        ],
      },
      {
        id: "s2",
        background: "arctic",
        dialogue: [
          { character: "digit", text: "BRRR! My circuits are freezing! Why do polar bears live here?", emotion: "surprised" },
        ],
        problem: {
          question: "Why can polar bears survive in the cold Arctic?",
          options: ["They don't feel cold", "Thick fur keeps them warm", "They wear coats", "They have heaters"],
          correctAnswer: 1,
          successResponse: "Right! Polar bears have thick fur and fat to stay warm!",
          hintResponse: "Think about what polar bears have that keeps them cozy!",
        },
      },
      {
        id: "s3",
        background: "desert",
        dialogue: [
          { character: "luna", text: "Now it's SO hot! How do animals live in the desert?", emotion: "surprised" },
        ],
        problem: {
          question: "How do desert animals find water?",
          options: ["They don't need water", "From the food they eat", "From rain every day", "From ice"],
          correctAnswer: 1,
          successResponse: "Many desert animals get water from the food they eat!",
          hintResponse: "Think about juicy plants and prey that contain water!",
        },
      },
      {
        id: "s4",
        background: "nature",
        dialogue: [
          { character: "professor", text: "Every habitat has special features that help animals survive!", emotion: "happy" },
          { character: "cosmo", text: "*happy panting* Woof!", emotion: "happy" },
          { character: "luna", text: "Animals are amazing at adapting to their homes!", emotion: "excited" },
        ],
      },
    ],
  },

  // Episode 5: The Multiplication Machine (Grade 3 Math)
  {
    id: "ep-5",
    number: 5,
    title: "The Multiplication Machine",
    description: "Digit builds a machine that multiplies everything!",
    grade: 3,
    subject: "math",
    concept: "Introduction to multiplication",
    thumbnail: "✖️",
    estimatedMinutes: 10,
    scenes: [
      {
        id: "s1",
        background: "lab",
        dialogue: [
          { character: "narrator", text: "In Professor Atom's lab, Digit had a new invention..." },
          { character: "digit", text: "BEHOLD! My Multiplication Machine! It makes groups of things!", emotion: "excited" },
          { character: "luna", text: "Multiplication? What's that?", emotion: "thinking" },
          { character: "professor", text: "It's a faster way to add equal groups! Let me show you!", emotion: "happy" },
        ],
      },
      {
        id: "s2",
        background: "lab",
        dialogue: [
          { character: "professor", text: "If I have 3 bags with 4 apples each, how many apples total?" },
          { character: "digit", text: "That's 3 × 4! Three groups of four!", emotion: "excited" },
        ],
        problem: {
          question: "3 × 4 = ?",
          options: ["7", "10", "12", "14"],
          correctAnswer: 2,
          successResponse: "12 apples! 3 groups of 4 = 4 + 4 + 4 = 12!",
          hintResponse: "Count: 4... 8... how many when you add one more group of 4?",
        },
      },
      {
        id: "s3",
        background: "lab",
        dialogue: [
          { character: "digit", text: "The machine wants more! Try 5 × 5!", emotion: "excited" },
        ],
        problem: {
          question: "5 × 5 = ?",
          options: ["10", "20", "25", "30"],
          correctAnswer: 2,
          successResponse: "25! That's called a square number because 5 × 5 makes a square!",
          hintResponse: "Count by 5s: 5, 10, 15, 20...?",
        },
      },
      {
        id: "s4",
        background: "lab",
        dialogue: [
          { character: "luna", text: "Wow! Multiplication IS like a super-fast way to add!", emotion: "excited" },
          { character: "digit", text: "BEEP! My favorite operation! Equal groups are the best!", emotion: "happy" },
          { character: "professor", text: "Now you know the secret - multiplication is repeated addition!", emotion: "happy" },
        ],
      },
    ],
  },

  // Episode 6: Push and Pull (Grade 3 Science)
  {
    id: "ep-6",
    number: 6,
    title: "The Force Field",
    description: "Learn about forces when Professor Atom's lab goes haywire!",
    grade: 3,
    subject: "science",
    concept: "Forces and motion",
    thumbnail: "🚀",
    estimatedMinutes: 10,
    scenes: [
      {
        id: "s1",
        background: "lab-messy",
        dialogue: [
          { character: "narrator", text: "Things were floating everywhere in Professor Atom's lab!" },
          { character: "professor", text: "Oh dear! My gravity machine is malfunctioning!", emotion: "worried" },
          { character: "luna", text: "Everything is floating! How do we get things back down?", emotion: "surprised" },
          { character: "digit", text: "We need to understand FORCES to fix this!", emotion: "thinking" },
        ],
      },
      {
        id: "s2",
        background: "lab-messy",
        dialogue: [
          { character: "professor", text: "Quick quiz! What force normally keeps things on the ground?" },
        ],
        problem: {
          question: "What force pulls objects toward Earth?",
          options: ["Magnetism", "Friction", "Gravity", "Wind"],
          correctAnswer: 2,
          successResponse: "Gravity! It pulls everything toward Earth's center!",
          hintResponse: "This force is why things fall DOWN, not up!",
        },
      },
      {
        id: "s3",
        background: "lab",
        dialogue: [
          { character: "digit", text: "I'm pushing the button but nothing happens!", emotion: "worried" },
        ],
        problem: {
          question: "A push or pull on an object is called a:",
          options: ["Force", "Speed", "Motion", "Energy"],
          correctAnswer: 0,
          successResponse: "Yes! Pushes and pulls are forces!",
          hintResponse: "When you push or pull something, what are you applying?",
        },
      },
      {
        id: "s4",
        background: "lab",
        dialogue: [
          { character: "professor", text: "The machine is fixed! Gravity is back!", emotion: "happy" },
          { character: "cosmo", text: "*lands on floor* Woof!", emotion: "happy" },
          { character: "luna", text: "Forces are everywhere - pushes, pulls, and gravity!", emotion: "excited" },
        ],
      },
    ],
  },

  // Additional episodes 7-10...
  {
    id: "ep-7",
    number: 7,
    title: "The Fraction Feast",
    description: "Share pizza fairly using fractions!",
    grade: 3,
    subject: "math",
    concept: "Understanding fractions",
    thumbnail: "🍕",
    estimatedMinutes: 10,
    scenes: [
      {
        id: "s1",
        background: "kitchen",
        dialogue: [
          { character: "narrator", text: "It was pizza night at the BrainBlast headquarters!" },
          { character: "luna", text: "Yum! But how do we share one pizza with all of us?", emotion: "thinking" },
          { character: "professor", text: "We'll use FRACTIONS to share fairly!", emotion: "happy" },
        ],
      },
      {
        id: "s2",
        background: "kitchen",
        problem: {
          question: "If we cut the pizza into 4 equal pieces and you take 1, what fraction do you have?",
          options: ["1/2", "1/3", "1/4", "1/5"],
          correctAnswer: 2,
          successResponse: "1/4! One piece out of four equal pieces!",
          hintResponse: "The bottom number is how many total pieces, the top is how many you have!",
        },
      },
      {
        id: "s3",
        background: "kitchen",
        dialogue: [
          { character: "digit", text: "If Luna eats 1/4 and I eat 1/4, how much did we eat together?", emotion: "thinking" },
        ],
        problem: {
          question: "1/4 + 1/4 = ?",
          options: ["1/2", "2/8", "1/4", "2/4"],
          correctAnswer: 3,
          successResponse: "2/4, which also equals 1/2! Half the pizza!",
          hintResponse: "Add the numerators (tops), keep the denominator (bottom)!",
        },
      },
      {
        id: "s4",
        background: "kitchen",
        dialogue: [
          { character: "professor", text: "Fractions help us share things equally!", emotion: "happy" },
          { character: "cosmo", text: "*begs for pizza* Woof!", emotion: "happy" },
          { character: "luna", text: "Here's 1/4 for you too, Cosmo!", emotion: "happy" },
        ],
      },
    ],
  },

  {
    id: "ep-8",
    number: 8,
    title: "The Energy Transfer",
    description: "Discover how energy moves and changes forms!",
    grade: 4,
    subject: "science",
    concept: "Energy transfer",
    thumbnail: "⚡",
    estimatedMinutes: 10,
    scenes: [
      {
        id: "s1",
        background: "playground",
        dialogue: [
          { character: "narrator", text: "At the BrainBlast playground, energy was everywhere!" },
          { character: "luna", text: "Professor, when I'm at the top of the slide, I feel like I have so much energy!", emotion: "excited" },
          { character: "professor", text: "That's because you DO! It's called potential energy!", emotion: "happy" },
        ],
      },
      {
        id: "s2",
        background: "playground",
        problem: {
          question: "When Luna is at the TOP of the slide, what kind of energy does she have?",
          options: ["Sound energy", "Kinetic energy", "Potential energy", "Light energy"],
          correctAnswer: 2,
          successResponse: "Potential energy - stored energy waiting to be released!",
          hintResponse: "This type of energy is STORED because of her position!",
        },
      },
      {
        id: "s3",
        background: "playground",
        dialogue: [
          { character: "digit", text: "WHEEE! Now she's sliding down!", emotion: "excited" },
        ],
        problem: {
          question: "When Luna slides DOWN, her potential energy changes to:",
          options: ["Sound energy", "Kinetic energy", "Light energy", "Heat energy"],
          correctAnswer: 1,
          successResponse: "Kinetic energy - the energy of motion!",
          hintResponse: "Kinetic means moving! What kind of energy does moving have?",
        },
      },
      {
        id: "s4",
        background: "playground",
        dialogue: [
          { character: "professor", text: "Energy can change forms but never disappears!", emotion: "happy" },
          { character: "luna", text: "So when I slide, stored energy becomes motion energy!", emotion: "excited" },
          { character: "digit", text: "BEEP! Energy transformations are everywhere!", emotion: "happy" },
        ],
      },
    ],
  },

  {
    id: "ep-9",
    number: 9,
    title: "The Big Multiplication",
    description: "Tackle bigger numbers with Digit's super calculator!",
    grade: 4,
    subject: "math",
    concept: "Multi-digit multiplication",
    thumbnail: "🔢",
    estimatedMinutes: 12,
    scenes: [
      {
        id: "s1",
        background: "lab",
        dialogue: [
          { character: "narrator", text: "Digit was building the biggest calculator ever!" },
          { character: "digit", text: "This calculator can multiply HUGE numbers!", emotion: "excited" },
          { character: "luna", text: "Can we try some big multiplications?", emotion: "excited" },
          { character: "professor", text: "Let's break them into smaller parts!", emotion: "happy" },
        ],
      },
      {
        id: "s2",
        background: "lab",
        problem: {
          question: "Let's solve 23 × 4. What is 20 × 4?",
          options: ["60", "70", "80", "90"],
          correctAnswer: 2,
          successResponse: "80! Now add 3 × 4 = 12, so 23 × 4 = 92!",
          hintResponse: "Break 23 into 20 and 3, then multiply each by 4!",
        },
      },
      {
        id: "s3",
        background: "lab",
        dialogue: [
          { character: "digit", text: "Now an even bigger one!", emotion: "excited" },
        ],
        problem: {
          question: "15 × 12 = ?",
          options: ["170", "180", "190", "160"],
          correctAnswer: 1,
          successResponse: "180! You can do 15×10=150, plus 15×2=30!",
          hintResponse: "Break 12 into 10 and 2, then add the results!",
        },
      },
      {
        id: "s4",
        background: "lab",
        dialogue: [
          { character: "professor", text: "Breaking numbers apart makes multiplication easier!", emotion: "happy" },
          { character: "luna", text: "Big numbers aren't so scary when you break them down!", emotion: "excited" },
          { character: "digit", text: "BEEP BOOP! My calculator approves this strategy!", emotion: "happy" },
        ],
      },
    ],
  },

  {
    id: "ep-10",
    number: 10,
    title: "Circuit City",
    description: "Build circuits to light up the BrainBlast headquarters!",
    grade: 4,
    subject: "science",
    concept: "Simple circuits",
    thumbnail: "💡",
    estimatedMinutes: 12,
    scenes: [
      {
        id: "s1",
        background: "lab-dark",
        dialogue: [
          { character: "narrator", text: "The power went out at BrainBlast headquarters!" },
          { character: "professor", text: "Oh no! We need to build circuits to restore power!", emotion: "worried" },
          { character: "digit", text: "I know about circuits! We need a complete path for electricity!", emotion: "excited" },
        ],
      },
      {
        id: "s2",
        background: "lab-dark",
        problem: {
          question: "For electricity to flow, a circuit must be:",
          options: ["Open (broken)", "Closed (complete)", "Empty", "Backwards"],
          correctAnswer: 1,
          successResponse: "Closed! Electricity needs a complete path with no gaps!",
          hintResponse: "Think of a circle - does it have any breaks?",
        },
      },
      {
        id: "s3",
        background: "lab-dark",
        dialogue: [
          { character: "luna", text: "Should I use this wire or this rubber band?", emotion: "thinking" },
        ],
        problem: {
          question: "Which material conducts electricity?",
          options: ["Rubber", "Plastic", "Copper wire", "Wood"],
          correctAnswer: 2,
          successResponse: "Copper wire! Metals conduct electricity well!",
          hintResponse: "Metals are good conductors. Which option is a metal?",
        },
      },
      {
        id: "s4",
        background: "lab",
        dialogue: [
          { character: "digit", text: "LIGHTS ON! The circuit is complete!", emotion: "excited" },
          { character: "luna", text: "We did it! Electricity flows in a closed loop!", emotion: "happy" },
          { character: "professor", text: "Now you understand the basics of electricity!", emotion: "happy" },
          { character: "cosmo", text: "*happy barking in the light*", emotion: "happy" },
        ],
      },
    ],
  },
];

export function getEpisodeById(id: string): Episode | undefined {
  return episodes.find((ep) => ep.id === id);
}

export function getEpisodesByGrade(grade: 1 | 2 | 3 | 4): Episode[] {
  return episodes.filter((ep) => ep.grade === grade);
}

export function getEpisodesBySubject(subject: "math" | "science"): Episode[] {
  return episodes.filter((ep) => ep.subject === subject);
}

