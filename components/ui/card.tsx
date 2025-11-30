"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "elevated" | "flat" | "outlined" | "glass";
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  gradient?: "cosmic" | "sunset" | "nature" | "space" | "warm" | "playful" | "none";
  overflow?: "hidden" | "visible" | "auto";
}

const variantStyles = {
  elevated: cn(
    "bg-cloud-white",
    "shadow-[0_4px_16px_rgba(45,55,72,0.08),0_2px_6px_rgba(45,55,72,0.05)]",
    "border border-black/[0.04]",
    "hover:shadow-[0_8px_24px_rgba(45,55,72,0.10),0_4px_10px_rgba(45,55,72,0.06)]",
    "hover:-translate-y-1",
    "transition-all duration-200 ease-out"
  ),
  flat: "bg-cream-dark",
  outlined: cn(
    "bg-cloud-white border-2 border-soft-gray",
    "hover:border-cosmic-purple/30",
    "transition-all duration-200"
  ),
  glass: "glass",
};

// MASSIVE padding - no cramped content allowed - NO CLIPPING
const paddingStyles = {
  none: "",
  sm: "p-8 md:p-10",
  md: "p-10 md:p-12",
  lg: "p-12 md:p-14",
  xl: "p-14 md:p-16",
  "2xl": "p-16 md:p-20",
};

const gradientStyles = {
  cosmic: "bg-gradient-cosmic text-white",
  sunset: "bg-gradient-sunset text-deep-space",
  nature: "bg-gradient-nature text-white",
  space: "bg-gradient-space text-white",
  warm: "bg-gradient-warm",
  playful: "bg-gradient-playful",
  none: "",
};

const overflowStyles = {
  hidden: "overflow-hidden",
  visible: "overflow-visible",
  auto: "overflow-auto",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = "elevated",
      interactive = false,
      padding = "lg",
      gradient = "none",
      overflow,
      className,
      ...props
    },
    ref
  ) => {
    // ALWAYS use overflow-visible to prevent clipping
    const effectiveOverflow = overflow ?? "visible";

    const overflowValue: string = effectiveOverflow === "visible" ? "visible" : (effectiveOverflow || "visible");
    
    // Extract style separately to avoid MotionValueHelper type issues
    const { style, ...restProps } = props;
    
    return (
      <div
        ref={ref}
        className={cn(
          // Larger, friendlier radius
          "rounded-3xl",
          // ALWAYS use overflow-visible unless explicitly set to hidden/auto
          overflowValue === "visible" ? "overflow-visible" : overflowStyles[overflowValue as keyof typeof overflowStyles],
          // Modern elevation system
          gradient === "none" && variantStyles[variant],
          gradient !== "none" && gradientStyles[gradient],
          paddingStyles[padding],
          interactive && "cursor-pointer",
          className
        )}
        {...restProps}
      >
        {children as React.ReactNode}
      </div>
    );
  }
);

Card.displayName = "Card";

// Card Header - More spacious
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  icon,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("flex items-start justify-between gap-6 mb-8", className)}
      {...props}
    >
      <div className="flex items-center gap-5">
        {icon && (
          <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-cosmic-purple/10 flex items-center justify-center text-4xl">
            {icon}
          </div>
        )}
        <div>
          {title && (
            <h3 className="text-2xl font-bold text-deep-space font-display">{title}</h3>
          )}
          {subtitle && (
            <p className="text-lg text-deep-space-lighter mt-2">{subtitle}</p>
          )}
          {children}
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};

// Card Content - Generous spacing
export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      {children}
    </div>
  );
};

// Card Footer - Ample breathing room
export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "mt-8 pt-6 border-t border-soft-gray/50 flex items-center justify-between gap-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Feature Card (for home page) - More playful
export interface FeatureCardProps extends CardProps {
  icon: string;
  title: string;
  description: string;
  color?: "purple" | "blue" | "green" | "yellow" | "pink" | "orange";
}

