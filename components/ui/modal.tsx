"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconButton } from "./button";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

const sizeStyles = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-[95vw] md:max-w-4xl",
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) => {
  // Handle escape key
  React.useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-deep-space/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOnOverlayClick ? onClose : undefined}
          />

          {/* Modal */}
              <motion.div
                className={cn(
                  "relative w-full bg-white rounded-3xl shadow-2xl",
                  sizeStyles[size]
                )}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-soft-gray/50">
                <div>
                  {title && (
                    <h2 className="text-2xl font-bold text-deep-space">{title}</h2>
                  )}
                  {description && (
                    <p className="text-sm text-deep-space/60 mt-1.5">{description}</p>
                  )}
                </div>
                {showCloseButton && (
                  <IconButton
                    icon={<X className="w-5 h-5" />}
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    aria-label="Close modal"
                  />
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Confirmation Modal
export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "info",
  isLoading = false,
}) => {
  const variantIcons = {
    danger: "⚠️",
    warning: "⚡",
    info: "ℹ️",
  };

  const variantColors = {
    danger: "danger" as const,
    warning: "success" as const,
    info: "primary" as const,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
      <div className="text-center px-2 py-1">
        <div className="text-5xl mb-5">{variantIcons[variant]}</div>
        <h3 className="text-xl font-bold text-deep-space mb-3">{title}</h3>
        <p className="text-deep-space/70 mb-7 leading-relaxed">{message}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl font-medium text-deep-space/70 hover:bg-cloud-gray transition-colors"
          >
            {cancelText}
          </button>
          <motion.button
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              "px-4 py-2 rounded-xl font-medium text-white transition-colors",
              variant === "danger" && "bg-coral-pink hover:bg-coral-pink-dark",
              variant === "warning" && "bg-sunny-yellow text-deep-space hover:bg-sunny-yellow-dark",
              variant === "info" && "bg-cosmic-purple hover:bg-cosmic-purple-dark"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <motion.span
                className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              confirmText
            )}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
};

// Success Modal (for celebrations)
export interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  xpEarned?: number;
  starsEarned?: number;
  achievement?: { name: string; icon: string };
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  xpEarned,
  starsEarned,
  achievement,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
      <div className="text-center px-2 py-1">
        <motion.div
          className="text-6xl mb-5"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          🎉
        </motion.div>
        
        <h3 className="text-2xl font-bold text-deep-space mb-3">{title}</h3>
        <p className="text-deep-space/70 mb-7 leading-relaxed">{message}</p>

        {/* Rewards */}
        <div className="flex justify-center gap-5 mb-7">
          {xpEarned && (
            <motion.div
              className="flex items-center gap-2 bg-cosmic-purple/10 px-4 py-2 rounded-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-xl">⚡</span>
              <span className="font-bold text-cosmic-purple">+{xpEarned} XP</span>
            </motion.div>
          )}
          {starsEarned && (
            <motion.div
              className="flex items-center gap-2 bg-sunny-yellow/20 px-4 py-2 rounded-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-xl">⭐</span>
              <span className="font-bold text-sunny-yellow-dark">+{starsEarned}</span>
            </motion.div>
          )}
        </div>

        {achievement && (
          <motion.div
            className="bg-gradient-cosmic text-white px-5 py-4 rounded-2xl mb-7"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-sm opacity-80">Achievement Unlocked!</div>
            <div className="flex items-center justify-center gap-3 mt-1.5">
              <span className="text-2xl">{achievement.icon}</span>
              <span className="font-bold">{achievement.name}</span>
            </div>
          </motion.div>
        )}

        <motion.button
          onClick={onClose}
          className="px-10 py-3.5 bg-cosmic-purple text-white font-bold rounded-2xl text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Awesome! 🚀
        </motion.button>
      </div>
    </Modal>
  );
};

