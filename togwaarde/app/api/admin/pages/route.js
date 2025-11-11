import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

// Force dynamic route
export const dynamic = 'force-dynamic'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here'

// Verify admin token
function verifyAdmin(request) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or invalid token')
  }
  
  const token = authHeader.substring(7)
  const decoded = jwt.verify(token, JWT_SECRET)
  
  if (!decoded.admin) {
    throw new Error('Invalid token')
  }
  
  return decoded
}

// Scan kennisbank directory for pages
function scanKennisbankPages() {
  const kennisbankDir = path.join(process.cwd(), 'app', 'kennisbank')
  const pages = []

  function scanDirectory(dir, basePath = '') {
    try {
      const items = fs.readdirSync(dir)
      
      for (const item of items) {
        const itemPath = path.join(dir, item)
        const stat = fs.statSync(itemPath)
        
        if (stat.isDirectory()) {
          // Recursively scan subdirectories
          scanDirectory(itemPath, path.join(basePath, item))
        } else if (item === 'page.jsx') {
          // Found a page file
          const pagePath = basePath ? `/kennisbank/${basePath}` : '/kennisbank'
          
          // Try to extract title from the page file
          let title = basePath ? basePath.split('/').pop().replace(/-/g, ' ') : 'Kennisbank'
          title = title.charAt(0).toUpperCase() + title.slice(1)
          
          // Try to read the actual title from the file
          try {
            const fileContent = fs.readFileSync(itemPath, 'utf8')
            const titleMatch = fileContent.match(/<h1[^>]*>.*?<.*?>(.*?)<\/.*?><\/h1>/s) ||
                               fileContent.match(/<h1[^>]*>(.*?)<\/h1>/s) ||
                               fileContent.match(/title:\s*['"](.*?)['"]/i)
            
            if (titleMatch) {
              title = titleMatch[1].replace(/<[^>]*>/g, '').trim()
            }
          } catch (e) {
            // Use the default title if can't read file
          }
          
          pages.push({
            id: basePath.replace(/\//g, '_') || 'kennisbank_root',
            title: title,
            path: pagePath,
            category: basePath ? basePath.split('/')[0] : 'root',
            snippetCount: 0 // Will be populated later with actual assignment data
          })
        }
      }
    } catch (error) {
      console.error('Error scanning directory:', dir, error)
    }
  }
  
  scanDirectory(kennisbankDir)
  return pages.sort((a, b) => a.path.localeCompare(b.path))
}

// GET - Disabled in favor of /api/admin-pages/ (production-safe)
export async function GET(request) {
  return NextResponse.json(
    { 
      message: 'This endpoint is disabled due to performance issues. Use /api/admin-pages/ instead.',
      redirect: '/api/admin-pages/',
      reason: 'File system scanning causes 504 timeouts in production'
    },
    { status: 301 }
  )
}