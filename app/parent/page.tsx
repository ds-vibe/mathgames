"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress";
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  Target, 
  TrendingUp, 
  Award,
  BookOpen,
  Gamepad2,
  Settings,
  Bell,
  ChevronRight,
  Shield,
  Lock
} from "lucide-react";

// Mock data for parent dashboard
const CHILD_DATA = {
  name: "Alex",
  avatar: "👦",
  grade: 3,
  totalXP: 4250,
  level: 8,
  currentStreak: 5,
  longestStreak: 12,
  lessonsCompleted: 47,
  gamesPlayed: 89,
  readingsDone: 23,
  weeklyGoal: 5,
  weeklyProgress: 4,
  lastActive: "2 hours ago",
};

const WEEKLY_ACTIVITY = [
  { day: "Mon", minutes: 25, lessons: 2 },
  { day: "Tue", minutes: 30, lessons: 3 },
  { day: "Wed", minutes: 15, lessons: 1 },
  { day: "Thu", minutes: 45, lessons: 4 },
  { day: "Fri", minutes: 20, lessons: 2 },
  { day: "Sat", minutes: 0, lessons: 0 },
  { day: "Sun", minutes: 35, lessons: 2 },
];

const SUBJECT_PROGRESS = [
  { subject: "Addition", mastery: 95, color: "bg-vibrant-green" },
  { subject: "Subtraction", mastery: 88, color: "bg-sky-blue" },
  { subject: "Multiplication", mastery: 72, color: "bg-cosmic-purple" },
  { subject: "Division", mastery: 45, color: "bg-coral-pink" },
  { subject: "Fractions", mastery: 30, color: "bg-sunny-yellow" },
  { subject: "Life Science", mastery: 80, color: "bg-vibrant-green" },
  { subject: "Earth Science", mastery: 65, color: "bg-sky-blue" },
  { subject: "Physical Science", mastery: 55, color: "bg-cosmic-purple" },
];

