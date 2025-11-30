"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput, GradeSelector } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AvatarSelector, type AvatarConfig } from "@/components/ui/avatar";
import { useAppState } from "@/store/useAppState";

type Step = "account" | "profile" | "avatar";

export default function SignupPage() {
  const router = useRouter();
  const { setUser } = useAppState();
  const [step, setStep] = useState<Step>("account");
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    gradeLevel: 3,
    avatarConfig: {
      character: "explorer",
      color: "purple",
      accessory: "none",
    } as AvatarConfig,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAccount = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateProfile = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nickname) newErrors.nickname = "Nickname is required";
    if (formData.nickname.length < 2) newErrors.nickname = "Nickname must be at least 2 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === "account" && validateAccount()) {
      setStep("profile");
    } else if (step === "profile" && validateProfile()) {
      setStep("avatar");
    }
  };

  const handleBack = () => {
    if (step === "profile") setStep("account");
    if (step === "avatar") setStep("profile");
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Demo signup - in production, this would call Supabase auth
      setTimeout(() => {
        setUser({
          id: "new-user-" + Date.now(),
          nickname: formData.nickname,
          gradeLevel: formData.gradeLevel,
          avatarConfig: formData.avatarConfig,
          xp: 0,
          level: 1,
          streakDays: 1,
          stars: 50, // Welcome bonus
          gems: 10,
          isAuthenticated: true,
        });
        router.push("/home");
      }, 1500);
    } catch {
      setIsLoading(false);
    }
  };

  const stepTitles = {
    account: "Create Your Account",
    profile: "Tell Us About You",
    avatar: "Choose Your Look",
  };

  const stepDescriptions = {
    account: "Start your learning adventure!",
    profile: "What should we call you?",
    avatar: "Pick your character!",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-purple via-cosmic-purple-dark to-deep-space flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md overflow-visible"
      >
        {/* Header */}
        <div className="text-center mb-8 overflow-visible">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <motion.span
              className="text-5xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🧠
            </motion.span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2 overflow-visible whitespace-normal break-words leading-tight">
            {stepTitles[step]}
          </h1>
          <p className="text-white/70 overflow-visible whitespace-normal break-words">{stepDescriptions[step]}</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {(["account", "profile", "avatar"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step === s
                    ? "bg-sunny-yellow text-deep-space"
                    : (["account", "profile", "avatar"] as Step[]).indexOf(step) > i
                      ? "bg-vibrant-green text-white"
                      : "bg-white/20 text-white/50"
                }`}
                animate={step === s ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                {(["account", "profile", "avatar"] as Step[]).indexOf(step) > i ? "✓" : i + 1}
              </motion.div>
              {i < 2 && (
                <div
                  className={`w-8 h-1 mx-1 rounded ${
                    (["account", "profile", "avatar"] as Step[]).indexOf(step) > i
                      ? "bg-vibrant-green"
                      : "bg-white/20"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <Card padding="xl" overflow="visible">
          <AnimatePresence mode="wait">
            {step === "account" && (
              <motion.div
                key="account"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-10"
              >
                <Input
                  label="Email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  error={errors.email}
                />

                <PasswordInput
                  label="Password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  error={errors.password}
                  hint="At least 6 characters"
                />

                <PasswordInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  error={errors.confirmPassword}
                />
              </motion.div>
            )}

            {step === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-10"
              >
                <Input
                  label="Nickname"
                  placeholder="What should we call you?"
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                  error={errors.nickname}
                  hint="This is how you'll appear to others"
                />

                <div>
                  <label className="block text-base font-semibold text-deep-space mb-5 overflow-visible">
                    What grade are you in?
                  </label>
                  <GradeSelector
                    value={formData.gradeLevel}
                    onChange={(grade) => setFormData({ ...formData, gradeLevel: grade })}
                  />
                </div>
              </motion.div>
            )}

            {step === "avatar" && (
              <motion.div
                key="avatar"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <AvatarSelector
                  value={formData.avatarConfig}
                  onChange={(config) => setFormData({ ...formData, avatarConfig: config })}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-10">
            {step !== "account" && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleBack}
                className="flex-1"
              >
                ← Back
              </Button>
            )}
            
            {step !== "avatar" ? (
              <Button
                type="button"
                onClick={handleNext}
                className="flex-1"
              >
                Next →
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                isLoading={isLoading}
                className="flex-1 bg-vibrant-green hover:bg-vibrant-green-dark text-deep-space"
              >
                Start Learning! 🚀
              </Button>
            )}
          </div>
        </Card>

        {/* Login Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-white/70">
            Already have an account?{" "}
            <Link href="/login" className="text-sunny-yellow hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

