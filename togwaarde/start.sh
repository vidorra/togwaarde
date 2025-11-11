#!/bin/sh
set -e

echo "🚀 Starting application..."

# Run database schema migrations (ensures database structure is up-to-date)
echo "📊 Running database schema migrations..."
if npm run db:migrate; then
  echo "✅ Schema migrations completed successfully"
else
  echo "⚠️  Schema migration failed, but continuing to start app..."
fi

# Start the Next.js application
echo "🌐 Starting Next.js server..."
exec npm start
