"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress";
import { useAppState } from "@/store/useAppState";
import { GAME_CONFIG } from "@/lib/constants";
import { ArrowLeft, Play, Trophy, Star, Info, Target } from "lucide-react";

// Dynamically import games to avoid SSR issues
const FractionKitchen = dynamic(() => import("@/components/games/FractionKitchen"), { ssr: false });
const MultiplicationMountain = dynamic(() => import("@/components/games/MultiplicationMountain"), { ssr: false });
const ForceMotionDerby = dynamic(() => import("@/components/games/ForceMotionDerby"), { ssr: false });
const EcosystemBuilder = dynamic(() => import("@/components/games/EcosystemBuilder"), { ssr: false });

type GameState = "info" | "playing" | "complete";

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const { user, addXP, addStars } = useAppState();
  
  const gameId = params.gameId as string;
  const gameConfig = Object.values(GAME_CONFIG).find((g) => g.id === gameId);
  
  const [gameState, setGameState] = useState<GameState>("info");
  const [lastScore, setLastScore] = useState<{ score: number; correct: number; total: number } | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<1 | 2 | 3 | 4>(user.gradeLevel as 1 | 2 | 3 | 4);

  if (!gameConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cloud-white p-6">
        <Card className="p-10 md:p-12 text-center max-w-md" overflow="visible">
          <motion.div
            className="text-7xl mb-8"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            🎮
          </motion.div>
          <h2 className="text-3xl font-bold text-deep-space mb-4">Game Not Found</h2>
          <p className="text-lg text-deep-space/60 mb-8 leading-relaxed">
            Oops! We couldn't find this game. It might have been moved or doesn't exist yet.
          </p>
          <Button size="lg" onClick={() => router.push("/play")}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Games
          </Button>
        </Card>
      </div>
    );
  }

  const handleGameComplete = (score: number, stars: number) => {
    // stars from game determines correct/total ratio
    const total = 10; // approximate
    const correct = Math.round((stars / 3) * total);
    setLastScore({ score, correct, total });
    setGameState("complete");
    
    // Award XP based on performance
    const xpEarned = Math.round(score / 10);
    
    addXP(xpEarned);
    addStars(stars);
  };

  const handleExit = () => {
    if (gameState === "playing") {
      setGameState("info");
    } else {
      router.push("/play");
    }
  };

  // Render the appropriate game component
  const renderGame = () => {
    const props = {
      level: selectedDifficulty,
      onComplete: handleGameComplete,
      onQuit: handleExit,
    };

    switch (gameId) {
      case "fraction-kitchen":
        return <FractionKitchen {...props} />;
      case "multiplication-mountain":
        return <MultiplicationMountain {...props} />;
      case "force-motion-derby":
        return <ForceMotionDerby {...props} />;
      case "ecosystem-builder":
        return <EcosystemBuilder {...props} />;
      default:
        return (
          <div className="min-h-screen flex items-center justify-center bg-cloud-white">
            <Card className="p-8 text-center">
              <p className="text-xl mb-4">This game is coming soon!</p>
              <Button onClick={() => router.push("/play")}>Back to Games</Button>
            </Card>
          </div>
        );
    }
  };

  // Game Info Screen
  if (gameState === "info") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cosmic-purple/10 to-sky-blue/10 pb-24 md:pb-8">
        {/* Header */}
        <div className="bg-white border-b border-cloud-gray">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Button variant="ghost" onClick={() => router.push("/play")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Game Header */}
          <Card className="p-10 mb-10 text-center" gradient="cosmic" overflow="visible">
            <div className="overflow-visible px-4">
              <motion.div
                className="text-8xl mb-6"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {gameConfig.icon}
              </motion.div>
              <h1 className="text-4xl font-bold text-white mb-3 overflow-visible break-words px-2">{gameConfig.name}</h1>
              <p className="text-white/90 text-lg max-w-md mx-auto leading-relaxed overflow-visible break-words px-2">{gameConfig.description}</p>
            </div>
          </Card>

          {/* Game Info Grid */}
          <div className="grid md:grid-cols-2 gap-10 mb-10">
            {/* Stats */}
            <Card padding="lg">
              <h3 className="font-bold text-deep-space mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-sunny-yellow" />
                Your Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-deep-space/60">High Score</span>
                  <span className="font-bold text-cosmic-purple">12,500</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-deep-space/60">Games Played</span>
                  <span className="font-bold">42</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-deep-space/60">Best Accuracy</span>
                  <span className="font-bold text-vibrant-green">94%</span>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-deep-space/60">Level Progress</span>
                    <span className="text-sm">8/20</span>
                  </div>
                  <ProgressBar value={40} color="purple" />
                </div>
              </div>
            </Card>

            {/* How to Play */}
            <Card padding="lg">
              <h3 className="font-bold text-deep-space mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-sky-blue" />
                How to Play
              </h3>
              <ul className="space-y-2 text-deep-space/80">
                {gameId === "fraction-kitchen" && (
                  <>
                    <li>• Customers order fraction-based recipes</li>
                    <li>• Click pieces to fill the correct amounts</li>
                    <li>• Serve orders quickly for tips</li>
                    <li>• Unlock new ingredients as you level up</li>
                  </>
                )}
                {gameId === "multiplication-mountain" && (
                  <>
                    <li>• Race to the mountain top!</li>
                    <li>• Answer multiplication questions to boost speed</li>
                    <li>• Wrong answers slow you down</li>
                    <li>• Beat the timer to earn stars</li>
                  </>
                )}
                {gameId === "force-motion-derby" && (
                  <>
                    <li>• Choose a vehicle with different mass</li>
                    <li>• Apply force to make it move</li>
                    <li>• Learn about F=ma through racing</li>
                    <li>• Answer physics questions for points</li>
                  </>
                )}
                {gameId === "ecosystem-builder" && (
                  <>
                    <li>• Build a balanced ecosystem</li>
                    <li>• Add plants, animals, and resources</li>
                    <li>• Keep populations in harmony</li>
                    <li>• Learn about food chains</li>
                  </>
                )}
              </ul>
            </Card>
          </div>

          {/* Difficulty Selection */}
          <Card padding="xl" className="mb-10">
            <h3 className="font-bold text-xl text-deep-space mb-6 flex items-center gap-3">
              <Target className="w-6 h-6 text-coral-pink" />
              Select Difficulty
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedDifficulty(grade as 1 | 2 | 3 | 4)}
                  className={`p-6 rounded-2xl border-2 transition-all text-center overflow-visible ${
                    selectedDifficulty === grade
                      ? "border-cosmic-purple bg-cosmic-purple/10 shadow-lg shadow-cosmic-purple/20"
                      : "border-cloud-gray hover:border-cosmic-purple/50 hover:bg-cosmic-purple/5"
                  }`}
                >
                  <span className="text-xl font-bold block mb-1">Grade {grade}</span>
                  <p className="text-sm text-deep-space/60">
                    {grade === 1 && "Beginner"}
                    {grade === 2 && "Easy"}
                    {grade === 3 && "Medium"}
                    {grade === 4 && "Challenge"}
                  </p>
                </button>
              ))}
            </div>
          </Card>

          {/* Play Button */}
          <div className="text-center">
            <Button
              size="xl"
              onClick={() => setGameState("playing")}
              className="min-w-[280px]"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Game
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Playing State
  if (gameState === "playing") {
    return renderGame();
  }

  // Complete State
  if (gameState === "complete" && lastScore) {
    const accuracy = lastScore.total > 0 ? (lastScore.correct / lastScore.total) * 100 : 0;
    const stars = accuracy >= 80 ? 3 : accuracy >= 60 ? 2 : 1;

    return (
      <div className="min-h-screen bg-gradient-to-br from-cosmic-purple/10 to-sky-blue/10 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card gradient="cosmic" className="p-8 text-center overflow-visible">
            <div className="overflow-visible px-4">
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                {stars >= 3 ? "🌟" : stars >= 2 ? "⭐" : "✨"}
              </motion.div>
              
              <h2 className="text-2xl font-bold text-white mb-2 overflow-visible break-words px-2">Game Complete!</h2>
            
            {/* Stars */}
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className={`text-4xl ${i <= stars ? "" : "opacity-30"}`}
                >
                  ⭐
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="bg-white/20 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-3 gap-4 text-white">
                <div>
                  <p className="text-white/60 text-sm">Score</p>
                  <p className="text-2xl font-bold">{lastScore.score.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Correct</p>
                  <p className="text-2xl font-bold">{lastScore.correct}/{lastScore.total}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Accuracy</p>
                  <p className="text-2xl font-bold">{Math.round(accuracy)}%</p>
                </div>
              </div>
            </div>

            {/* XP Earned */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-sunny-yellow" />
                <span className="font-bold text-white">+{Math.round(lastScore.score / 10)} XP</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span className="text-sunny-yellow">⭐</span>
                <span className="font-bold text-white">+{stars} Stars</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-center">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={() => router.push("/play")}
              >
                Exit
              </Button>
              <Button
                className="bg-white text-cosmic-purple hover:bg-white/90"
                onClick={() => setGameState("playing")}
              >
                Play Again
              </Button>
            </div>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return null;
}
