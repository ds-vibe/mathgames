"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAppState } from "@/store/useAppState";
import { NAV_ITEMS, SECONDARY_NAV_ITEMS } from "@/lib/constants";
import { Avatar } from "@/components/ui/avatar";
import { XPBar, StreakBadge } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Settings, LogOut } from "lucide-react";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, ui, toggleSidebar } = useAppState();
  const { isSidebarOpen } = ui;

  return (
    <motion.aside
      className={cn(
        "hidden md:flex flex-col bg-cloud-white",
        "border-r border-soft-gray/50",
        "h-screen sticky top-0 z-40",
        "transition-all duration-300 ease-out"
      )}
      animate={{ width: isSidebarOpen ? 300 : 88 }}
    >
      {/* Header - Logo */}
      <div className="p-5 border-b border-soft-gray/50">
        <div className="flex items-center justify-between">
          <AnimatePresence mode="wait">
            {isSidebarOpen ? (
              <motion.div
                key="full-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <span className="text-4xl">🧠</span>
                <span className="text-2xl font-bold text-gradient-cosmic font-display">
                  BrainBlast!
                </span>
              </motion.div>
            ) : (
              <motion.span
                key="icon-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-4xl mx-auto"
              >
                🧠
              </motion.span>
            )}
          </AnimatePresence>

          <button
            onClick={toggleSidebar}
            className={cn(
              "p-2 rounded-xl hover:bg-soft-gray transition-colors",
              !isSidebarOpen && "mx-auto mt-3"
            )}
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="w-5 h-5 text-deep-space-lighter" />
            ) : (
              <ChevronRight className="w-5 h-5 text-deep-space-lighter" />
            )}
          </button>
        </div>
      </div>

      {/* User Info - More spacious */}
      {user.isAuthenticated && (
        <div className={cn(
          "p-5 border-b border-soft-gray/50",
          !isSidebarOpen && "py-5"
        )}>
          <div className={cn(
            "flex items-center gap-4",
            !isSidebarOpen && "justify-center"
          )}>
            <Avatar config={user.avatarConfig} size={isSidebarOpen ? "lg" : "md"} />
            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex-1 min-w-0"
                >
                  <p className="font-bold text-lg text-deep-space overflow-visible break-words font-display">
                    {user.nickname || "Explorer"}
                  </p>
                  <StreakBadge days={user.streakDays} size="sm" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-5"
              >
                <XPBar
                  currentXP={user.xp}
                  level={user.level}
                  xpForNext={calculateXPForNext(user.level)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Navigation - Main */}
      <nav className="flex-1 p-5 overflow-y-auto scrollbar-hide">
        <ul className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);

            return (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className={cn(
                    "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 overflow-visible",
                    isActive
                      ? "bg-cosmic-purple text-white shadow-lg shadow-cosmic-purple/20"
                      : "text-deep-space hover:bg-soft-gray hover:-translate-y-0.5",
                    !isSidebarOpen && "justify-center px-4"
                  )}
                >
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <AnimatePresence mode="wait">
                    {isSidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="font-semibold text-base whitespace-nowrap overflow-visible"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Secondary Navigation */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6"
            >
              <div className="mb-3 px-4">
                <span className="text-xs font-semibold text-deep-space-lighter uppercase tracking-wider">
                  More
                </span>
              </div>
              <ul className="space-y-1">
                {SECONDARY_NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);

                  return (
                    <li key={item.id}>
                      <Link
                        href={item.path}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 overflow-visible",
                          isActive
                            ? "bg-soft-gray text-cosmic-purple"
                            : "text-deep-space-light hover:bg-soft-gray hover:text-deep-space hover:-translate-y-0.5"
                        )}
                      >
                        <span className="text-xl flex-shrink-0">{item.icon}</span>
                        <span className="font-medium whitespace-nowrap overflow-visible">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Footer - Settings & Logout */}
      <div className="p-4 border-t border-soft-gray/50">
        <ul className="space-y-1">
          <li>
            <Link
              href="/settings"
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 overflow-visible",
                "text-deep-space-lighter hover:text-deep-space hover:bg-soft-gray hover:-translate-y-0.5",
                !isSidebarOpen && "justify-center px-4"
              )}
            >
              <Settings className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence mode="wait">
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-medium whitespace-nowrap overflow-visible"
                  >
                    Settings
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </li>
          <li>
            <button
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 overflow-visible",
                "text-coral-pink hover:bg-coral-pink/10 hover:-translate-y-0.5",
                !isSidebarOpen && "justify-center px-4"
              )}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence mode="wait">
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-medium whitespace-nowrap overflow-visible"
                  >
                    Log Out
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </li>
        </ul>
      </div>
    </motion.aside>
  );
};

// Helper function
function calculateXPForNext(level: number): number {
  const thresholds = [
    0, 100, 250, 500, 750, 1000, 1500, 2000, 2500, 3000,
    4000, 5000, 6500, 8000, 10000, 12500, 15000, 18000, 21000, 25000,
  ];
  return thresholds[level] || thresholds[thresholds.length - 1] + 5000;
}
