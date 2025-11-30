"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, SECONDARY_NAV_ITEMS } from "@/lib/constants";
import { useAppState } from "@/store/useAppState";
import { Menu, X } from "lucide-react";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const { user } = useAppState();

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col bg-cloud-white border-r border-soft-gray/50 transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-5 border-b border-soft-gray/50">
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && (
            <Link href="/home" className="flex items-center gap-2">
              <span className="text-3xl">🧠</span>
              <span className="text-2xl font-bold text-gradient-cosmic font-display overflow-visible break-words">
                BrainBlast!
              </span>
            </Link>
          )}
          {isCollapsed && (
            <Link href="/home" className="flex items-center justify-center">
              <span className="text-3xl">🧠</span>
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-xl hover:bg-soft-gray transition-colors"
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>

        {/* User Info */}
        {!isCollapsed && user && (
          <div className="flex items-center gap-3 overflow-visible">
            <div className="w-12 h-12 rounded-full bg-gradient-cosmic flex items-center justify-center text-white text-xl font-bold">
              {user.avatarConfig?.character === "explorer" ? "🧑‍🚀" : "👤"}
            </div>
            <div className="flex-1 min-w-[1px] overflow-visible">
              <p className="font-bold text-lg text-deep-space overflow-visible break-words font-display">
                {user.nickname || "Explorer"}
              </p>
              <p className="text-sm text-deep-space-lighter">Level {user.level}</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {/* Primary Nav */}
        <div className="mb-6">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);

            return (
              <Link
                key={item.id}
                href={item.path}
                className={cn(
                  "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all mb-2 overflow-visible",
                  "hover:bg-soft-gray",
                  isActive
                    ? "bg-cosmic-purple/10 text-cosmic-purple font-semibold"
                    : "text-deep-space-lighter hover:text-deep-space"
                )}
              >
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                {!isCollapsed && (
                  <span className="font-medium overflow-visible break-words whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Secondary Nav */}
        {!isCollapsed && (
          <div className="pt-4 border-t border-soft-gray/50">
            <p className="text-xs font-semibold text-deep-space-lighter uppercase tracking-wider mb-3 px-5 overflow-visible">
              More
            </p>
            {SECONDARY_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);

              return (
                <Link
                  key={item.id}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-4 px-5 py-3 rounded-xl transition-all mb-1 overflow-visible",
                    "hover:bg-soft-gray text-sm",
                    isActive
                      ? "text-cosmic-purple font-semibold"
                      : "text-deep-space-lighter hover:text-deep-space"
                  )}
                >
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <span className="font-medium overflow-visible break-words whitespace-nowrap">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </aside>
  );
};
