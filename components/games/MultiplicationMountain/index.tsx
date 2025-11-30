"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameWrapper } from "../GameWrapper";

interface MultiplicationProblem {
  num1: number;
  num2: number;
  answer: number;
  options: number[];
}

interface MultiplicationMountainProps {
  level: number;
  onComplete: (score: number, stars: number) => void;
  onQuit: () => void;
}

export function MultiplicationMountain({ level, onComplete, onQuit }: MultiplicationMountainProps) {
  const [position, setPosition] = useState(0); // 0-100% up the mountain
  const [currentProblem, setCurrentProblem] = useState<MultiplicationProblem | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState<number | null>(null);
  const [isSliding, setIsSliding] = useState(false);

  // Config based on level/fact family
  const factFamily = Math.min(level + 1, 12); // Level 1 = 2s, Level 2 = 3s, etc.
  const summitPosition = 100;

  const generateProblem = useCallback((): MultiplicationProblem => {
    const num1 = factFamily;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 * num2;
    
    // Generate wrong options
    const wrongAnswers = new Set<number>();
    while (wrongAnswers.size < 3) {
      const wrong = answer + (Math.floor(Math.random() * 20) - 10);
      if (wrong !== answer && wrong > 0) {
        wrongAnswers.add(wrong);
      }
    }
    
    const options = [...wrongAnswers, answer].sort(() => Math.random() - 0.5);

    return { num1, num2, answer, options };
  }, [factFamily]);

  useEffect(() => {
    setCurrentProblem(generateProblem());
  }, [generateProblem]);

  const handleAnswer = (selectedAnswer: number) => {
    if (!currentProblem || showCorrect || showWrong || isSliding) return;

    if (selectedAnswer === currentProblem.answer) {
      // Correct!
      setShowCorrect(true);
      setStreak((prev) => prev + 1);
      
      const basePoints = 50;
      const streakBonus = streak * 5;
      const points = basePoints + streakBonus;
      setScore((prev) => prev + points);

      // Climb up
      const climbAmount = 10 + streak * 2;
      setPosition((prev) => Math.min(prev + climbAmount, summitPosition));

      setTimeout(() => {
        setShowCorrect(false);
        if (position + climbAmount >= summitPosition) {
          onComplete(score + points, 3);
        } else {
          setCurrentProblem(generateProblem());
        }
      }, 800);
    } else {
      // Wrong!
      setShowWrong(true);
      setWrongAnswer(selectedAnswer);
      setStreak(0);

      // Slide down
      setIsSliding(true);
      setPosition((prev) => Math.max(prev - 15, 0));

      setTimeout(() => {
        setShowWrong(false);
        setWrongAnswer(null);
        setIsSliding(false);
        setCurrentProblem(generateProblem());
      }, 1500);
    }
  };

  // Calculate climber position on mountain path
  const climberY = 100 - position;

  return (
    <GameWrapper
      gameId="multiplication-mountain"
      gameName={`${factFamily}× Mountain`}
      gameIcon="🏔️"
      level={level}
      onComplete={onComplete}
      onQuit={onQuit}
    >
      <div className="relative w-full h-full overflow-hidden">
        {/* Sky background */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200" />
        
        {/* Clouds */}
        <motion.div
          className="absolute top-20 left-10 text-6xl"
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          ☁️
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-4xl"
          animate={{ x: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          ☁️
        </motion.div>

        {/* Mountain */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: "200px solid transparent",
            borderRight: "200px solid transparent",
            borderBottom: "500px solid #6B7280",
          }}
        />
        
        {/* Snow cap */}
        <div
          className="absolute bottom-[400px] left-1/2 -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: "80px solid transparent",
            borderRight: "80px solid transparent",
            borderBottom: "100px solid #FFFFFF",
          }}
        />

        {/* Summit flag */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 text-4xl"
          style={{ bottom: `${400 + 80}px` }}
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🚩
        </motion.div>

        {/* Climber */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 text-5xl z-20"
          style={{ bottom: `${50 + position * 4}px` }}
          animate={isSliding ? { 
            y: [0, 10, 0],
            rotate: [-10, 10, 0]
          } : showCorrect ? {
            y: [0, -20, 0],
            scale: [1, 1.2, 1]
          } : {}}
        >
          🧗
        </motion.div>

        {/* Progress path markers */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-20">
          {[0, 25, 50, 75, 100].map((marker) => (
            <div
              key={marker}
              className={`absolute w-4 h-4 rounded-full ${
                position >= marker ? "bg-vibrant-green" : "bg-white/50"
              }`}
              style={{ bottom: `${marker * 4}px`, left: "-8px" }}
            />
          ))}
        </div>

        {/* Streak Display */}
        {streak > 0 && (
          <motion.div
            key={streak}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-24 right-4 bg-orange-500 text-white px-4 py-2 rounded-xl font-bold"
          >
            🔥 x{streak}
          </motion.div>
        )}

        {/* Problem Display */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 min-w-[320px]">
            {currentProblem && (
              <>
                <motion.div
                  key={`${currentProblem.num1}-${currentProblem.num2}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-6"
                >
                  <p className="text-5xl font-bold text-deep-space">
                    {currentProblem.num1} × {currentProblem.num2} = ?
                  </p>
                </motion.div>

                <div className="grid grid-cols-2 gap-3">
                  {currentProblem.options.map((option, i) => {
                    const isWrong = showWrong && option === wrongAnswer;
                    const isCorrectAnswer = option === currentProblem.answer;
                    
                    return (
                      <motion.button
                        key={i}
                        className={`p-4 rounded-xl text-2xl font-bold transition-all ${
                          showCorrect && isCorrectAnswer
                            ? "bg-vibrant-green text-white"
                            : isWrong
                              ? "bg-coral-pink text-white"
                              : "bg-cloud-gray hover:bg-cosmic-purple hover:text-white"
                        }`}
                        onClick={() => handleAnswer(option)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={showCorrect || showWrong}
                      >
                        {option}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Hint after wrong answer */}
                <AnimatePresence>
                  {showWrong && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center mt-4 text-deep-space/70"
                    >
                      The answer is {currentProblem.answer}!
                    </motion.p>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        </motion.div>

        {/* Slide animation effect */}
        <AnimatePresence>
          {isSliding && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-coral-pink/30 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success animation */}
        <AnimatePresence>
          {showCorrect && (
            <motion.div
              className="absolute top-1/4 left-1/2 -translate-x-1/2 text-6xl z-50"
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: -50 }}
            >
              ⬆️
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom instructions */}
        <motion.p
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-deep-space/60 text-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 3 }}
        >
          Answer correctly to climb! Wrong answers make you slide!
        </motion.p>
      </div>
    </GameWrapper>
  );
}

export default MultiplicationMountain;

