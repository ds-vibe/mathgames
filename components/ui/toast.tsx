"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

// Toast types
export type ToastType = "success" | "error" | "warning" | "info" | "achievement";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  icon?: React.ReactNode;
}

// Toast context
interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Toast Provider
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);

    // Auto remove after duration
    const duration = toast.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

// Toast Container (renders all toasts)
export const Toaster: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Create a simple toast system without context for SSR compatibility
  React.useEffect(() => {
    if (!mounted) return;

    const handleToast = (e: CustomEvent<Omit<Toast, "id">>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast = { ...e.detail, id };
      setToasts((prev) => [...prev, newToast]);

      const duration = e.detail.duration ?? 5000;
      if (duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }
    };

    window.addEventListener("toast" as keyof WindowEventMap, handleToast as EventListener);
    return () => {
      window.removeEventListener("toast" as keyof WindowEventMap, handleToast as EventListener);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Individual Toast Item
interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const typeStyles = {
    success: "bg-vibrant-green text-deep-space",
    error: "bg-coral-pink text-white",
    warning: "bg-sunny-yellow text-deep-space",
    info: "bg-electric-blue text-white",
    achievement: "bg-gradient-cosmic text-white",
  };

  const typeIcons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    achievement: <span className="text-xl">🏆</span>,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      className={cn(
        "pointer-events-auto rounded-xl p-4 shadow-lg",
        typeStyles[toast.type]
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {toast.icon || typeIcons[toast.type]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold">{toast.title}</p>
          {toast.message && (
            <p className="text-sm opacity-90 mt-0.5">{toast.message}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

// Toast helper function (can be used without context)
export const toast = {
  success: (title: string, message?: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("toast", { detail: { type: "success", title, message } })
      );
    }
  },
  error: (title: string, message?: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("toast", { detail: { type: "error", title, message } })
      );
    }
  },
  warning: (title: string, message?: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("toast", { detail: { type: "warning", title, message } })
      );
    }
  },
  info: (title: string, message?: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("toast", { detail: { type: "info", title, message } })
      );
    }
  },
  achievement: (title: string, message?: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("toast", { detail: { type: "achievement", title, message, duration: 8000 } })
      );
    }
  },
};

