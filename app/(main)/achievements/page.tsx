"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { useAppState } from "@/store/useAppState";
import { Trophy, Lock, Star, Zap, Target, BookOpen, Brain, Flame, Medal, Crown, Sparkles } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: "learning" | "games" | "streak" | "mastery" | "special";
  icon: string;
  requirement: number;
  currentProgress: number;
  xpReward: number;
  coinReward: number;
  unlocked: boolean;
}

// Sample achievements data
const ACHIEVEMENTS: Achievement[] = [
  // Learning Achievements
  { id: "first-lesson", name: "First Steps", description: "Complete your first lesson", category: "learning", icon: "📚", requirement: 1, currentProgress: 1, xpReward: 50, coinReward: 25, unlocked: true },
  { id: "lesson-10", name: "Eager Learner", description: "Complete 10 lessons", category: "learning", icon: "📖", requirement: 10, currentProgress: 7, xpReward: 100, coinReward: 50, unlocked: false },
  { id: "lesson-50", name: "Knowledge Seeker", description: "Complete 50 lessons", category: "learning", icon: "🎓", requirement: 50, currentProgress: 7, xpReward: 250, coinReward: 100, unlocked: false },
  { id: "lesson-100", name: "Scholar", description: "Complete 100 lessons", category: "learning", icon: "🏛️", requirement: 100, currentProgress: 7, xpReward: 500, coinReward: 250, unlocked: false },

  // Game Achievements
  { id: "first-game", name: "Player One", description: "Play your first game", category: "games", icon: "🎮", requirement: 1, currentProgress: 1, xpReward: 50, coinReward: 25, unlocked: true },
  { id: "game-master", name: "Game Master", description: "Win 25 games", category: "games", icon: "🏆", requirement: 25, currentProgress: 12, xpReward: 200, coinReward: 100, unlocked: false },
  { id: "perfect-game", name: "Perfect Score", description: "Get 100% on any game", category: "games", icon: "💯", requirement: 1, currentProgress: 1, xpReward: 150, coinReward: 75, unlocked: true },
  { id: "kitchen-master", name: "Kitchen Champion", description: "Serve 100 orders in Fraction Kitchen", category: "games", icon: "🍕", requirement: 100, currentProgress: 34, xpReward: 300, coinReward: 150, unlocked: false },

  // Streak Achievements
  { id: "streak-3", name: "On a Roll", description: "Maintain a 3-day streak", category: "streak", icon: "🔥", requirement: 3, currentProgress: 3, xpReward: 75, coinReward: 30, unlocked: true },
  { id: "streak-7", name: "Week Warrior", description: "Maintain a 7-day streak", category: "streak", icon: "⚡", requirement: 7, currentProgress: 5, xpReward: 150, coinReward: 75, unlocked: false },
  { id: "streak-30", name: "Monthly Master", description: "Maintain a 30-day streak", category: "streak", icon: "🌟", requirement: 30, currentProgress: 5, xpReward: 500, coinReward: 250, unlocked: false },
  { id: "streak-100", name: "Century Legend", description: "Maintain a 100-day streak", category: "streak", icon: "👑", requirement: 100, currentProgress: 5, xpReward: 1000, coinReward: 500, unlocked: false },

  // Mastery Achievements
  { id: "math-basics", name: "Math Basics", description: "Master all Grade 1 math topics", category: "mastery", icon: "➕", requirement: 5, currentProgress: 3, xpReward: 200, coinReward: 100, unlocked: false },
  { id: "science-explorer", name: "Science Explorer", description: "Complete 10 science experiments", category: "mastery", icon: "🔬", requirement: 10, currentProgress: 4, xpReward: 200, coinReward: 100, unlocked: false },
  { id: "multiplication-master", name: "Times Table Hero", description: "Master multiplication tables 1-10", category: "mastery", icon: "✖️", requirement: 10, currentProgress: 6, xpReward: 300, coinReward: 150, unlocked: false },
  { id: "reader", name: "Bookworm", description: "Read 20 passages", category: "mastery", icon: "📕", requirement: 20, currentProgress: 8, xpReward: 250, coinReward: 125, unlocked: false },

  // Special Achievements
  { id: "early-bird", name: "Early Bird", description: "Study before 8 AM", category: "special", icon: "🌅", requirement: 1, currentProgress: 0, xpReward: 100, coinReward: 50, unlocked: false },
  { id: "night-owl", name: "Night Owl", description: "Study after 8 PM", category: "special", icon: "🦉", requirement: 1, currentProgress: 1, xpReward: 100, coinReward: 50, unlocked: true },
  { id: "weekend-warrior", name: "Weekend Warrior", description: "Study on Saturday and Sunday", category: "special", icon: "📅", requirement: 2, currentProgress: 1, xpReward: 150, coinReward: 75, unlocked: false },
  { id: "comeback-kid", name: "Comeback Kid", description: "Return after 7 days away", category: "special", icon: "🔄", requirement: 1, currentProgress: 0, xpReward: 200, coinReward: 100, unlocked: false },
];

