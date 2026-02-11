# Admin Dashboard Fix - Use Database APIs Instead of File-Based APIs

## Problem
The admin dashboard currently uses file-based APIs (`/api/admin-snippets/`, `/api/admin-pages/`, `/api/admin-page-snippets/`) which don't persist to the database. Changes disappear after hard refresh.

## Solution
Update the dashboard to use database APIs (`/api/admin/snippets/`, `/api/admin/pages/[pageId]/snippets/`) with JWT authentication.

## Changes Needed in `/app/admin/dashboard/page.jsx`

### 1. Add JWT Token Storage on Login
The login page needs to store the JWT token. Update `/app/admin/page.jsx`:

```javascript
// After successful login, store the token
localStorage.setItem('admin_token', data.token) // ADD THIS LINE
localStorage.setItem('admin_authenticated', 'true')
localStorage.setItem('admin_session', Date.now().toString())
```

### 2. Update API Endpoint URLs in Dashboard

Replace ALL occurrences of these endpoints:
- `/api/admin-snippets/` → `/api/admin/snippets/`
- `/api/admin-page-snippets/` → `/api/admin/pages/[pageId]/snippets/`
- Keep `/api/admin-pages/` as is (already correct)

### 3. Add JWT Authentication Helper

Add this helper function at the start of the component (after state declarations):

```javascript
// Helper to get auth headers with JWT token
const getAuthHeaders = () => {
  const token = localStorage.getItem('admin_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  }
}
```

### 4. Update All Fetch Calls

Replace all `fetch()` calls to use `getAuthHeaders()`:

**BEFORE:**
```javascript
const response = await fetch('/api/admin-snippets/', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  ...
})
```

**AFTER:**
```javascript
const response = await fetch('/api/admin/snippets/', {
  method: 'GET',
  headers: getAuthHeaders(),
  ...
})
```

### 5. Update Page Snippets API Calls

**loadPageSnippets function - BEFORE:**
```javascript
const response = await fetch(`/api/admin-page-snippets/?pageId=${pageId}`)
```

**AFTER:**
```javascript
const response = await fetch(`/api/admin/pages/${pageId}/snippets/`, {
  headers: getAuthHeaders()
})
```

**assignSnippetToPage function - BEFORE:**
```javascript
const response = await fetch('/api/admin-page-snippets/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ pageId, snippetId })
})
```

**AFTER:**
```javascript
const response = await fetch(`/api/admin/pages/${pageId}/snippets/`, {
  method: 'POST',
  headers: getAuthHeaders(),
  body: JSON.stringify({ snippetId })
})
```

**unassignSnippetFromPage function - BEFORE:**
```javascript
const response = await fetch('/api/admin-page-snippets/', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ pageId, snippetId })
})
```

**AFTER:**
```javascript
const response = await fetch(`/api/admin/pages/${pageId}/snippets/?snippetId=${snippetId}`, {
  method: 'DELETE',
  headers: getAuthHeaders()
})
```

### 6. Update Snippet API Calls

**saveNewSnippet function - BEFORE:**
```javascript
const response = await fetch('/api/admin-snippets/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(snippetData)
})
```

**AFTER:**
```javascript
const response = await fetch('/api/admin/snippets/', {
  method: 'POST',
  headers: getAuthHeaders(),
  body: JSON.stringify(snippetData)
})
```

**toggleSnippetActive, saveEditSnippet - BEFORE:**
```javascript
const response = await fetch('/api/admin-snippets/', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  ...
})
```

**AFTER:**
```javascript
const response = await fetch('/api/admin/snippets/', {
  method: 'PUT',
  headers: getAuthHeaders(),
  ...
})
```

**deleteSnippet function - BEFORE:**
```javascript
const response = await fetch('/api/admin-snippets/', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ id: snippetId })
})
```

**AFTER:**
```javascript
const response = await fetch(`/api/admin/snippets/?id=${snippetId}`, {
  method: 'DELETE',
  headers: getAuthHeaders()
})
```

### 7. Update Field Names in saveNewSnippet

Update the snippet data structure to use new field names:

**BEFORE:**
```javascript
const snippetData = {
  id: `${newSnippet.platform}-${Date.now()}`,
  name: newSnippet.name,
  type: newSnippet.platform,
  url: newSnippet.url,
  tag: newSnippet.tag || null,
  generatedHtml: newSnippet.imageHtml || null,
  codeSnippet: newSnippet.platform === 'bol' ? newSnippet.code : null,
  ...
}
```

**AFTER:**
```javascript
const snippetData = {
  id: `${newSnippet.platform}-${Date.now()}`,
  name: newSnippet.name,
  type: newSnippet.platform,
  url: newSnippet.url,
  tag: newSnippet.tag || null,
  imageHtml: newSnippet.imageHtml || null, // Separate image HTML
  bolScript: newSnippet.platform === 'bol' ? newSnippet.code : null, // Separate Bol script
  imageUrl: imageUrl || null,
  ...
}
```

## Quick Reference: All Endpoint Changes

| Old Endpoint (File-Based) | New Endpoint (Database) | Method |
|---|---|---|
| `/api/admin-snippets/` | `/api/admin/snippets/` | GET |
| `/api/admin-snippets/` | `/api/admin/snippets/` | POST |
| `/api/admin-snippets/` | `/api/admin/snippets/` | PUT |
| `/api/admin-snippets/` | `/api/admin/snippets/?id={id}` | DELETE |
| `/api/admin-page-snippets/?pageId={id}` | `/api/admin/pages/{pageId}/snippets/` | GET |
| `/api/admin-page-snippets/` | `/api/admin/pages/{pageId}/snippets/` | POST |
| `/api/admin-page-snippets/` | `/api/admin/pages/{pageId}/snippets/?snippetId={id}` | DELETE |

## Testing Checklist

After making these changes, test:

- [ ] Login and verify JWT token is stored in localStorage
- [ ] Load snippets list - should load from database
- [ ] Create new snippet - should persist after refresh
- [ ] Edit snippet - changes should persist after refresh
- [ ] Delete snippet - should stay deleted after refresh
- [ ] Assign snippet to page - should persist after refresh
- [ ] Unassign snippet from page - should persist after refresh
- [ ] Hard refresh the page - all changes should remain

## Database Migration

The database migration will run automatically on first API call to `/api/admin/snippets/`. It adds these columns:
- `image_html` (text, nullable)
- `bol_script` (text, nullable)
- `image_url` (text, nullable)
- Makes `generated_html` nullable
