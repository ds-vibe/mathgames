"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success" | "outline" | "soft";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  bounce?: boolean;
}

const variantStyles = {
  primary: cn(
    "bg-gradient-to-br from-cosmic-purple via-cosmic-purple to-cosmic-purple-dark text-white",
    "hover:from-cosmic-purple-dark hover:via-cosmic-purple-dark hover:to-cosmic-purple-dark",
    "shadow-[0_4px_14px_rgba(124,77,255,0.25),0_2px_6px_rgba(124,77,255,0.15)]",
    "hover:shadow-[0_6px_20px_rgba(124,77,255,0.30),0_3px_8px_rgba(124,77,255,0.20)]",
    "hover:-translate-y-0.5",
    "active:translate-y-0 active:scale-[0.98]"
  ),
  secondary: cn(
    "bg-gradient-to-br from-electric-blue via-electric-blue to-electric-blue-dark text-white",
    "hover:from-electric-blue-dark hover:via-electric-blue-dark hover:to-electric-blue-dark",
    "shadow-[0_4px_14px_rgba(0,184,212,0.25),0_2px_6px_rgba(0,184,212,0.15)]",
    "hover:shadow-[0_6px_20px_rgba(0,184,212,0.30),0_3px_8px_rgba(0,184,212,0.20)]",
    "hover:-translate-y-0.5",
    "active:translate-y-0 active:scale-[0.98]"
  ),
  ghost: cn(
    "bg-transparent text-deep-space",
    "hover:bg-soft-gray/70",
    "active:bg-cloud-gray",
    "hover:-translate-y-0.5",
    "active:translate-y-0"
  ),
  danger: cn(
    "bg-gradient-to-br from-coral-pink via-coral-pink to-coral-pink-dark text-white",
    "hover:from-coral-pink-dark hover:via-coral-pink-dark hover:to-coral-pink-dark",
    "shadow-[0_4px_14px_rgba(255,107,107,0.25),0_2px_6px_rgba(255,107,107,0.15)]",
    "hover:shadow-[0_6px_20px_rgba(255,107,107,0.30),0_3px_8px_rgba(255,107,107,0.20)]",
    "hover:-translate-y-0.5",
    "active:translate-y-0 active:scale-[0.98]"
  ),
  success: cn(
    "bg-gradient-to-br from-vibrant-green via-vibrant-green to-vibrant-green-dark text-deep-space",
    "hover:from-vibrant-green-dark hover:via-vibrant-green-dark hover:to-vibrant-green-dark",
    "shadow-[0_4px_14px_rgba(0,230,118,0.25),0_2px_6px_rgba(0,230,118,0.15)]",
    "hover:shadow-[0_6px_20px_rgba(0,230,118,0.30),0_3px_8px_rgba(0,230,118,0.20)]",
    "hover:-translate-y-0.5",
    "active:translate-y-0 active:scale-[0.98]"
  ),
  outline: cn(
    "bg-transparent border-2 border-cosmic-purple text-cosmic-purple",
    "hover:bg-cosmic-purple hover:text-white hover:border-cosmic-purple",
    "active:bg-cosmic-purple-dark",
    "hover:-translate-y-0.5",
    "active:translate-y-0 active:scale-[0.98]"
  ),
  soft: cn(
    "bg-cosmic-purple/10 text-cosmic-purple",
    "hover:bg-cosmic-purple/15",
    "active:bg-cosmic-purple/20",
    "hover:-translate-y-0.5",
    "active:translate-y-0"
  ),
};

// ULTRA generous sizes - Khan Academy Kids style - NO CLIPPING ALLOWED
const sizeStyles = {
  sm: "px-7 py-3.5 text-sm rounded-xl min-h-[52px] gap-2 overflow-visible",
  md: "px-9 py-4.5 text-base rounded-2xl min-h-[60px] gap-3 overflow-visible",
  lg: "px-11 py-5.5 text-lg rounded-2xl min-h-[68px] gap-3 overflow-visible",
  xl: "px-14 py-6.5 text-xl rounded-2xl min-h-[76px] gap-4 overflow-visible",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      bounce = true,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          // Base styles
          "relative inline-flex items-center justify-center",
          "font-semibold font-display",
          // Smooth CSS-only transitions - NO FLICKER
          "transition-all duration-200 ease-out",
          // Focus states
          "focus:outline-none focus-visible:ring-4 focus-visible:ring-cosmic-purple/30 focus-visible:ring-offset-2",
          // Disabled states
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:hover:translate-y-0 disabled:hover:shadow-lg",
          // Touch friendly
          "touch-target select-none",
          // Prevent clipping
          "overflow-visible",
          // Variant and size
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || isLoading}
        // REMOVED framer-motion scale animations - using CSS instead to prevent flicker
        {...props}
      >
        {isLoading ? (
          <motion.span
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0 overflow-visible">{leftIcon}</span>}
            <span className="relative z-10 overflow-visible whitespace-normal break-words">{children}</span>
            {rightIcon && <span className="flex-shrink-0 overflow-visible">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

// Icon Button variant - Larger touch targets
export interface IconButtonProps extends Omit<ButtonProps, "leftIcon" | "rightIcon" | "children"> {
  icon: React.ReactNode;
  "aria-label": string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = "md", className, ...props }, ref) => {
    const iconSizeStyles = {
      sm: "w-10 h-10 text-lg",
      md: "w-12 h-12 text-xl",
      lg: "w-14 h-14 text-2xl",
      xl: "w-16 h-16 text-3xl",
    };

    return (
      <Button
        ref={ref}
        size={size}
        className={cn("!p-0 !rounded-2xl", iconSizeStyles[size], className)}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

// Pill Button - Compact, for tags and small actions
export interface PillButtonProps extends Omit<ButtonProps, "size"> {
  active?: boolean;
}

export const PillButton = React.forwardRef<HTMLButtonElement, PillButtonProps>(
  ({ active = false, className, variant = "ghost", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={active ? "primary" : variant}
        className={cn(
          "!px-4 !py-1.5 !text-sm !rounded-full !min-h-[36px]",
          !active && "bg-soft-gray hover:bg-cloud-gray text-deep-space",
          className
        )}
        {...props}
      />
    );
  }
);

PillButton.displayName = "PillButton";

// Large Action Button - For primary CTAs
export interface ActionButtonProps extends ButtonProps {
  icon?: string;
  subtitle?: string;
}

export const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ children, icon, subtitle, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size="xl"
        className={cn(
          "flex-col !gap-1 !py-5",
          subtitle && "!min-h-[80px]",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-2xl">{icon}</span>}
          <span className="font-bold">{children}</span>
        </div>
        {subtitle && (
          <span className="text-sm font-normal opacity-80">{subtitle}</span>
        )}
      </Button>
    );
  }
);

ActionButton.displayName = "ActionButton";
