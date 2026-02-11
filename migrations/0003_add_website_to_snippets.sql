-- Add website column to snippets table with default value
ALTER TABLE snippets ADD COLUMN website TEXT NOT NULL DEFAULT 'flesvoedingcalculator';

-- Create index for efficient website-based filtering
CREATE INDEX idx_snippets_website ON snippets(website);
CREATE INDEX idx_snippets_website_active ON snippets(website, active);

-- Update existing snippets to explicitly set website (they're all flesvoedingcalculator snippets)
UPDATE snippets SET website = 'flesvoedingcalculator' WHERE website IS NULL OR website = '';
