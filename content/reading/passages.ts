// Reading Passages for Grades 1-4
// Includes Science Stories, Math Mysteries, Biographies, and How It Works articles

export interface ComprehensionQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ReadingPassage {
  id: string;
  title: string;
  description: string;
  category: "science-story" | "math-mystery" | "biography" | "how-it-works";
  subject: "math" | "science";
  grade: 1 | 2 | 3 | 4;
  readingLevel: number;
  estimatedMinutes: number;
  content: string;
  vocabulary: { word: string; definition: string }[];
  questions: ComprehensionQuestion[];
  thumbnail: string;
  isNew?: boolean;
  comingSoon?: boolean;
}

export const readingPassages: ReadingPassage[] = [
  // ============ COMPLETE PASSAGES (First 3) ============
  
  // Grade 1 Science Story - COMPLETE
  {
    id: "busy-bees-day",
    title: "The Busy Bee's Day",
    description: "Spend a day with a honeybee and learn how they help flowers.",
    category: "science-story",
    subject: "science",
    grade: 1,
    readingLevel: 320,
    estimatedMinutes: 4,
    thumbnail: "🐝",
    content: `
Buzz! Buzz! My name is Bella the Bee.

I wake up early in my hive. The hive is my home. I live here with thousands of other bees!

Today is a sunny day. That means it's time to find flowers!

I fly out of the hive. My wings beat very fast. Buzz! Buzz!

I see a big yellow flower. I land on it gently. Yum! The flower has sweet nectar inside.

I drink the nectar with my long tongue. It tastes like honey!

While I drink, something sticky gets on my legs. It's called pollen. Pollen looks like yellow dust.

I fly to another flower. Some pollen falls off my legs. This helps the flower make seeds!

This is called pollination. Bees help flowers grow more flowers. Flowers help bees make honey.

We help each other! That makes me happy.

Buzz! Buzz! Time to go home and share my nectar with the hive.

The End.
    `.trim(),
    vocabulary: [
      { word: "hive", definition: "A home where bees live together" },
      { word: "nectar", definition: "Sweet liquid inside flowers that bees drink" },
      { word: "pollen", definition: "Yellow powder that helps flowers make seeds" },
      { word: "pollination", definition: "When pollen moves from flower to flower" },
    ],
    questions: [
      {
        id: "q1",
        question: "Where does Bella the Bee live?",
        options: ["In a tree", "In a hive", "In a flower", "In the ground"],
        correctAnswer: 1,
        explanation: "Bella lives in a hive with thousands of other bees.",
      },
      {
        id: "q2",
        question: "What does Bella drink from flowers?",
        options: ["Water", "Milk", "Nectar", "Juice"],
        correctAnswer: 2,
        explanation: "Bella drinks sweet nectar from inside the flowers.",
      },
      {
        id: "q3",
        question: "How do bees help flowers?",
        options: ["They water them", "They move pollen", "They plant seeds", "They give them shade"],
        correctAnswer: 1,
        explanation: "Bees carry pollen from flower to flower, helping flowers make seeds.",
      },
    ],
  },

  // Grade 2 Science Story - COMPLETE
  {
    id: "amazing-water-cycle",
    title: "The Amazing Water Cycle",
    description: "Follow a water droplet on its journey through clouds and rain.",
    category: "science-story",
    subject: "science",
    grade: 2,
    readingLevel: 480,
    estimatedMinutes: 5,
    thumbnail: "💧",
    content: `
Hi! I'm Drip the water droplet. Let me tell you about my amazing journey!

Right now, I'm floating in the ocean. The sun is shining down, and I feel warm. So warm that I start to float up into the air! This is called evaporation.

I rise higher and higher. It gets colder up here. I meet other water droplets like me. We stick together and form a cloud!

Inside the cloud, we bump into more and more droplets. We get bigger and bigger. Soon, we're too heavy to float!

Down we go! This is called precipitation. Some people call it rain.

I fall onto a mountain. It's so cold up here that I turn into snow! I rest on the mountain for a while.

When spring comes, I melt and flow into a river. The river carries me all the way back to the ocean.

And then the sun shines again, and I start to rise up... The water cycle never ends!

Where will I go next?

The End.
    `.trim(),
    vocabulary: [
      { word: "evaporation", definition: "When water turns into vapor and rises into the air" },
      { word: "precipitation", definition: "Water falling from clouds as rain, snow, or hail" },
      { word: "water cycle", definition: "The journey of water from Earth to sky and back again" },
      { word: "vapor", definition: "Water in the form of a gas that you cannot see" },
    ],
    questions: [
      {
        id: "q1",
        question: "What happens when the sun warms the water?",
        options: ["It freezes", "It evaporates", "It gets darker", "It sinks"],
        correctAnswer: 1,
        explanation: "When the sun warms water, it evaporates and rises into the air.",
      },
      {
        id: "q2",
        question: "What is precipitation?",
        options: ["Clouds forming", "Water rising", "Rain or snow falling", "The sun shining"],
        correctAnswer: 2,
        explanation: "Precipitation is water falling from clouds as rain, snow, sleet, or hail.",
      },
      {
        id: "q3",
        question: "Does the water cycle ever end?",
        options: ["Yes, after rain", "Yes, in winter", "No, it keeps going", "Yes, at night"],
        correctAnswer: 2,
        explanation: "The water cycle never ends - water keeps evaporating and falling again!",
      },
    ],
  },

  // Grade 2 Math Mystery - COMPLETE
  {
    id: "missing-cookies",
    title: "The Case of the Missing Cookies",
    description: "Detective Dana uses math to solve a delicious mystery!",
    category: "math-mystery",
    subject: "math",
    grade: 2,
    readingLevel: 450,
    estimatedMinutes: 6,
    thumbnail: "🍪",
    content: `
Detective Dana got a call from Baker Bob. "Help! My cookies are missing!"

Dana hurried to the bakery. Baker Bob looked worried.

"I baked 24 cookies this morning," said Bob. "But now I only have 16! Someone took some cookies!"

Dana took out her notebook. "Let me do some math. You had 24 cookies. Now you have 16. That means..."

She wrote: 24 - 16 = 8

"Eight cookies are missing!" said Dana.

Dana looked around the bakery. She saw three small sets of cookie crumbs. Each trail had the same number of crumbs.

"Hmm," said Dana. "If 3 people took the same number of cookies, how many did each person take?"

She wrote: 8 ÷ 3 = ?

"Wait, 8 doesn't divide evenly by 3. Let me look again..."

She found another trail! Four trails total!

8 ÷ 4 = 2

"Four cookie thieves took 2 cookies each!" Dana announced.

She followed the crumb trails... right to four hungry mice in the corner!

"Mystery solved!" laughed Dana. "You need a cat, not a detective!"

Baker Bob smiled. "Thanks, Dana! And here are 2 cookies for you!"

The End.
    `.trim(),
    vocabulary: [
      { word: "detective", definition: "Someone who solves mysteries and finds answers" },
      { word: "subtract", definition: "To take away one number from another" },
      { word: "divide", definition: "To split into equal groups" },
    ],
    questions: [
      {
        id: "q1",
        question: "How many cookies were missing?",
        options: ["16", "24", "8", "4"],
        correctAnswer: 2,
        explanation: "24 - 16 = 8 cookies were missing.",
      },
      {
        id: "q2",
        question: "How many cookies did each mouse take?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 1,
        explanation: "8 cookies ÷ 4 mice = 2 cookies each.",
      },
      {
        id: "q3",
        question: "What math operation helped solve the mystery?",
        options: ["Addition", "Multiplication", "Division", "Counting"],
        correctAnswer: 2,
        explanation: "Dana used division to figure out how many cookies each mouse took.",
      },
    ],
  },

  // ============ COMING SOON PASSAGES ============
  
  // Grade 3 Biography - Coming Soon
  {
    id: "mae-jemison",
    title: "Mae Jemison: Space Explorer",
    description: "Meet the first African American woman in space!",
    category: "biography",
    subject: "science",
    grade: 3,
    readingLevel: 620,
    estimatedMinutes: 6,
    thumbnail: "👩‍🚀",
    comingSoon: true,
    content: "",
    vocabulary: [],
    questions: [],
  },

  // Grade 3 How It Works - Coming Soon
  {
    id: "how-rainbows-form",
    title: "How Rainbows Form",
    description: "Sunlight + raindrops = colorful magic! Learn the science.",
    category: "how-it-works",
    subject: "science",
    grade: 3,
    readingLevel: 600,
    estimatedMinutes: 5,
    thumbnail: "🌈",
    comingSoon: true,
    content: "",
    vocabulary: [],
    questions: [],
  },

  // Grade 3 Science Story - Coming Soon
  {
    id: "leaves-change-color",
    title: "Why Leaves Change Color",
    description: "Discover the magic of fall colors and learn about chlorophyll!",
    category: "science-story",
    subject: "science",
    grade: 3,
    readingLevel: 650,
    estimatedMinutes: 5,
    thumbnail: "🍂",
    comingSoon: true,
    content: "",
    vocabulary: [],
    questions: [],
  },

  // Grade 4 Science Story - Coming Soon
  {
    id: "life-on-moon",
    title: "Life on the Moon?",
    description: "Could anything live on the moon? Let's explore!",
    category: "science-story",
    subject: "science",
    grade: 4,
    readingLevel: 780,
    estimatedMinutes: 7,
    thumbnail: "🌙",
    isNew: true,
    comingSoon: true,
    content: "",
    vocabulary: [],
    questions: [],
  },

  // Grade 2 Math Mystery - Coming Soon
  {
    id: "time-machine-mixup",
    title: "The Time Machine Mix-Up",
    description: "Help Professor Clock fix the broken time machine using time!",
    category: "math-mystery",
    subject: "math",
    grade: 2,
    readingLevel: 480,
    estimatedMinutes: 5,
    thumbnail: "⏰",
    isNew: true,
    comingSoon: true,
    content: "",
    vocabulary: [],
    questions: [],
  },

  // Grade 4 Math Mystery - Coming Soon
  {
    id: "treasure-map-mystery",
    title: "The Treasure Map Mystery",
    description: "Use coordinates and shapes to find the hidden treasure!",
    category: "math-mystery",
    subject: "math",
    grade: 4,
    readingLevel: 720,
    estimatedMinutes: 8,
    thumbnail: "🗺️",
    comingSoon: true,
    content: "",
    vocabulary: [],
    questions: [],
  },

  // Grade 4 Biography - Coming Soon
  {
    id: "katherine-johnson",
    title: "Katherine Johnson: Math Genius",
    description: "Learn about the mathematician who helped send rockets to space.",
    category: "biography",
    subject: "math",
    grade: 4,
    readingLevel: 750,
    estimatedMinutes: 7,
    thumbnail: "🧮",
    comingSoon: true,
    content: "",
    vocabulary: [],
    questions: [],
  },

  // Grade 2 Biography - Coming Soon
  {
    id: "jane-goodall",
    title: "Jane Goodall: Friend of Chimps",
    description: "Discover how Jane Goodall became friends with chimpanzees.",
    category: "biography",
    subject: "science",
    grade: 2,
    readingLevel: 500,
    estimatedMinutes: 5,
    thumbnail: "🐵",
    comingSoon: true,
    content: "",
    vocabulary: [],
    questions: [],
  },

  // Grade 4 How It Works - Coming Soon
  {
    id: "how-calculators-think",
    title: "How Calculators Think",
    description: "Inside the mind of a calculator - it's all about numbers!",
    category: "how-it-works",
    subject: "math",
    grade: 4,
    readingLevel: 780,
    estimatedMinutes: 6,
    thumbnail: "🔢",
    comingSoon: true,
    content: "",
    vocabulary: [],
    questions: [],
  },
];

// Helper functions
export function getPassageById(id: string): ReadingPassage | undefined {
  return readingPassages.find((p) => p.id === id);
}

export function getPassagesByGrade(grade: 1 | 2 | 3 | 4): ReadingPassage[] {
  return readingPassages.filter((p) => p.grade === grade);
}

export function getPassagesByCategory(category: ReadingPassage["category"]): ReadingPassage[] {
  return readingPassages.filter((p) => p.category === category);
}

export function getAvailablePassages(): ReadingPassage[] {
  return readingPassages.filter((p) => !p.comingSoon);
}

export function getComingSoonPassages(): ReadingPassage[] {
  return readingPassages.filter((p) => p.comingSoon);
}
