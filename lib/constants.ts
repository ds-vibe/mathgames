// XP Rewards
export const XP_REWARDS = {
  LESSON_COMPLETE: 100,
  PRACTICE_PROBLEM_CORRECT: 10,
  PRACTICE_PROBLEM_FIRST_TRY: 15,
  PRACTICE_STREAK_BONUS: 5, // per streak level
  GAME_LEVEL_COMPLETE: 50,
  GAME_PERFECT_SCORE: 100,
  STORY_EPISODE_COMPLETE: 150,
  READING_PASSAGE_COMPLETE: 25,
  READING_COMPREHENSION_PERFECT: 50,
  DAILY_LOGIN: 10,
  STREAK_DAY_BONUS: 5, // per day
  DAILY_CHALLENGE_COMPLETE: 30,
  ALL_DAILY_CHALLENGES: 50, // bonus for completing all 3
  ACHIEVEMENT_UNLOCK: 100,
  HELP_FRIEND: 20,
} as const;

// Currency Exchange Rates
export const CURRENCY = {
  STARS_PER_XP: 0.1, // 1 star per 10 XP
  GEMS_PER_ACHIEVEMENT: 5,
  GEMS_PER_MASTERY: 10,
} as const;

// Mastery Levels
export const MASTERY_LEVELS = {
  INTRO: { name: "Introduction", accuracy: 0, problems: 0 },
  DEVELOPING: { name: "Developing", accuracy: 60, problems: 5 },
  PROFICIENT: { name: "Proficient", accuracy: 80, problems: 15 },
  MASTERED: { name: "Mastered", accuracy: 90, problems: 25 },
  EXPERT: { name: "Expert", accuracy: 95, problems: 40 },
} as const;

// Difficulty Settings
export const DIFFICULTY = {
  EASY: { multiplier: 0.8, timeBonus: 1.2, hintPenalty: 0.5 },
  MEDIUM: { multiplier: 1.0, timeBonus: 1.0, hintPenalty: 0.7 },
  HARD: { multiplier: 1.3, timeBonus: 0.8, hintPenalty: 0.9 },
} as const;

// Streak Thresholds
export const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100, 365] as const;

// Daily Challenge Count
export const DAILY_CHALLENGE_COUNT = 3;

// Avatar Options
export const AVATAR_OPTIONS = {
  characters: [
    { id: "explorer", name: "Explorer", emoji: "🧑‍🚀" },
    { id: "scientist", name: "Scientist", emoji: "👨‍🔬" },
    { id: "wizard", name: "Wizard", emoji: "🧙" },
    { id: "robot", name: "Robot", emoji: "🤖" },
    { id: "astronaut", name: "Astronaut", emoji: "👩‍🚀" },
    { id: "ninja", name: "Ninja", emoji: "🥷" },
    { id: "superhero", name: "Superhero", emoji: "🦸" },
    { id: "fairy", name: "Fairy", emoji: "🧚" },
  ],
  colors: [
    { id: "purple", name: "Cosmic Purple", hex: "#7C4DFF" },
    { id: "blue", name: "Electric Blue", hex: "#00B8D4" },
    { id: "green", name: "Vibrant Green", hex: "#00E676" },
    { id: "yellow", name: "Sunny Yellow", hex: "#FFEA00" },
    { id: "pink", name: "Coral Pink", hex: "#FF6B6B" },
    { id: "orange", name: "Bright Orange", hex: "#FF9100" },
    { id: "teal", name: "Ocean Teal", hex: "#00BFA5" },
    { id: "red", name: "Ruby Red", hex: "#FF1744" },
  ],
  accessories: [
    { id: "none", name: "None", emoji: "" },
    { id: "glasses", name: "Glasses", emoji: "👓" },
    { id: "hat", name: "Hat", emoji: "🎩" },
    { id: "crown", name: "Crown", emoji: "👑" },
    { id: "headphones", name: "Headphones", emoji: "🎧" },
    { id: "bow", name: "Bow", emoji: "🎀" },
  ],
} as const;

// Learning Buddy Pets
export const LEARNING_BUDDIES = [
  { id: "atom", name: "Atom", emoji: "⚛️", description: "A curious science buddy" },
  { id: "pi", name: "Pi", emoji: "🥧", description: "Loves numbers and patterns" },
  { id: "spark", name: "Spark", emoji: "✨", description: "Full of energy and ideas" },
  { id: "cosmo", name: "Cosmo", emoji: "🌟", description: "Dreams of exploring space" },
  { id: "leaf", name: "Leaf", emoji: "🍃", description: "Loves nature and life science" },
  { id: "bolt", name: "Bolt", emoji: "⚡", description: "Fast and electric" },
  { id: "crystal", name: "Crystal", emoji: "💎", description: "Precise and clear" },
  { id: "nova", name: "Nova", emoji: "💫", description: "Bright and explosive" },
  { id: "geo", name: "Geo", emoji: "🌍", description: "Knows everything about Earth" },
  { id: "digit", name: "Digit", emoji: "🔢", description: "The ultimate math whiz" },
] as const;

