"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageContainer, PageHeader, Section } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, SubjectBadge, TimeBadge, NewBadge } from "@/components/ui/badge";
import { useAppState } from "@/store/useAppState";
import { readingPassages, type ReadingPassage } from "@/content/reading/passages";
import { BookOpen, Lock } from "lucide-react";

const categories = [
  { id: "all", label: "All", icon: "📚" },
  { id: "science-story", label: "Science Stories", icon: "🔬" },
  { id: "math-mystery", label: "Math Mysteries", icon: "🔍" },
  { id: "biography", label: "Biographies", icon: "👤" },
  { id: "how-it-works", label: "How It Works", icon: "⚙️" },
];

export default function ReadPage() {
  const { user } = useAppState();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState<number | "all">("all");

  const filteredPassages = readingPassages.filter((passage) => {
    const categoryMatch =
      selectedCategory === "all" || passage.category === selectedCategory;
    const gradeMatch =
      selectedGrade === "all" || passage.grade === selectedGrade;
    return categoryMatch && gradeMatch;
  });

  const availablePassages = filteredPassages.filter((p) => !p.comingSoon);
  const comingSoonPassages = filteredPassages.filter((p) => p.comingSoon);
  const newPassages = filteredPassages.filter((p) => p.isNew);

  const totalAvailable = readingPassages.filter((p) => !p.comingSoon).length;

  return (
    <PageContainer>
      <PageHeader
        title="Read"
        subtitle="Explore stories, mysteries, and more!"
        emoji="📖"
        action={
          <div className="flex items-center gap-2 bg-coral-pink/20 px-3 py-1.5 rounded-full">
            <BookOpen className="w-4 h-4 text-coral-pink" />
            <span className="font-bold text-coral-pink-dark">
              {totalAvailable} available
            </span>
          </div>
        }
      />

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            size="sm"
            variant={selectedCategory === cat.id ? "primary" : "ghost"}
            onClick={() => setSelectedCategory(cat.id)}
            leftIcon={<span>{cat.icon}</span>}
            className="flex-shrink-0"
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Grade Filter */}
      <div className="flex gap-2 mb-6">
        <Button
          size="sm"
          variant={selectedGrade === "all" ? "secondary" : "ghost"}
          onClick={() => setSelectedGrade("all")}
        >
          All Grades
        </Button>
        {[1, 2, 3, 4].map((grade) => (
          <Button
            key={grade}
            size="sm"
            variant={selectedGrade === grade ? "secondary" : "ghost"}
            onClick={() => setSelectedGrade(grade)}
          >
            Grade {grade}
          </Button>
        ))}
      </div>

      {/* Available Passages */}
      {availablePassages.length > 0 && (
        <Section title="Ready to Read" subtitle="Start your reading adventure!">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availablePassages.map((passage, index) => (
              <PassageCard key={passage.id} passage={passage} index={index} />
            ))}
          </div>
        </Section>
      )}

      {/* Coming Soon Passages */}
      {comingSoonPassages.length > 0 && (
        <Section title="Coming Soon" subtitle="More stories on the way!">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {comingSoonPassages.map((passage, index) => (
              <PassageCard key={passage.id} passage={passage} index={index} comingSoon />
            ))}
          </div>
        </Section>
      )}

      {/* Reading Challenge */}
      <Section>
        <Card className="bg-gradient-nature text-white">
          <div className="flex items-center gap-6">
            <motion.div
              className="text-6xl"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              📚
            </motion.div>
            <div className="flex-1 min-w-[1px] overflow-visible">
              <h3 className="text-xl font-bold mb-2 overflow-visible break-words px-2">Weekly Reading Challenge</h3>
              <p className="opacity-80 mb-2 overflow-visible break-words px-2">
                Read all {totalAvailable} passages to become a Reading Champion!
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white/20 rounded-full h-2">
                  <div
                    className="bg-white rounded-full h-2"
                    style={{ width: `${(0 / totalAvailable) * 100}%` }}
                  />
                </div>
                <span className="font-bold">0/{totalAvailable}</span>
              </div>
            </div>
            <div className="text-center">
              <span className="text-3xl">💎</span>
              <p className="text-sm font-bold">+50 Gems</p>
            </div>
          </div>
        </Card>
      </Section>
    </PageContainer>
  );
}

// Passage Card Component
function PassageCard({
  passage,
  index,
  comingSoon = false,
}: {
  passage: ReadingPassage;
  index: number;
  comingSoon?: boolean;
}) {
  const categoryLabels = {
    "science-story": "Science Story",
    "math-mystery": "Math Mystery",
    biography: "Biography",
    "how-it-works": "How It Works",
  };

  const CardContent = (
    <Card
      interactive={!comingSoon}
      className={`h-full relative ${comingSoon ? "opacity-70" : ""}`}
    >
      {passage.isNew && !comingSoon && (
        <div className="absolute top-2 right-2">
          <NewBadge />
        </div>
      )}
      {comingSoon && (
        <div className="absolute top-2 right-2">
          <div className="flex items-center gap-1 bg-deep-space/10 text-deep-space/60 px-2 py-0.5 rounded-full text-xs font-medium">
            <Lock className="w-3 h-3" />
            Coming Soon
          </div>
        </div>
      )}

      <div className="flex items-start gap-5">
        <motion.div
          className={`text-5xl ${comingSoon ? "grayscale" : ""}`}
          whileHover={!comingSoon ? { scale: 1.1 } : undefined}
        >
          {passage.thumbnail}
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" size="sm">
              {categoryLabels[passage.category]}
            </Badge>
          </div>
          <h3 className="font-bold text-deep-space">{passage.title}</h3>
          <p className="text-sm text-deep-space/60 line-clamp-2 mb-2">
            {passage.description}
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <SubjectBadge subject={passage.subject} size="sm" />
            <TimeBadge minutes={passage.estimatedMinutes} size="sm" />
            <span className="text-xs text-deep-space/50">
              Grade {passage.grade}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {comingSoon ? (
        <div className="cursor-not-allowed">{CardContent}</div>
      ) : (
        <Link href={`/read/${passage.id}`}>{CardContent}</Link>
      )}
    </motion.div>
  );
}