const CATEGORY_INFO = {
  learning: { label: "Learning", color: "text-cosmic-purple", bgColor: "bg-cosmic-purple/10", icon: BookOpen },
  games: { label: "Games", color: "text-vibrant-green", bgColor: "bg-vibrant-green/10", icon: Target },
  streak: { label: "Streaks", color: "text-coral-pink", bgColor: "bg-coral-pink/10", icon: Flame },
  mastery: { label: "Mastery", color: "text-sky-blue", bgColor: "bg-sky-blue/10", icon: Brain },
  special: { label: "Special", color: "text-sunny-yellow-dark", bgColor: "bg-sunny-yellow/10", icon: Sparkles },
};

export default function AchievementsPage() {
  const { user } = useAppState();
  const [selectedCategory, setSelectedCategory] = useState<"all" | Achievement["category"]>("all");

  const filteredAchievements = selectedCategory === "all"
    ? ACHIEVEMENTS
    : ACHIEVEMENTS.filter((a) => a.category === selectedCategory);

  const unlockedCount = ACHIEVEMENTS.filter((a) => a.unlocked).length;
  const totalCount = ACHIEVEMENTS.length;
  const overallProgress = (unlockedCount / totalCount) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sunny-yellow/10 to-coral-pink/10 pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-white border-b border-cloud-gray">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-sunny-yellow to-coral-pink rounded-2xl flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-deep-space">Achievements</h1>
              <p className="text-deep-space/60">
                {unlockedCount} of {totalCount} unlocked
              </p>
            </div>
          </div>
          
          <ProgressBar value={overallProgress} color="gradient" size="md" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-4 px-4">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-deep-space text-white"
                : "bg-white text-deep-space hover:bg-deep-space/10"
            }`}
          >
            <Medal className="w-4 h-4" />
            All ({totalCount})
          </button>
          {Object.entries(CATEGORY_INFO).map(([key, info]) => {
            const count = ACHIEVEMENTS.filter((a) => a.category === key).length;
            const Icon = info.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key as Achievement["category"])}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === key
                    ? "bg-deep-space text-white"
                    : "bg-white text-deep-space hover:bg-deep-space/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                {info.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Achievements Grid */}
        <div className="space-y-5">
          {filteredAchievements.map((achievement, index) => {
            const categoryInfo = CATEGORY_INFO[achievement.category];
            const progress = Math.min((achievement.currentProgress / achievement.requirement) * 100, 100);

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`p-4 ${!achievement.unlocked ? "opacity-75" : ""}`}>
                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                        achievement.unlocked
                          ? categoryInfo.bgColor
                          : "bg-gray-100"
                      }`}
                    >
                      {achievement.unlocked ? (
                        achievement.icon
                      ) : (
                        <Lock className="w-6 h-6 text-gray-400" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-deep-space truncate">
                          {achievement.name}
                        </h3>
                        {achievement.unlocked && (
                          <span className="text-vibrant-green text-sm">✓</span>
                        )}
                      </div>
                      <p className="text-sm text-deep-space/60 mb-2">
                        {achievement.description}
                      </p>

                      {/* Progress Bar */}
                      {!achievement.unlocked && (
                        <div className="mb-2">
                          <div className="flex items-center justify-between text-xs text-deep-space/60 mb-1">
                            <span>Progress</span>
                            <span>
                              {achievement.currentProgress}/{achievement.requirement}
                            </span>
                          </div>
                          <div className="h-2 bg-cloud-gray rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full ${categoryInfo.bgColor.replace("/10", "")}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Rewards */}
                      <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1 text-cosmic-purple">
                          <Star className="w-3 h-3" />
                          {achievement.xpReward} XP
                        </span>
                        <span className="flex items-center gap-1 text-sunny-yellow-dark">
                          <span>🪙</span>
                          {achievement.coinReward}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full ${categoryInfo.bgColor} ${categoryInfo.color} text-xs`}>
                          {categoryInfo.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

