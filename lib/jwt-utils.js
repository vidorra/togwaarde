import * as jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here'

/**
 * Verify admin token and extract website context
 * Ensures token is valid and contains admin claim
 * Returns decoded token and website for query filtering
 */
export function verifyAdminAndGetWebsite(request) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or invalid token')
  }

  const token = authHeader.substring(7)

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    if (!decoded.admin) {
      throw new Error('Invalid token: not an admin token')
    }

    // Default to flesvoedingcalculator for backwards compatibility
    // If token doesn't have website field, use default
    const website = decoded.website || 'flesvoedingcalculator'

    return { decoded, website }
  } catch (error) {
    throw new Error(`Token verification failed: ${error.message}`)
  }
}

/**
 * Sign a new admin JWT token with website context
 */
export function signAdminToken(website = 'flesvoedingcalculator') {
  const token = jwt.sign(
    {
      admin: true,
      website: website,
      iat: Math.floor(Date.now() / 1000)
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  )
  return token
}
