"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameWrapper } from "../GameWrapper";

interface Organism {
  id: string;
  type: "plant" | "herbivore" | "carnivore";
  name: string;
  emoji: string;
  x: number;
  y: number;
  health: number;
}

interface EcosystemBuilderProps {
  level: number;
  onComplete: (score: number, stars: number) => void;
  onQuit: () => void;
}

const ORGANISMS = {
  plants: [
    { name: "Grass", emoji: "🌿" },
    { name: "Tree", emoji: "🌳" },
    { name: "Flower", emoji: "🌸" },
    { name: "Bush", emoji: "🌲" },
  ],
  herbivores: [
    { name: "Rabbit", emoji: "🐰" },
    { name: "Deer", emoji: "🦌" },
    { name: "Mouse", emoji: "🐭" },
    { name: "Butterfly", emoji: "🦋" },
  ],
  carnivores: [
    { name: "Fox", emoji: "🦊" },
    { name: "Wolf", emoji: "🐺" },
    { name: "Owl", emoji: "🦉" },
    { name: "Snake", emoji: "🐍" },
  ],
};

export function EcosystemBuilder({ level, onComplete, onQuit }: EcosystemBuilderProps) {
  const [organisms, setOrganisms] = useState<Organism[]>([]);
  const [selectedType, setSelectedType] = useState<"plant" | "herbivore" | "carnivore">("plant");
  const [balance, setBalance] = useState(100);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60 + level * 10);
  const [showWarning, setShowWarning] = useState<string | null>(null);
  const [isBalanced, setIsBalanced] = useState(true);

  // Count organisms by type
  const counts = {
    plant: organisms.filter((o) => o.type === "plant").length,
    herbivore: organisms.filter((o) => o.type === "herbivore").length,
    carnivore: organisms.filter((o) => o.type === "carnivore").length,
  };

  // Calculate ecosystem balance
  useEffect(() => {
    const plantCount = counts.plant;
    const herbivoreCount = counts.herbivore;
    const carnivoreCount = counts.carnivore;

    let newBalance = 100;
    let warning = null;

    // Check ratios
    if (herbivoreCount > 0 && plantCount < herbivoreCount * 2) {
      newBalance -= 30;
      warning = "Not enough plants to feed the herbivores!";
    }

    if (carnivoreCount > 0 && herbivoreCount < carnivoreCount * 2) {
      newBalance -= 30;
      warning = "Not enough herbivores to feed the carnivores!";
    }

    if (plantCount === 0 && (herbivoreCount > 0 || carnivoreCount > 0)) {
      newBalance -= 50;
      warning = "Your ecosystem needs plants!";
    }

    if (carnivoreCount > herbivoreCount && herbivoreCount > 0) {
      newBalance -= 20;
      warning = "Too many predators!";
    }

    // Bonus for good balance
    if (plantCount >= 4 && herbivoreCount >= 2 && carnivoreCount >= 1) {
      if (plantCount >= herbivoreCount * 2 && herbivoreCount >= carnivoreCount * 2) {
        newBalance = 100;
        warning = null;
      }
    }

    setBalance(Math.max(0, Math.min(100, newBalance)));
    setShowWarning(warning);
    setIsBalanced(newBalance >= 80);
  }, [counts.plant, counts.herbivore, counts.carnivore]);

  // Timer and scoring
  useEffect(() => {
    if (timeRemaining <= 0) {
      // Game over - calculate final score
      const finalScore = Math.floor(balance * 10 + organisms.length * 5);
      onComplete(finalScore, balance >= 90 ? 3 : balance >= 70 ? 2 : 1);
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
      
      // Award points for balanced ecosystem
      if (isBalanced && organisms.length >= 5) {
        setScore((prev) => prev + 5);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isBalanced, organisms.length, balance, onComplete]);

  const addOrganism = (x: number, y: number) => {
    const typeList = selectedType === "plant" 
      ? ORGANISMS.plants 
      : selectedType === "herbivore" 
        ? ORGANISMS.herbivores 
        : ORGANISMS.carnivores;

    const randomOrganism = typeList[Math.floor(Math.random() * typeList.length)];

    const newOrganism: Organism = {
      id: `org-${Date.now()}-${Math.random()}`,
      type: selectedType,
      name: randomOrganism.name,
      emoji: randomOrganism.emoji,
      x,
      y,
      health: 100,
    };

    setOrganisms((prev) => [...prev, newOrganism]);
    setScore((prev) => prev + 10);
  };

  const removeOrganism = (id: string) => {
    setOrganisms((prev) => prev.filter((o) => o.id !== id));
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Check if clicking near existing organism (to remove)
    const clickedOrganism = organisms.find((o) => {
      const distance = Math.sqrt(Math.pow(o.x - x, 2) + Math.pow(o.y - y, 2));
      return distance < 5;
    });

    if (clickedOrganism) {
      removeOrganism(clickedOrganism.id);
    } else {
      addOrganism(x, y);
    }
  };

  return (
    <GameWrapper
      gameId="ecosystem-builder"
      gameName="Ecosystem Builder"
      gameIcon="🌿"
      level={level}
      onComplete={onComplete}
      onQuit={onQuit}
    >
      <div className="relative w-full h-full overflow-hidden">
        {/* Sky and ground */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-green-400" />
        
        {/* Ground texture */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-green-700 to-green-500" />

        {/* Balance meter */}
        <motion.div
          className="absolute top-24 left-1/2 -translate-x-1/2 z-20"
          animate={{ scale: showWarning ? [1, 1.05, 1] : 1 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-4 min-w-[300px]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-deep-space">Ecosystem Balance</span>
              <span className="text-sm text-deep-space/60">{timeRemaining}s</span>
            </div>
            <div className="h-4 bg-cloud-gray rounded-full overflow-hidden">
              <motion.div
                className={`h-full transition-colors ${
                  balance >= 80 ? "bg-vibrant-green" : balance >= 50 ? "bg-sunny-yellow" : "bg-coral-pink"
                }`}
                animate={{ width: `${balance}%` }}
              />
            </div>
            <AnimatePresence>
              {showWarning && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-coral-pink text-sm mt-2 text-center"
                >
                  ⚠️ {showWarning}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Organism counts */}
        <div className="absolute top-24 right-4 z-20 bg-white/90 rounded-xl p-3 shadow-lg">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span>🌿</span>
              <span className="font-medium">Plants: {counts.plant}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🐰</span>
              <span className="font-medium">Herbivores: {counts.herbivore}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🦊</span>
              <span className="font-medium">Carnivores: {counts.carnivore}</span>
            </div>
          </div>
        </div>

        {/* Game canvas */}
        <div
          className="absolute top-48 bottom-32 left-4 right-4 rounded-3xl overflow-hidden cursor-crosshair"
          style={{ background: "linear-gradient(to bottom, rgba(134,239,172,0.5), rgba(34,197,94,0.7))" }}
          onClick={handleCanvasClick}
        >
          {/* Organisms */}
          <AnimatePresence>
            {organisms.map((organism) => (
              <motion.div
                key={organism.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${organism.x}%`,
                  top: `${organism.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                whileHover={{ scale: 1.2 }}
              >
                <motion.span
                  className="text-4xl md:text-5xl block"
                  animate={
                    organism.type === "herbivore"
                      ? { x: [0, 5, 0, -5, 0] }
                      : organism.type === "carnivore"
                        ? { rotate: [0, 5, 0, -5, 0] }
                        : { scale: [1, 1.05, 1] }
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {organism.emoji}
                </motion.span>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Click hint */}
          {organisms.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-deep-space/50 text-lg">Click to add organisms!</p>
            </div>
          )}
        </div>

        {/* Organism selector */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-white rounded-2xl shadow-lg p-3 flex gap-2">
            {(["plant", "herbivore", "carnivore"] as const).map((type) => {
              const emoji = type === "plant" ? "🌿" : type === "herbivore" ? "🐰" : "🦊";
              const label = type === "plant" ? "Plants" : type === "herbivore" ? "Herbivores" : "Carnivores";
              
              return (
                <motion.button
                  key={type}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    selectedType === type
                      ? "bg-cosmic-purple text-white"
                      : "bg-cloud-gray hover:bg-cloud-gray/80"
                  }`}
                  onClick={() => setSelectedType(type)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl block mb-1">{emoji}</span>
                  <span className="text-xs">{label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Tips */}
        <motion.div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center text-deep-space/60"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 5 }}
        >
          <p className="text-sm">🌿 Plants → 🐰 Herbivores → 🦊 Carnivores</p>
          <p className="text-xs">Keep the food chain balanced!</p>
        </motion.div>
      </div>
    </GameWrapper>
  );
}

export default EcosystemBuilder;