const RECENT_ACHIEVEMENTS = [
  { name: "Week Warrior", icon: "⚡", date: "Today" },
  { name: "Math Master", icon: "🧮", date: "Yesterday" },
  { name: "Perfect Score", icon: "💯", date: "2 days ago" },
];

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "progress" | "settings">("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cosmic-purple rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Parent Dashboard</h1>
                <p className="text-sm text-slate-500">BrainBlast Learning</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <Bell className="w-5 h-5 text-slate-500" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <Settings className="w-5 h-5 text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-6">
            {[
              { key: "overview", label: "Overview", icon: BarChart3 },
              { key: "progress", label: "Learning Progress", icon: TrendingUp },
              { key: "settings", label: "Settings", icon: Settings },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === key
                    ? "border-cosmic-purple text-cosmic-purple"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Child Profile Card */}
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-cosmic-purple to-sky-blue rounded-2xl flex items-center justify-center text-4xl">
                  {CHILD_DATA.avatar}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900">{CHILD_DATA.name}</h2>
                  <p className="text-slate-500">Grade {CHILD_DATA.grade} • Level {CHILD_DATA.level}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-slate-500">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Last active {CHILD_DATA.lastActive}
                    </span>
                    <span className="text-sm text-coral-pink">
                      🔥 {CHILD_DATA.currentStreak} day streak
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">Total XP</p>
                  <p className="text-3xl font-bold text-cosmic-purple">{CHILD_DATA.totalXP.toLocaleString()}</p>
                </div>
              </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Lessons Done", value: CHILD_DATA.lessonsCompleted, icon: BookOpen, color: "text-cosmic-purple", bg: "bg-cosmic-purple/10" },
                { label: "Games Played", value: CHILD_DATA.gamesPlayed, icon: Gamepad2, color: "text-vibrant-green", bg: "bg-vibrant-green/10" },
                { label: "Readings", value: CHILD_DATA.readingsDone, icon: BookOpen, color: "text-sky-blue", bg: "bg-sky-blue/10" },
                { label: "Longest Streak", value: `${CHILD_DATA.longestStreak} days`, icon: Award, color: "text-coral-pink", bg: "bg-coral-pink/10" },
              ].map((stat, i) => (
                <Card key={i} className="p-4">
                  <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </Card>
              ))}
            </div>

            {/* Weekly Goal & Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Weekly Goal */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900">Weekly Goal</h3>
                  <Target className="w-5 h-5 text-cosmic-purple" />
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-500">
                      {CHILD_DATA.weeklyProgress} of {CHILD_DATA.weeklyGoal} days
                    </span>
                    <span className="text-sm font-medium text-cosmic-purple">
                      {Math.round((CHILD_DATA.weeklyProgress / CHILD_DATA.weeklyGoal) * 100)}%
                    </span>
                  </div>
                  <ProgressBar 
                    value={(CHILD_DATA.weeklyProgress / CHILD_DATA.weeklyGoal) * 100} 
                    color="purple" 
                    size="lg" 
                  />
                </div>
                <p className="text-sm text-slate-500">
                  {CHILD_DATA.weeklyGoal - CHILD_DATA.weeklyProgress} more day(s) to reach the goal!
                </p>
              </Card>

              {/* Activity Chart */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900">This Week's Activity</h3>
                  <Calendar className="w-5 h-5 text-cosmic-purple" />
                </div>
                <div className="flex items-end justify-between gap-2 h-32">
                  {WEEKLY_ACTIVITY.map((day, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <motion.div
                        className="w-full bg-cosmic-purple rounded-t-lg"
                        initial={{ height: 0 }}
                        animate={{ height: `${(day.minutes / 45) * 100}%` }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                      />
                      <span className="text-xs text-slate-500 mt-2">{day.day}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Recent Achievements */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">Recent Achievements</h3>
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {RECENT_ACHIEVEMENTS.map((achievement, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <p className="font-medium text-slate-900">{achievement.name}</p>
                      <p className="text-xs text-slate-500">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "progress" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-slate-900 mb-6">Subject Mastery</h3>
              <div className="space-y-4">
                {SUBJECT_PROGRESS.map((subject, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{subject.subject}</span>
                      <span className="text-sm text-slate-500">{subject.mastery}%</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${subject.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${subject.mastery}%` }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-slate-900 mb-4">Recommendations</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-sunny-yellow/10 rounded-xl">
                  <span className="text-2xl">💡</span>
                  <div>
                    <p className="font-medium text-slate-900">Focus on Division</p>
                    <p className="text-sm text-slate-600">
                      Alex is showing progress but could use more practice with division. 
                      Try the "Division Dash" game!
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-vibrant-green/10 rounded-xl">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <p className="font-medium text-slate-900">Great Progress in Addition!</p>
                    <p className="text-sm text-slate-600">
                      Alex has nearly mastered addition. Consider moving to more challenging problems!
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-slate-900 mb-4">Learning Settings</h3>
              <div className="space-y-4">
                {[
                  { label: "Daily time limit", value: "30 minutes", icon: Clock },
                  { label: "Difficulty level", value: "Adaptive", icon: Target },
                  { label: "Weekly goal", value: "5 days/week", icon: Calendar },
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <setting.icon className="w-5 h-5 text-slate-500" />
                      <span className="font-medium text-slate-700">{setting.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">{setting.value}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-slate-900 mb-4">Privacy & Safety</h3>
              <div className="space-y-4">
                {[
                  { label: "Content filtering", value: "Enabled", icon: Shield },
                  { label: "Screen time reports", value: "Weekly email", icon: BarChart3 },
                  { label: "Account PIN", value: "Set up", icon: Lock },
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <setting.icon className="w-5 h-5 text-slate-500" />
                      <span className="font-medium text-slate-700">{setting.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">{setting.value}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

