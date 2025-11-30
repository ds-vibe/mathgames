"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageContainer, PageHeader, Section } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarSelector, BuddySelector, type AvatarConfig } from "@/components/ui/avatar";
import { XPBar, StreakBadge, CircularProgress } from "@/components/ui/progress";
import { Modal } from "@/components/ui/modal";
import { useAppState } from "@/store/useAppState";
import { calculateLevel, getGradeLabel } from "@/lib/utils";
import { ACHIEVEMENT_CATEGORIES, LEARNING_BUDDIES } from "@/lib/constants";
import { Settings, Edit2, Trophy, Star, Gem, Flame, Book, Gamepad2, Target } from "lucide-react";

// Demo achievements
const achievements = [
  { id: "first-lesson", name: "First Steps", icon: "🌱", description: "Complete your first lesson", unlocked: true },
  { id: "streak-7", name: "Week Warrior", icon: "🔥", description: "7-day streak", unlocked: true },
  { id: "math-master", name: "Math Explorer", icon: "📐", description: "Complete 10 math lessons", unlocked: true },
  { id: "science-star", name: "Science Star", icon: "🔬", description: "Complete 10 science lessons", unlocked: true },
  { id: "reader", name: "Bookworm", icon: "📚", description: "Read 25 passages", unlocked: false },
  { id: "gamer", name: "Game Champion", icon: "🎮", description: "Win 50 games", unlocked: false },
  { id: "perfect", name: "Perfect Score", icon: "💯", description: "Get 100% on any quiz", unlocked: true },
  { id: "helper", name: "Helping Hand", icon: "🤝", description: "Help 5 friends", unlocked: false },
  { id: "early-bird", name: "Early Bird", icon: "🌅", description: "Learn before 8 AM", unlocked: true },
  { id: "night-owl", name: "Night Owl", icon: "🦉", description: "Learn after 8 PM", unlocked: false },
  { id: "streak-30", name: "Month Master", icon: "👑", description: "30-day streak", unlocked: false },
  { id: "all-games", name: "Game Expert", icon: "🏆", description: "Try all games", unlocked: false },
];

