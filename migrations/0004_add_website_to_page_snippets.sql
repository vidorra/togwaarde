-- Add website column to page_snippets table with default value
ALTER TABLE page_snippets ADD COLUMN website TEXT NOT NULL DEFAULT 'flesvoedingcalculator';

-- Create indexes for efficient website-based filtering
CREATE INDEX idx_page_snippets_website ON page_snippets(website);
CREATE INDEX idx_page_snippets_page_website ON page_snippets(page_id, website);

-- Update existing page_snippets to explicitly set website (they're all flesvoedingcalculator assignments)
UPDATE page_snippets SET website = 'flesvoedingcalculator' WHERE website IS NULL OR website = '';
