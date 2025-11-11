#!/bin/bash

# Script to patch the admin dashboard to use database APIs instead of file-based APIs
# Run this from the project root: bash scripts/patch-admin-dashboard.sh

DASHBOARD_FILE="app/admin/dashboard/page.jsx"

echo "🔧 Patching Admin Dashboard to use Database APIs..."

if [ ! -f "$DASHBOARD_FILE" ]; then
  echo "❌ Error: $DASHBOARD_FILE not found"
  exit 1
fi

# Create backup
cp "$DASHBOARD_FILE" "${DASHBOARD_FILE}.backup"
echo "📦 Created backup: ${DASHBOARD_FILE}.backup"

# Replace API endpoints
echo "🔄 Updating API endpoints..."

# Replace /api/admin-snippets/ with /api/admin/snippets/
sed -i.tmp "s|'/api/admin-snippets/|'/api/admin/snippets/|g" "$DASHBOARD_FILE"
sed -i.tmp "s|\`/api/admin-snippets/|\`/api/admin/snippets/|g" "$DASHBOARD_FILE"

# Replace /api/admin-page-snippets/ with proper database endpoints
# This requires more complex replacements

# For loadPageSnippets - change GET request
sed -i.tmp "s|const response = await fetch(\`/api/admin-page-snippets/?pageId=\${pageId}\`)|const response = await fetch(\`/api/admin/pages/\${pageId}/snippets/\`, {\n      headers: getAuthHeaders()\n    })|g" "$DASHBOARD_FILE"

# Clean up temp files
rm -f "${DASHBOARD_FILE}.tmp"

echo "✅ API endpoints updated"
echo ""
echo "⚠️  MANUAL CHANGES REQUIRED:"
echo ""
echo "1. Add getAuthHeaders() function after state declarations:"
echo "   // Helper to get auth headers with JWT token"
echo "   const getAuthHeaders = () => {"
echo "     const token = localStorage.getItem('admin_token')"
echo "     return {"
echo "       'Content-Type': 'application/json',"
echo "       ...(token ? { 'Authorization': \`Bearer \${token}\` } : {})"
echo "     }"
echo "   }"
echo ""
echo "2. Update all fetch() calls to use getAuthHeaders():"
echo "   - Replace: headers: { 'Content-Type': 'application/json' }"
echo "   - With: headers: getAuthHeaders()"
echo ""
echo "3. Update assignSnippetToPage():"
echo "   - Change: /api/admin-page-snippets/"
echo "   - To: /api/admin/pages/\${pageId}/snippets/"
echo ""
echo "4. Update unassignSnippetFromPage():"
echo "   - Change: /api/admin-page-snippets/ with body"
echo "   - To: /api/admin/pages/\${pageId}/snippets/?snippetId=\${snippetId}"
echo "   - Remove: body: JSON.stringify({ pageId, snippetId })"
echo ""
echo "5. Update deleteSnippet():"
echo "   - Change: /api/admin-snippets/ with body"
echo "   - To: /api/admin/snippets/?id=\${snippetId}"
echo "   - Remove: body: JSON.stringify({ id: snippetId })"
echo ""
echo "6. Update saveNewSnippet() field names:"
echo "   - Change: generatedHtml: newSnippet.imageHtml"
echo "   - To: imageHtml: newSnippet.imageHtml"
echo "   - Change: codeSnippet: newSnippet.code"
echo "   - To: bolScript: newSnippet.code"
echo ""
echo "📝 See ADMIN_DASHBOARD_FIX.md for detailed instructions"
echo ""
echo "🔍 To undo changes, restore from backup:"
echo "   cp ${DASHBOARD_FILE}.backup ${DASHBOARD_FILE}"
