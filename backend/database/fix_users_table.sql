-- Add the missing national_id column to the main users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS national_id VARCHAR(50);
