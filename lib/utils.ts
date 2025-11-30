import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function calculateLevel(xp: number): { level: number; title: string; progress: number; xpForNext: number } {
  const levels = [
    { threshold: 0, title: "Curious Cub" },
    { threshold: 100, title: "Curious Cub" },
    { threshold: 250, title: "Curious Cub" },
    { threshold: 500, title: "Curious Cub" },
    { threshold: 750, title: "Curious Cub" },
    { threshold: 1000, title: "Bright Spark" },
    { threshold: 1500, title: "Bright Spark" },
    { threshold: 2000, title: "Bright Spark" },
    { threshold: 2500, title: "Bright Spark" },
    { threshold: 3000, title: "Bright Spark" },
    { threshold: 4000, title: "Knowledge Seeker" },
    { threshold: 5000, title: "Knowledge Seeker" },
    { threshold: 6500, title: "Knowledge Seeker" },
    { threshold: 8000, title: "Knowledge Seeker" },
    { threshold: 10000, title: "Knowledge Seeker" },
    { threshold: 12500, title: "Knowledge Seeker" },
    { threshold: 15000, title: "Knowledge Seeker" },
    { threshold: 18000, title: "Knowledge Seeker" },
    { threshold: 21000, title: "Knowledge Seeker" },
    { threshold: 25000, title: "Knowledge Seeker" },
    { threshold: 30000, title: "Brain Builder" },
    { threshold: 35000, title: "Brain Builder" },
    { threshold: 40000, title: "Brain Builder" },
    { threshold: 45000, title: "Brain Builder" },
    { threshold: 50000, title: "Brain Builder" },
    { threshold: 55000, title: "Science Star" },
    { threshold: 60000, title: "Science Star" },
    { threshold: 65000, title: "Science Star" },
    { threshold: 70000, title: "Science Star" },
    { threshold: 75000, title: "Math Master" },
    { threshold: 80000, title: "Math Master" },
    { threshold: 85000, title: "Math Master" },
    { threshold: 90000, title: "Math Master" },
    { threshold: 95000, title: "Wisdom Wizard" },
    { threshold: 100000, title: "Wisdom Wizard" },
    { threshold: 110000, title: "Wisdom Wizard" },
    { threshold: 120000, title: "Wisdom Wizard" },
    { threshold: 130000, title: "Genius Explorer" },
    { threshold: 150000, title: "Genius Explorer" },
    { threshold: 175000, title: "Genius Explorer" },
    { threshold: 200000, title: "BrainBlast Legend" },
  ];

  let currentLevel = 1;
  let currentTitle = "Curious Cub";
  let currentThreshold = 0;
  let nextThreshold = 100;

  for (let i = 0; i < levels.length; i++) {
    if (xp >= levels[i].threshold) {
      currentLevel = i + 1;
      currentTitle = levels[i].title;
      currentThreshold = levels[i].threshold;
      nextThreshold = levels[i + 1]?.threshold || levels[i].threshold + 10000;
    } else {
      break;
    }
  }

  const xpInCurrentLevel = xp - currentThreshold;
  const xpNeededForLevel = nextThreshold - currentThreshold;
  const progress = Math.min((xpInCurrentLevel / xpNeededForLevel) * 100, 100);

  return {
    level: Math.min(currentLevel, 100),
    title: currentTitle,
    progress,
    xpForNext: nextThreshold - xp,
  };
}

export function getGradeLabel(grade: number): string {
  const labels: Record<number, string> = {
    1: "1st Grade",
    2: "2nd Grade",
    3: "3rd Grade",
    4: "4th Grade",
  };
  return labels[grade] || `Grade ${grade}`;
}

export function getSubjectColor(subject: "math" | "science"): string {
  return subject === "math" ? "electric-blue" : "vibrant-green";
}

export function getSubjectIcon(subject: "math" | "science"): string {
  return subject === "math" ? "📐" : "🔬";
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

