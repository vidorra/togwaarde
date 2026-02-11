import { pgTable, text, timestamp, boolean, integer, uuid } from 'drizzle-orm/pg-core'

// Snippets table - stores affiliate product snippets
export const snippets = pgTable('snippets', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(), // 'bol' or 'amazon'
  url: text('url').notNull(),
  tag: text('tag'),
  generatedHtml: text('generated_html'), // Legacy field, kept for backwards compatibility
  imageHtml: text('image_html'), // Separate field for product image HTML
  bolScript: text('bol_script'), // Separate field for Bol.com JavaScript snippet
  imageUrl: text('image_url'), // Direct URL to product image
  price: text('price'), // Current price (e.g., "€24.99")
  originalPrice: text('original_price'), // Original price if discounted
  currency: text('currency').default('EUR'), // EUR for both platforms in NL
  priceLastUpdated: timestamp('price_last_updated'), // When price was last fetched
  website: text('website').notNull().default('flesvoedingcalculator'), // 'flesvoedingcalculator' or 'togwaarde'
  active: boolean('active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

// Page snippets table - stores which snippets are assigned to which pages
export const pageSnippets = pgTable('page_snippets', {
  id: text('id').primaryKey(),
  pageId: text('page_id').notNull(),
  snippetId: text('snippet_id').notNull().references(() => snippets.id, { onDelete: 'cascade' }),
  order: integer('order').default(0).notNull(),
  website: text('website').notNull().default('flesvoedingcalculator'), // 'flesvoedingcalculator' or 'togwaarde'
  active: boolean('active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

// Pages table - stores page metadata for multiple websites
export const pages = pgTable('pages', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  path: text('path').notNull(),
  category: text('category').notNull(),
  website: text('website').notNull().default('flesvoedingcalculator'), // 'flesvoedingcalculator' or 'togwaarde'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})