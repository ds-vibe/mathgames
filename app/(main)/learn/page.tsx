"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageContainer, PageHeader, Section } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar, MasteryStars } from "@/components/ui/progress";
import { SubjectBadge, GradeBadge, MasteryBadge, TimeBadge } from "@/components/ui/badge";
import { useAppState } from "@/store/useAppState";
import { GRADE_CONFIG } from "@/lib/constants";

type Subject = "math" | "science";

interface Lesson {
  id: string;
  title: string;
  description: string;
  subject: Subject;
  grade: number;
  domain: string;
  icon: string;
  estimatedMinutes: number;
  progress: number;
  mastery: "intro" | "developing" | "proficient" | "mastered" | "expert";
  isNew?: boolean;
  isLocked?: boolean;
}

// Demo lessons data - IDs match the curriculum files
const demoLessons: Lesson[] = [
  // Grade 1 Math (from mathCurriculum)
  { id: "g1-counting-20", title: "Counting to 20", description: "Learn to count objects up to 20", subject: "math", grade: 1, domain: "counting", icon: "🔢", estimatedMinutes: 10, progress: 100, mastery: "mastered" },
  { id: "g1-addition-10", title: "Adding Numbers", description: "Add numbers up to 10", subject: "math", grade: 1, domain: "addition", icon: "➕", estimatedMinutes: 12, progress: 75, mastery: "proficient" },
  { id: "g1-subtraction-10", title: "Subtracting Numbers", description: "Take away numbers up to 10", subject: "math", grade: 1, domain: "subtraction", icon: "➖", estimatedMinutes: 12, progress: 30, mastery: "developing" },
  { id: "g1-shapes-2d", title: "Shapes Around Us", description: "Identify circles, squares, and triangles", subject: "math", grade: 1, domain: "shapes", icon: "🔷", estimatedMinutes: 8, progress: 0, mastery: "intro" },
  
  // Grade 2 Math (from mathCurriculum)
  { id: "g2-addition-100", title: "Adding Two-Digit Numbers", description: "Add numbers up to 100", subject: "math", grade: 2, domain: "additionSubtraction", icon: "🔢", estimatedMinutes: 15, progress: 85, mastery: "proficient" },
  { id: "g2-money", title: "Counting Money", description: "Coins and their values", subject: "math", grade: 2, domain: "money", icon: "💰", estimatedMinutes: 12, progress: 40, mastery: "developing" },
  { id: "g2-time", title: "Telling Time", description: "Read clocks to 5 minutes", subject: "math", grade: 2, domain: "time", icon: "🕐", estimatedMinutes: 15, progress: 0, mastery: "intro" },
  
  // Grade 3 Math (from mathCurriculum)
  { id: "g3-multiplication-intro", title: "Introduction to Multiplication", description: "Groups and arrays", subject: "math", grade: 3, domain: "multiplication", icon: "✖️", estimatedMinutes: 15, progress: 100, mastery: "mastered" },
  { id: "g3-multiplication-facts", title: "Multiplication Facts", description: "Learn facts 0-10", subject: "math", grade: 3, domain: "multiplication", icon: "🧮", estimatedMinutes: 20, progress: 65, mastery: "proficient" },
  { id: "g3-fractions-intro", title: "Understanding Fractions", description: "Parts of a whole", subject: "math", grade: 3, domain: "fractions", icon: "🥧", estimatedMinutes: 15, progress: 25, mastery: "developing" },
  { id: "g3-area-perimeter", title: "Area and Perimeter", description: "Measuring shapes", subject: "math", grade: 3, domain: "areaPerimeter", icon: "📐", estimatedMinutes: 18, progress: 0, mastery: "intro" },
  
  // Grade 4 Math (from mathCurriculum)
  { id: "g4-multi-digit-multiplication", title: "Multi-Digit Multiplication", description: "Multiply large numbers", subject: "math", grade: 4, domain: "multiDigitOps", icon: "🔢", estimatedMinutes: 20, progress: 50, mastery: "developing" },
  { id: "g4-fraction-operations", title: "Fraction Operations", description: "Add and subtract fractions", subject: "math", grade: 4, domain: "fractionOps", icon: "➗", estimatedMinutes: 18, progress: 15, mastery: "developing" },
  { id: "g4-decimals", title: "Decimal Numbers", description: "Understanding decimals", subject: "math", grade: 4, domain: "decimals", icon: "🔵", estimatedMinutes: 15, progress: 0, mastery: "intro" },
  { id: "g4-angles", title: "Measuring Angles", description: "Identify and measure angles", subject: "math", grade: 4, domain: "angles", icon: "📐", estimatedMinutes: 15, progress: 0, mastery: "intro" },
];

