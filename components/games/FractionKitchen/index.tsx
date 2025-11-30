"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameWrapper } from "../GameWrapper";

interface Order {
  id: string;
  item: string;
  emoji: string;
  fractions: string[];
  total: string;
  timeLimit: number;
  timeRemaining: number;
}

interface FractionKitchenProps {
  level: number;
  onComplete: (score: number, stars: number) => void;
  onQuit: () => void;
}

const MENU_ITEMS = [
  { item: "Pizza", emoji: "🍕" },
  { item: "Pie", emoji: "🥧" },
  { item: "Cake", emoji: "🎂" },
  { item: "Cookie", emoji: "🍪" },
];

export function FractionKitchen({ level, onComplete, onQuit }: FractionKitchenProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [selectedPieces, setSelectedPieces] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [ordersCompleted, setOrdersCompleted] = useState(0);
  const [totalPieces, setTotalPieces] = useState(4);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);

  // Game config based on level
  const config = {
    ordersToComplete: 5 + level,
    baseTimeLimit: Math.max(30 - level * 2, 15),
    pointsPerOrder: 100 + level * 20,
  };

  // Generate a fraction problem
  const generateOrder = useCallback((): Order => {
    const menuItem = MENU_ITEMS[Math.floor(Math.random() * MENU_ITEMS.length)];
    const denominators = level <= 5 ? [2, 4] : level <= 10 ? [2, 4, 8] : [2, 3, 4, 6, 8];
    const denominator = denominators[Math.floor(Math.random() * denominators.length)];
    
    // Generate 1-2 fractions that add up to something reasonable
    let fractions: string[] = [];
    let numeratorSum = 0;
    
    if (level <= 3) {
      // Simple: just one fraction
      const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
      fractions = [`${numerator}/${denominator}`];
      numeratorSum = numerator;
    } else {
      // Two fractions with same denominator
      const num1 = Math.floor(Math.random() * Math.floor(denominator / 2)) + 1;
      const num2 = Math.floor(Math.random() * Math.floor(denominator / 2)) + 1;
      fractions = [`${num1}/${denominator}`, `${num2}/${denominator}`];
      numeratorSum = num1 + num2;
    }

    return {
      id: `order-${Date.now()}`,
      item: menuItem.item,
      emoji: menuItem.emoji,
      fractions,
      total: `${numeratorSum}/${denominator}`,
      timeLimit: config.baseTimeLimit,
      timeRemaining: config.baseTimeLimit,
    };
  }, [level, config.baseTimeLimit]);

  // Initialize with first order
  useEffect(() => {
    const firstOrder = generateOrder();
    setCurrentOrder(firstOrder);
    const [, denom] = firstOrder.total.split("/").map(Number);
    setTotalPieces(denom);
  }, [generateOrder]);

  // Timer countdown
  useEffect(() => {
    if (!currentOrder || showSuccess || showFail) return;

    const timer = setInterval(() => {
      setCurrentOrder((prev) => {
        if (!prev) return null;
        if (prev.timeRemaining <= 0) {
          handleTimeUp();
          return prev;
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentOrder, showSuccess, showFail]);

  const handleTimeUp = () => {
    setShowFail(true);
    setTimeout(() => {
      setShowFail(false);
      nextOrder();
    }, 1500);
  };

  const togglePiece = (index: number) => {
    setSelectedPieces((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      }
      return [...prev, index];
    });
  };

  const checkAnswer = () => {
    if (!currentOrder) return;

    const [numerator] = currentOrder.total.split("/").map(Number);
    
    if (selectedPieces.length === numerator) {
      // Correct!
      setShowSuccess(true);
      const timeBonus = Math.floor(currentOrder.timeRemaining * 2);
      const points = config.pointsPerOrder + timeBonus;
      setScore((prev) => prev + points);
      setOrdersCompleted((prev) => prev + 1);

      setTimeout(() => {
        setShowSuccess(false);
        if (ordersCompleted + 1 >= config.ordersToComplete) {
          onComplete(score + points, score + points >= 1000 ? 3 : score + points >= 500 ? 2 : 1);
        } else {
          nextOrder();
        }
      }, 1500);
    } else {
      // Wrong!
      setShowFail(true);
      setTimeout(() => {
        setShowFail(false);
        setSelectedPieces([]);
      }, 1000);
    }
  };

  const nextOrder = () => {
    const newOrder = generateOrder();
    setCurrentOrder(newOrder);
    const [, denom] = newOrder.total.split("/").map(Number);
    setTotalPieces(denom);
    setSelectedPieces([]);
  };

  return (
    <GameWrapper
      gameId="fraction-kitchen"
      gameName="Fraction Kitchen"
      gameIcon="🍕"
      level={level}
      onComplete={onComplete}
      onQuit={onQuit}
    >
      <div className="relative w-full h-full bg-gradient-to-b from-orange-100 to-orange-200 overflow-visible">
        {/* Kitchen Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-amber-800 to-transparent" />
        </div>

        {/* Order Display - positioned below HUD */}
        <motion.div
          className="absolute top-32 md:top-36 left-1/2 -translate-x-1/2 z-10 w-full max-w-sm px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {currentOrder && (
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-5">
                <span className="text-5xl">{currentOrder.emoji}</span>
                <div className="text-right">
                  <p className="text-sm text-deep-space/60 font-medium">Time Left</p>
                  <p
                    className={`text-3xl font-bold ${
                      currentOrder.timeRemaining <= 10 ? "text-coral-pink" : "text-deep-space"
                    }`}
                  >
                    {currentOrder.timeRemaining}s
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-base text-deep-space/60 mb-3">Customer wants:</p>
                <div className="flex items-center justify-center gap-2">
                  {currentOrder.fractions.map((frac, i) => (
                    <span key={i} className="text-4xl font-bold text-deep-space">
                      {frac}
                      {i < currentOrder.fractions.length - 1 && " + "}
                    </span>
                  ))}
                </div>
                <p className="text-lg text-deep-space/60 mt-3">
                  = {currentOrder.total} of the {currentOrder.item}
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Progress - positioned below HUD on the left */}
        <div className="absolute top-32 md:top-36 left-4 z-10 hidden md:block">
          <div className="bg-white/95 rounded-2xl px-5 py-4 shadow-lg">
            <p className="text-sm text-deep-space/60 font-medium">Orders</p>
            <p className="font-bold text-deep-space text-xl">
              {ordersCompleted}/{config.ordersToComplete}
            </p>
          </div>
        </div>

        {/* Food Item to Divide */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            {/* Plate */}
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white shadow-2xl flex items-center justify-center">
              {/* Pie/Pizza slices */}
              <div className="relative w-48 h-48 md:w-60 md:h-60">
                {Array.from({ length: totalPieces }).map((_, i) => {
                  const angle = (360 / totalPieces) * i;
                  const isSelected = selectedPieces.includes(i);
                  
                  return (
                    <motion.button
                      key={i}
                      className={`absolute w-full h-full origin-center ${
                        isSelected ? "z-10" : "z-0"
                      }`}
                      style={{
                        clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((angle + 360 / totalPieces - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle + 360 / totalPieces - 90) * Math.PI / 180)}%)`,
                      }}
                      onClick={() => togglePiece(i)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div
                        className={`w-full h-full transition-all ${
                          isSelected
                            ? "bg-gradient-to-br from-sunny-yellow to-orange-400"
                            : "bg-gradient-to-br from-orange-300 to-orange-500"
                        }`}
                        style={{
                          boxShadow: isSelected
                            ? "inset 0 0 20px rgba(255,255,255,0.5)"
                            : "inset 0 0 10px rgba(0,0,0,0.2)",
                        }}
                      />
                    </motion.button>
                  );
                })}
                
                {/* Center circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-orange-200 shadow-inner z-20" />
              </div>
            </div>
          </div>

          {/* Selection Counter */}
          <motion.div
            className="mt-6 text-center"
            animate={{ scale: selectedPieces.length > 0 ? [1, 1.05, 1] : 1 }}
          >
            <p className="text-2xl font-bold text-deep-space bg-white/80 px-6 py-3 rounded-2xl inline-block shadow-md">
              Selected: {selectedPieces.length}/{totalPieces}
            </p>
          </motion.div>
        </div>

        {/* Serve Button */}
        <motion.button
          className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-gradient-to-b from-vibrant-green to-vibrant-green-dark text-deep-space font-bold py-5 px-14 rounded-2xl shadow-xl text-xl"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={checkAnswer}
        >
          🍽️ Serve Order!
        </motion.button>

        {/* Success Overlay */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="absolute inset-0 bg-vibrant-green/90 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center text-white"
              >
                <motion.div
                  className="text-8xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: 2 }}
                >
                  😋
                </motion.div>
                <h2 className="text-4xl font-bold">Delicious!</h2>
                <p className="text-xl">Perfect fraction!</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fail Overlay */}
        <AnimatePresence>
          {showFail && (
            <motion.div
              className="absolute inset-0 bg-coral-pink/90 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center text-white"
              >
                <motion.div
                  className="text-8xl mb-4"
                  animate={{ rotate: [0, -10, 10, 0] }}
                >
                  😕
                </motion.div>
                <h2 className="text-4xl font-bold">Try Again!</h2>
                <p className="text-xl">That's not quite right...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GameWrapper>
  );
}

export default FractionKitchen;

