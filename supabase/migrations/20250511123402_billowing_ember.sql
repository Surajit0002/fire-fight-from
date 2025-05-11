/*
  # Tournament Registration Schema

  1. New Tables
    - `teams`
      - `id` (uuid, primary key)
      - `name` (text, nullable)
      - `type` (text) - solo, duo, or squad
      - `logo_url` (text, nullable)
      - `created_at` (timestamp)
      - `status` (text) - pending, approved, rejected
      - `user_id` (uuid) - references auth.users

    - `players`
      - `id` (uuid, primary key)
      - `team_id` (uuid) - references teams
      - `name` (text)
      - `game_uid` (text)
      - `created_at` (timestamp)

    - `payments`
      - `id` (uuid, primary key)
      - `team_id` (uuid) - references teams
      - `screenshot_url` (text)
      - `amount` (numeric)
      - `status` (text) - pending, verified
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add admin policies for managing registrations
*/

-- Teams table
CREATE TABLE teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  type text NOT NULL CHECK (type IN ('solo', 'duo', 'squad')),
  logo_url text,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  user_id uuid REFERENCES auth.users(id)
);

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- Players table
CREATE TABLE players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  name text NOT NULL,
  game_uid text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Payments table
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  screenshot_url text NOT NULL,
  amount numeric NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'verified')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Teams policies
CREATE POLICY "Users can view their own teams"
  ON teams
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own teams"
  ON teams
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Players policies
CREATE POLICY "Users can view players in their teams"
  ON players
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teams
      WHERE teams.id = players.team_id
      AND teams.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert players in their teams"
  ON players
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM teams
      WHERE teams.id = players.team_id
      AND teams.user_id = auth.uid()
    )
  );

-- Payments policies
CREATE POLICY "Users can view their own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teams
      WHERE teams.id = payments.team_id
      AND teams.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own payments"
  ON payments
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM teams
      WHERE teams.id = payments.team_id
      AND teams.user_id = auth.uid()
    )
  );

-- Admin role and policies
CREATE ROLE admin;

-- Admin policies for teams
CREATE POLICY "Admins can view all teams"
  ON teams
  FOR ALL
  TO admin
  USING (true)
  WITH CHECK (true);

-- Admin policies for players
CREATE POLICY "Admins can view all players"
  ON players
  FOR ALL
  TO admin
  USING (true)
  WITH CHECK (true);

-- Admin policies for payments
CREATE POLICY "Admins can view all payments"
  ON payments
  FOR ALL
  TO admin
  USING (true)
  WITH CHECK (true);