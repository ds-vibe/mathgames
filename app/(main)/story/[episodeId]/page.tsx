"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { SuccessModal } from "@/components/ui/modal";
import { getEpisodeById, type DialogueLine, type StoryScene } from "@/content/stories/episodes";
import { STORY_CHARACTERS } from "@/lib/constants";
import { useAppState } from "@/store/useAppState";
import { ArrowLeft, ArrowRight, Home, Volume2 } from "lucide-react";

export default function StoryPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const { addXP } = useAppState();
  
  const episode = getEpisodeById(params.episodeId as string);
  
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [showProblem, setShowProblem] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [problemsSolved, setProblemsSolved] = useState(0);

  if (!episode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-deep-space p-6">
        <Card className="p-10 md:p-12 text-center max-w-md" overflow="visible">
          <motion.div
            className="text-7xl mb-8"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            📖
          </motion.div>
          <h2 className="text-3xl font-bold text-deep-space mb-4">Episode Not Found</h2>
          <p className="text-lg text-deep-space/60 mb-8 leading-relaxed">
            Oops! We couldn't find this episode. It might have been moved or doesn't exist yet.
          </p>
          <Button size="lg" onClick={() => router.push("/story")}>
            Back to Stories
          </Button>
        </Card>
      </div>
    );
  }

  const currentScene = episode.scenes[currentSceneIndex];
  const currentDialogue = currentScene?.dialogue[currentDialogueIndex];
  const totalDialogues = currentScene?.dialogue.length || 0;
  const totalScenes = episode.scenes.length;
  const progress = ((currentSceneIndex + currentDialogueIndex / totalDialogues) / totalScenes) * 100;

  const getCharacterInfo = (characterId: string) => {
    if (characterId === "narrator") {
      return { name: "Narrator", emoji: "📖", color: "#6B7280" };
    }
    const charKey = characterId === "professor" ? "professorAtom" : characterId;
    const character = STORY_CHARACTERS[charKey as keyof typeof STORY_CHARACTERS];
    return character || { name: characterId, emoji: "👤", color: "#7C4DFF" };
  };

  const handleNext = () => {
    if (showProblem && !showResult) {
      // Need to answer the problem first
      return;
    }

    if (showResult) {
      // Problem was answered, move on
      setShowProblem(false);
      setShowResult(false);
      setSelectedAnswer(null);
    }

    // Check if there's a problem to show
    if (!showProblem && currentScene.problem && currentDialogueIndex === totalDialogues - 1) {
      setShowProblem(true);
      return;
    }

    // Move to next dialogue
    if (currentDialogueIndex < totalDialogues - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    } else {
      // Move to next scene
      if (currentSceneIndex < totalScenes - 1) {
        setCurrentSceneIndex(currentSceneIndex + 1);
        setCurrentDialogueIndex(0);
      } else {
        // Episode complete!
        handleEpisodeComplete();
      }
    }
  };

  const handleBack = () => {
    if (showProblem) {
      setShowProblem(false);
      return;
    }

    if (currentDialogueIndex > 0) {
      setCurrentDialogueIndex(currentDialogueIndex - 1);
    } else if (currentSceneIndex > 0) {
      setCurrentSceneIndex(currentSceneIndex - 1);
      const prevScene = episode.scenes[currentSceneIndex - 1];
      setCurrentDialogueIndex(prevScene.dialogue.length - 1);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentScene.problem) return;

    const correct = selectedAnswer === currentScene.problem.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setProblemsSolved((prev) => prev + 1);
      addXP(25);
    }
  };

  const handleEpisodeComplete = () => {
    setShowCompletion(true);
    addXP(150); // Episode completion bonus
  };

  const characterInfo = currentDialogue ? getCharacterInfo(currentDialogue.character) : null;

  return (
    <div className="min-h-screen bg-deep-space relative overflow-hidden">
      {/* Background based on scene */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          currentScene?.background === "observatory"
            ? "bg-gradient-to-b from-indigo-900 via-purple-900 to-black"
            : currentScene?.background === "garden"
              ? "bg-gradient-to-b from-green-400 via-green-500 to-green-700"
              : currentScene?.background === "lab"
                ? "bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900"
                : currentScene?.background === "kitchen"
                  ? "bg-gradient-to-b from-orange-200 via-orange-300 to-orange-400"
                  : "bg-gradient-to-b from-cosmic-purple via-cosmic-purple-dark to-deep-space"
        }`}
      />

      {/* Stars for night scenes */}
      {(currentScene?.background?.includes("observatory") || 
        currentScene?.background?.includes("telescope")) && (
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>
      )}

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/story")}
            className="text-white"
          >
            <Home className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <ProgressBar value={progress} color="gradient" size="sm" />
          </div>
          <p className="text-white/60 text-sm">
            {currentSceneIndex + 1}/{totalScenes}
          </p>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative z-10 min-h-screen flex flex-col pt-20 pb-32">
        <AnimatePresence mode="wait">
          {!showProblem ? (
            // Dialogue display
            <motion.div
              key={`${currentSceneIndex}-${currentDialogueIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex items-center justify-center px-4"
            >
              {currentDialogue && characterInfo && (
                <div className="w-full max-w-2xl">
                  {/* Character display */}
                  {currentDialogue.character !== "narrator" && (
                    <motion.div
                      className="flex justify-center mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <motion.div
                        className="text-8xl"
                        animate={
                          currentDialogue.emotion === "excited"
                            ? { y: [0, -20, 0], rotate: [0, 10, -10, 0] }
                            : currentDialogue.emotion === "surprised"
                              ? { scale: [1, 1.2, 1] }
                              : currentDialogue.emotion === "worried"
                                ? { x: [-5, 5, -5, 5, 0] }
                                : {}
                        }
                        transition={{ duration: 0.5 }}
                      >
                        {characterInfo.emoji}
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Dialogue bubble */}
                  <Card
                    className={`p-6 ${
                      currentDialogue.character === "narrator"
                        ? "bg-white/10 backdrop-blur-sm border border-white/20"
                        : "bg-white"
                    }`}
                  >
                    {currentDialogue.character !== "narrator" && (
                      <p
                        className="font-bold mb-2"
                        style={{ color: characterInfo.color }}
                      >
                        {characterInfo.name}
                      </p>
                    )}
                    <p
                      className={`text-xl md:text-2xl ${
                        currentDialogue.character === "narrator"
                          ? "text-white italic"
                          : "text-deep-space"
                      }`}
                    >
                      {currentDialogue.text}
                    </p>
                  </Card>
                </div>
              )}
            </motion.div>
          ) : (
            // Problem display
            <motion.div
              key="problem"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex-1 flex items-center justify-center px-4"
            >
              {currentScene.problem && (
                <Card className="w-full max-w-lg p-6">
                  <h3 className="text-xl font-bold text-deep-space mb-4 text-center">
                    🧠 Challenge Time!
                  </h3>
                  
                  <p className="text-lg text-deep-space mb-6 text-center">
                    {currentScene.problem.question}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {currentScene.problem.options.map((option, i) => {
                      const isSelected = selectedAnswer === i;
                      const isCorrectAnswer = i === currentScene.problem!.correctAnswer;
                      
                      let buttonClass = "bg-cloud-gray hover:bg-cosmic-purple hover:text-white";
                      if (showResult) {
                        if (isCorrectAnswer) {
                          buttonClass = "bg-vibrant-green text-white";
                        } else if (isSelected && !isCorrectAnswer) {
                          buttonClass = "bg-coral-pink text-white";
                        }
                      } else if (isSelected) {
                        buttonClass = "bg-cosmic-purple text-white";
                      }

                      return (
                        <motion.button
                          key={i}
                          className={`p-4 rounded-xl font-medium transition-all ${buttonClass}`}
                          onClick={() => handleAnswerSelect(i)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={showResult}
                        >
                          {option}
                        </motion.button>
                      );
                    })}
                  </div>

                  {!showResult ? (
                    <Button
                      fullWidth
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div
                        className={`p-4 rounded-xl text-center mb-4 ${
                          isCorrect
                            ? "bg-vibrant-green/20 text-vibrant-green-dark"
                            : "bg-coral-pink/20 text-coral-pink-dark"
                        }`}
                      >
                        <p className="font-bold text-lg mb-1">
                          {isCorrect ? "🎉 Correct!" : "Not quite..."}
                        </p>
                        <p>
                          {isCorrect
                            ? currentScene.problem.successResponse
                            : currentScene.problem.hintResponse}
                        </p>
                      </div>
                      <Button fullWidth onClick={handleNext}>
                        Continue Story
                      </Button>
                    </motion.div>
                  )}
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      {!showProblem && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-deep-space/80 to-transparent">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentSceneIndex === 0 && currentDialogueIndex === 0}
              className="text-white"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>

            <div className="flex items-center gap-2">
              {[...Array(totalDialogues)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentDialogueIndex
                      ? "bg-white w-4"
                      : i < currentDialogueIndex
                        ? "bg-white/60"
                        : "bg-white/30"
                  }`}
                />
              ))}
            </div>

            <Button onClick={handleNext} className="text-white">
              {currentSceneIndex === totalScenes - 1 &&
              currentDialogueIndex === totalDialogues - 1 &&
              !currentScene.problem
                ? "Finish"
                : "Next"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Completion Modal */}
      <SuccessModal
        isOpen={showCompletion}
        onClose={() => router.push("/story")}
        title="Episode Complete!"
        message={`You finished "${episode.title}" and solved ${problemsSolved} problems!`}
        xpEarned={150 + problemsSolved * 25}
        starsEarned={problemsSolved >= 3 ? 3 : problemsSolved >= 2 ? 2 : 1}
      />
    </div>
  );
}

