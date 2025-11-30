"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAppState } from "@/store/useAppState";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAppState();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Demo login - in production, this would call Supabase auth
      // For now, we'll just set a demo user
      setTimeout(() => {
        setUser({
          id: "demo-user",
          nickname: "Explorer",
          gradeLevel: 3,
          avatarConfig: { character: "explorer", color: "purple", accessory: "none" },
          xp: 1250,
          level: 5,
          streakDays: 7,
          stars: 150,
          gems: 25,
          isAuthenticated: true,
        });
        router.push("/home");
      }, 1000);
    } catch {
      setError("Failed to log in. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-purple via-cosmic-purple-dark to-deep-space flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <motion.span
              className="text-5xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🧠
            </motion.span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2 overflow-visible whitespace-normal break-words leading-tight">Welcome Back!</h1>
          <p className="text-white/70 overflow-visible whitespace-normal break-words">Let's continue your learning adventure</p>
        </div>

        {/* Login Form */}
        <Card padding="xl" overflow="visible">
          <form onSubmit={handleSubmit} className="space-y-10">
            <Input
              label="Email"
              type="email"
              placeholder="explorer@brainblast.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-coral-pink text-sm"
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading}
            >
              Sign In 🚀
            </Button>
          </form>

          <div className="mt-8 text-center">
            <Link
              href="/forgot-password"
              className="text-base text-cosmic-purple hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-soft-gray" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-deep-space/50">or</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-deep-space/60 mb-4 text-lg">
              Don't have an account yet?
            </p>
            <Link href="/signup">
              <Button variant="outline" fullWidth size="lg">
                Create Account ✨
              </Button>
            </Link>
          </div>
        </Card>

        {/* Demo Mode Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-white/50 text-sm">
            Demo mode: Enter any email/password to explore
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

