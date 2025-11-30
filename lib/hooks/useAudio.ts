"use client";

import { useCallback, useEffect, useRef } from "react";
import { Howl } from "howler";
import { useAppState } from "@/store/useAppState";

// Sound effect types
type SoundEffect =
  | "tap"
  | "success"
  | "error"
  | "levelUp"
  | "achievement"
  | "correct"
  | "incorrect"
  | "streak"
  | "coin"
  | "whoosh";

// Pre-defined sound URLs (in production, these would be actual audio files)
const SOUND_URLS: Record<SoundEffect, string> = {
  tap: "/audio/tap.mp3",
  success: "/audio/success.mp3",
  error: "/audio/error.mp3",
  levelUp: "/audio/level-up.mp3",
  achievement: "/audio/achievement.mp3",
  correct: "/audio/correct.mp3",
  incorrect: "/audio/incorrect.mp3",
  streak: "/audio/streak.mp3",
  coin: "/audio/coin.mp3",
  whoosh: "/audio/whoosh.mp3",
};

// Cache for loaded sounds
const soundCache = new Map<SoundEffect, Howl>();

export function useAudio() {
  const { ui } = useAppState();
  const bgmRef = useRef<Howl | null>(null);

  // Load a sound effect
  const loadSound = useCallback((effect: SoundEffect): Howl => {
    if (soundCache.has(effect)) {
      return soundCache.get(effect)!;
    }

    const sound = new Howl({
      src: [SOUND_URLS[effect]],
      volume: 0.5,
      preload: true,
    });

    soundCache.set(effect, sound);
    return sound;
  }, []);

  // Play a sound effect
  const playSound = useCallback(
    (effect: SoundEffect, options?: { volume?: number; rate?: number }) => {
      if (!ui.soundEnabled) return;

      try {
        const sound = loadSound(effect);
        
        if (options?.volume !== undefined) {
          sound.volume(options.volume);
        }
        if (options?.rate !== undefined) {
          sound.rate(options.rate);
        }

        sound.play();
      } catch {
        // Silently fail if audio can't be played
        console.debug(`Could not play sound: ${effect}`);
      }
    },
    [ui.soundEnabled, loadSound]
  );

  // Play background music
  const playBGM = useCallback(
    (track: string, options?: { volume?: number; loop?: boolean }) => {
      if (!ui.musicEnabled) return;

      if (bgmRef.current) {
        bgmRef.current.stop();
      }

      bgmRef.current = new Howl({
        src: [`/audio/bgm/${track}.mp3`],
        volume: options?.volume ?? 0.3,
        loop: options?.loop ?? true,
      });

      bgmRef.current.play();
    },
    [ui.musicEnabled]
  );

  // Stop background music
  const stopBGM = useCallback(() => {
    if (bgmRef.current) {
      bgmRef.current.stop();
      bgmRef.current = null;
    }
  }, []);

  // Fade BGM volume
  const fadeBGM = useCallback(
    (toVolume: number, duration: number = 1000) => {
      if (bgmRef.current) {
        bgmRef.current.fade(bgmRef.current.volume(), toVolume, duration);
      }
    },
    []
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (bgmRef.current) {
        bgmRef.current.stop();
      }
    };
  }, []);

  // Handle music preference changes
  useEffect(() => {
    if (!ui.musicEnabled && bgmRef.current) {
      bgmRef.current.stop();
    }
  }, [ui.musicEnabled]);

  return {
    playSound,
    playBGM,
    stopBGM,
    fadeBGM,
  };
}

// Quick sound effect hooks
export function useTapSound() {
  const { playSound } = useAudio();
  return useCallback(() => playSound("tap"), [playSound]);
}

export function useSuccessSound() {
  const { playSound } = useAudio();
  return useCallback(() => playSound("success"), [playSound]);
}

export function useErrorSound() {
  const { playSound } = useAudio();
  return useCallback(() => playSound("error"), [playSound]);
}

// Sound effect player component (for declarative usage)
export function SoundEffect({
  sound,
  trigger,
}: {
  sound: SoundEffect;
  trigger: boolean;
}) {
  const { playSound } = useAudio();
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (trigger && !hasPlayed.current) {
      playSound(sound);
      hasPlayed.current = true;
    }
    if (!trigger) {
      hasPlayed.current = false;
    }
  }, [trigger, sound, playSound]);

  return null;
}

