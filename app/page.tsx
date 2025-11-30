"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/store/useAppState";

// Generate particle positions once on mount to avoid hydration mismatch
function useParticles(count: number) {
  const [particles, setParticles] = useState<Array<{x: number, y: number, duration: number, delay: number}>>([]);
  
  useEffect(() => {
    setParticles(
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      }))
    );
  }, [count]);
  
  return particles;
}

export default function LandingPage() {
  const router = useRouter();
  const { user } = useAppState();
  const particles = useParticles(20);

  useEffect(() => {
    // If user is authenticated, redirect to home
    if (user.isAuthenticated && !user.isLoading) {
      router.push("/home");
    }
  }, [user.isAuthenticated, user.isLoading, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-purple via-cosmic-purple-dark to-deep-space overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 md:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.span
              className="text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🧠
            </motion.span>
            <span className="text-2xl font-bold text-white">BrainBlast!</span>
          </div>
          <Button
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10"
            onClick={() => router.push("/login")}
          >
            Sign In
          </Button>
        </header>

        {/* Hero */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Floating characters */}
            <div className="flex justify-center gap-4 mb-6">
              <motion.span
                className="text-5xl"
                animate={{ y: [0, -20, 0], rotate: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🚀
              </motion.span>
              <motion.span
                className="text-5xl"
                animate={{ y: [0, -15, 0], rotate: [5, -5, 5] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              >
                ⭐
              </motion.span>
              <motion.span
                className="text-5xl"
                animate={{ y: [0, -25, 0], rotate: [-5, 5, -5] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              >
                🎮
              </motion.span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Learning That Feels<br />
              Like <span className="text-sunny-yellow drop-shadow-lg">Playing!</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
              Fun math and science adventures for grades 1-4. 
              Explore, play games, read stories, and become a genius!
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Button
                size="xl"
                className="bg-sunny-yellow text-deep-space hover:bg-sunny-yellow-dark font-bold min-w-[280px] shadow-[0_8px_24px_rgba(255,214,0,0.35)] hover:shadow-[0_12px_32px_rgba(255,214,0,0.45)]"
                onClick={() => router.push("/signup")}
              >
                Start Learning Free! 🎉
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-2 border-white/80 text-white hover:bg-white hover:text-cosmic-purple min-w-[240px] backdrop-blur-sm bg-white/10"
                onClick={() => router.push("/parent")}
              >
                I'm a Parent 👨‍👩‍👧
              </Button>
            </div>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {[
              { icon: "📚", label: "Fun Lessons" },
              { icon: "🎮", label: "Cool Games" },
              { icon: "📖", label: "Amazing Stories" },
              { icon: "🏆", label: "Earn Rewards" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 text-center min-h-[160px] flex flex-col items-center justify-center border border-white/20 overflow-visible group transition-all duration-300 hover:bg-white/20 hover:-translate-y-1"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <span className="text-5xl block mb-3 group-hover:scale-110 transition-transform duration-300">{feature.icon}</span>
                <span className="text-white font-semibold text-lg">{feature.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </main>

        {/* Grade badges */}
        <motion.div
          className="py-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-white/60 text-sm mb-3">Perfect for:</p>
          <div className="flex justify-center gap-3">
            {["1st", "2nd", "3rd", "4th"].map((grade, i) => (
              <span
                key={grade}
                className="px-3 py-1 bg-white/20 rounded-full text-white text-sm font-medium"
              >
                {grade} Grade
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
