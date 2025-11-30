export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          nickname: string;
          grade_level: number;
          avatar_config: Json;
          xp: number;
          level: number;
          streak_days: number;
          last_login_date: string | null;
          stars: number;
          gems: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          nickname: string;
          grade_level: number;
          avatar_config?: Json;
          xp?: number;
          level?: number;
          streak_days?: number;
          last_login_date?: string | null;
          stars?: number;
          gems?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nickname?: string;
          grade_level?: number;
          avatar_config?: Json;
          xp?: number;
          level?: number;
          streak_days?: number;
          last_login_date?: string | null;
          stars?: number;
          gems?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      skill_progress: {
        Row: {
          id: string;
          user_id: string;
          skill_id: string;
          mastery_level: string;
          accuracy: number;
          attempts: number;
          correct: number;
          last_practiced: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          skill_id: string;
          mastery_level?: string;
          accuracy?: number;
          attempts?: number;
          correct?: number;
          last_practiced?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          skill_id?: string;
          mastery_level?: string;
          accuracy?: number;
          attempts?: number;
          correct?: number;
          last_practiced?: string;
          created_at?: string;
        };
      };
      content_sessions: {
        Row: {
          id: string;
          user_id: string;
          content_type: string;
          content_id: string;
          score: number | null;
          problems_attempted: number;
          problems_correct: number;
          duration_seconds: number;
          completed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content_type: string;
          content_id: string;
          score?: number | null;
          problems_attempted?: number;
          problems_correct?: number;
          duration_seconds?: number;
          completed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content_type?: string;
          content_id?: string;
          score?: number | null;
          problems_attempted?: number;
          problems_correct?: number;
          duration_seconds?: number;
          completed?: boolean;
          created_at?: string;
        };
      };
      achievements: {
        Row: {
          id: string;
          user_id: string;
          achievement_id: string;
          unlocked_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          achievement_id: string;
          unlocked_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          achievement_id?: string;
          unlocked_at?: string;
        };
      };
      inventory: {
        Row: {
          id: string;
          user_id: string;
          item_type: string;
          item_id: string;
          quantity: number;
          equipped: boolean;
          acquired_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          item_type: string;
          item_id: string;
          quantity?: number;
          equipped?: boolean;
          acquired_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          item_type?: string;
          item_id?: string;
          quantity?: number;
          equipped?: boolean;
          acquired_at?: string;
        };
      };
      daily_challenges: {
        Row: {
          id: string;
          user_id: string;
          challenge_date: string;
          challenge_1_id: string;
          challenge_1_completed: boolean;
          challenge_2_id: string;
          challenge_2_completed: boolean;
          challenge_3_id: string;
          challenge_3_completed: boolean;
          bonus_claimed: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          challenge_date: string;
          challenge_1_id: string;
          challenge_1_completed?: boolean;
          challenge_2_id: string;
          challenge_2_completed?: boolean;
          challenge_3_id: string;
          challenge_3_completed?: boolean;
          bonus_claimed?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          challenge_date?: string;
          challenge_1_id?: string;
          challenge_1_completed?: boolean;
          challenge_2_id?: string;
          challenge_2_completed?: boolean;
          challenge_3_id?: string;
          challenge_3_completed?: boolean;
          bonus_claimed?: boolean;
        };
      };
      game_scores: {
        Row: {
          id: string;
          user_id: string;
          game_id: string;
          level: number;
          score: number;
          stars_earned: number;
          completed: boolean;
          played_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          game_id: string;
          level: number;
          score?: number;
          stars_earned?: number;
          completed?: boolean;
          played_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          game_id?: string;
          level?: number;
          score?: number;
          stars_earned?: number;
          completed?: boolean;
          played_at?: string;
        };
      };
      reading_progress: {
        Row: {
          id: string;
          user_id: string;
          passage_id: string;
          completed: boolean;
          comprehension_score: number | null;
          read_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          passage_id: string;
          completed?: boolean;
          comprehension_score?: number | null;
          read_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          passage_id?: string;
          completed?: boolean;
          comprehension_score?: number | null;
          read_at?: string;
        };
      };
      story_progress: {
        Row: {
          id: string;
          user_id: string;
          episode_id: string;
          completed: boolean;
          problems_solved: number;
          completed_at: string | null;
          started_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          episode_id: string;
          completed?: boolean;
          problems_solved?: number;
          completed_at?: string | null;
          started_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          episode_id?: string;
          completed?: boolean;
          problems_solved?: number;
          completed_at?: string | null;
          started_at?: string;
        };
      };
      parent_profiles: {
        Row: {
          id: string;
          email: string;
          children: string[];
          screen_time_limit_minutes: number | null;
          notifications_enabled: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          children?: string[];
          screen_time_limit_minutes?: number | null;
          notifications_enabled?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          children?: string[];
          screen_time_limit_minutes?: number | null;
          notifications_enabled?: boolean;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Helper types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type SkillProgress = Database["public"]["Tables"]["skill_progress"]["Row"];
export type ContentSession = Database["public"]["Tables"]["content_sessions"]["Row"];
export type Achievement = Database["public"]["Tables"]["achievements"]["Row"];
export type InventoryItem = Database["public"]["Tables"]["inventory"]["Row"];
export type DailyChallenge = Database["public"]["Tables"]["daily_challenges"]["Row"];
export type GameScore = Database["public"]["Tables"]["game_scores"]["Row"];
export type ReadingProgress = Database["public"]["Tables"]["reading_progress"]["Row"];
export type StoryProgress = Database["public"]["Tables"]["story_progress"]["Row"];
export type ParentProfile = Database["public"]["Tables"]["parent_profiles"]["Row"];

