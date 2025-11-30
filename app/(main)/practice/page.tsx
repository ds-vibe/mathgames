"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageContainer, PageHeader, Section } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar, StreakBadge, LivesDisplay } from "@/components/ui/progress";
import { SubjectBadge, DifficultyBadge } from "@/components/ui/badge";
import { useAppState } from "@/store/useAppState";
import { XP_REWARDS } from "@/lib/constants";
import { Lightbulb, RotateCcw, ArrowRight, Check, X } from "lucide-react";

interface Problem {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  subject: "math" | "science";
  skill: string;
}

// Demo problems
const demoProblems: Problem[] = [
  {
    id: "1",
    question: "What is 7 × 8?",
    options: ["54", "56", "63", "48"],
    correctAnswer: 1,
    hint: "Think of it as 7 groups of 8, or 8 groups of 7",
    explanation: "7 × 8 = 56. You can remember this with the rhyme: 5, 6, 7, 8 → 56 = 7 × 8!",
    difficulty: "medium",
    subject: "math",
    skill: "multiplication",
  },
  {
    id: "2",
    question: "Which part of the plant absorbs water from the soil?",
    options: ["Leaves", "Stem", "Roots", "Flower"],
    correctAnswer: 2,
    hint: "This part grows underground",
    explanation: "Roots absorb water and nutrients from the soil. They also anchor the plant in the ground.",
    difficulty: "easy",
    subject: "science",
    skill: "plants",
  },
  {
    id: "3",
    question: "What is 1/2 + 1/4?",
    options: ["2/6", "1/6", "3/4", "2/4"],
    correctAnswer: 2,
    hint: "First, find a common denominator",
    explanation: "1/2 = 2/4, so 2/4 + 1/4 = 3/4",
    difficulty: "medium",
    subject: "math",
    skill: "fractions",
  },
  {
    id: "4",
    question: "What force pulls objects toward Earth?",
    options: ["Magnetism", "Friction", "Gravity", "Push"],
    correctAnswer: 2,
    hint: "This force keeps you on the ground",
    explanation: "Gravity is the force that pulls objects toward Earth. It's why things fall down, not up!",
    difficulty: "easy",
    subject: "science",
    skill: "forces",
  },
  {
    id: "5",
    question: "What is 156 + 287?",
    options: ["433", "443", "343", "453"],
    correctAnswer: 1,
    hint: "Add the ones, then tens, then hundreds",
    explanation: "156 + 287 = 443. 6+7=13 (write 3, carry 1), 5+8+1=14 (write 4, carry 1), 1+2+1=4",
    difficulty: "medium",
    subject: "math",
    skill: "addition",
  },
];

type SessionState = "select" | "playing" | "results";

