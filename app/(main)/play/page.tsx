"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageContainer, PageHeader, Section } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MasteryStars, ProgressBar } from "@/components/ui/progress";
import { SubjectBadge, DifficultyBadge, NewBadge, LockedBadge } from "@/components/ui/badge";
import { GAME_CONFIG } from "@/lib/constants";
import { useAppState } from "@/store/useAppState";

interface GameInfo {
  id: string;
  name: string;
  icon: string;
  subject: "math" | "science";
  grades: number[];
  description: string;
  levels: number;
  completedLevels: number;
  highScore: number;
  isNew?: boolean;
  isLocked?: boolean;
  difficulty: "easy" | "medium" | "hard";
}

// Demo game data with progress
const gamesWithProgress: GameInfo[] = [
  {
    ...GAME_CONFIG.fractionKitchen,
    completedLevels: 3,
    highScore: 5200,
    difficulty: "medium",
    isNew: true,
  },
  {
    ...GAME_CONFIG.multiplicationMountain,
    completedLevels: 5,
    highScore: 8400,
    difficulty: "easy",
  },
  {
    ...GAME_CONFIG.ecosystemBuilder,
    completedLevels: 2,
    highScore: 3100,
    difficulty: "hard",
  },
  {
    ...GAME_CONFIG.forceMotionDerby,
    completedLevels: 0,
    highScore: 0,
    difficulty: "medium",
  },
];

export default function PlayPage() {
  const { user } = useAppState();
  const [selectedSubject, setSelectedSubject] = useState<"all" | "math" | "science">("all");

  const filteredGames = gamesWithProgress.filter(
    (game) => selectedSubject === "all" || game.subject === selectedSubject
  );

  const mathGames = filteredGames.filter((g) => g.subject === "math");
  const scienceGames = filteredGames.filter((g) => g.subject === "science");

  return (
    <PageContainer>
      <PageHeader
        title="Play"
        subtitle="Learn while having fun!"
        emoji="🎮"
        action={
          <div className="flex items-center gap-2 bg-sunny-yellow/20 px-3 py-1.5 rounded-full">
            <span className="text-lg">⭐</span>
            <span className="font-bold text-sunny-yellow-dark">
              {user.stars.toLocaleString()}
            </span>
          </div>
        }
      />

      {/* Subject Filter */}
      <div className="flex gap-2 mb-6">
        <Button
          size="sm"
          variant={selectedSubject === "all" ? "primary" : "ghost"}
          onClick={() => setSelectedSubject("all")}
        >
          All Games
        </Button>
        <Button
          size="sm"
          variant={selectedSubject === "math" ? "secondary" : "ghost"}
          onClick={() => setSelectedSubject("math")}
          leftIcon={<span>📐</span>}
        >
          Math
        </Button>
        <Button
          size="sm"
          variant={selectedSubject === "science" ? "secondary" : "ghost"}
          onClick={() => setSelectedSubject("science")}
          leftIcon={<span>🔬</span>}
        >
          Science
        </Button>
      </div>

      {/* Featured Game */}
      <Section>
        <Link href={`/play/${GAME_CONFIG.fractionKitchen.id}`}>
          <Card
            interactive
            gradient="cosmic"
            className="relative"
          >
            <motion.div
              className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative z-10 flex items-center gap-6">
              <motion.div
                className="text-7xl"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🍕
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium">
                    ⭐ FEATURED
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">Fraction Kitchen</h2>
                <p className="text-white/80 mb-3">
                  Run a bakery using fractions! Slice pizza and serve customers!
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="text-sunny-yellow">🏆</span>
                    <span className="font-bold">5,200</span>
                    <span className="text-sm opacity-70">high score</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📊</span>
                    <span className="font-bold">3/15</span>
                    <span className="text-sm opacity-70">levels</span>
                  </div>
                </div>
              </div>
              <Button className="bg-white text-cosmic-purple hover:bg-white/90 font-bold">
                Play Now →
              </Button>
            </div>
          </Card>
        </Link>
      </Section>

      {/* Math Games */}
      {(selectedSubject === "all" || selectedSubject === "math") && mathGames.length > 0 && (
        <Section title="Math Games" subtitle="Boost your number skills">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mathGames.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        </Section>
      )}

      {/* Science Games */}
      {(selectedSubject === "all" || selectedSubject === "science") && scienceGames.length > 0 && (
        <Section title="Science Games" subtitle="Explore the world of science">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {scienceGames.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        </Section>
      )}

      {/* Daily Challenge */}
      <Section>
        <Card className="bg-gradient-sunset text-deep-space">
          <div className="flex items-center gap-4">
            <motion.div
              className="text-5xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              🎯
            </motion.div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">Daily Challenge</h3>
              <p className="opacity-80">
                Complete today's special challenge for bonus rewards!
              </p>
            </div>
            <Button className="bg-deep-space text-white hover:bg-deep-space-light">
              Start Challenge
            </Button>
          </div>
        </Card>
      </Section>
    </PageContainer>
  );
}

// Game Card Component
function GameCard({ game, index }: { game: GameInfo; index: number }) {
  const progress = (game.completedLevels / game.levels) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={game.isLocked ? "#" : `/play/${game.id}`}>
        <Card
          interactive={!game.isLocked}
          className={`h-full relative group ${game.isLocked ? "opacity-60" : ""}`}
          padding="lg"
        >
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            {game.isNew && <NewBadge />}
            {game.isLocked && <LockedBadge />}
          </div>

          <div className="flex flex-col h-full">
            <div className="flex items-start gap-6 mb-4">
              <motion.div
                className="w-20 h-20 rounded-3xl flex items-center justify-center text-5xl flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(124, 77, 255, 0.1), rgba(0, 184, 212, 0.1))",
                  boxShadow: "0 4px 12px rgba(124, 77, 255, 0.15)"
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {game.icon}
              </motion.div>
              <div className="flex-1 min-w-[1px] overflow-visible">
                <h3 className="font-bold text-xl text-deep-space mb-2 font-display leading-tight">{game.name}</h3>
                <p className="text-sm text-deep-space/70 leading-relaxed overflow-visible break-words mb-4">
                  {game.description}
                </p>

                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <SubjectBadge subject={game.subject} size="sm" />
                  <DifficultyBadge difficulty={game.difficulty} size="sm" />
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-auto">
              <div className="flex items-center justify-between text-sm">
                <span className="text-deep-space/60 font-medium">
                  {game.completedLevels}/{game.levels} levels
                </span>
                {game.highScore > 0 && (
                  <span className="flex items-center gap-1 text-purple-600 font-semibold">
                    🏆 {game.highScore.toLocaleString()}
                  </span>
                )}
              </div>
              <ProgressBar
                value={progress}
                size="sm"
                color={progress === 100 ? "green" : "purple"}
              />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

