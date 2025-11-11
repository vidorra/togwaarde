-- Manual migration to add missing columns to snippets table
-- Run this directly on your production database if auto-migration fails

-- Check if you're connected to the right database
SELECT current_database();

-- Add the missing columns
DO $$
BEGIN
    -- Add image_html column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'snippets' AND column_name = 'image_html'
    ) THEN
        ALTER TABLE snippets ADD COLUMN image_html text;
        RAISE NOTICE 'Added image_html column';
    ELSE
        RAISE NOTICE 'image_html column already exists';
    END IF;

    -- Add bol_script column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'snippets' AND column_name = 'bol_script'
    ) THEN
        ALTER TABLE snippets ADD COLUMN bol_script text;
        RAISE NOTICE 'Added bol_script column';
    ELSE
        RAISE NOTICE 'bol_script column already exists';
    END IF;

    -- Add image_url column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'snippets' AND column_name = 'image_url'
    ) THEN
        ALTER TABLE snippets ADD COLUMN image_url text;
        RAISE NOTICE 'Added image_url column';
    ELSE
        RAISE NOTICE 'image_url column already exists';
    END IF;

    -- Make generated_html nullable
    BEGIN
        ALTER TABLE snippets ALTER COLUMN generated_html DROP NOT NULL;
        RAISE NOTICE 'Made generated_html nullable';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'generated_html is already nullable or error: %', SQLERRM;
    END;
END $$;

-- Verify the columns were added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'snippets'
ORDER BY ordinal_position;