// Story Characters
export const STORY_CHARACTERS = {
  professorAtom: {
    id: "professor-atom",
    name: "Professor Atom",
    emoji: "👨‍🔬",
    description: "Quirky scientist who loves experiments",
    color: "#7C4DFF",
  },
  digit: {
    id: "digit",
    name: "Digit",
    emoji: "🤖",
    description: "A friendly robot who thinks in numbers",
    color: "#00B8D4",
  },
  luna: {
    id: "luna",
    name: "Luna",
    emoji: "👧",
    description: "A curious girl who asks great questions",
    color: "#FF6B6B",
  },
  cosmo: {
    id: "cosmo",
    name: "Cosmo",
    emoji: "🐕",
    description: "Luna's dog who gets into trouble",
    color: "#FFEA00",
  },
} as const;

// Grade Configurations
export const GRADE_CONFIG = {
  1: {
    mathDomains: ["counting", "addition", "subtraction", "placeValue", "shapes"],
    scienceDomains: ["plants", "animals", "lightSound", "seasons"],
    readingLevel: { min: 200, max: 400 },
  },
  2: {
    mathDomains: ["additionSubtraction", "money", "time", "measurement", "graphs"],
    scienceDomains: ["matter", "habitats", "landforms", "lifeCycles"],
    readingLevel: { min: 400, max: 600 },
  },
  3: {
    mathDomains: ["multiplication", "division", "fractions", "areaPerimeter"],
    scienceDomains: ["forcesMotion", "fossils", "weather", "magnets"],
    readingLevel: { min: 600, max: 800 },
  },
  4: {
    mathDomains: ["multiDigitOps", "fractionOps", "decimals", "angles"],
    scienceDomains: ["energy", "bodySystems", "rocksErosion", "electricity"],
    readingLevel: { min: 800, max: 1000 },
  },
} as const;

// Game Configurations
export const GAME_CONFIG = {
  fractionKitchen: {
    id: "fraction-kitchen",
    name: "Fraction Kitchen",
    subject: "math" as const,
    grades: [3, 4],
    description: "Run a bakery using fractions!",
    icon: "🍕",
    levels: 15,
  },
  multiplicationMountain: {
    id: "multiplication-mountain",
    name: "Multiplication Mountain",
    subject: "math" as const,
    grades: [3],
    description: "Race to the summit with multiplication facts!",
    icon: "🏔️",
    levels: 12,
  },
  ecosystemBuilder: {
    id: "ecosystem-builder",
    name: "Ecosystem Builder",
    subject: "science" as const,
    grades: [3, 4],
    description: "Create balanced ecosystems!",
    icon: "🌿",
    levels: 10,
  },
  forceMotionDerby: {
    id: "force-motion-derby",
    name: "Force & Motion Derby",
    subject: "science" as const,
    grades: [3, 4],
    description: "Design vehicles and test physics!",
    icon: "🏎️",
    levels: 15,
  },
} as const;

// Navigation Items (Main)
export const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "🏠", path: "/home" },
  { id: "learn", label: "Learn", icon: "📚", path: "/learn" },
  { id: "play", label: "Play", icon: "🎮", path: "/play" },
  { id: "read", label: "Read", icon: "📖", path: "/read" },
  { id: "profile", label: "Profile", icon: "👤", path: "/profile" },
] as const;

// Secondary Navigation (Desktop Sidebar)
export const SECONDARY_NAV_ITEMS = [
  { id: "story", label: "Story", icon: "📜", path: "/story" },
  { id: "practice", label: "Practice", icon: "✏️", path: "/practice" },
  { id: "achievements", label: "Achievements", icon: "🏆", path: "/achievements" },
  { id: "shop", label: "Shop", icon: "🛒", path: "/shop" },
] as const;

// Achievement Categories
export const ACHIEVEMENT_CATEGORIES = {
  learning: { name: "Learning", icon: "📚", color: "#00B8D4" },
  gaming: { name: "Gaming", icon: "🎮", color: "#7C4DFF" },
  reading: { name: "Reading", icon: "📖", color: "#FF6B6B" },
  dedication: { name: "Dedication", icon: "🔥", color: "#FF9100" },
  special: { name: "Special", icon: "⭐", color: "#FFEA00" },
} as const;

