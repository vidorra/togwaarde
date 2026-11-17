/**
 * Rate Limiter with Redis support
 *
 * Uses Redis for persistent rate limiting in production.
 * Falls back to in-memory Map for development/when Redis is unavailable.
 */

import Redis from 'ioredis'
import { getClientIp } from './client-ip.js'

// Rate limit configurations
export const RATE_LIMIT_CONFIGS = {
  // Admin login - strict to prevent brute force
  adminLogin: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxAttempts: 5,
    keyPrefix: 'rl:admin:login:'
  },
  // Admin login over alle IP's samen: rem op raden vanaf veel adressen tegelijk.
  // Onder zo'n aanval kan de beheerder zelf ook even niet inloggen; de site draait gewoon door.
  adminLoginGlobal: {
    windowMs: 15 * 60 * 1000,
    maxAttempts: 50,
    keyPrefix: 'rl:admin:login-global:'
  },
  // Admin API endpoints - moderate
  adminApi: {
    windowMs: 1 * 60 * 1000, // 1 minute
    maxAttempts: 60,
    keyPrefix: 'rl:admin:api:'
  },
  // Contact form - strict to prevent spam
  contact: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxAttempts: 5,
    keyPrefix: 'rl:contact:'
  },
  // General API - lenient
  general: {
    windowMs: 1 * 60 * 1000, // 1 minute
    maxAttempts: 100,
    keyPrefix: 'rl:general:'
  }
}

// Redis client singleton
let redisClient = null
let redisAvailable = false

/**
 * Initialize Redis connection
 */
function initRedis() {
  if (redisClient !== null) {
    return redisClient
  }

  const redisUrl = process.env.REDIS_URL

  if (!redisUrl) {
    console.log('⚠️  REDIS_URL not configured - using in-memory rate limiting')
    redisAvailable = false
    return null
  }

  try {
    redisClient = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      retryDelayOnFailover: 100,
      enableReadyCheck: true,
      lazyConnect: true,
      // Connection timeout
      connectTimeout: 5000,
      // Reconnect strategy
      retryStrategy(times) {
        if (times > 3) {
          console.error('❌ Redis connection failed after 3 retries')
          redisAvailable = false
          return null // Stop retrying
        }
        return Math.min(times * 200, 2000)
      }
    })

    redisClient.on('connect', () => {
      console.log('✅ Redis connected for rate limiting')
      redisAvailable = true
    })

    redisClient.on('error', (err) => {
      console.error('❌ Redis error:', err.message)
      redisAvailable = false
    })

    redisClient.on('close', () => {
      console.log('⚠️  Redis connection closed')
      redisAvailable = false
    })

    // Attempt connection
    redisClient.connect().catch((err) => {
      console.error('❌ Redis initial connection failed:', err.message)
      redisAvailable = false
    })

    return redisClient
  } catch (error) {
    console.error('❌ Redis initialization error:', error.message)
    redisAvailable = false
    return null
  }
}

// Initialize on module load
initRedis()

// In-memory fallback store
const memoryStore = new Map()

// Clean up old entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, data] of memoryStore) {
      // Alleen weg als er een uur niets meer binnenkwam; een lopende aanval houdt zijn teller.
      const last = data.requests[data.requests.length - 1] || data.firstAttempt
      if (now - last > 60 * 60 * 1000) {
        memoryStore.delete(key)
      }
    }
  }, 5 * 60 * 1000)
}

/**
 * Check rate limit using Redis
 */
async function checkRateLimitRedis(key, config) {
  const redis = redisClient

  if (!redis || !redisAvailable) {
    return null // Fallback to memory
  }

  try {
    const windowSeconds = Math.ceil(config.windowMs / 1000)
    const now = Date.now()
    const windowStart = now - config.windowMs

    // Use Redis sorted set for sliding window
    const multi = redis.multi()

    // Remove old entries outside the window
    multi.zremrangebyscore(key, 0, windowStart)

    // Add current request
    multi.zadd(key, now, `${now}-${Math.random()}`)

    // Count requests in window
    multi.zcard(key)

    // Set expiry on the key
    multi.expire(key, windowSeconds + 60)

    const results = await multi.exec()

    if (!results) {
      return null // Fallback to memory
    }

    const count = results[2][1] // zcard result

    return {
      allowed: count <= config.maxAttempts,
      remaining: Math.max(0, config.maxAttempts - count),
      resetAt: new Date(now + config.windowMs).toISOString()
    }
  } catch (error) {
    console.error('Redis rate limit error:', error.message)
    return null // Fallback to memory
  }
}

/**
 * Check rate limit using in-memory store
 */
function checkRateLimitMemory(key, config) {
  const now = Date.now()
  const data = memoryStore.get(key) || {
    count: 0,
    firstAttempt: now,
    requests: []
  }

  // Clean old requests outside window
  data.requests = data.requests.filter(time => now - time < config.windowMs)

  // Add current request; bewaar hooguit max+1 tijdstempels zodat een flood de lijst niet laat groeien
  data.requests.push(now)
  if (data.requests.length > config.maxAttempts + 1) {
    data.requests.splice(0, data.requests.length - (config.maxAttempts + 1))
  }
  data.count = data.requests.length

  memoryStore.set(key, data)

  return {
    allowed: data.count <= config.maxAttempts,
    remaining: Math.max(0, config.maxAttempts - data.count),
    resetAt: new Date(now + config.windowMs).toISOString()
  }
}

/**
 * Main rate limit check function
 *
 * @param {string} identifier - IP address or user identifier
 * @param {string} type - Rate limit type (adminLogin, adminApi, contact, general)
 * @returns {Promise<{allowed: boolean, remaining: number, resetAt: string}>}
 */
export async function checkRateLimit(identifier, type = 'general') {
  const config = RATE_LIMIT_CONFIGS[type] || RATE_LIMIT_CONFIGS.general
  const key = `${config.keyPrefix}${identifier}`

  // Try Redis first
  const redisResult = await checkRateLimitRedis(key, config)

  if (redisResult !== null) {
    return redisResult
  }

  // Fallback to in-memory
  return checkRateLimitMemory(key, config)
}

/**
 * Get client IP from request headers
 */
export function getClientIP(request) {
  return getClientIp(request)
}

/**
 * Rate limit middleware helper
 * Returns NextResponse if rate limited, null otherwise
 */
export async function rateLimitMiddleware(request, type = 'general') {
  const ip = getClientIP(request)
  const result = await checkRateLimit(ip, type)

  if (!result.allowed) {
    return {
      limited: true,
      response: {
        error: 'Te veel aanvragen. Probeer later opnieuw.',
        retryAfter: result.resetAt
      },
      headers: {
        'X-RateLimit-Limit': String(RATE_LIMIT_CONFIGS[type]?.maxAttempts || 100),
        'X-RateLimit-Remaining': String(result.remaining),
        'X-RateLimit-Reset': String(result.resetAt),
        'Retry-After': String(Math.ceil((new Date(result.resetAt) - new Date()) / 1000))
      }
    }
  }

  return {
    limited: false,
    remaining: result.remaining,
    headers: {
      'X-RateLimit-Limit': String(RATE_LIMIT_CONFIGS[type]?.maxAttempts || 100),
      'X-RateLimit-Remaining': String(result.remaining),
      'X-RateLimit-Reset': String(result.resetAt)
    }
  }
}

/**
 * Check if Redis is available
 */
export function isRedisAvailable() {
  return redisAvailable
}
