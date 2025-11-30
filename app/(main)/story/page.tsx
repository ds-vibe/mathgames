"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageContainer, PageHeader, Section } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress";
import { SubjectBadge, GradeBadge, TimeBadge, LockedBadge } from "@/components/ui/badge";
import { useAppState } from "@/store/useAppState";
import { episodes } from "@/content/stories/episodes";
import { STORY_CHARACTERS } from "@/lib/constants";
import { Play, Lock, CheckCircle } from "lucide-react";

export default function StoryPage() {
  const { user } = useAppState();
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  // Demo progress - in production this would come from Supabase
  const completedEpisodes = ["ep-1", "ep-2"];
  const currentEpisode = "ep-3";

  const getEpisodeStatus = (episodeId: string, index: number) => {
    if (completedEpisodes.includes(episodeId)) return "completed";
    if (episodeId === currentEpisode) return "current";
    if (index <= completedEpisodes.length) return "unlocked";
    return "locked";
  };

  return (
    <PageContainer>
      <PageHeader
        title="Story Mode"
        subtitle="Adventures with Professor Atom and friends!"
        emoji="📖"
      />

      {/* Characters Introduction */}
      <Section title="Meet the Characters">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.values(STORY_CHARACTERS).map((character) => (
            <motion.button
              key={character.id}
              className={`p-4 rounded-2xl text-center transition-all ${
                selectedCharacter === character.id
                  ? "bg-cosmic-purple text-white shadow-lg"
                  : "bg-white hover:bg-cloud-gray shadow-md"
              }`}
              onClick={() => setSelectedCharacter(
                selectedCharacter === character.id ? null : character.id
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="text-5xl block mb-2"
                animate={selectedCharacter === character.id ? { 
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0]
                } : {}}
                transition={{ duration: 0.5 }}
              >
                {character.emoji}
              </motion.span>
              <p className="font-bold">{character.name}</p>
              <p className={`text-xs ${
                selectedCharacter === character.id ? "text-white/80" : "text-deep-space/60"
              }`}>
                {character.description}
              </p>
            </motion.button>
          ))}
        </div>
      </Section>

      {/* Current Episode */}
      {currentEpisode && (
        <Section title="Continue Your Adventure">
          <Link href={`/story/${currentEpisode}`}>
            <Card interactive gradient="cosmic" className="relative overflow-visible" padding="lg">
              <motion.div
                className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative z-10 flex items-center gap-6 overflow-visible px-2">
                <motion.div
                  className="text-7xl flex-shrink-0"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {episodes.find(e => e.id === currentEpisode)?.thumbnail}
                </motion.div>
                <div className="flex-1 min-w-[1px] overflow-visible">
                  <div className="flex items-center gap-2 mb-2 flex-wrap overflow-visible">
                    <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium overflow-visible">
                      Episode {episodes.findIndex(e => e.id === currentEpisode) + 1}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2 overflow-visible break-words px-2">
                    {episodes.find(e => e.id === currentEpisode)?.title}
                  </h2>
                  <p className="text-white/80 mb-3">
                    {episodes.find(e => e.id === currentEpisode)?.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <SubjectBadge 
                      subject={episodes.find(e => e.id === currentEpisode)?.subject || "math"} 
                      size="sm" 
                    />
                    <TimeBadge 
                      minutes={episodes.find(e => e.id === currentEpisode)?.estimatedMinutes || 10} 
                      size="sm" 
                    />
                  </div>
                </div>
                <Button className="bg-white text-cosmic-purple hover:bg-white/90 font-bold">
                  <Play className="w-4 h-4 mr-2" /> Continue
                </Button>
              </div>
            </Card>
          </Link>
        </Section>
      )}

      {/* Episode Progress */}
      <Section title="Your Progress">
        <Card className="mb-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl">📖</div>
            <div className="flex-1">
              <p className="font-bold text-deep-space">Story Progress</p>
              <p className="text-sm text-deep-space/60">
                {completedEpisodes.length} of {episodes.length} episodes completed
              </p>
            </div>
            <ProgressBar
              value={completedEpisodes.length}
              max={episodes.length}
              size="lg"
              color="gradient"
              className="w-32"
            />
          </div>
        </Card>
      </Section>

      {/* All Episodes */}
      <Section title="All Episodes" subtitle="Complete episodes in order to unlock new adventures!">
        <div className="grid gap-4 md:grid-cols-2">
          {episodes.map((episode, index) => {
            const status = getEpisodeStatus(episode.id, index);
            const isLocked = status === "locked";
            const isCompleted = status === "completed";
            const isCurrent = status === "current";

            return (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={isLocked ? "#" : `/story/${episode.id}`}>
                  <Card
                    interactive={!isLocked}
                    className={`relative h-full ${isLocked ? "opacity-60" : ""} ${
                      isCurrent ? "ring-2 ring-cosmic-purple" : ""
                    }`}
                  >
                    {/* Status badges */}
                    <div className="absolute top-3 right-3">
                      {isCompleted && (
                        <div className="flex items-center gap-1 bg-vibrant-green text-white px-2 py-1 rounded-full text-xs font-medium">
                          <CheckCircle className="w-3 h-3" />
                          Complete
                        </div>
                      )}
                      {isCurrent && (
                        <motion.div
                          className="bg-cosmic-purple text-white px-2 py-1 rounded-full text-xs font-medium"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          ▶ Continue
                        </motion.div>
                      )}
                      {isLocked && <LockedBadge />}
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${
                            isCompleted
                              ? "bg-vibrant-green/20"
                              : isCurrent
                                ? "bg-cosmic-purple/20"
                                : "bg-cloud-gray"
                          }`}
                        >
                          {isLocked ? (
                            <Lock className="w-6 h-6 text-deep-space/40" />
                          ) : (
                            episode.thumbnail
                          )}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-deep-space/50 mb-1">
                          Episode {episode.number}
                        </p>
                        <h3 className="font-bold text-deep-space text-lg">
                          {episode.title}
                        </h3>
                        <p className="text-sm text-deep-space/60 line-clamp-2 mb-2">
                          {episode.description}
                        </p>

                        <div className="flex items-center gap-2 flex-wrap">
                          <SubjectBadge subject={episode.subject} size="sm" />
                          <GradeBadge grade={episode.grade} size="sm" />
                          <TimeBadge minutes={episode.estimatedMinutes} size="sm" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Completion Reward Preview */}
      <Section>
        <Card className="bg-gradient-sunset text-deep-space">
          <div className="flex items-center gap-4">
            <motion.div
              className="text-5xl"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🏆
            </motion.div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">Complete All Episodes!</h3>
              <p className="opacity-80">
                Finish all 10 episodes to unlock the secret character and earn 500 gems!
              </p>
            </div>
            <div className="text-right">
              <span className="text-3xl">💎</span>
              <p className="text-sm font-bold">500 Gems</p>
            </div>
          </div>
        </Card>
      </Section>
    </PageContainer>
  );
}

