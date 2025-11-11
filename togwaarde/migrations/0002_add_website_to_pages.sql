-- Add website column to pages table with default value
ALTER TABLE pages ADD COLUMN website TEXT NOT NULL DEFAULT 'flesvoedingcalculator';

-- Update existing pages to explicitly set website (they're all flesvoedingcalculator pages)
UPDATE pages SET website = 'flesvoedingcalculator' WHERE website IS NULL OR website = '';