export default function LearnPage() {
  const { user } = useAppState();
  const [selectedGrade, setSelectedGrade] = useState<number | "all">(user.gradeLevel);
  const [selectedSubject, setSelectedSubject] = useState<Subject | "all">("all");

  const filteredLessons = demoLessons.filter((lesson) => {
    const gradeMatch = selectedGrade === "all" || lesson.grade === selectedGrade;
    const subjectMatch = selectedSubject === "all" || lesson.subject === selectedSubject;
    return gradeMatch && subjectMatch;
  });

  const inProgressLessons = filteredLessons.filter(
    (l) => l.progress > 0 && l.progress < 100
  );

  const recommendedLessons = filteredLessons.filter(
    (l) => l.progress === 0 && !l.isLocked
  );

  const completedLessons = filteredLessons.filter((l) => l.progress === 100);

  return (
    <PageContainer>
      <PageHeader
        title="Learn"
        subtitle="Master new skills with fun lessons"
        emoji="📚"
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Grade Filter */}
        <div className="flex gap-2 flex-wrap">
          <Button
            size="sm"
            variant={selectedGrade === "all" ? "primary" : "ghost"}
            onClick={() => setSelectedGrade("all")}
          >
            All Grades
          </Button>
          {[1, 2, 3, 4].map((grade) => (
            <Button
              key={grade}
              size="sm"
              variant={selectedGrade === grade ? "primary" : "ghost"}
              onClick={() => setSelectedGrade(grade)}
            >
              Grade {grade}
            </Button>
          ))}
        </div>

        {/* Subject Filter */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={selectedSubject === "all" ? "secondary" : "ghost"}
            onClick={() => setSelectedSubject("all")}
          >
            All
          </Button>
          <Button
            size="sm"
            variant={selectedSubject === "math" ? "secondary" : "ghost"}
            onClick={() => setSelectedSubject("math")}
            leftIcon={<span>📐</span>}
          >
            Math
          </Button>
          <Button
            size="sm"
            variant={selectedSubject === "science" ? "secondary" : "ghost"}
            onClick={() => setSelectedSubject("science")}
            leftIcon={<span>🔬</span>}
          >
            Science
          </Button>
        </div>
      </div>

      {/* Continue Learning */}
      {inProgressLessons.length > 0 && (
        <Section title="Continue Learning" subtitle="Pick up where you left off">
          <div className="grid gap-6 md:grid-cols-2">
            {inProgressLessons.map((lesson, index) => (
              <LessonCard key={lesson.id} lesson={lesson} index={index} />
            ))}
          </div>
        </Section>
      )}

      {/* Recommended */}
      {recommendedLessons.length > 0 && (
        <Section title="Recommended For You" subtitle="Based on your grade level">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendedLessons.slice(0, 6).map((lesson, index) => (
              <LessonCard key={lesson.id} lesson={lesson} index={index} />
            ))}
          </div>
        </Section>
      )}

      {/* Completed */}
      {completedLessons.length > 0 && (
        <Section title="Completed" subtitle="Great job on these lessons!">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {completedLessons.map((lesson, index) => (
              <LessonCard key={lesson.id} lesson={lesson} index={index} />
            ))}
          </div>
        </Section>
      )}
    </PageContainer>
  );
}

// Lesson Card Component
function LessonCard({ lesson, index }: { lesson: Lesson; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/learn/${lesson.id}`}>
        <Card interactive className="h-full relative" padding="lg">
          {lesson.isNew && (
            <motion.div
              className="absolute top-4 right-4 px-3 py-1 bg-coral-pink text-white text-xs font-bold rounded-full z-10"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ✨ NEW
            </motion.div>
          )}
          
          <div className="flex gap-6">
            <div className="text-5xl flex-shrink-0">{lesson.icon}</div>
            <div className="flex-1 min-w-[1px] space-y-3 overflow-visible">
              <div className="flex items-center gap-2 flex-wrap">
                <SubjectBadge subject={lesson.subject} size="sm" showIcon={false} />
                <span className="text-xs text-deep-space/50 font-medium">Grade {lesson.grade}</span>
              </div>
              <h3 className="font-bold text-lg text-deep-space leading-tight overflow-visible">{lesson.title}</h3>
              <p className="text-sm text-deep-space/70 leading-relaxed overflow-visible">{lesson.description}</p>
              
              <div className="flex items-center gap-3 flex-wrap">
                <TimeBadge minutes={lesson.estimatedMinutes} size="sm" />
                <MasteryBadge level={lesson.mastery} size="sm" showLabel={false} />
              </div>
              
              {lesson.progress > 0 && (
                <div className="mt-2">
                  <ProgressBar
                    value={lesson.progress}
                    size="sm"
                    color={lesson.progress === 100 ? "green" : "purple"}
                  />
                </div>
              )}
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

