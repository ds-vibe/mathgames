// Science Curriculum for Grades 1-4
// Aligned with Next Generation Science Standards (NGSS)

export interface ScienceProblem {
  id: string;
  question: string;
  type: "multiple-choice" | "true-false" | "matching" | "ordering";
  options?: string[];
  correctAnswer: number | string | boolean;
  hint: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  visual?: string;
}

export interface ScienceSkill {
  id: string;
  title: string;
  description: string;
  grade: 1 | 2 | 3 | 4;
  domain: string;
  icon: string;
  estimatedMinutes: number;
  standards: string[];
  prerequisites: string[];
  vocabulary: { term: string; definition: string }[];
  problems: ScienceProblem[];
}

export const scienceCurriculum: ScienceSkill[] = [
  // ========================================
  // GRADE 1
  // ========================================

  // Plants
  {
    id: "g1-plants",
    title: "Parts of a Plant",
    description: "Learn about the different parts of plants and what they do",
    grade: 1,
    domain: "plants",
    icon: "🌱",
    estimatedMinutes: 10,
    standards: ["1-LS1-1"],
    prerequisites: [],
    vocabulary: [
      { term: "roots", definition: "The part of a plant that grows underground and absorbs water" },
      { term: "stem", definition: "The part that holds up the plant and carries water to the leaves" },
      { term: "leaves", definition: "The parts that make food for the plant using sunlight" },
      { term: "flower", definition: "The colorful part that makes seeds" },
    ],
    problems: [
      {
        id: "g1p1",
        question: "Which part of the plant absorbs water from the soil?",
        type: "multiple-choice",
        options: ["Leaves", "Stem", "Roots", "Flower"],
        correctAnswer: 2,
        hint: "This part grows underground",
        explanation: "Roots absorb water and nutrients from the soil. They grow underground!",
        difficulty: "easy",
      },
      {
        id: "g1p2",
        question: "What do leaves do for a plant?",
        type: "multiple-choice",
        options: ["Absorb water", "Make food using sunlight", "Produce seeds", "Hold up the plant"],
        correctAnswer: 1,
        hint: "Leaves are like tiny food factories",
        explanation: "Leaves make food for the plant using sunlight, water, and air. This is called photosynthesis!",
        difficulty: "medium",
      },
      {
        id: "g1p3",
        question: "What do all plants need to grow? (Pick the best answer)",
        type: "multiple-choice",
        options: ["Only water", "Only sunlight", "Water, sunlight, and air", "Just soil"],
        correctAnswer: 2,
        hint: "Plants need more than one thing",
        explanation: "Plants need water, sunlight, and air (carbon dioxide) to grow healthy and strong!",
        difficulty: "medium",
      },
    ],
  },

  // Animals
  {
    id: "g1-animals",
    title: "Animal Babies",
    description: "Learn how animals care for their young",
    grade: 1,
    domain: "animals",
    icon: "🐣",
    estimatedMinutes: 12,
    standards: ["1-LS1-2"],
    prerequisites: [],
    vocabulary: [
      { term: "offspring", definition: "Baby animals" },
      { term: "mammal", definition: "An animal that feeds its babies milk" },
      { term: "hatch", definition: "When a baby animal comes out of an egg" },
    ],
    problems: [
      {
        id: "g1an1",
        question: "How do mother cats feed their kittens?",
        type: "multiple-choice",
        options: ["They bring them worms", "They give them milk", "Kittens find their own food", "They chew food for them"],
        correctAnswer: 1,
        hint: "Cats are mammals",
        explanation: "Mother cats feed their kittens milk. All mammals feed their babies milk!",
        difficulty: "easy",
      },
      {
        id: "g1an2",
        question: "Which baby animal hatches from an egg?",
        type: "multiple-choice",
        options: ["Puppy", "Kitten", "Chick", "Calf"],
        correctAnswer: 2,
        hint: "Think about what lives in a nest",
        explanation: "Chicks hatch from eggs! Birds, reptiles, and fish all hatch from eggs.",
        difficulty: "easy",
      },
      {
        id: "g1an3",
        question: "True or False: All baby animals look exactly like their parents.",
        type: "true-false",
        correctAnswer: false,
        hint: "Think about caterpillars and butterflies",
        explanation: "False! Some babies look different from parents. Caterpillars don't look like butterflies!",
        difficulty: "medium",
      },
    ],
  },

  // Light and Sound
  {
    id: "g1-light-sound",
    title: "Light and Sound",
    description: "Explore how we see light and hear sounds",
    grade: 1,
    domain: "lightSound",
    icon: "🔊",
    estimatedMinutes: 10,
    standards: ["1-PS4-1", "1-PS4-2"],
    prerequisites: [],
    vocabulary: [
      { term: "vibration", definition: "A quick back-and-forth movement" },
      { term: "light source", definition: "Something that makes its own light" },
    ],
    problems: [
      {
        id: "g1ls1",
        question: "What makes sound?",
        type: "multiple-choice",
        options: ["Only drums", "Vibrations", "Only voices", "Colors"],
        correctAnswer: 1,
        hint: "Feel your throat when you talk",
        explanation: "Vibrations make sound! When things shake back and forth quickly, we hear it as sound.",
        difficulty: "easy",
      },
      {
        id: "g1ls2",
        question: "Which of these makes its own light?",
        type: "multiple-choice",
        options: ["The moon", "A mirror", "The sun", "A window"],
        correctAnswer: 2,
        hint: "Stars are very hot and bright",
        explanation: "The sun makes its own light! It's a star. The moon just reflects the sun's light.",
        difficulty: "medium",
      },
    ],
  },

  // Seasons
  {
    id: "g1-seasons",
    title: "The Four Seasons",
    description: "Learn about the patterns of seasons throughout the year",
    grade: 1,
    domain: "seasons",
    icon: "🍂",
    estimatedMinutes: 10,
    standards: ["1-ESS1-2"],
    prerequisites: [],
    vocabulary: [
      { term: "season", definition: "A time of year with certain weather patterns" },
      { term: "temperature", definition: "How hot or cold something is" },
    ],
    problems: [
      {
        id: "g1se1",
        question: "In which season do leaves change color and fall from trees?",
        type: "multiple-choice",
        options: ["Spring", "Summer", "Fall", "Winter"],
        correctAnswer: 2,
        hint: "The season is named after what leaves do!",
        explanation: "Leaves change color and fall in Fall (also called Autumn)!",
        difficulty: "easy",
      },
      {
        id: "g1se2",
        question: "Which season is the warmest?",
        type: "multiple-choice",
        options: ["Spring", "Summer", "Fall", "Winter"],
        correctAnswer: 1,
        hint: "This is when you might go to the beach",
        explanation: "Summer is the warmest season! Days are longer and the sun is strongest.",
        difficulty: "easy",
      },
    ],
  },

  // ========================================
  // GRADE 2
  // ========================================

  // Matter
  {
    id: "g2-matter",
    title: "States of Matter",
    description: "Learn about solids, liquids, and gases",
    grade: 2,
    domain: "matter",
    icon: "💧",
    estimatedMinutes: 12,
    standards: ["2-PS1-1", "2-PS1-4"],
    prerequisites: [],
    vocabulary: [
      { term: "solid", definition: "Matter with a definite shape" },
      { term: "liquid", definition: "Matter that flows and takes the shape of its container" },
      { term: "gas", definition: "Matter that spreads out to fill its container" },
      { term: "matter", definition: "Anything that takes up space and has weight" },
    ],
    problems: [
      {
        id: "g2m1",
        question: "What state of matter is ice?",
        type: "multiple-choice",
        options: ["Solid", "Liquid", "Gas"],
        correctAnswer: 0,
        hint: "Does ice have a definite shape?",
        explanation: "Ice is a solid! It keeps its shape. When ice melts, it becomes liquid water.",
        difficulty: "easy",
      },
      {
        id: "g2m2",
        question: "What happens to water when you heat it?",
        type: "multiple-choice",
        options: ["It freezes", "It evaporates (turns to gas)", "It stays the same", "It becomes heavier"],
        correctAnswer: 1,
        hint: "Think about steam from a pot",
        explanation: "When water is heated enough, it evaporates and becomes water vapor (a gas)!",
        difficulty: "medium",
      },
      {
        id: "g2m3",
        question: "Which can you pour?",
        type: "multiple-choice",
        options: ["A rock", "Milk", "Air", "A pencil"],
        correctAnswer: 1,
        hint: "Which one is a liquid?",
        explanation: "Milk is a liquid, so you can pour it! Liquids take the shape of their container.",
        difficulty: "easy",
      },
    ],
  },

  // Habitats
  {
    id: "g2-habitats",
    title: "Animal Habitats",
    description: "Learn about where animals live and why",
    grade: 2,
    domain: "habitats",
    icon: "🏠",
    estimatedMinutes: 15,
    standards: ["2-LS4-1"],
    prerequisites: ["g1-animals"],
    vocabulary: [
      { term: "habitat", definition: "The natural home of an animal" },
      { term: "adapt", definition: "To change to survive better in a place" },
      { term: "shelter", definition: "A place where animals stay safe" },
    ],
    problems: [
      {
        id: "g2h1",
        question: "What is a habitat?",
        type: "multiple-choice",
        options: ["A type of food", "A place where an animal lives", "An animal's color", "A baby animal"],
        correctAnswer: 1,
        hint: "It's like an animal's home",
        explanation: "A habitat is the natural home of an animal where it finds food, water, and shelter!",
        difficulty: "easy",
      },
      {
        id: "g2h2",
        question: "Why do polar bears have thick fur?",
        type: "multiple-choice",
        options: ["To look bigger", "To swim faster", "To stay warm in cold places", "To hide from prey"],
        correctAnswer: 2,
        hint: "Polar bears live in very cold places",
        explanation: "Polar bears have thick fur to stay warm in their cold Arctic habitat!",
        difficulty: "medium",
      },
    ],
  },

  // Landforms
  {
    id: "g2-landforms",
    title: "Earth's Landforms",
    description: "Explore mountains, valleys, rivers, and more",
    grade: 2,
    domain: "landforms",
    icon: "🏔️",
    estimatedMinutes: 12,
    standards: ["2-ESS2-1", "2-ESS2-2"],
    prerequisites: [],
    vocabulary: [
      { term: "mountain", definition: "A very tall landform" },
      { term: "valley", definition: "Low land between mountains or hills" },
      { term: "river", definition: "A large stream of water that flows across land" },
    ],
    problems: [
      {
        id: "g2l1",
        question: "What is the tallest type of landform?",
        type: "multiple-choice",
        options: ["Hill", "Valley", "Mountain", "Plain"],
        correctAnswer: 2,
        hint: "Climbers try to reach the top of these",
        explanation: "Mountains are the tallest landforms! They're much higher than hills.",
        difficulty: "easy",
      },
      {
        id: "g2l2",
        question: "What can cause rocks to break apart over time?",
        type: "multiple-choice",
        options: ["Paint", "Water and wind", "Light", "Sound"],
        correctAnswer: 1,
        hint: "These can slowly wear things down",
        explanation: "Water and wind can break apart rocks over time. This is called erosion!",
        difficulty: "medium",
      },
    ],
  },

  // Life Cycles
  {
    id: "g2-life-cycles",
    title: "Life Cycles",
    description: "Learn how living things grow and change",
    grade: 2,
    domain: "lifeCycles",
    icon: "🦋",
    estimatedMinutes: 15,
    standards: ["2-LS2-2"],
    prerequisites: ["g1-plants", "g1-animals"],
    vocabulary: [
      { term: "life cycle", definition: "The stages of an organism's life from birth to death" },
      { term: "metamorphosis", definition: "A big change in an animal's body as it grows" },
      { term: "larva", definition: "A young form of an animal that looks different from the adult" },
    ],
    problems: [
      {
        id: "g2lc1",
        question: "What does a caterpillar become?",
        type: "multiple-choice",
        options: ["A worm", "A butterfly or moth", "A beetle", "A spider"],
        correctAnswer: 1,
        hint: "This change is called metamorphosis",
        explanation: "Caterpillars become butterflies or moths! They change completely during metamorphosis.",
        difficulty: "easy",
      },
      {
        id: "g2lc2",
        question: "Put these in order: Adult frog, Tadpole, Egg, Froglet",
        type: "multiple-choice",
        options: ["Egg → Froglet → Tadpole → Adult", "Egg → Tadpole → Froglet → Adult", "Tadpole → Egg → Adult → Froglet"],
        correctAnswer: 1,
        hint: "Frogs start in water",
        explanation: "Frog life cycle: Egg → Tadpole → Froglet → Adult Frog!",
        difficulty: "medium",
      },
    ],
  },

  // ========================================
  // GRADE 3
  // ========================================

  // Forces and Motion
  {
    id: "g3-forces-motion",
    title: "Forces and Motion",
    description: "Learn about pushes, pulls, and how things move",
    grade: 3,
    domain: "forcesMotion",
    icon: "🚀",
    estimatedMinutes: 15,
    standards: ["3-PS2-1", "3-PS2-2"],
    prerequisites: [],
    vocabulary: [
      { term: "force", definition: "A push or pull on an object" },
      { term: "motion", definition: "When something moves from one place to another" },
      { term: "friction", definition: "A force that slows things down when surfaces rub together" },
      { term: "gravity", definition: "A force that pulls objects toward Earth" },
    ],
    problems: [
      {
        id: "g3fm1",
        question: "What force keeps you on the ground?",
        type: "multiple-choice",
        options: ["Friction", "Magnetism", "Gravity", "Wind"],
        correctAnswer: 2,
        hint: "This force pulls things toward Earth",
        explanation: "Gravity pulls you toward Earth! It's why things fall down, not up.",
        difficulty: "easy",
      },
      {
        id: "g3fm2",
        question: "Why is it harder to push a heavy box than a light box?",
        type: "multiple-choice",
        options: ["Heavy things have more gravity", "You need more force to move heavy things", "Light boxes are slippery", "Heavy boxes are always bigger"],
        correctAnswer: 1,
        hint: "Heavier objects need more push",
        explanation: "You need more force to move heavier objects! More mass means more force needed.",
        difficulty: "medium",
      },
      {
        id: "g3fm3",
        question: "What force slows down a sliding book?",
        type: "multiple-choice",
        options: ["Gravity", "Magnetism", "Friction", "Wind"],
        correctAnswer: 2,
        hint: "This happens when surfaces rub together",
        explanation: "Friction slows down the book. Rough surfaces have more friction than smooth surfaces!",
        difficulty: "medium",
      },
    ],
  },

  // Magnets
  {
    id: "g3-magnets",
    title: "Magnets",
    description: "Explore magnetic forces and poles",
    grade: 3,
    domain: "magnets",
    icon: "🧲",
    estimatedMinutes: 12,
    standards: ["3-PS2-3", "3-PS2-4"],
    prerequisites: ["g3-forces-motion"],
    vocabulary: [
      { term: "magnet", definition: "An object that can attract certain metals" },
      { term: "attract", definition: "To pull toward" },
      { term: "repel", definition: "To push away" },
      { term: "poles", definition: "The two ends of a magnet (north and south)" },
    ],
    problems: [
      {
        id: "g3mag1",
        question: "What happens when two north poles of magnets come together?",
        type: "multiple-choice",
        options: ["They attract (pull together)", "They repel (push apart)", "Nothing happens", "They stick sideways"],
        correctAnswer: 1,
        hint: "Same poles don't like each other",
        explanation: "Same poles repel! North-North and South-South push away. Opposite poles attract!",
        difficulty: "medium",
      },
      {
        id: "g3mag2",
        question: "Which material will a magnet attract?",
        type: "multiple-choice",
        options: ["Wood", "Plastic", "Iron", "Glass"],
        correctAnswer: 2,
        hint: "Think about metal objects",
        explanation: "Magnets attract iron and some other metals like nickel and cobalt!",
        difficulty: "easy",
      },
    ],
  },

  // Weather
  {
    id: "g3-weather",
    title: "Weather Patterns",
    description: "Learn about weather conditions and how to predict them",
    grade: 3,
    domain: "weather",
    icon: "🌤️",
    estimatedMinutes: 15,
    standards: ["3-ESS2-1", "3-ESS2-2"],
    prerequisites: ["g1-seasons"],
    vocabulary: [
      { term: "weather", definition: "The condition of the air outside at a certain time and place" },
      { term: "temperature", definition: "How hot or cold something is" },
      { term: "precipitation", definition: "Water falling from the sky (rain, snow, sleet, hail)" },
      { term: "forecast", definition: "A prediction about future weather" },
    ],
    problems: [
      {
        id: "g3w1",
        question: "What is precipitation?",
        type: "multiple-choice",
        options: ["Wind", "Clouds", "Rain, snow, or other water falling from sky", "Temperature"],
        correctAnswer: 2,
        hint: "It falls from clouds",
        explanation: "Precipitation is any water that falls from the sky - rain, snow, sleet, or hail!",
        difficulty: "easy",
      },
      {
        id: "g3w2",
        question: "Dark, heavy clouds usually mean:",
        type: "multiple-choice",
        options: ["A sunny day", "Rain or a storm is coming", "Very cold weather", "Nighttime"],
        correctAnswer: 1,
        hint: "What do these clouds carry?",
        explanation: "Dark, heavy clouds are full of water and usually bring rain or storms!",
        difficulty: "medium",
      },
    ],
  },

  // Fossils
  {
    id: "g3-fossils",
    title: "Fossils",
    description: "Learn about fossils and what they tell us about the past",
    grade: 3,
    domain: "fossils",
    icon: "🦴",
    estimatedMinutes: 12,
    standards: ["3-LS4-1"],
    prerequisites: [],
    vocabulary: [
      { term: "fossil", definition: "The remains or traces of ancient life preserved in rock" },
      { term: "extinct", definition: "No longer existing; died out completely" },
      { term: "paleontologist", definition: "A scientist who studies fossils" },
    ],
    problems: [
      {
        id: "g3f1",
        question: "What is a fossil?",
        type: "multiple-choice",
        options: ["A living animal", "Ancient remains preserved in rock", "A type of rock", "A bone"],
        correctAnswer: 1,
        hint: "They're very, very old",
        explanation: "Fossils are the preserved remains or traces of ancient plants and animals in rock!",
        difficulty: "easy",
      },
      {
        id: "g3f2",
        question: "What can fossils tell us?",
        type: "multiple-choice",
        options: ["What ancient life looked like", "Tomorrow's weather", "How old the sun is", "What color dinosaurs were"],
        correctAnswer: 0,
        hint: "Fossils are clues about the past",
        explanation: "Fossils help us learn what ancient plants and animals looked like and where they lived!",
        difficulty: "medium",
      },
    ],
  },

  // ========================================
  // GRADE 4
  // ========================================

  // Energy
  {
    id: "g4-energy",
    title: "Energy Transfer",
    description: "Learn about different forms of energy and how energy moves",
    grade: 4,
    domain: "energy",
    icon: "⚡",
    estimatedMinutes: 15,
    standards: ["4-PS3-1", "4-PS3-2"],
    prerequisites: ["g3-forces-motion"],
    vocabulary: [
      { term: "energy", definition: "The ability to do work or cause change" },
      { term: "kinetic energy", definition: "Energy of motion" },
      { term: "potential energy", definition: "Stored energy" },
      { term: "transfer", definition: "To move from one place to another" },
    ],
    problems: [
      {
        id: "g4e1",
        question: "A ball at the top of a hill has what kind of energy?",
        type: "multiple-choice",
        options: ["Kinetic energy", "Potential energy", "Sound energy", "Light energy"],
        correctAnswer: 1,
        hint: "The energy is stored until the ball rolls",
        explanation: "The ball has potential (stored) energy because of its position. When it rolls, that becomes kinetic energy!",
        difficulty: "medium",
      },
      {
        id: "g4e2",
        question: "When you rub your hands together and they get warm, what energy change happened?",
        type: "multiple-choice",
        options: ["Sound to light", "Motion to heat", "Light to sound", "Heat to motion"],
        correctAnswer: 1,
        hint: "Your hands move, then feel warm",
        explanation: "Motion (kinetic) energy changed to heat energy! Friction creates heat.",
        difficulty: "medium",
      },
    ],
  },

  // Simple Circuits
  {
    id: "g4-circuits",
    title: "Simple Circuits",
    description: "Build circuits and understand how electricity flows",
    grade: 4,
    domain: "electricity",
    icon: "💡",
    estimatedMinutes: 18,
    standards: ["4-PS3-2", "4-PS3-4"],
    prerequisites: ["g4-energy"],
    vocabulary: [
      { term: "circuit", definition: "A complete path that electricity can flow through" },
      { term: "conductor", definition: "A material that allows electricity to flow through easily" },
      { term: "insulator", definition: "A material that does not allow electricity to flow through" },
      { term: "battery", definition: "A source of electrical energy" },
    ],
    problems: [
      {
        id: "g4c1",
        question: "For a light bulb to light up, the circuit must be:",
        type: "multiple-choice",
        options: ["Open (broken)", "Closed (complete)", "Half-way", "Upside down"],
        correctAnswer: 1,
        hint: "Electricity needs a complete path",
        explanation: "The circuit must be closed (complete) for electricity to flow and light the bulb!",
        difficulty: "easy",
      },
      {
        id: "g4c2",
        question: "Which material is a good conductor of electricity?",
        type: "multiple-choice",
        options: ["Rubber", "Plastic", "Copper wire", "Wood"],
        correctAnswer: 2,
        hint: "Metals usually conduct electricity well",
        explanation: "Copper is a great conductor! That's why electrical wires are often made of copper.",
        difficulty: "medium",
      },
      {
        id: "g4c3",
        question: "Why is the rubber coating on wires important?",
        type: "multiple-choice",
        options: ["It makes wires look nice", "It protects you from electric shock", "It makes electricity flow faster", "It adds weight"],
        correctAnswer: 1,
        hint: "Rubber is an insulator",
        explanation: "Rubber is an insulator that prevents electricity from escaping and protects you from shock!",
        difficulty: "medium",
      },
    ],
  },

  // Rocks and Erosion
  {
    id: "g4-rocks-erosion",
    title: "Rocks and Erosion",
    description: "Learn about the rock cycle and how Earth's surface changes",
    grade: 4,
    domain: "rocksErosion",
    icon: "🪨",
    estimatedMinutes: 15,
    standards: ["4-ESS1-1", "4-ESS2-1"],
    prerequisites: ["g2-landforms"],
    vocabulary: [
      { term: "erosion", definition: "The wearing away and moving of rock and soil by wind, water, or ice" },
      { term: "weathering", definition: "The breaking down of rock into smaller pieces" },
      { term: "sediment", definition: "Tiny pieces of rock and soil carried by water or wind" },
    ],
    problems: [
      {
        id: "g4r1",
        question: "What causes erosion?",
        type: "multiple-choice",
        options: ["Heat only", "Wind, water, and ice", "Plants only", "Moonlight"],
        correctAnswer: 1,
        hint: "Moving things carry rock and soil away",
        explanation: "Wind, water, and ice cause erosion by moving rock and soil from one place to another!",
        difficulty: "easy",
      },
      {
        id: "g4r2",
        question: "How did the Grand Canyon form?",
        type: "multiple-choice",
        options: ["An earthquake", "A river eroding rock over millions of years", "Volcanoes", "Dinosaurs"],
        correctAnswer: 1,
        hint: "The Colorado River flows through it",
        explanation: "The Colorado River carved the Grand Canyon over millions of years through erosion!",
        difficulty: "medium",
      },
    ],
  },

  // Body Systems
  {
    id: "g4-body-systems",
    title: "Body Systems",
    description: "Explore how our organs and body systems work together",
    grade: 4,
    domain: "bodySystems",
    icon: "🫀",
    estimatedMinutes: 15,
    standards: ["4-LS1-1"],
    prerequisites: [],
    vocabulary: [
      { term: "organ", definition: "A body part that does a specific job" },
      { term: "system", definition: "A group of organs that work together" },
      { term: "lungs", definition: "Organs that help you breathe and get oxygen" },
      { term: "heart", definition: "The organ that pumps blood through your body" },
    ],
    problems: [
      {
        id: "g4bs1",
        question: "What does the heart do?",
        type: "multiple-choice",
        options: ["Helps you think", "Pumps blood through your body", "Helps you breathe", "Breaks down food"],
        correctAnswer: 1,
        hint: "You can feel it beating",
        explanation: "Your heart pumps blood through your whole body! It beats about 100,000 times a day.",
        difficulty: "easy",
      },
      {
        id: "g4bs2",
        question: "What do your lungs take in when you breathe?",
        type: "multiple-choice",
        options: ["Carbon dioxide", "Nitrogen only", "Oxygen", "Water only"],
        correctAnswer: 2,
        hint: "You need this to survive",
        explanation: "Your lungs take in oxygen! Your body needs oxygen to turn food into energy.",
        difficulty: "easy",
      },
      {
        id: "g4bs3",
        question: "Why do you breathe faster when you run?",
        type: "multiple-choice",
        options: ["To cool down", "Your body needs more oxygen", "To make more blood", "For fun"],
        correctAnswer: 1,
        hint: "Your muscles need more energy",
        explanation: "When you run, your muscles need more energy, which requires more oxygen!",
        difficulty: "medium",
      },
    ],
  },
];

// Helper functions
export function getScienceSkillsByGrade(grade: 1 | 2 | 3 | 4): ScienceSkill[] {
  return scienceCurriculum.filter((skill) => skill.grade === grade);
}

export function getScienceSkillById(id: string): ScienceSkill | undefined {
  return scienceCurriculum.find((skill) => skill.id === id);
}

export function getRandomScienceProblems(
  grade: 1 | 2 | 3 | 4,
  count: number = 5,
  difficulty?: "easy" | "medium" | "hard"
): ScienceProblem[] {
  const skills = getScienceSkillsByGrade(grade);
  const allProblems = skills.flatMap((skill) => skill.problems);
  
  const filtered = difficulty
    ? allProblems.filter((p) => p.difficulty === difficulty)
    : allProblems;
  
  return [...filtered]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

