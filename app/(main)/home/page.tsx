"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PageContainer, PageHeader, Section } from "@/components/layout/main-layout";
import { QuickStatsBar } from "@/components/layout/mobile-nav";
import { Card, FeatureCard, StatCard, ActionCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar, XPBar, StreakBadge } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { useAppState } from "@/store/useAppState";
import { GAME_CONFIG } from "@/lib/constants";
import { calculateLevel } from "@/lib/utils";

export default function HomePage() {
  const { user, dailyChallenges } = useAppState();

  // Calculate level info
  const levelInfo = calculateLevel(user.xp);

  // Demo daily challenges
  const challenges = dailyChallenges.length > 0 ? dailyChallenges : [
    { id: "1", type: "practice" as const, description: "Complete 5 math problems", target: 5, progress: 2, completed: false },
    { id: "2", type: "game" as const, description: "Play Fraction Kitchen", target: 1, progress: 0, completed: false },
    { id: "3", type: "reading" as const, description: "Read a science story", target: 1, progress: 1, completed: true },
  ];

  const completedCount = challenges.filter((c) => c.completed).length;

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Mobile Stats Bar */}
      <div className="md:hidden">
        <QuickStatsBar xp={user.xp} streak={user.streakDays} stars={user.stars} />
      </div>

      <PageContainer>
        {/* Hero Welcome Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Avatar config={user.avatarConfig} size="xl" />
            </motion.div>

            {/* Welcome Text */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-deep-space font-display mb-2">
                Welcome back, {user.nickname || "Explorer"}! 
                <motion.span 
                  className="inline-block ml-2"
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                >
                  👋
                </motion.span>
              </h1>
              <p className="text-lg text-deep-space-light mb-4">
                Ready for another day of adventure?
              </p>
              
              {/* XP Bar - Desktop */}
              <div className="hidden md:block max-w-md">
                <XPBar
                  currentXP={user.xp}
                  level={levelInfo.level}
                  xpForNext={levelInfo.xpForNext}
                />
              </div>
            </div>

            {/* Streak Badge - Desktop */}
            <div className="hidden md:block">
              <StreakBadge days={user.streakDays} size="lg" />
            </div>
          </div>
        </motion.section>

        {/* Stats Grid (Desktop) */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="hidden md:grid grid-cols-4 gap-6 mb-12"
        >
          <motion.div variants={itemVariants}>
            <StatCard icon="⚡" value={user.xp.toLocaleString()} label="Total XP" color="purple" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard icon="🔥" value={user.streakDays} label="Day Streak" color="orange" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard icon="⭐" value={user.stars} label="Stars Earned" color="yellow" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard icon="💎" value={user.gems} label="Gems" color="blue" />
          </motion.div>
        </motion.section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - 2 cols */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Daily Challenges */}
            <Section 
              title="Daily Challenges" 
              subtitle={`${completedCount}/3 completed`}
              action={
                completedCount === 3 && (
                  <span className="text-sm text-vibrant-green font-semibold flex items-center gap-1">
                    <span className="text-lg">🎉</span> All done!
                  </span>
                )
              }
            >
              <Card padding="xl">
                <div className="space-y-4">
                  {challenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-colors ${
                        challenge.completed 
                          ? "bg-vibrant-green/10 border-2 border-vibrant-green/20" 
                          : "bg-cream-dark"
                      }`}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                        <span className="text-3xl">
                          {challenge.completed ? "✅" : 
                            challenge.type === "practice" ? "📝" :
                            challenge.type === "game" ? "🎮" : "📖"}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold text-lg ${
                          challenge.completed ? "text-vibrant-green-dark" : "text-deep-space"
                        }`}>
                          {challenge.description}
                        </p>
                        {!challenge.completed && (
                          <div className="mt-2">
                            <ProgressBar
                              value={challenge.progress}
                              max={challenge.target}
                              size="md"
                              color="purple"
                            />
                          </div>
                        )}
                      </div>
                      {!challenge.completed && (
                        <span className="text-base font-bold text-deep-space-lighter bg-white px-3 py-1.5 rounded-full shadow-sm">
                          {challenge.progress}/{challenge.target}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>

                {completedCount === 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 p-5 bg-gradient-cosmic rounded-2xl text-white text-center"
                  >
                    <p className="font-bold text-xl mb-2">🎉 All challenges complete!</p>
                    <p className="text-base opacity-90 mb-4">You earned a bonus reward!</p>
                    <Button
                      size="lg"
                      className="bg-white text-cosmic-purple hover:bg-white/90 shadow-lg"
                    >
                      Claim +50 XP ✨
                    </Button>
                  </motion.div>
                )}
              </Card>
            </Section>

            {/* Quick Actions */}
            <Section title="Jump Back In" subtitle="Continue where you left off">
              <motion.div 
                className="grid grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={itemVariants}>
                  <Link href="/learn">
                    <FeatureCard
                      icon="📚"
                      title="Learn"
                      description="Continue your lessons"
                      color="purple"
                    />
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link href="/play">
                    <FeatureCard
                      icon="🎮"
                      title="Play"
                      description="Fun learning games"
                      color="blue"
                    />
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link href="/read">
                    <FeatureCard
                      icon="📖"
                      title="Read"
                      description="Stories & passages"
                      color="pink"
                    />
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link href="/practice">
                    <FeatureCard
                      icon="🧠"
                      title="Practice"
                      description="Brain gym workout"
                      color="green"
                    />
                  </Link>
                </motion.div>
              </motion.div>
            </Section>

            {/* Featured Games */}
            <Section 
              title="Featured Games" 
              action={
                <Link href="/play" className="text-cosmic-purple font-semibold hover:underline">
                  See All →
                </Link>
              }
            >
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {Object.values(GAME_CONFIG).slice(0, 4).map((game, index) => (
                  <motion.div key={game.id} variants={itemVariants}>
                    <Link href={`/play/${game.id}`}>
                      <Card interactive padding="lg" className="h-full">
                        <div className="flex items-start gap-5">
                          <div className="w-16 h-16 rounded-2xl bg-cream-dark flex items-center justify-center text-4xl flex-shrink-0">
                            {game.icon}
                          </div>
                          <div className="flex-1 min-w-[1px] overflow-visible">
                            <h3 className="font-bold text-lg text-deep-space font-display mb-1">
                              {game.name}
                            </h3>
                            <p className="text-deep-space-light text-sm line-clamp-2 mb-3">
                              {game.description}
                            </p>
                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
                              game.subject === "math" 
                                ? "bg-electric-blue/15 text-electric-blue-dark" 
                                : "bg-vibrant-green/15 text-vibrant-green-dark"
                            }`}>
                              {game.subject === "math" ? "📐" : "🔬"}
                              {game.subject === "math" ? "Math" : "Science"}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </Section>
          </div>

          {/* Sidebar - 1 col */}
          <div className="space-y-6">
            {/* Level Progress Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card gradient="cosmic" padding="xl">
                <div className="text-center text-white">
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🏆
                  </motion.div>
                  <h3 className="text-2xl font-bold font-display mb-1">{levelInfo.title}</h3>
                  <p className="text-white/80 mb-5">Level {levelInfo.level}</p>
                  <div className="bg-white/20 rounded-full h-4 overflow-hidden mb-3">
                    <motion.div
                      className="h-full bg-sunny-yellow rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${levelInfo.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <p className="text-sm text-white/70">
                    {(levelInfo.xpForNext - user.xp % levelInfo.xpForNext).toLocaleString()} XP to next level
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card padding="lg">
                <h3 className="font-bold text-xl text-deep-space font-display mb-5">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: "📚", text: "Completed Addition Lesson", time: "2h ago", xp: 100 },
                    { icon: "🎮", text: "Played Fraction Kitchen", time: "Yesterday", xp: 75 },
                    { icon: "📖", text: "Read 'The Busy Bee's Day'", time: "Yesterday", xp: 25 },
                  ].map((activity, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-cream-dark transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-cream-dark flex items-center justify-center text-2xl">
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-[1px] overflow-visible">
                        <p className="font-medium text-deep-space overflow-visible break-words">{activity.text}</p>
                        <p className="text-sm text-deep-space-lighter">{activity.time}</p>
                      </div>
                      <span className="text-sm font-bold text-cosmic-purple bg-cosmic-purple/10 px-2.5 py-1 rounded-full">
                        +{activity.xp}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Achievements Teaser */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card padding="lg">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-xl text-deep-space font-display">Achievements</h3>
                  <Link href="/achievements" className="text-cosmic-purple font-semibold hover:underline">
                    See All
                  </Link>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {["🔥", "📚", "🎮", "⭐", "🏆"].map((emoji, i) => (
                    <motion.div
                      key={i}
                      className="w-14 h-14 bg-cream-dark rounded-2xl flex items-center justify-center text-2xl shadow-sm"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      {emoji}
                    </motion.div>
                  ))}
                  <div className="w-14 h-14 bg-cosmic-purple/10 rounded-2xl flex items-center justify-center text-sm text-cosmic-purple font-bold">
                    +12
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Story Mode CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/story">
                <ActionCard
                  icon="📖"
                  title="Story Mode"
                  description="Continue your adventure!"
                  buttonText="Play →"
                  color="orange"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
