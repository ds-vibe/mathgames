"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Base Progress Bar - More polished
export interface ProgressBarProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  color?: "purple" | "blue" | "green" | "yellow" | "pink" | "orange" | "gradient";
  showLabel?: boolean;
  animate?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: "h-2.5",
  md: "h-3.5",
  lg: "h-5",
};

const colorStyles = {
  purple: "bg-cosmic-purple",
  blue: "bg-electric-blue",
  green: "bg-vibrant-green",
  yellow: "bg-sunny-yellow",
  pink: "bg-coral-pink",
  orange: "bg-warm-orange",
  gradient: "bg-gradient-cosmic",
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  size = "md",
  color = "purple",
  showLabel = false,
  animate = true,
  className,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full overflow-visible", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm mb-3 px-1 overflow-visible">
          <span className="text-deep-space-lighter overflow-visible">Progress</span>
          <span className="font-semibold text-deep-space overflow-visible">{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full bg-soft-gray rounded-full overflow-hidden mx-0",
          sizeStyles[size]
        )}
        style={{ marginLeft: 0, marginRight: 0 }}
      >
        <motion.div
          className={cn("h-full rounded-full", colorStyles[color])}
          initial={animate ? { width: 0 } : false}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </div>
    </div>
  );
};

// XP Bar with level display - Bigger and bolder
export interface XPBarProps {
  currentXP: number;
  level: number;
  xpForNext: number;
  animate?: boolean;
  className?: string;
}

export const XPBar: React.FC<XPBarProps> = ({
  currentXP,
  level,
  xpForNext,
  animate = true,
  className,
}) => {
  const progress = xpForNext > 0 ? ((currentXP % xpForNext) / xpForNext) * 100 : 100;

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <motion.div
        className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-cosmic flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cosmic-purple/25"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        {level}
      </motion.div>
      <div className="flex-1">
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-deep-space-lighter font-medium">Level {level}</span>
          <span className="text-cosmic-purple font-bold">
            {currentXP.toLocaleString()} XP
          </span>
        </div>
        <div className="h-3 bg-soft-gray rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-cosmic rounded-full"
            initial={animate ? { width: 0 } : false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </div>
        <div className="text-xs text-deep-space-lighter mt-1.5">
          {xpForNext.toLocaleString()} XP to next level
        </div>
      </div>
    </div>
  );
};

// Streak Badge - More prominent
export interface StreakBadgeProps {
  days: number;
  isActive?: boolean;
  showFlame?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({
  days,
  isActive = true,
  showFlame = true,
  size = "md",
  className,
}) => {
  const sizeClasses = {
    sm: "text-sm px-3 py-1.5 gap-1.5",
    md: "text-base px-4 py-2 gap-2",
    lg: "text-lg px-5 py-2.5 gap-2",
  };

  return (
    <motion.div
      className={cn(
        "inline-flex items-center rounded-2xl font-bold shadow-md",
        isActive
          ? "bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-orange-500/25"
          : "bg-soft-gray text-deep-space-lighter",
        sizeClasses[size],
        className
      )}
      animate={isActive && showFlame ? { scale: [1, 1.03, 1] } : undefined}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      {showFlame && (
        <motion.span 
          className={cn("", isActive && "animate-streak")}
          animate={isActive ? { scale: [1, 1.15, 1] } : undefined}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          🔥
        </motion.span>
      )}
      <span className="font-display">{days}</span>
      <span className="opacity-85 font-medium">day{days !== 1 ? "s" : ""}</span>
    </motion.div>
  );
};

// Mastery Stars - Larger, more animated
export interface MasteryStarsProps {
  level: "intro" | "developing" | "proficient" | "mastered" | "expert";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const masteryToStars: Record<MasteryStarsProps["level"], number> = {
  intro: 0,
  developing: 1,
  proficient: 2,
  mastered: 3,
  expert: 4,
};

export const MasteryStars: React.FC<MasteryStarsProps> = ({
  level,
  size = "md",
  className,
}) => {
  const stars = masteryToStars[level];
  const totalStars = 4;

  const sizeClasses = {
    sm: "text-base gap-1",
    md: "text-xl gap-1.5",
    lg: "text-3xl gap-2",
  };

  return (
    <div className={cn("flex items-center", sizeClasses[size], className)}>
      {Array.from({ length: totalStars }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.12, type: "spring", stiffness: 400 }}
        >
          {i < stars ? "⭐" : "☆"}
        </motion.span>
      ))}
    </div>
  );
};

// Circular Progress (for achievements, etc.) - Enhanced
export interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: "purple" | "blue" | "green" | "yellow" | "pink" | "orange";
  showValue?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = 80,
  strokeWidth = 8,
  color = "purple",
  showValue = true,
  children,
  className,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const colorValues = {
    purple: "#7C4DFF",
    blue: "#00B8D4",
    green: "#00E676",
    yellow: "#FFD600",
    pink: "#FF6B6B",
    orange: "#FF7043",
  };

  return (
    <div className={cn("relative inline-flex", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E8E6E1"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colorValues[color]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children || (showValue && (
          <span className="text-lg font-bold text-deep-space font-display">
            {Math.round(percentage)}%
          </span>
        ))}
      </div>
    </div>
  );
};

// Lives Display (for games) - More impactful
export interface LivesDisplayProps {
  lives: number;
  maxLives?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LivesDisplay: React.FC<LivesDisplayProps> = ({
  lives,
  maxLives = 3,
  size = "md",
  className,
}) => {
  const sizeClasses = {
    sm: "text-xl gap-1.5",
    md: "text-2xl gap-2",
    lg: "text-4xl gap-3",
  };

  return (
    <div className={cn("flex items-center", sizeClasses[size], className)}>
      {Array.from({ length: maxLives }).map((_, i) => (
        <motion.span
          key={i}
          animate={
            i < lives 
              ? { scale: [1, 1.15, 1] } 
              : { scale: 1, opacity: 0.3, filter: "grayscale(100%)" }
          }
          transition={{ duration: 0.4, delay: i < lives ? i * 0.1 : 0 }}
        >
          {i < lives ? "❤️" : "🖤"}
        </motion.span>
      ))}
    </div>
  );
};

// Score Display - New component
export interface ScoreDisplayProps {
  score: number;
  animate?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  animate = true,
  size = "md",
  className,
}) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
  };

  return (
    <motion.div
      className={cn(
        "font-bold font-display text-white",
        sizeClasses[size],
        className
      )}
      initial={animate ? { scale: 0.5, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      key={score}
    >
      {score.toLocaleString()}
    </motion.div>
  );
};
