#!/usr/bin/env node

/**
 * Automated patcher for admin dashboard to use database APIs
 * Run with: node scripts/patch-dashboard.js
 */

import fs from 'fs'
import path from 'path'

const DASHBOARD_PATH = path.join(process.cwd(), 'app/admin/dashboard/page.jsx')
const BACKUP_PATH = `${DASHBOARD_PATH}.backup.${Date.now()}`

console.log('🔧 Patching Admin Dashboard...')
console.log('📄 File:', DASHBOARD_PATH)

// Read the file
let content = fs.readFileSync(DASHBOARD_PATH, 'utf8')

// Create backup
fs.writeFileSync(BACKUP_PATH, content)
console.log('📦 Created backup:', BACKUP_PATH)

// Track changes
let changeCount = 0

// 1. Replace /api/admin-snippets/ with /api/admin/snippets/
const oldSnippets = /(['"`])\/api\/admin-snippets\//g
if (content.match(oldSnippets)) {
  content = content.replace(oldSnippets, '$1/api/admin/snippets/')
  changeCount++
  console.log('✅ Updated snippet API endpoints')
}

// 2. Add getAuthHeaders function if it doesn't exist
if (!content.includes('getAuthHeaders')) {
  const authHelperCode = `
  // Helper to get auth headers with JWT token
  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token')
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': \`Bearer \${token}\` } : {})
    }
  }
`

  // Insert after the router declaration
  content = content.replace(
    /(const router = useRouter\(\))/,
    `$1\n${authHelperCode}`
  )
  changeCount++
  console.log('✅ Added getAuthHeaders() helper function')
}

// 3. Replace headers in fetch calls
const oldHeaders = /headers:\s*{\s*['"]Content-Type['"]\s*:\s*['"]application\/json['"]\s*,?\s*}/g
if (content.match(oldHeaders)) {
  content = content.replace(oldHeaders, 'headers: getAuthHeaders()')
  changeCount++
  console.log('✅ Updated fetch headers to use getAuthHeaders()')
}

// 4. Update loadPageSnippets
content = content.replace(
  /const response = await fetch\(`\/api\/admin-page-snippets\/\?pageId=\${pageId}`\)/,
  `const response = await fetch(\`/api/admin/pages/\${pageId}/snippets/\`, {
      headers: getAuthHeaders()
    })`
)
changeCount++
console.log('✅ Updated loadPageSnippets()')

// 5. Update assignSnippetToPage
content = content.replace(
  /const response = await fetch\('\/api\/admin-page-snippets\/',\s*{\s*method:\s*'POST',\s*headers:\s*getAuthHeaders\(\),\s*body:\s*JSON\.stringify\(\{\s*pageId,\s*snippetId\s*\}\)/,
  `const response = await fetch(\`/api/admin/pages/\${pageId}/snippets/\`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ snippetId })`
)
changeCount++
console.log('✅ Updated assignSnippetToPage()')

// 6. Update unassignSnippetFromPage
content = content.replace(
  /const response = await fetch\('\/api\/admin-page-snippets\/',\s*{\s*method:\s*'DELETE',\s*headers:\s*getAuthHeaders\(\),\s*body:\s*JSON\.stringify\(\{\s*pageId,\s*snippetId\s*\}\)/,
  `const response = await fetch(\`/api/admin/pages/\${pageId}/snippets/?snippetId=\${snippetId}\`, {
      method: 'DELETE',
      headers: getAuthHeaders()`
)
changeCount++
console.log('✅ Updated unassignSnippetFromPage()')

// 7. Update deleteSnippet
content = content.replace(
  /const response = await fetch\('\/api\/admin-snippets\/',\s*{\s*method:\s*'DELETE',\s*headers:\s*getAuthHeaders\(\),\s*body:\s*JSON\.stringify\(\{\s*id:\s*snippetId\s*\}\)/g,
  `const response = await fetch(\`/api/admin/snippets/?id=\${snippetId}\`, {
      method: 'DELETE',
      headers: getAuthHeaders()`
)
changeCount++
console.log('✅ Updated deleteSnippet()')

// 8. Update field names in saveNewSnippet
content = content.replace(
  /generatedHtml:\s*newSnippet\.imageHtml\s*\|\|\s*null,?\s*(\/\/.*)?[\r\n\s]*codeSnippet:\s*newSnippet\.platform\s*===\s*['"]bol['"]\s*\?\s*newSnippet\.code\s*:\s*null/,
  `imageHtml: newSnippet.imageHtml || null, // Separate image HTML field
        bolScript: newSnippet.platform === 'bol' ? newSnippet.code : null // Separate Bol.com script field`
)
changeCount++
console.log('✅ Updated field names in saveNewSnippet()')

// 9. Update editFormData to include new fields
content = content.replace(
  /generatedHtml:\s*snippet\.generatedHtml\s*\|\|\s*['"]?['"]?,?\s*codeSnippet:\s*snippet\.codeSnippet\s*\|\|\s*['"]?['"]/,
  `generatedHtml: snippet.generatedHtml || snippet.imageHtml || '',
      imageHtml: snippet.imageHtml || '',
      bolScript: snippet.bolScript || snippet.codeSnippet || ''`
)

// Write the updated content
fs.writeFileSync(DASHBOARD_PATH, content)

console.log('')
console.log(`✨ Patching complete! Applied ${changeCount} changes.`)
console.log('')
console.log('📝 Manual verification needed for:')
console.log('   1. Check that all API calls use getAuthHeaders()')
console.log('   2. Verify DELETE requests use query parameters instead of body')
console.log('   3. Test login stores JWT token in localStorage')
console.log('')
console.log('🔄 To restore from backup:')
console.log(`   cp ${BACKUP_PATH} ${DASHBOARD_PATH}`)
console.log('')
console.log('🚀 Next steps:')
console.log('   1. Test the admin dashboard login')
console.log('   2. Create a new snippet and verify it persists after refresh')
console.log('   3. Check that all CRUD operations work correctly')