export default function ProfilePage() {
  const { user, setUser, ui } = useAppState();
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showBuddyModal, setShowBuddyModal] = useState(false);
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(user.avatarConfig);
  const [selectedBuddy, setSelectedBuddy] = useState("atom");

  const levelInfo = calculateLevel(user.xp);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  const handleSaveAvatar = () => {
    setUser({ avatarConfig });
    setShowAvatarModal(false);
  };

  // Stats data
  const stats = [
    { icon: "📚", label: "Lessons", value: 24 },
    { icon: "🎮", label: "Games", value: 48 },
    { icon: "📖", label: "Stories", value: 12 },
    { icon: "❓", label: "Problems", value: 342 },
  ];

  return (
    <PageContainer>
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Card gradient="cosmic" className="relative overflow-hidden">
          <motion.div
            className="absolute -right-20 -top-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar config={user.avatarConfig} size="2xl" />
              <button
                onClick={() => setShowAvatarModal(true)}
                className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <Edit2 className="w-4 h-4 text-cosmic-purple" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {user.nickname || "Explorer"}
                </h1>
                <StreakBadge days={user.streakDays} size="md" />
              </div>
              <p className="text-white/70 mb-4">
                {getGradeLabel(user.gradeLevel)} • {levelInfo.title}
              </p>
              <XPBar
                currentXP={user.xp}
                level={levelInfo.level}
                xpForNext={levelInfo.xpForNext}
                className="max-w-md"
              />
            </div>

            {/* Currency */}
            <div className="flex md:flex-col gap-4">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl">
                <Star className="w-5 h-5 text-sunny-yellow" />
                <span className="font-bold text-white">{user.stars.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl">
                <Gem className="w-5 h-5 text-electric-blue-light" />
                <span className="font-bold text-white">{user.gems}</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Stats */}
          <Section title="Your Progress">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-deep-space">{stat.value}</div>
                    <div className="text-sm text-deep-space/60">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Achievements */}
          <Section
            title="Achievements"
            subtitle={`${unlockedCount}/${achievements.length} unlocked`}
          >
            <Card>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-5">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative group ${!achievement.unlocked && "opacity-40"}`}
                  >
                    <div
                      className={`w-full aspect-square rounded-xl flex items-center justify-center text-3xl ${
                        achievement.unlocked
                          ? "bg-gradient-cosmic"
                          : "bg-cloud-gray"
                      }`}
                    >
                      {achievement.unlocked ? achievement.icon : "🔒"}
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-deep-space text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      <div className="font-bold">{achievement.name}</div>
                      <div className="text-white/70">{achievement.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </Section>

          {/* Recent Activity */}
          <Section title="Recent Activity">
            <Card>
              <div className="space-y-4">
                {[
                  { type: "lesson", text: "Completed 'Multiplication Facts'", time: "Today", xp: 100, icon: "📚" },
                  { type: "game", text: "High score on Fraction Kitchen!", time: "Today", xp: 75, icon: "🎮" },
                  { type: "streak", text: "7-day streak achieved!", time: "Yesterday", xp: 50, icon: "🔥" },
                  { type: "reading", text: "Read 'The Busy Bee's Day'", time: "Yesterday", xp: 25, icon: "📖" },
                  { type: "achievement", text: "Unlocked 'Math Explorer'", time: "2 days ago", xp: 100, icon: "🏆" },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-cloud-gray/50 transition-colors"
                  >
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-deep-space">{activity.text}</p>
                      <p className="text-sm text-deep-space/50">{activity.time}</p>
                    </div>
                    <div className="text-sm font-bold text-cosmic-purple">+{activity.xp} XP</div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </Section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Learning Buddy */}
          <Card>
            <div className="text-center">
              <h3 className="font-bold text-deep-space mb-3">Learning Buddy</h3>
              <motion.div
                className="text-6xl mb-2"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {LEARNING_BUDDIES.find((b) => b.id === selectedBuddy)?.emoji || "⚛️"}
              </motion.div>
              <p className="font-medium text-deep-space">
                {LEARNING_BUDDIES.find((b) => b.id === selectedBuddy)?.name || "Atom"}
              </p>
              <p className="text-sm text-deep-space/60 mb-3">
                {LEARNING_BUDDIES.find((b) => b.id === selectedBuddy)?.description}
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowBuddyModal(true)}
              >
                Change Buddy
              </Button>
            </div>
          </Card>

          {/* Weekly Goals */}
          <Card>
            <h3 className="font-bold text-deep-space mb-4">Weekly Goals</h3>
            <div className="space-y-4">
              {[
                { icon: <Book className="w-4 h-4" />, label: "Complete 5 lessons", current: 3, target: 5, color: "purple" },
                { icon: <Gamepad2 className="w-4 h-4" />, label: "Play 10 games", current: 7, target: 10, color: "blue" },
                { icon: <Target className="w-4 h-4" />, label: "Practice 30 min", current: 22, target: 30, color: "green" },
              ].map((goal, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CircularProgress
                    value={goal.current}
                    max={goal.target}
                    size={48}
                    strokeWidth={4}
                    color={goal.color as "purple" | "blue" | "green"}
                    showValue={false}
                  >
                    <span className="text-xs">{goal.icon}</span>
                  </CircularProgress>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-deep-space">{goal.label}</p>
                    <p className="text-xs text-deep-space/50">
                      {goal.current}/{goal.target}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h3 className="font-bold text-deep-space mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="ghost" fullWidth className="justify-start">
                <Settings className="w-4 h-4 mr-2" /> Settings
              </Button>
              <Button variant="ghost" fullWidth className="justify-start">
                <Trophy className="w-4 h-4 mr-2" /> View All Achievements
              </Button>
              <Button variant="ghost" fullWidth className="justify-start text-coral-pink">
                👨‍👩‍👧 Parent Dashboard
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Avatar Edit Modal */}
      <Modal
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        title="Customize Your Avatar"
        size="lg"
      >
        <AvatarSelector value={avatarConfig} onChange={setAvatarConfig} />
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={() => setShowAvatarModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveAvatar}>Save Changes</Button>
        </div>
      </Modal>

      {/* Buddy Select Modal */}
      <Modal
        isOpen={showBuddyModal}
        onClose={() => setShowBuddyModal(false)}
        title="Choose Your Learning Buddy"
        size="lg"
      >
        <BuddySelector value={selectedBuddy} onChange={setSelectedBuddy} />
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={() => setShowBuddyModal(false)}>
            Cancel
          </Button>
          <Button onClick={() => setShowBuddyModal(false)}>Select Buddy</Button>
        </div>
      </Modal>
    </PageContainer>
  );
}

