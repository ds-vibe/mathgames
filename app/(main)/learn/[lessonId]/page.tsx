"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar, MasteryStars } from "@/components/ui/progress";
import { SuccessModal } from "@/components/ui/modal";
import { useAppState } from "@/store/useAppState";
import { mathCurriculum, type MathProblem } from "@/content/curriculum/math";
import { scienceCurriculum, type ScienceProblem } from "@/content/curriculum/science";
import { ArrowLeft, ArrowRight, Lightbulb, CheckCircle, XCircle, Home } from "lucide-react";

type LessonPhase = "intro" | "learn" | "practice" | "complete";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { addXP } = useAppState();
  
  const lessonId = params.lessonId as string;
  
  // Find lesson from curriculum
  const mathLesson = mathCurriculum.find((l) => l.id === lessonId);
  const scienceLesson = scienceCurriculum.find((l) => l.id === lessonId);
  const lesson = mathLesson || scienceLesson;

  const [phase, setPhase] = useState<LessonPhase>("intro");
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cloud-white p-4">
        <Card className="p-10 md:p-12 text-center max-w-md" overflow="visible">
          <motion.div
            className="text-7xl mb-8"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            📚
          </motion.div>
          <h2 className="text-3xl font-bold text-deep-space mb-4">Lesson Not Found</h2>
          <p className="text-lg text-deep-space/60 mb-8 leading-relaxed">
            Oops! We couldn't find this lesson. It might have been moved or doesn't exist yet.
          </p>
          <Button size="lg" onClick={() => router.push("/learn")}>
            <Home className="w-5 h-5 mr-2" />
            Back to Learn
          </Button>
        </Card>
      </div>
    );
  }

  const problems = lesson.problems;
  const currentProblem = problems[currentProblemIndex];
  const progress = ((currentProblemIndex + (showResult ? 1 : 0)) / problems.length) * 100;
  const isCorrect = selectedAnswer !== null && selectedAnswer === currentProblem?.correctAnswer;

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === currentProblem.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
      addXP(10);
    }
  };

  const handleNext = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHint(false);
    } else {
      // Lesson complete!
      const accuracy = (correctCount / problems.length) * 100;
      addXP(accuracy >= 80 ? 100 : 50);
      setPhase("complete");
      setShowCompletion(true);
    }
  };

  const handleStartPractice = () => {
    setPhase("practice");
    setCurrentProblemIndex(0);
    setCorrectCount(0);
  };

  return (
    <div className="min-h-screen bg-cloud-white">
      {/* Header */}
      <div className="bg-white border-b border-cloud-gray sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/learn")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit
            </Button>
            <span className="text-sm text-deep-space/60">
              {phase === "practice" ? `${currentProblemIndex + 1}/${problems.length}` : lesson.title}
            </span>
            <div className="w-20" />
          </div>
          {phase === "practice" && (
            <ProgressBar value={progress} color="gradient" size="sm" />
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          {/* Intro Phase */}
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <motion.div
                className="text-8xl mb-6"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {lesson.icon}
              </motion.div>
              
              <h1 className="text-3xl font-bold text-deep-space mb-2">
                {lesson.title}
              </h1>
              <p className="text-lg text-deep-space/60 mb-8">
                {lesson.description}
              </p>

              <div className="flex justify-center gap-4 mb-8">
                <div className="bg-cloud-gray rounded-xl px-4 py-2">
                  <p className="text-sm text-deep-space/60">Grade</p>
                  <p className="font-bold text-deep-space">{lesson.grade}</p>
                </div>
                <div className="bg-cloud-gray rounded-xl px-4 py-2">
                  <p className="text-sm text-deep-space/60">Time</p>
                  <p className="font-bold text-deep-space">{lesson.estimatedMinutes} min</p>
                </div>
                <div className="bg-cloud-gray rounded-xl px-4 py-2">
                  <p className="text-sm text-deep-space/60">Questions</p>
                  <p className="font-bold text-deep-space">{problems.length}</p>
                </div>
              </div>

              <Button size="xl" onClick={() => setPhase("learn")}>
                Start Lesson 🚀
              </Button>
            </motion.div>
          )}

          {/* Learn Phase (concept introduction) */}
          {phase === "learn" && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-8 mb-6">
                <div className="text-center mb-8">
                  <span className="text-6xl mb-4 block">{lesson.icon}</span>
                  <h2 className="text-2xl font-bold text-deep-space mb-2">
                    Let's Learn About {lesson.title}
                  </h2>
                </div>

                {/* Vocabulary (for science) */}
                {"vocabulary" in lesson && lesson.vocabulary && (
                  <div className="mb-8">
                    <h3 className="font-bold text-deep-space mb-4">Key Words</h3>
                    <div className="space-y-3">
                      {lesson.vocabulary.map((word, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-4 bg-cloud-gray rounded-xl"
                        >
                          <span className="font-bold text-cosmic-purple">{word.term}:</span>{" "}
                          <span className="text-deep-space">{word.definition}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Tips */}
                <div className="bg-sunny-yellow/20 rounded-xl p-4 mb-6">
                  <h3 className="font-bold text-deep-space flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-sunny-yellow-dark" />
                    Quick Tip
                  </h3>
                  <p className="text-deep-space/80">
                    Take your time with each question. If you get stuck, use the hint button!
                  </p>
                </div>

                <div className="text-center">
                  <Button size="lg" onClick={handleStartPractice}>
                    Ready to Practice! ✨
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Practice Phase */}
          {phase === "practice" && currentProblem && (
            <motion.div
              key={`problem-${currentProblemIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <Card className="p-8">
                {/* Question */}
                <div className="text-center mb-8">
                  <motion.h2
                    className="text-2xl md:text-3xl font-bold text-deep-space"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                  >
                    {currentProblem.question}
                  </motion.h2>
                </div>

                {/* Answer Options */}
                <div className="grid grid-cols-2 gap-5 mb-8">
                  {currentProblem.options?.map((option, i) => {
                    const isSelected = selectedAnswer === i;
                    const isCorrectAnswer = i === currentProblem.correctAnswer;
                    
                    let buttonClass = "bg-cloud-gray hover:bg-cosmic-purple hover:text-white border-2 border-transparent";
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
                        key={i}
                        className={`p-5 md:p-6 rounded-2xl text-lg md:text-xl font-semibold transition-all ${buttonClass}`}
                        onClick={() => handleAnswer(i)}
                        disabled={showResult}
                        whileHover={!showResult ? { scale: 1.02 } : undefined}
                        whileTap={!showResult ? { scale: 0.98 } : undefined}
                      >
                        <span className="flex items-center justify-center gap-3">
                          {option}
                          {showResult && isCorrectAnswer && <CheckCircle className="w-6 h-6" />}
                          {showResult && isSelected && !isCorrectAnswer && <XCircle className="w-6 h-6" />}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Hint Button */}
                {!showResult && !showHint && (
                  <div className="text-center mb-4">
                    <button
                      onClick={() => setShowHint(true)}
                      className="text-cosmic-purple hover:underline flex items-center gap-2 mx-auto"
                    >
                      <Lightbulb className="w-4 h-4" />
                      Need a hint?
                    </button>
                  </div>
                )}

                {/* Hint Display */}
                <AnimatePresence>
                  {showHint && !showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-sunny-yellow/20 rounded-xl text-center mb-4"
                    >
                      <p className="text-deep-space">
                        <Lightbulb className="w-4 h-4 inline mr-2 text-sunny-yellow-dark" />
                        {currentProblem.hint}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Result and Explanation */}
                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div
                        className={`p-4 rounded-xl text-center mb-6 ${
                          isCorrect
                            ? "bg-vibrant-green/20 text-vibrant-green-dark"
                            : "bg-coral-pink/20 text-coral-pink-dark"
                        }`}
                      >
                        <p className="font-bold text-lg mb-1">
                          {isCorrect ? "🎉 Correct!" : "Not quite..."}
                        </p>
                        <p>{currentProblem.explanation}</p>
                      </div>

                      <div className="text-center">
                        <Button onClick={handleNext} size="lg">
                          {currentProblemIndex < problems.length - 1 ? (
                            <>
                              Next Question
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                          ) : (
                            "Finish Lesson 🎉"
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          )}

          {/* Complete Phase */}
          {phase === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <Card gradient="cosmic" className="p-8">
                <motion.div
                  className="text-8xl mb-4"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  🎉
                </motion.div>
                
                <h2 className="text-3xl font-bold text-white mb-2">Lesson Complete!</h2>
                <p className="text-white/80 mb-6">{lesson.title}</p>

                <div className="bg-white/20 rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/60 text-sm">Accuracy</p>
                      <p className="text-3xl font-bold text-white">
                        {Math.round((correctCount / problems.length) * 100)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Correct</p>
                      <p className="text-3xl font-bold text-white">
                        {correctCount}/{problems.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mb-6">
                  <MasteryStars
                    level={
                      correctCount === problems.length
                        ? "mastered"
                        : correctCount >= problems.length * 0.8
                          ? "proficient"
                          : correctCount >= problems.length * 0.6
                            ? "developing"
                            : "intro"
                    }
                    size="lg"
                  />
                </div>

                <div className="flex gap-4 justify-center">
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    onClick={() => router.push("/learn")}
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Back to Learn
                  </Button>
                  <Button
                    className="bg-white text-cosmic-purple hover:bg-white/90"
                    onClick={() => {
                      setPhase("practice");
                      setCurrentProblemIndex(0);
                      setCorrectCount(0);
                      setSelectedAnswer(null);
                      setShowResult(false);
                    }}
                  >
                    Practice Again
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

