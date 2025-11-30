import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Profile } from "@/lib/supabase/types";

// Types
export interface AvatarConfig {
  character: string;
  color: string;
  accessory: string;
}

export interface UserState {
  id: string | null;
  nickname: string;
  gradeLevel: number;
  avatarConfig: AvatarConfig;
  xp: number;
  level: number;
  streakDays: number;
  stars: number;
  gems: number;
  coins: number;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface UIState {
  isSidebarOpen: boolean;
  isMobileMenuOpen: boolean;
  activeModal: string | null;
  soundEnabled: boolean;
  musicEnabled: boolean;
  reducedMotion: boolean;
  fontSize: "normal" | "large" | "extra-large";
}

export interface GameState {
  currentGame: string | null;
  currentLevel: number;
  isPaused: boolean;
  score: number;
  lives: number;
  streak: number;
}

export interface PracticeState {
  currentSkill: string | null;
  difficulty: "easy" | "medium" | "hard" | "adaptive";
  questionsAnswered: number;
  correctAnswers: number;
  streak: number;
  hintsUsed: number;
}

export interface DailyChallenge {
  id: string;
  type: "practice" | "game" | "reading";
  description: string;
  target: number;
  progress: number;
  completed: boolean;
}

export interface AppState {
  // User
  user: UserState;
  setUser: (user: Partial<UserState>) => void;
  resetUser: () => void;
  addXP: (amount: number) => void;
  addStars: (amount: number) => void;
  addCurrency: (stars?: number, gems?: number) => void;
  incrementStreak: () => void;
  
  // Shop
  ownedItems: string[];
  purchaseItem: (itemId: string, price: number) => void;
  
  // UI
  ui: UIState;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  setSound: (enabled: boolean) => void;
  setMusic: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
  setFontSize: (size: "normal" | "large" | "extra-large") => void;
  
  // Game
  game: GameState;
  startGame: (gameId: string, level?: number) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
  updateGameScore: (score: number) => void;
  loseLife: () => void;
  incrementGameStreak: () => void;
  resetGameStreak: () => void;
  
  // Practice
  practice: PracticeState;
  startPractice: (skillId: string, difficulty?: PracticeState["difficulty"]) => void;
  endPractice: () => void;
  recordAnswer: (correct: boolean) => void;
  useHint: () => void;
  
  // Daily Challenges
  dailyChallenges: DailyChallenge[];
  setDailyChallenges: (challenges: DailyChallenge[]) => void;
  updateChallengeProgress: (challengeId: string, progress: number) => void;
  
  // Sync
  syncWithProfile: (profile: Profile) => void;
}

const initialUserState: UserState = {
  id: null,
  nickname: "",
  gradeLevel: 3,
  avatarConfig: {
    character: "explorer",
    color: "purple",
    accessory: "none",
  },
  xp: 1250,
  level: 5,
  streakDays: 5,
  stars: 150,
  gems: 25,
  coins: 500,
  isAuthenticated: false,
  isLoading: false, // Start as false for demo
};

const initialUIState: UIState = {
  isSidebarOpen: true,
  isMobileMenuOpen: false,
  activeModal: null,
  soundEnabled: true,
  musicEnabled: true,
  reducedMotion: false,
  fontSize: "normal",
};

const initialGameState: GameState = {
  currentGame: null,
  currentLevel: 1,
  isPaused: false,
  score: 0,
  lives: 3,
  streak: 0,
};

const initialPracticeState: PracticeState = {
  currentSkill: null,
  difficulty: "adaptive",
  questionsAnswered: 0,
  correctAnswers: 0,
  streak: 0,
  hintsUsed: 0,
};

export const useAppState = create<AppState>()(
  persist(
    (set, get) => ({
      // User State
      user: initialUserState,
      
      setUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData, isLoading: false },
        })),
      
      resetUser: () =>
        set({ user: initialUserState }),
      
      addXP: (amount) =>
        set((state) => {
          const newXP = state.user.xp + amount;
          const newLevel = calculateLevel(newXP);
          const starsEarned = Math.floor(amount * 0.1);
          return {
            user: {
              ...state.user,
              xp: newXP,
              level: newLevel,
              stars: state.user.stars + starsEarned,
            },
          };
        }),
      
      addCurrency: (stars = 0, gems = 0) =>
        set((state) => ({
          user: {
            ...state.user,
            stars: state.user.stars + stars,
            gems: state.user.gems + gems,
          },
        })),
      
      incrementStreak: () =>
        set((state) => ({
          user: {
            ...state.user,
            streakDays: state.user.streakDays + 1,
          },
        })),
      
      addStars: (amount) =>
        set((state) => ({
          user: {
            ...state.user,
            stars: state.user.stars + amount,
          },
        })),
      
      // Shop State
      ownedItems: [],
      
      purchaseItem: (itemId, price) =>
        set((state) => {
          if (state.user.coins >= price && !state.ownedItems.includes(itemId)) {
            return {
              user: { ...state.user, coins: state.user.coins - price },
              ownedItems: [...state.ownedItems, itemId],
            };
          }
          return state;
        }),
      
