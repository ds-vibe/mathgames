"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { MobileNav, MobileHeader } from "./mobile-nav";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  };

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <MobileHeader />

        {/* Page Content - More padding at bottom for mobile nav */}
        <div className="flex-1 pb-24 md:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial="initial"
              animate="enter"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Bottom Nav */}
        <MobileNav />
      </main>
    </div>
  );
};

// Page Container with ULTRA generous padding - Khan Academy Kids style
interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
  fullWidth = false,
}) => {
  return (
    <div
      className={cn(
        // ULTRA generous padding for spacious feel
        "px-8 py-10 md:px-14 md:py-14 lg:px-20 lg:py-16",
        !fullWidth && "max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

// Page Header - Large, spacious, elegant
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  emoji?: string;
  action?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  emoji,
  action,
  className,
}) => {
  return (
    <div className={cn("flex items-start justify-between gap-6 mb-10 md:mb-14", className)}>
      <div>
        <h1 className="text-3xl md:text-5xl font-bold text-deep-space font-display flex items-center gap-4">
          {emoji && <span className="text-4xl md:text-5xl">{emoji}</span>}
          {title}
        </h1>
        {subtitle && (
          <p className="text-deep-space-light text-lg md:text-xl mt-3 max-w-2xl">{subtitle}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};

// Section component - Generous spacing
interface SectionProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  action,
  children,
  className,
}) => {
  return (
    <section className={cn("mb-14 md:mb-16", className)}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-6 mb-7 md:mb-8">
          <div>
            {title && (
              <h2 className="text-2xl md:text-3xl font-bold text-deep-space font-display">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-deep-space-lighter mt-2">{subtitle}</p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
};

// Loading Screen - More polished
export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-cream flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          className="text-7xl mb-6"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          🧠
        </motion.div>
        <motion.div
          className="text-2xl font-bold text-gradient-cosmic font-display"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading BrainBlast!
        </motion.div>
        <motion.div
          className="mt-6 w-56 h-3 bg-soft-gray rounded-full overflow-hidden mx-auto"
        >
          <motion.div
            className="h-full bg-gradient-cosmic rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </div>
  );
};

// Empty State - Inviting and spacious
interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
      <motion.div
        className="text-8xl mb-8"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {icon}
      </motion.div>
      <h3 className="text-3xl font-bold text-deep-space font-display mb-4">{title}</h3>
      <p className="text-xl text-deep-space-light max-w-lg mb-10 leading-relaxed">{description}</p>
      {action}
    </div>
  );
};

// Skeleton loader - Improved
interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return <div className={cn("skeleton", className)} />;
};

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-cloud-white rounded-3xl p-8 shadow-md">
      <Skeleton className="h-7 w-3/4 mb-4" />
      <Skeleton className="h-5 w-1/2 mb-6" />
      <Skeleton className="h-28 w-full rounded-2xl" />
    </div>
  );
};