export default function PracticePage() {
  const { user, addXP, practice, startPractice, endPractice, recordAnswer, useHint } = useAppState();
  
  const [sessionState, setSessionState] = useState<SessionState>("select");
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [answers, setAnswers] = useState<{ correct: boolean; hintUsed: boolean }[]>([]);

  const currentProblem = problems[currentProblemIndex];
  const isCorrect = selectedAnswer === currentProblem?.correctAnswer;

  const startSession = (subject: "math" | "science" | "all", difficulty: "easy" | "medium" | "hard" | "adaptive") => {
    const filtered = demoProblems.filter((p) => {
      const subjectMatch = subject === "all" || p.subject === subject;
      const diffMatch = difficulty === "adaptive" || p.difficulty === difficulty;
      return subjectMatch && diffMatch;
    });
    
    // Shuffle and take 5 problems
    const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, 5);
    setProblems(shuffled);
    setCurrentProblemIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowHint(false);
    setAnswers([]);
    startPractice("mixed", difficulty);
    setSessionState("playing");
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    
    const correct = index === currentProblem.correctAnswer;
    recordAnswer(correct);
    setAnswers([...answers, { correct, hintUsed: showHint }]);
    
    // Award XP
    if (correct) {
      const xp = showHint
        ? Math.floor(XP_REWARDS.PRACTICE_PROBLEM_CORRECT * 0.7)
        : XP_REWARDS.PRACTICE_PROBLEM_FIRST_TRY;
      addXP(xp);
    }
  };

  const nextProblem = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHint(false);
    } else {
      setSessionState("results");
    }
  };

  const resetSession = () => {
    setSessionState("select");
    endPractice();
  };

  return (
    <PageContainer>
      <PageHeader
        title="Brain Gym"
        subtitle="Practice makes perfect!"
        emoji="🧠"
      />

      <AnimatePresence mode="wait">
        {/* Selection Screen */}
        {sessionState === "select" && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Section title="Choose Your Workout">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Quick Start */}
                <Card interactive onClick={() => startSession("all", "adaptive")} gradient="cosmic" padding="lg" overflow="visible">
                  <div className="flex items-center gap-5 overflow-visible px-2">
                    <motion.div
                      className="text-5xl flex-shrink-0"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ⚡
                    </motion.div>
                    <div className="flex-1 min-w-[1px] overflow-visible">
                      <h3 className="text-xl font-bold text-white mb-1 overflow-visible break-words">Quick Practice</h3>
                      <p className="text-white/80 overflow-visible break-words">5 mixed problems, adaptive difficulty</p>
                    </div>
                  </div>
                </Card>

                {/* Math Focus */}
                <Card interactive onClick={() => startSession("math", "adaptive")}>
                  <div className="flex items-center gap-5">
                    <div className="text-5xl">📐</div>
                    <div>
                      <h3 className="text-xl font-bold text-deep-space">Math Practice</h3>
                      <p className="text-deep-space/60">Focus on math skills</p>
                    </div>
                  </div>
                </Card>

                {/* Science Focus */}
                <Card interactive onClick={() => startSession("science", "adaptive")}>
                  <div className="flex items-center gap-5">
                    <div className="text-5xl">🔬</div>
                    <div>
                      <h3 className="text-xl font-bold text-deep-space">Science Practice</h3>
                      <p className="text-deep-space/60">Focus on science skills</p>
                    </div>
                  </div>
                </Card>

                {/* Custom */}
                <Card className="border-2 border-dashed border-cloud-gray bg-transparent">
                  <div className="flex items-center gap-5">
                    <div className="text-5xl">⚙️</div>
                    <div>
                      <h3 className="text-xl font-bold text-deep-space/50">Custom Practice</h3>
                      <p className="text-deep-space/40">Choose specific skills (coming soon)</p>
                    </div>
                  </div>
                </Card>
              </div>
            </Section>

            {/* Recent Performance */}
            <Section title="Your Stats">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Card className="text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-2xl font-bold text-deep-space">85%</div>
                  <div className="text-sm text-deep-space/60">Accuracy</div>
                </Card>
                <Card className="text-center">
                  <div className="text-3xl mb-2">🔥</div>
                  <div className="text-2xl font-bold text-deep-space">{practice.streak || 12}</div>
                  <div className="text-sm text-deep-space/60">Best Streak</div>
                </Card>
                <Card className="text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <div className="text-2xl font-bold text-deep-space">342</div>
                  <div className="text-sm text-deep-space/60">Problems Solved</div>
                </Card>
                <Card className="text-center">
                  <div className="text-3xl mb-2">⏱️</div>
                  <div className="text-2xl font-bold text-deep-space">2.5h</div>
                  <div className="text-sm text-deep-space/60">Total Practice</div>
                </Card>
              </div>
            </Section>
          </motion.div>
        )}

        {/* Playing Screen */}
        {sessionState === "playing" && currentProblem && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <SubjectBadge subject={currentProblem.subject} />
                  <DifficultyBadge difficulty={currentProblem.difficulty} />
                </div>
                <div className="flex items-center gap-4">
                  <StreakBadge days={practice.streak} size="sm" showFlame={practice.streak > 0} />
                  <span className="text-sm text-deep-space/60">
                    {currentProblemIndex + 1} / {problems.length}
                  </span>
                </div>
              </div>
              <ProgressBar
                value={currentProblemIndex + (showResult ? 1 : 0)}
                max={problems.length}
                color="gradient"
              />
            </div>

            {/* Problem Card */}
            <Card className="mb-8" padding="xl">
              <div className="text-center py-6 md:py-10">
                <motion.h2
                  key={currentProblem.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-3xl md:text-4xl font-bold text-deep-space mb-10 leading-tight"
                >
                  {currentProblem.question}
                </motion.h2>

                {/* Answer Options - Full width */}
                <div className="grid grid-cols-2 gap-5 max-w-2xl mx-auto">
                  {currentProblem.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrectAnswer = index === currentProblem.correctAnswer;
                    
                    let buttonClass = "bg-cloud-gray hover:bg-soft-gray text-deep-space border-2 border-transparent";
                    if (showResult) {
                      if (isCorrectAnswer) {
                        buttonClass = "bg-vibrant-green/20 text-vibrant-green-dark border-2 border-vibrant-green";
                      } else if (isSelected && !isCorrectAnswer) {
                        buttonClass = "bg-coral-pink/20 text-coral-pink-dark border-2 border-coral-pink";
                      } else {
                        buttonClass = "bg-cloud-gray/50 text-deep-space/40 border-2 border-transparent";
                      }
                    } else if (isSelected) {
                      buttonClass = "bg-cosmic-purple text-white border-2 border-cosmic-purple";
                    }

                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={showResult}
                        className={`p-5 md:p-6 rounded-2xl font-bold text-lg md:text-xl transition-all ${buttonClass}`}
                        whileHover={!showResult ? { scale: 1.02 } : undefined}
                        whileTap={!showResult ? { scale: 0.98 } : undefined}
                      >
                        <span className="flex items-center justify-center gap-3">
                          {option}
                          {showResult && isCorrectAnswer && <Check className="w-6 h-6" />}
                          {showResult && isSelected && !isCorrectAnswer && <X className="w-6 h-6" />}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Hint Button */}
                {!showResult && !showHint && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    onClick={() => {
                      setShowHint(true);
                      useHint();
                    }}
                    className="mt-6 flex items-center gap-2 mx-auto text-cosmic-purple hover:text-cosmic-purple-dark transition-colors"
                  >
                    <Lightbulb className="w-5 h-5" />
                    <span>Need a hint?</span>
                  </motion.button>
                )}

                {/* Hint Display */}
                <AnimatePresence>
                  {showHint && !showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-6 p-4 bg-sunny-yellow/20 rounded-xl text-deep-space"
                    >
                      <span className="flex items-center gap-2 justify-center">
                        <Lightbulb className="w-5 h-5 text-sunny-yellow-dark" />
                        {currentProblem.hint}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Result Display */}
                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6"
                    >
                      <div
                        className={`p-4 rounded-xl ${
                          isCorrect
                            ? "bg-vibrant-green/20 text-vibrant-green-dark"
                            : "bg-coral-pink/20 text-coral-pink-dark"
                        }`}
                      >
                        <p className="font-bold text-lg mb-2">
                          {isCorrect ? "🎉 Correct!" : "❌ Not quite!"}
                        </p>
                        <p>{currentProblem.explanation}</p>
                      </div>

                      <Button onClick={nextProblem} className="mt-6" rightIcon={<ArrowRight className="w-4 h-4" />}>
                        {currentProblemIndex < problems.length - 1 ? "Next Problem" : "See Results"}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>

            {/* Quit Button */}
            <div className="text-center">
              <button
                onClick={resetSession}
                className="text-sm text-deep-space/50 hover:text-coral-pink transition-colors"
              >
                End Session
              </button>
            </div>
          </motion.div>
        )}

        {/* Results Screen */}
        {sessionState === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card gradient="cosmic" className="max-w-lg mx-auto overflow-visible" padding="xl">
              <div className="overflow-visible px-4">
                <motion.div
                  className="text-6xl mb-6"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  🎉
                </motion.div>
              
                <h2 className="text-2xl font-bold text-white mb-3 overflow-visible break-words px-2">Practice Complete!</h2>
                
                <div className="grid grid-cols-3 gap-4 my-6 overflow-visible">
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="text-3xl font-bold text-white">
                    {answers.filter((a) => a.correct).length}/{answers.length}
                  </div>
                  <div className="text-sm text-white/70">Correct</div>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="text-3xl font-bold text-white">
                    {Math.round((answers.filter((a) => a.correct).length / answers.length) * 100)}%
                  </div>
                  <div className="text-sm text-white/70">Accuracy</div>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="text-3xl font-bold text-sunny-yellow">
                    +{answers.filter((a) => a.correct).length * (answers.some((a) => a.hintUsed) ? 10 : 15)}
                  </div>
                  <div className="text-sm text-white/70">XP Earned</div>
                </div>
                </div>

                <div className="flex gap-4 justify-center mt-6 overflow-visible">
                  <Button
                    variant="ghost"
                    className="text-white border-white hover:bg-white/20"
                    onClick={resetSession}
                    leftIcon={<RotateCcw className="w-4 h-4" />}
                  >
                    Practice Again
                  </Button>
                  <Button
                    className="bg-white text-cosmic-purple hover:bg-white/90"
                    onClick={resetSession}
                  >
                    Done 🚀
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  );
}

