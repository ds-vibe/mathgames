"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AVATAR_OPTIONS, LEARNING_BUDDIES } from "@/lib/constants";

export interface AvatarConfig {
  character: string;
  color: string;
  accessory: string;
}

export interface AvatarProps {
  config: AvatarConfig;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  showAccessory?: boolean;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

const sizeStyles = {
  sm: "w-8 h-8 text-lg",
  md: "w-12 h-12 text-2xl",
  lg: "w-16 h-16 text-3xl",
  xl: "w-24 h-24 text-5xl",
  "2xl": "w-32 h-32 text-6xl",
};

const accessorySizeStyles = {
  sm: "text-xs -top-1 -right-1",
  md: "text-sm -top-1 -right-1",
  lg: "text-lg -top-1 -right-1",
  xl: "text-2xl -top-2 -right-2",
  "2xl": "text-3xl -top-2 -right-2",
};

export const Avatar: React.FC<AvatarProps> = ({
  config,
  size = "md",
  showAccessory = true,
  interactive = false,
  className,
  onClick,
}) => {
  const character = AVATAR_OPTIONS.characters.find((c) => c.id === config.character);
  const color = AVATAR_OPTIONS.colors.find((c) => c.id === config.color);
  const accessory = AVATAR_OPTIONS.accessories.find((a) => a.id === config.accessory);

  const Component = interactive ? motion.button : motion.div;

  return (
    <Component
      className={cn(
        "relative rounded-full flex items-center justify-center",
        sizeStyles[size],
        interactive && "cursor-pointer",
        className
      )}
      style={{ backgroundColor: color?.hex || "#7C4DFF" }}
      onClick={onClick}
      whileHover={interactive ? { scale: 1.05 } : undefined}
      whileTap={interactive ? { scale: 0.95 } : undefined}
    >
      <span>{character?.emoji || "🧑‍🚀"}</span>
      
      {showAccessory && accessory && accessory.emoji && (
        <span className={cn("absolute", accessorySizeStyles[size])}>
          {accessory.emoji}
        </span>
      )}
    </Component>
  );
};

// Avatar Selector (for customization)
export interface AvatarSelectorProps {
  value: AvatarConfig;
  onChange: (config: AvatarConfig) => void;
}

export const AvatarSelector: React.FC<AvatarSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Preview */}
      <div className="flex justify-center">
        <Avatar config={value} size="2xl" />
      </div>

      {/* Character Selection */}
      <div>
        <h4 className="text-sm font-medium text-deep-space/60 mb-2">Character</h4>
        <div className="flex flex-wrap gap-2">
          {AVATAR_OPTIONS.characters.map((character) => (
            <motion.button
              key={character.id}
              className={cn(
                "w-12 h-12 rounded-xl text-2xl flex items-center justify-center",
                value.character === character.id
                  ? "bg-cosmic-purple text-white ring-2 ring-cosmic-purple ring-offset-2"
                  : "bg-cloud-gray hover:bg-cloud-gray/80"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange({ ...value, character: character.id })}
            >
              {character.emoji}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <h4 className="text-sm font-medium text-deep-space/60 mb-2">Color</h4>
        <div className="flex flex-wrap gap-2">
          {AVATAR_OPTIONS.colors.map((color) => (
            <motion.button
              key={color.id}
              className={cn(
                "w-10 h-10 rounded-full",
                value.color === color.id && "ring-2 ring-offset-2 ring-deep-space"
              )}
              style={{ backgroundColor: color.hex }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onChange({ ...value, color: color.id })}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Accessory Selection */}
      <div>
        <h4 className="text-sm font-medium text-deep-space/60 mb-2">Accessory</h4>
        <div className="flex flex-wrap gap-2">
          {AVATAR_OPTIONS.accessories.map((accessory) => (
            <motion.button
              key={accessory.id}
              className={cn(
                "px-3 py-2 rounded-xl text-sm font-medium",
                value.accessory === accessory.id
                  ? "bg-cosmic-purple text-white"
                  : "bg-cloud-gray hover:bg-cloud-gray/80 text-deep-space"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange({ ...value, accessory: accessory.id })}
            >
              {accessory.emoji || "❌"} {accessory.name}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Learning Buddy Display
export interface LearningBuddyProps {
  buddyId: string;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  className?: string;
}

export const LearningBuddy: React.FC<LearningBuddyProps> = ({
  buddyId,
  size = "md",
  showName = false,
  className,
}) => {
  const buddy = LEARNING_BUDDIES.find((b) => b.id === buddyId);
  if (!buddy) return null;

  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
  };

  return (
    <motion.div
      className={cn("flex flex-col items-center", className)}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className={sizeClasses[size]}>{buddy.emoji}</span>
      {showName && (
        <span className="text-sm font-medium text-deep-space/70 mt-1">
          {buddy.name}
        </span>
      )}
    </motion.div>
  );
};

// Buddy Selector
export interface BuddySelectorProps {
  value: string;
  onChange: (buddyId: string) => void;
  unlockedBuddies?: string[];
}

export const BuddySelector: React.FC<BuddySelectorProps> = ({
  value,
  onChange,
  unlockedBuddies = LEARNING_BUDDIES.map((b) => b.id),
}) => {
  return (
    <div className="grid grid-cols-5 gap-3">
      {LEARNING_BUDDIES.map((buddy) => {
        const isUnlocked = unlockedBuddies.includes(buddy.id);
        const isSelected = value === buddy.id;

        return (
          <motion.button
            key={buddy.id}
            className={cn(
              "relative p-3 rounded-xl flex flex-col items-center gap-1",
              isSelected
                ? "bg-cosmic-purple text-white"
                : isUnlocked
                  ? "bg-cloud-gray hover:bg-cloud-gray/80"
                  : "bg-cloud-gray/50 opacity-50 cursor-not-allowed"
            )}
            whileHover={isUnlocked ? { scale: 1.05 } : undefined}
            whileTap={isUnlocked ? { scale: 0.95 } : undefined}
            onClick={() => isUnlocked && onChange(buddy.id)}
            disabled={!isUnlocked}
          >
            <span className="text-3xl">{buddy.emoji}</span>
            <span className="text-xs font-medium">{buddy.name}</span>
            {!isUnlocked && (
              <div className="absolute inset-0 flex items-center justify-center bg-deep-space/20 rounded-xl">
                <span className="text-lg">🔒</span>
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

