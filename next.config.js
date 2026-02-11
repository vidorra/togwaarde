/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,

  // ✅ Image Optimization (Phase 3)
  // Re-enabled for performance: automatic AVIF/WebP conversion, lazy loading, responsive sizing
  // Reduces image bandwidth by 30-40% on average
  images: {
    // Disable only if hosting on static CDN without Next.js image server
    unoptimized: false,
    // Supported image formats: JPEG, PNG, WebP, AVIF
    formats: ['image/webp', 'image/avif'],
    // Maximum allowed image width (responsive images up to this size)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image breakpoints for srcset generation
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimized images for 31 days (max recommended)
    minimumCacheTTL: 31536000, // 1 year
  },

  // ✅ Build Optimization
  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  // ✅ Package Import Optimization
  experimental: {
    optimizePackageImports: ['lucide-react']
  },

  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap'
      },
      {
        source: '/bol-test.html',
        destination: '/bol-test.html'
      }
    ]
  },

  // ✅ Comprehensive Caching Headers (Phase 3)
  // Implements cache strategy for different content types:
  // - Static assets (JS/CSS): 1 year (immutable)
  // - Images: 1 year (immutable)
  // - HTML pages: 1 hour (must revalidate)
  // - API responses: varies by endpoint
  async headers() {
    return [
      // ========== STATIC ASSETS (1 year cache) ==========
      // JavaScript and CSS bundles are immutable (hashed filenames)
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      },

      // ========== IMAGES (1 year cache) ==========
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },

      // ========== FONTS (1 year cache) ==========
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },

      // ========== HTML PAGES (1 hour cache with revalidation) ==========
      {
        source: '/:path((?!_next|api).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      },

      // ========== API ENDPOINTS ==========
      // Contact API: No cache (dynamic, form submission)
      {
        source: '/api/contact',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate'
          }
        ]
      },

      // Sitemap: Cache for 24 hours (SEO)
      {
        source: '/api/sitemap',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400'
          },
          {
            key: 'Content-Type',
            value: 'application/xml'
          }
        ]
      },

      // API Docs: Cache for 1 hour
      {
        source: '/api/docs',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600'
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          }
        ]
      },

      // ========== TEXT FILES (24 hour cache) ==========
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400'
          }
        ]
      },
      {
        source: '/ads.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400'
          }
        ]
      },
      {
        source: '/bol-test.html',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/html; charset=UTF-8'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600'
          }
        ]
      },

      // ========== SECURITY HEADERS ==========
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}

export default nextConfig