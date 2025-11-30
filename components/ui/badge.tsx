"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info" | "purple" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  animated?: boolean;
  className?: string;
}

const variantStyles = {
  default: "bg-cloud-gray text-deep-space",
  success: "bg-vibrant-green/20 text-vibrant-green-dark",
  warning: "bg-sunny-yellow/20 text-sunny-yellow-dark",
  danger: "bg-coral-pink/20 text-coral-pink-dark",
  info: "bg-electric-blue/20 text-electric-blue-dark",
  purple: "bg-cosmic-purple/20 text-cosmic-purple-dark",
  outline: "bg-transparent border-2 border-cosmic-purple text-cosmic-purple",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  icon,
  animated = false,
  className,
}) => {
  const Component = animated ? motion.span : "span";

  return (
    <Component
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...(animated && {
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: { type: "spring", stiffness: 500, damping: 25 },
      })}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </Component>
  );
};

// Subject Badge
export interface SubjectBadgeProps {
  subject: "math" | "science";
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

export const SubjectBadge: React.FC<SubjectBadgeProps> = ({
  subject,
  size = "md",
  showIcon = true,
  className,
}) => {
  const config = {
    math: {
      label: "Math",
      icon: "📐",
      className: "bg-electric-blue/20 text-electric-blue-dark",
    },
    science: {
      label: "Science",
      icon: "🔬",
      className: "bg-vibrant-green/20 text-vibrant-green-dark",
    },
  };

  const { label, icon, className: variantClass } = config[subject];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        variantClass,
        sizeStyles[size],
        className
      )}
    >
      {showIcon && <span>{icon}</span>}
      {label}
    </span>
  );
};

// Grade Badge
export interface GradeBadgeProps {
  grade: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const GradeBadge: React.FC<GradeBadgeProps> = ({
  grade,
  size = "md",
  className,
}) => {
  const gradeLabels: Record<number, string> = {
    1: "1st Grade",
    2: "2nd Grade",
    3: "3rd Grade",
    4: "4th Grade",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        "bg-cosmic-purple/20 text-cosmic-purple-dark",
        sizeStyles[size],
        className
      )}
    >
      🎓 {gradeLabels[grade] || `Grade ${grade}`}
    </span>
  );
};

// Mastery Badge
export interface MasteryBadgeProps {
  level: "intro" | "developing" | "proficient" | "mastered" | "expert";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export const MasteryBadge: React.FC<MasteryBadgeProps> = ({
  level,
  size = "md",
  showLabel = true,
  className,
}) => {
  const config: Record<
    MasteryBadgeProps["level"],
    { label: string; icon: string; className: string }
  > = {
    intro: {
      label: "Introduction",
      icon: "🌱",
      className: "bg-cloud-gray text-deep-space/70",
    },
    developing: {
      label: "Developing",
      icon: "🌿",
      className: "bg-electric-blue/20 text-electric-blue-dark",
    },
    proficient: {
      label: "Proficient",
      icon: "⭐",
      className: "bg-sunny-yellow/20 text-sunny-yellow-dark",
    },
    mastered: {
      label: "Mastered",
      icon: "🏆",
      className: "bg-cosmic-purple/20 text-cosmic-purple-dark",
    },
    expert: {
      label: "Expert",
      icon: "💎",
      className: "bg-gradient-cosmic text-white",
    },
  };

  const { label, icon, className: variantClass } = config[level];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        variantClass,
        sizeStyles[size],
        className
      )}
    >
      <span>{icon}</span>
      {showLabel && label}
    </span>
  );
};

// New Badge (for new content)
export const NewBadge: React.FC<{ className?: string }> = ({ className }) => (
  <motion.span
    className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold",
      "bg-coral-pink text-white",
      className
    )}
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ duration: 1, repeat: Infinity }}
  >
    ✨ NEW
  </motion.span>
);

// Locked Badge (for locked content)
export const LockedBadge: React.FC<{ className?: string }> = ({ className }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
      "bg-deep-space/10 text-deep-space/50",
      className
    )}
  >
    🔒 Locked
  </span>
);

// Difficulty Badge
export interface DifficultyBadgeProps {
  difficulty: "easy" | "medium" | "hard";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({
  difficulty,
  size = "md",
  className,
}) => {
  const config = {
    easy: {
      label: "Easy",
      className: "bg-vibrant-green/20 text-vibrant-green-dark",
    },
    medium: {
      label: "Medium",
      className: "bg-sunny-yellow/20 text-sunny-yellow-dark",
    },
    hard: {
      label: "Hard",
      className: "bg-coral-pink/20 text-coral-pink-dark",
    },
  };

  const { label, className: variantClass } = config[difficulty];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variantClass,
        sizeStyles[size],
        className
      )}
    >
      {label}
    </span>
  );
};

// Time Badge
export interface TimeBadgeProps {
  minutes: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const TimeBadge: React.FC<TimeBadgeProps> = ({
  minutes,
  size = "md",
  className,
}) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-full font-medium",
      "bg-deep-space/10 text-deep-space/70",
      sizeStyles[size],
      className
    )}
  >
    ⏱️ {minutes} min
  </span>
);

