-- =============================================
-- BrainBlast! Database Schema
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PROFILES TABLE
-- =============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  grade_level INTEGER NOT NULL CHECK (grade_level >= 1 AND grade_level <= 4),
  avatar_config JSONB DEFAULT '{"character": "explorer", "color": "purple", "accessory": "none"}'::jsonb,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  last_login_date DATE,
  stars INTEGER DEFAULT 0,
  gems INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- =============================================
-- SKILL PROGRESS TABLE
-- =============================================
CREATE TABLE skill_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  skill_id TEXT NOT NULL,
  mastery_level TEXT DEFAULT 'intro' CHECK (mastery_level IN ('intro', 'developing', 'proficient', 'mastered', 'expert')),
  accuracy DECIMAL(5,2) DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  correct INTEGER DEFAULT 0,
  last_practiced TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, skill_id)
);

-- Enable RLS
ALTER TABLE skill_progress ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own skill progress" ON skill_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own skill progress" ON skill_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skill progress" ON skill_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- CONTENT SESSIONS TABLE
-- =============================================
CREATE TABLE content_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL CHECK (content_type IN ('lesson', 'practice', 'game', 'story', 'reading')),
  content_id TEXT NOT NULL,
  score INTEGER,
  problems_attempted INTEGER DEFAULT 0,
  problems_correct INTEGER DEFAULT 0,
  duration_seconds INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE content_sessions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own sessions" ON content_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON content_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON content_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- =============================================
-- ACHIEVEMENTS TABLE
-- =============================================
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Enable RLS
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own achievements" ON achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements" ON achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- INVENTORY TABLE
-- =============================================
CREATE TABLE inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL CHECK (item_type IN ('avatar', 'pet', 'decoration', 'effect', 'theme')),
  item_id TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  equipped BOOLEAN DEFAULT FALSE,
  acquired_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, item_type, item_id)
);

-- Enable RLS
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own inventory" ON inventory
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own inventory" ON inventory
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own inventory" ON inventory
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- DAILY CHALLENGES TABLE
-- =============================================
CREATE TABLE daily_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  challenge_date DATE NOT NULL,
  challenge_1_id TEXT NOT NULL,
  challenge_1_completed BOOLEAN DEFAULT FALSE,
  challenge_2_id TEXT NOT NULL,
  challenge_2_completed BOOLEAN DEFAULT FALSE,
  challenge_3_id TEXT NOT NULL,
  challenge_3_completed BOOLEAN DEFAULT FALSE,
  bonus_claimed BOOLEAN DEFAULT FALSE,
  UNIQUE(user_id, challenge_date)
);

-- Enable RLS
ALTER TABLE daily_challenges ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own challenges" ON daily_challenges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own challenges" ON daily_challenges
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own challenges" ON daily_challenges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- GAME SCORES TABLE
-- =============================================
CREATE TABLE game_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  game_id TEXT NOT NULL,
  level INTEGER NOT NULL,
  score INTEGER DEFAULT 0,
  stars_earned INTEGER DEFAULT 0 CHECK (stars_earned >= 0 AND stars_earned <= 3),
  completed BOOLEAN DEFAULT FALSE,
  played_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE game_scores ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own game scores" ON game_scores
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own game scores" ON game_scores
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Index for leaderboards
CREATE INDEX idx_game_scores_game_level ON game_scores(game_id, level, score DESC);

-- =============================================
-- READING PROGRESS TABLE
-- =============================================
CREATE TABLE reading_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  passage_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  comprehension_score INTEGER CHECK (comprehension_score >= 0 AND comprehension_score <= 100),
  read_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, passage_id)
);

-- Enable RLS
ALTER TABLE reading_progress ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own reading progress" ON reading_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own reading progress" ON reading_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reading progress" ON reading_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- STORY PROGRESS TABLE
-- =============================================
CREATE TABLE story_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  episode_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  problems_solved INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, episode_id)
);

-- Enable RLS
ALTER TABLE story_progress ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own story progress" ON story_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own story progress" ON story_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own story progress" ON story_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- PARENT PROFILES TABLE
-- =============================================
CREATE TABLE parent_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  children UUID[] DEFAULT '{}',
  screen_time_limit_minutes INTEGER,
  notifications_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE parent_profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Parents can view own profile" ON parent_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Parents can update own profile" ON parent_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Parents can insert own profile" ON parent_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Parents can view their children's profiles
CREATE POLICY "Parents can view children profiles" ON profiles
  FOR SELECT USING (
    id = ANY(
      SELECT unnest(children) FROM parent_profiles WHERE id = auth.uid()
    )
  );

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to update streak on login
CREATE OR REPLACE FUNCTION update_streak()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.last_login_date IS NULL OR OLD.last_login_date < CURRENT_DATE - INTERVAL '1 day' THEN
    -- Reset streak if more than 1 day gap
    NEW.streak_days := 1;
  ELSIF OLD.last_login_date = CURRENT_DATE - INTERVAL '1 day' THEN
    -- Increment streak if consecutive day
    NEW.streak_days := OLD.streak_days + 1;
  END IF;
  -- Keep streak same if same day login
  
  NEW.last_login_date := CURRENT_DATE;
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for streak updates
CREATE TRIGGER update_streak_trigger
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  WHEN (NEW.last_login_date IS DISTINCT FROM OLD.last_login_date)
  EXECUTE FUNCTION update_streak();

-- Function to calculate and update mastery level
CREATE OR REPLACE FUNCTION update_mastery_level()
RETURNS TRIGGER AS $$
BEGIN
  NEW.accuracy := CASE 
    WHEN NEW.attempts > 0 THEN (NEW.correct::DECIMAL / NEW.attempts::DECIMAL) * 100
    ELSE 0
  END;
  
  NEW.mastery_level := CASE
    WHEN NEW.attempts >= 40 AND NEW.accuracy >= 95 THEN 'expert'
    WHEN NEW.attempts >= 25 AND NEW.accuracy >= 90 THEN 'mastered'
    WHEN NEW.attempts >= 15 AND NEW.accuracy >= 80 THEN 'proficient'
    WHEN NEW.attempts >= 5 AND NEW.accuracy >= 60 THEN 'developing'
    ELSE 'intro'
  END;
  
  NEW.last_practiced := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for mastery updates
CREATE TRIGGER update_mastery_trigger
  BEFORE UPDATE ON skill_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_mastery_level();

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX idx_skill_progress_user ON skill_progress(user_id);
CREATE INDEX idx_content_sessions_user ON content_sessions(user_id);
CREATE INDEX idx_content_sessions_type ON content_sessions(content_type);
CREATE INDEX idx_achievements_user ON achievements(user_id);
CREATE INDEX idx_inventory_user ON inventory(user_id);
CREATE INDEX idx_daily_challenges_user_date ON daily_challenges(user_id, challenge_date);
CREATE INDEX idx_reading_progress_user ON reading_progress(user_id);
CREATE INDEX idx_story_progress_user ON story_progress(user_id);