const colorStyles = {
  purple: "from-cosmic-purple to-cosmic-purple-dark",
  blue: "from-electric-blue to-electric-blue-dark",
  green: "from-vibrant-green to-vibrant-green-dark",
  yellow: "from-sunny-yellow to-sunny-yellow-dark",
  pink: "from-coral-pink to-coral-pink-dark",
  orange: "from-warm-orange to-warm-orange-dark",
};

const iconBgColors = {
  purple: "bg-cosmic-purple/15",
  blue: "bg-electric-blue/15",
  green: "bg-vibrant-green/15",
  yellow: "bg-sunny-yellow/20",
  pink: "bg-coral-pink/15",
  orange: "bg-warm-orange/15",
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  color = "purple",
  className,
  ...props
}) => {
  return (
    <Card interactive className={cn("relative overflow-visible group", className)} {...props}>
      {/* Decorative gradient blob */}
      <div
        className={cn(
          "absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500",
          `bg-gradient-to-br ${colorStyles[color]}`
        )}
      />
      <div className="relative z-10">
        <div 
          className={cn(
            "w-20 h-20 rounded-3xl flex items-center justify-center text-5xl mb-6",
            "bg-gradient-to-br from-white to-purple-50",
            "shadow-[0_4px_12px_rgba(124,77,255,0.15)]",
            "group-hover:shadow-[0_6px_20px_rgba(124,77,255,0.25)]",
            "transition-all duration-300",
            "group-hover:scale-110 group-hover:rotate-3",
            iconBgColors[color]
          )}
        >
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-deep-space mb-3 font-display leading-tight">{title}</h3>
        <p className="text-base text-deep-space/70 leading-relaxed line-height-[1.7]">{description}</p>
      </div>
    </Card>
  );
};

// Stat Card - Cleaner, bigger
export interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  trend?: { value: number; isPositive: boolean };
  color?: "purple" | "blue" | "green" | "yellow" | "pink" | "orange";
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  trend,
  color = "purple",
}) => {
  return (
    <Card padding="lg">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center text-3xl",
            iconBgColors[color]
          )}
        >
          {icon}
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-deep-space font-display">{value}</span>
            {trend && (
              <span
                className={cn(
                  "text-sm font-semibold",
                  trend.isPositive ? "text-vibrant-green" : "text-coral-pink"
                )}
              >
                {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
              </span>
            )}
          </div>
          <span className="text-base text-deep-space-lighter">{label}</span>
        </div>
      </div>
    </Card>
  );
};

// Action Card - New component for prominent CTAs
export interface ActionCardProps extends CardProps {
  icon: string;
  title: string;
  description?: string;
  buttonText?: string;
  color?: "purple" | "blue" | "green" | "yellow" | "pink" | "orange";
  onClick?: () => void;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  title,
  description,
  buttonText,
  color = "purple",
  onClick,
  className,
  ...props
}) => {
  const bgColors = {
    purple: "bg-cosmic-purple",
    blue: "bg-electric-blue",
    green: "bg-vibrant-green",
    yellow: "bg-sunny-yellow",
    pink: "bg-coral-pink",
    orange: "bg-warm-orange",
  };

  const textColors = {
    purple: "text-white",
    blue: "text-white",
    green: "text-deep-space",
    yellow: "text-deep-space",
    pink: "text-white",
    orange: "text-white",
  };

  return (
    <Card 
      interactive 
      className={cn(bgColors[color], textColors[color], "overflow-visible", className)} 
      onClick={onClick}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{icon}</span>
          <div>
            <h3 className="text-xl font-bold font-display">{title}</h3>
            {description && (
              <p className="text-sm opacity-90 mt-1">{description}</p>
            )}
          </div>
        </div>
        {buttonText && (
          <div className="bg-white/20 px-4 py-2 rounded-xl font-semibold text-sm">
            {buttonText}
          </div>
        )}
      </div>
    </Card>
  );
};
