"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";

export const MobileNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-cloud-white/95 backdrop-blur-lg border-t border-soft-gray/50 z-50 safe-area-inset-bottom">
      <ul className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);

          return (
            <li key={item.id} className="relative">
              <Link
                href={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-3 rounded-2xl transition-all",
                  "min-w-[72px] touch-target",
                  isActive
                    ? "text-cosmic-purple bg-cosmic-purple/10"
                    : "text-deep-space-lighter hover:text-deep-space hover:bg-soft-gray"
                )}
              >
                <motion.span
                  className="text-2xl"
                  animate={isActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                </motion.span>
                <span className={cn(
                  "text-xs font-semibold",
                  isActive && "text-cosmic-purple"
                )}>
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

// Mobile Header - More spacious
export interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  showBack = false,
  onBack,
  rightAction,
}) => {
  return (
    <header className="md:hidden sticky top-0 z-40 bg-cream/95 backdrop-blur-lg border-b border-soft-gray/50 safe-area-inset-top">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-4">
          {showBack && (
            <button
              onClick={onBack}
              className="p-2.5 -ml-2 rounded-2xl hover:bg-soft-gray transition-colors touch-target"
              aria-label="Go back"
            >
              <svg
                className="w-6 h-6 text-deep-space"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
          {title ? (
            <h1 className="text-xl font-bold text-deep-space font-display">{title}</h1>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧠</span>
              <span className="text-xl font-bold text-gradient-cosmic font-display">BrainBlast!</span>
            </div>
          )}
        </div>
        {rightAction && <div>{rightAction}</div>}
      </div>
    </header>
  );
};

// Quick Stats Bar (for mobile home) - More polished
export interface QuickStatsBarProps {
  xp: number;
  streak: number;
  stars: number;
}

export const QuickStatsBar: React.FC<QuickStatsBarProps> = ({ xp, streak, stars }) => {
  return (
    <div className="bg-gradient-cosmic">
      <div className="flex items-center justify-around px-4 py-4 text-white">
        <motion.div 
          className="flex flex-col items-center gap-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-2xl font-bold font-display">{xp.toLocaleString()}</span>
          </div>
          <span className="text-xs text-white/70 font-medium">Total XP</span>
        </motion.div>

        {/* Divider */}
        <div className="w-px h-10 bg-white/20" />

        <motion.div 
          className="flex flex-col items-center gap-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <span className="text-2xl font-bold font-display">{streak}</span>
          </div>
          <span className="text-xs text-white/70 font-medium">Day Streak</span>
        </motion.div>

        {/* Divider */}
        <div className="w-px h-10 bg-white/20" />

        <motion.div 
          className="flex flex-col items-center gap-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span className="text-2xl font-bold font-display">{stars}</span>
          </div>
          <span className="text-xs text-white/70 font-medium">Stars</span>
        </motion.div>
      </div>
    </div>
  );
};