      // UI State
      ui: initialUIState,
      
      toggleSidebar: () =>
        set((state) => ({
          ui: { ...state.ui, isSidebarOpen: !state.ui.isSidebarOpen },
        })),
      
      toggleMobileMenu: () =>
        set((state) => ({
          ui: { ...state.ui, isMobileMenuOpen: !state.ui.isMobileMenuOpen },
        })),
      
      openModal: (modalId) =>
        set((state) => ({
          ui: { ...state.ui, activeModal: modalId },
        })),
      
      closeModal: () =>
        set((state) => ({
          ui: { ...state.ui, activeModal: null },
        })),
      
      setSound: (enabled) =>
        set((state) => ({
          ui: { ...state.ui, soundEnabled: enabled },
        })),
      
      setMusic: (enabled) =>
        set((state) => ({
          ui: { ...state.ui, musicEnabled: enabled },
        })),
      
      setReducedMotion: (enabled) =>
        set((state) => ({
          ui: { ...state.ui, reducedMotion: enabled },
        })),
      
      setFontSize: (size) =>
        set((state) => ({
          ui: { ...state.ui, fontSize: size },
        })),
      
      // Game State
      game: initialGameState,
      
      startGame: (gameId, level = 1) =>
        set({
          game: {
            currentGame: gameId,
            currentLevel: level,
            isPaused: false,
            score: 0,
            lives: 3,
            streak: 0,
          },
        }),
      
      pauseGame: () =>
        set((state) => ({
          game: { ...state.game, isPaused: true },
        })),
      
      resumeGame: () =>
        set((state) => ({
          game: { ...state.game, isPaused: false },
        })),
      
      endGame: () =>
        set({ game: initialGameState }),
      
      updateGameScore: (score) =>
        set((state) => ({
          game: { ...state.game, score },
        })),
      
      loseLife: () =>
        set((state) => ({
          game: { ...state.game, lives: Math.max(0, state.game.lives - 1) },
        })),
      
      incrementGameStreak: () =>
        set((state) => ({
          game: { ...state.game, streak: state.game.streak + 1 },
        })),
      
      resetGameStreak: () =>
        set((state) => ({
          game: { ...state.game, streak: 0 },
        })),
      
      // Practice State
      practice: initialPracticeState,
      
      startPractice: (skillId, difficulty = "adaptive") =>
        set({
          practice: {
            currentSkill: skillId,
            difficulty,
            questionsAnswered: 0,
            correctAnswers: 0,
            streak: 0,
            hintsUsed: 0,
          },
        }),
      
      endPractice: () =>
        set({ practice: initialPracticeState }),
      
      recordAnswer: (correct) =>
        set((state) => ({
          practice: {
            ...state.practice,
            questionsAnswered: state.practice.questionsAnswered + 1,
            correctAnswers: state.practice.correctAnswers + (correct ? 1 : 0),
            streak: correct ? state.practice.streak + 1 : 0,
          },
        })),
      
      useHint: () =>
        set((state) => ({
          practice: {
            ...state.practice,
            hintsUsed: state.practice.hintsUsed + 1,
          },
        })),
      
      // Daily Challenges
      dailyChallenges: [],
      
      setDailyChallenges: (challenges) =>
        set({ dailyChallenges: challenges }),
      
      updateChallengeProgress: (challengeId, progress) =>
        set((state) => ({
          dailyChallenges: state.dailyChallenges.map((c) =>
            c.id === challengeId
              ? { ...c, progress, completed: progress >= c.target }
              : c
          ),
        })),
      
      // Sync with Supabase Profile
      syncWithProfile: (profile) =>
        set((state) => ({
          user: {
            ...state.user,
            id: profile.id,
            nickname: profile.nickname,
            gradeLevel: profile.grade_level,
            avatarConfig: (profile.avatar_config as AvatarConfig) || state.user.avatarConfig,
            xp: profile.xp,
            level: profile.level,
            streakDays: profile.streak_days,
            stars: profile.stars,
            gems: profile.gems,
            isAuthenticated: true,
            isLoading: false,
          },
        })),
    }),
    {
      name: "brainblast-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: {
          ...state.user,
          isLoading: false, // Don't persist loading state
        },
        ui: {
          soundEnabled: state.ui.soundEnabled,
          musicEnabled: state.ui.musicEnabled,
          reducedMotion: state.ui.reducedMotion,
          fontSize: state.ui.fontSize,
        },
      }),
    }
  )
);

// Helper function to calculate level from XP
function calculateLevel(xp: number): number {
  const thresholds = [
    0, 100, 250, 500, 750, 1000, 1500, 2000, 2500, 3000,
    4000, 5000, 6500, 8000, 10000, 12500, 15000, 18000, 21000, 25000,
    30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000,
    80000, 85000, 90000, 95000, 100000, 110000, 120000, 130000, 150000, 175000,
    200000,
  ];
  
  let level = 1;
  for (let i = 0; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  return Math.min(level, 100);
}

