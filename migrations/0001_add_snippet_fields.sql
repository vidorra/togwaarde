-- Add new fields to snippets table for proper separation of imageHtml and bolScript
ALTER TABLE "snippets" ADD COLUMN "image_html" text;
--> statement-breakpoint
ALTER TABLE "snippets" ADD COLUMN "bol_script" text;
--> statement-breakpoint
ALTER TABLE "snippets" ADD COLUMN "image_url" text;
--> statement-breakpoint
-- Make generated_html nullable for backwards compatibility
ALTER TABLE "snippets" ALTER COLUMN "generated_html" DROP NOT NULL;
