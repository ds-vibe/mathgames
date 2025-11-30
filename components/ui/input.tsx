"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Search, X } from "lucide-react";

// Base Input
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-base font-semibold text-deep-space mb-5 overflow-visible whitespace-normal leading-relaxed"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-deep-space/40">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full px-7 py-5.5 rounded-2xl border-2 transition-all text-lg",
              "bg-cloud-white text-deep-space placeholder:text-deep-space/40",
              "hover:bg-white hover:border-soft-gray",
              "focus:outline-none focus:ring-4 focus:ring-cosmic-purple/15 focus:bg-white",
              "overflow-visible min-h-[56px]",
              error
                ? "border-coral-pink focus:border-coral-pink"
                : "border-cloud-gray focus:border-cosmic-purple",
              leftIcon && "pl-14",
              rightIcon && "pr-14",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-deep-space/40">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-coral-pink mt-2 font-medium"
          >
            {error}
          </motion.p>
        )}
        {hint && !error && (
          <p className="text-sm text-deep-space/50 mt-2">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// Password Input
export interface PasswordInputProps extends Omit<InputProps, "type" | "rightIcon"> {}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="hover:text-deep-space transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";

// Search Input
export interface SearchInputProps extends Omit<InputProps, "leftIcon" | "type"> {
  onClear?: () => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onClear, value, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="search"
        value={value}
        leftIcon={<Search className="w-5 h-5" />}
        rightIcon={
          value ? (
            <button
              type="button"
              onClick={onClear}
              className="hover:text-deep-space transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          ) : undefined
        }
        {...props}
      />
    );
  }
);

SearchInput.displayName = "SearchInput";

// Select
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, ...props }, ref) => {
    const selectId = id || React.useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-base font-semibold text-deep-space mb-5 overflow-visible whitespace-normal leading-relaxed"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "w-full px-5 py-4 rounded-2xl border-2 transition-all appearance-none text-lg",
            "bg-cloud-white text-deep-space",
            "hover:bg-white hover:border-soft-gray",
            "focus:outline-none focus:ring-4 focus:ring-cosmic-purple/15 focus:bg-white",
            "bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M10%2012l-5-5h10l-5%205z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center]",
            error
              ? "border-coral-pink focus:border-coral-pink"
              : "border-cloud-gray focus:border-cosmic-purple",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-coral-pink mt-2 font-medium"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

// Checkbox
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, id, ...props }, ref) => {
    const checkboxId = id || React.useId();

    return (
      <label
        htmlFor={checkboxId}
        className={cn("flex items-center gap-3 cursor-pointer group", className)}
      >
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className="peer sr-only"
            {...props}
          />
          <div className="w-6 h-6 rounded-lg border-2 border-cloud-gray peer-checked:border-cosmic-purple peer-checked:bg-cosmic-purple transition-all flex items-center justify-center group-hover:border-cosmic-purple/50">
            <motion.svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
            >
              <polyline points="20 6 9 17 4 12" />
            </motion.svg>
          </div>
        </div>
        <span className="text-deep-space">{label}</span>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

// Toggle Switch
export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, className, id, checked, ...props }, ref) => {
    const toggleId = id || React.useId();

    return (
      <label
        htmlFor={toggleId}
        className={cn("flex items-center gap-3 cursor-pointer", className)}
      >
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={toggleId}
            checked={checked}
            className="peer sr-only"
            {...props}
          />
          <div className="w-12 h-7 rounded-full bg-cloud-gray peer-checked:bg-cosmic-purple transition-colors" />
          <motion.div
            className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md"
            animate={{ x: checked ? 20 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </div>
        {label && <span className="text-deep-space">{label}</span>}
      </label>
    );
  }
);

Toggle.displayName = "Toggle";

// Grade Selector (kid-friendly buttons)
export interface GradeSelectorProps {
  value: number;
  onChange: (grade: number) => void;
  grades?: number[];
}

export const GradeSelector: React.FC<GradeSelectorProps> = ({
  value,
  onChange,
  grades = [1, 2, 3, 4],
}) => {
  const gradeLabels: Record<number, string> = {
    1: "1st",
    2: "2nd",
    3: "3rd",
    4: "4th",
  };

  const gradeEmojis: Record<number, string> = {
    1: "🌱",
    2: "🌿",
    3: "🌳",
    4: "🌲",
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {grades.map((grade) => (
        <motion.button
          key={grade}
          type="button"
          className={cn(
            "p-5 rounded-2xl text-center transition-all",
            value === grade
              ? "bg-cosmic-purple text-white shadow-lg shadow-cosmic-purple/25"
              : "bg-cloud-gray hover:bg-soft-gray text-deep-space"
          )}
          onClick={() => onChange(grade)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="text-4xl mb-2">{gradeEmojis[grade]}</div>
          <div className="font-bold text-lg">{gradeLabels[grade]} Grade</div>
        </motion.button>
      ))}
    </div>
  );
};

