"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LivesDisplay, ProgressBar } from "@/components/ui/progress";
import { useAppState } from "@/store/useAppState";
import { Pause, Play, RotateCcw, Home, Volume2, VolumeX } from "lucide-react";

interface GameWrapperProps {
  gameId: string;
  gameName: string;
  gameIcon: string;
  level: number;
  maxLives?: number;
  onComplete: (score: number, stars: number) => void;
  onQuit: () => void;
  children: React.ReactNode;
}

interface GameState {
  score: number;
  lives: number;
  isPaused: boolean;
  isGameOver: boolean;
  isVictory: boolean;
  timeElapsed: number;
}

export function GameWrapper({
  gameId,
  gameName,
  gameIcon,
  level,
  maxLives = 3,
  onComplete,
  onQuit,
  children,
}: GameWrapperProps) {
  const { ui, game, pauseGame, resumeGame, loseLife, updateGameScore } = useAppState();
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    lives: maxLives,
    isPaused: false,
    isGameOver: false,
    isVictory: false,
    timeElapsed: 0,
  });
  const [showPauseMenu, setShowPauseMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(!ui.soundEnabled);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer
  useEffect(() => {
    if (!gameState.isPaused && !gameState.isGameOver && !gameState.isVictory) {
      timerRef.current = setInterval(() => {
        setGameState((prev) => ({ ...prev, timeElapsed: prev.timeElapsed + 1 }));
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState.isPaused, gameState.isGameOver, gameState.isVictory]);

  const handlePause = useCallback(() => {
    setGameState((prev) => ({ ...prev, isPaused: true }));
    setShowPauseMenu(true);
    pauseGame();
  }, [pauseGame]);

  const handleResume = useCallback(() => {
    setGameState((prev) => ({ ...prev, isPaused: false }));
    setShowPauseMenu(false);
    resumeGame();
  }, [resumeGame]);

  const handleRestart = useCallback(() => {
    setGameState({
      score: 0,
      lives: maxLives,
      isPaused: false,
      isGameOver: false,
      isVictory: false,
      timeElapsed: 0,
    });
    setShowPauseMenu(false);
  }, [maxLives]);

  const handleVictory = useCallback((score: number) => {
    const stars = score >= 1000 ? 3 : score >= 500 ? 2 : 1;
    setGameState((prev) => ({ ...prev, isVictory: true, score }));
    onComplete(score, stars);
  }, [onComplete]);

  const handleGameOver = useCallback(() => {
    setGameState((prev) => ({ ...prev, isGameOver: true }));
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative w-full h-screen bg-deep-space overflow-visible">
      {/* Game HUD - Fixed with safe area padding */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-3 px-5 pb-4 safe-area-inset-top">
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Game info */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <motion.div
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-3xl">{gameIcon}</span>
              <div className="hidden sm:block">
                <p className="text-white font-bold text-base">{gameName}</p>
                <p className="text-white/70 text-sm">Level {level}</p>
              </div>
            </motion.div>
          </div>

          {/* Center - Score */}
          <motion.div
            className="bg-gradient-cosmic rounded-2xl px-6 py-3 flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-white/80 text-xs text-center font-semibold tracking-wide">SCORE</p>
            <p className="text-white font-bold text-2xl text-center">{gameState.score.toLocaleString()}</p>
          </motion.div>

          {/* Right side - Lives and controls */}
          <motion.div
            className="flex items-center gap-4 flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <LivesDisplay lives={gameState.lives} maxLives={maxLives} />
            
            <div className="flex gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
              <button
                onClick={handlePause}
                className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
              >
                <Pause className="w-5 h-5 text-white" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Timer */}
        <div className="flex justify-center mt-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-5 py-2">
            <span className="text-white/80 text-sm font-mono">
              ⏱️ {formatTime(gameState.timeElapsed)}
            </span>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="w-full h-full">
        {children}
      </div>

      {/* Pause Menu Overlay */}
      <AnimatePresence>
        {showPauseMenu && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-deep-space/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <Card className="p-8 text-center max-w-sm">
                <h2 className="text-2xl font-bold text-deep-space mb-2">Game Paused</h2>
                <p className="text-deep-space/60 mb-6">Take a break!</p>

                <div className="space-y-3">
                  <Button
                    fullWidth
                    onClick={handleResume}
                    leftIcon={<Play className="w-4 h-4" />}
                  >
                    Resume
                  </Button>
                  <Button
                    fullWidth
                    variant="outline"
                    onClick={handleRestart}
                    leftIcon={<RotateCcw className="w-4 h-4" />}
                  >
                    Restart Level
                  </Button>
                  <Button
                    fullWidth
                    variant="ghost"
                    onClick={onQuit}
                    leftIcon={<Home className="w-4 h-4" />}
                  >
                    Quit Game
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Over Overlay */}
      <AnimatePresence>
        {gameState.isGameOver && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-deep-space/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Card className="p-8 text-center max-w-sm">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  😵
                </motion.div>
                <h2 className="text-2xl font-bold text-deep-space mb-2">Game Over!</h2>
                <p className="text-deep-space/60 mb-4">
                  Score: {gameState.score.toLocaleString()}
                </p>

                <div className="space-y-3">
                  <Button
                    fullWidth
                    onClick={handleRestart}
                    leftIcon={<RotateCcw className="w-4 h-4" />}
                  >
                    Try Again
                  </Button>
                  <Button
                    fullWidth
                    variant="ghost"
                    onClick={onQuit}
                  >
                    Quit
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Victory Overlay */}
      <AnimatePresence>
        {gameState.isVictory && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-deep-space/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Card gradient="cosmic" className="p-8 text-center max-w-sm">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                >
                  🎉
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">Level Complete!</h2>
                
                <div className="flex justify-center gap-1 mb-4">
                  {[1, 2, 3].map((star) => (
                    <motion.span
                      key={star}
                      className="text-4xl"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: star * 0.2 }}
                    >
                      {gameState.score >= star * 333 ? "⭐" : "☆"}
                    </motion.span>
                  ))}
                </div>

                <p className="text-white/80 mb-6">
                  Score: {gameState.score.toLocaleString()} | Time: {formatTime(gameState.timeElapsed)}
                </p>

                <div className="space-y-3">
                  <Button
                    fullWidth
                    className="bg-white text-cosmic-purple hover:bg-white/90"
                  >
                    Next Level →
                  </Button>
                  <Button
                    fullWidth
                    variant="ghost"
                    className="text-white"
                    onClick={onQuit}
                  >
                    Back to Games
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobile touch controls component
export interface TouchControlsProps {
  onSwipe?: (direction: "up" | "down" | "left" | "right") => void;
  onTap?: (x: number, y: number) => void;
  children: React.ReactNode;
}

export function TouchControls({ onSwipe, onTap, children }: TouchControlsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;

    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        onSwipe?.(deltaX > 0 ? "right" : "left");
      } else {
        onSwipe?.(deltaY > 0 ? "down" : "up");
      }
    } else {
      // It's a tap
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        onTap?.(
          (touch.clientX - rect.left) / rect.width,
          (touch.clientY - rect.top) / rect.height
        );
      }
    }

    touchStart.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full touch-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
}

// Virtual joystick for movement-based games
export interface VirtualJoystickProps {
  onMove: (x: number, y: number) => void;
  size?: number;
}

export function VirtualJoystick({ onMove, size = 120 }: VirtualJoystickProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current || !isActive) return;

    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let x = (touch.clientX - centerX) / (size / 2);
    let y = (touch.clientY - centerY) / (size / 2);

    // Clamp to circle
    const magnitude = Math.sqrt(x * x + y * y);
    if (magnitude > 1) {
      x /= magnitude;
      y /= magnitude;
    }

    setPosition({ x: x * (size / 3), y: y * (size / 3) });
    onMove(x, y);
  };

  const handleTouchEnd = () => {
    setIsActive(false);
    setPosition({ x: 0, y: 0 });
    onMove(0, 0);
  };

  return (
    <div
      ref={containerRef}
      className="relative touch-none"
      style={{ width: size, height: size }}
      onTouchStart={() => setIsActive(true)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Outer ring */}
      <div
        className="absolute inset-0 rounded-full border-4 border-white/30 bg-white/10"
        style={{ width: size, height: size }}
      />
      
      {/* Inner knob */}
      <motion.div
        className="absolute rounded-full bg-white/80 shadow-lg"
        style={{
          width: size / 2.5,
          height: size / 2.5,
          left: size / 2 - size / 5 + position.x,
          top: size / 2 - size / 5 + position.y,
        }}
        animate={{ scale: isActive ? 1.1 : 1 }}
      />
    </div>
  );
}

