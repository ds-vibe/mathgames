"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { useAppState } from "@/store/useAppState";
import { getPassageById, type ComprehensionQuestion } from "@/content/reading/passages";
import { ArrowLeft, BookOpen, HelpCircle, CheckCircle, XCircle, Volume2, Home } from "lucide-react";

type Phase = "reading" | "vocabulary" | "questions" | "complete";

export default function ReadingPassagePage() {
  const params = useParams();
  const router = useRouter();
  const { addXP } = useAppState();
  
  const passageId = params.passageId as string;
  const passage = getPassageById(passageId);

  const [phase, setPhase] = useState<Phase>("reading");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xl">("normal");

  if (!passage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cloud-white p-6">
        <Card className="p-10 md:p-12 text-center max-w-md" overflow="visible">
          <motion.div
            className="text-7xl mb-8"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            📚
          </motion.div>
          <h2 className="text-3xl font-bold text-deep-space mb-4">Story Not Found</h2>
          <p className="text-lg text-deep-space/60 mb-8 leading-relaxed">
            Oops! We couldn't find this story. It might have been moved or doesn't exist yet.
          </p>
          <Button size="lg" onClick={() => router.push("/read")}>
            <Home className="w-5 h-5 mr-2" />
            Back to Library
          </Button>
        </Card>
      </div>
    );
  }

  // Handle coming soon passages
  if (passage.comingSoon) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cloud-white p-6">
        <Card className="p-10 md:p-12 text-center max-w-md" overflow="visible">
          <motion.div
            className="text-6xl mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {passage.thumbnail}
          </motion.div>
          <h2 className="text-2xl font-bold text-deep-space mb-2">{passage.title}</h2>
          <p className="text-deep-space/60 mb-4">{passage.description}</p>
          <div className="bg-sunny-yellow/20 rounded-xl p-4 mb-6">
            <p className="text-sunny-yellow-dark font-medium">
              🚧 This story is coming soon! Check back later.
            </p>
          </div>
          <Button onClick={() => router.push("/read")}>Back to Library</Button>
        </Card>
      </div>
    );
  }

  const currentQuestion = passage.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + (showResult ? 1 : 0)) / passage.questions.length) * 100;
  const isCorrect = selectedAnswer !== null && selectedAnswer === currentQuestion?.correctAnswer;

  const fontSizeClass = {
    normal: "text-lg leading-relaxed",
    large: "text-xl leading-relaxed",
    xl: "text-2xl leading-loose",
  }[fontSize];

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === currentQuestion.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
      addXP(15);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < passage.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      const accuracy = (correctCount / passage.questions.length) * 100;
      addXP(accuracy >= 80 ? 75 : 30);
      setPhase("complete");
    }
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
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
              onClick={() => router.push("/read")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit
            </Button>
            <span className="text-sm text-deep-space/60 truncate max-w-[200px]">
              {passage.title}
            </span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setFontSize((prev) =>
                    prev === "normal" ? "large" : prev === "large" ? "xl" : "normal"
                  )
                }
              >
                Aa
              </Button>
            </div>
          </div>
          {phase === "questions" && (
            <ProgressBar value={progress} color="green" size="sm" />
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Reading Phase */}
          {phase === "reading" && (
            <motion.div
              key="reading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <span className="text-6xl">{passage.thumbnail}</span>
                <h1 className="text-2xl font-bold text-deep-space mt-4 mb-2">
                  {passage.title}
                </h1>
                <div className="flex items-center justify-center gap-4 text-sm text-deep-space/60">
                  <span>Grade {passage.grade}</span>
                  <span>•</span>
                  <span>{passage.estimatedMinutes} min read</span>
                  <span>•</span>
                  <span className="capitalize">{passage.category.replace("-", " ")}</span>
                </div>
              </div>

              {/* Listen Button */}
              <div className="text-center mb-6">
                <Button
                  variant="outline"
                  onClick={() => speakText(passage.content)}
                  className="gap-2"
                >
                  <Volume2 className="w-4 h-4" />
                  Listen to Story
                </Button>
              </div>

              {/* Content */}
              <Card className="p-6 md:p-8 mb-6">
                <div className={`${fontSizeClass} text-deep-space whitespace-pre-line`}>
                  {passage.content}
                </div>
              </Card>

              {/* Continue Button */}
              <div className="text-center">
                <Button size="lg" onClick={() => setPhase("vocabulary")}>
                  I'm Done Reading! 📖
                </Button>
              </div>
            </motion.div>
          )}

          {/* Vocabulary Phase */}
          {phase === "vocabulary" && (
            <motion.div
              key="vocabulary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <BookOpen className="w-12 h-12 text-cosmic-purple mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-deep-space">New Words!</h2>
                  <p className="text-deep-space/60">Let's learn some vocabulary from the story</p>
                </div>

                <div className="space-y-4 mb-8">
                  {passage.vocabulary.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="p-4 bg-cloud-gray rounded-xl"
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => speakText(`${item.word}. ${item.definition}`)}
                          className="p-2 bg-cosmic-purple/10 rounded-full hover:bg-cosmic-purple/20 transition-colors"
                        >
                          <Volume2 className="w-4 h-4 text-cosmic-purple" />
                        </button>
                        <div>
                          <span className="font-bold text-cosmic-purple text-lg">{item.word}</span>
                          <p className="text-deep-space mt-1">{item.definition}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center">
                  <Button size="lg" onClick={() => setPhase("questions")}>
                    Ready for Questions! ✨
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Questions Phase */}
          {phase === "questions" && currentQuestion && (
            <motion.div
              key={`question-${currentQuestionIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <Card className="p-6 md:p-8">
                <div className="text-center mb-2">
                  <span className="text-sm text-deep-space/60">
                    Question {currentQuestionIndex + 1} of {passage.questions.length}
                  </span>
                </div>

                <div className="flex items-start gap-3 mb-6">
                  <HelpCircle className="w-6 h-6 text-cosmic-purple flex-shrink-0 mt-1" />
                  <h2 className="text-xl font-bold text-deep-space">
                    {currentQuestion.question}
                  </h2>
                </div>

                <div className="space-y-3 mb-6">
                  {currentQuestion.options.map((option, i) => {
                    const isSelected = selectedAnswer === i;
                    const isCorrectAnswer = i === currentQuestion.correctAnswer;
                    
                    let buttonClass = "bg-cloud-gray hover:bg-cosmic-purple hover:text-white border-2 border-transparent";
                    if (showResult) {
                      if (isCorrectAnswer) {
                        buttonClass = "bg-vibrant-green/20 border-2 border-vibrant-green text-vibrant-green-dark";
                      } else if (isSelected && !isCorrectAnswer) {
                        buttonClass = "bg-coral-pink/20 border-2 border-coral-pink text-coral-pink-dark";
                      } else {
                        buttonClass = "bg-cloud-gray/50 text-deep-space/50 border-2 border-transparent";
                      }
                    } else if (isSelected) {
                      buttonClass = "bg-cosmic-purple text-white border-2 border-cosmic-purple";
                    }

                    return (
                      <motion.button
                        key={i}
                        className={`w-full p-4 rounded-xl text-left font-medium transition-all ${buttonClass}`}
                        onClick={() => handleAnswer(i)}
                        disabled={showResult}
                        whileHover={!showResult ? { scale: 1.01 } : undefined}
                        whileTap={!showResult ? { scale: 0.99 } : undefined}
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center font-bold">
                            {String.fromCharCode(65 + i)}
                          </span>
                          {option}
                          {showResult && isCorrectAnswer && (
                            <CheckCircle className="w-5 h-5 ml-auto text-vibrant-green" />
                          )}
                          {showResult && isSelected && !isCorrectAnswer && (
                            <XCircle className="w-5 h-5 ml-auto text-coral-pink" />
                          )}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

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
                        <p>{currentQuestion.explanation}</p>
                      </div>

                      <div className="text-center">
                        <Button onClick={handleNextQuestion} size="lg">
                          {currentQuestionIndex < passage.questions.length - 1
                            ? "Next Question →"
                            : "Finish 🎉"}
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
              <Card gradient="nature" className="p-8">
                <motion.div
                  className="text-8xl mb-4"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  📚
                </motion.div>
                
                <h2 className="text-3xl font-bold text-white mb-2">Reading Complete!</h2>
                <p className="text-white/80 mb-6">{passage.title}</p>

                <div className="bg-white/20 rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/60 text-sm">Comprehension</p>
                      <p className="text-3xl font-bold text-white">
                        {Math.round((correctCount / passage.questions.length) * 100)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Correct</p>
                      <p className="text-3xl font-bold text-white">
                        {correctCount}/{passage.questions.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    onClick={() => router.push("/read")}
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Back to Library
                  </Button>
                  <Button
                    className="bg-white text-vibrant-green-dark hover:bg-white/90"
                    onClick={() => {
                      setPhase("reading");
                      setCurrentQuestionIndex(0);
                      setCorrectCount(0);
                      setSelectedAnswer(null);
                      setShowResult(false);
                    }}
                  >
                    Read Again
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

