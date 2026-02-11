import { NextResponse } from 'next/server'
import { getOpenAPISchema } from '../../../lib/openapi-schema'
import type { NextRequest } from 'next/server'

/**
 * API Documentation Endpoint
 *
 * Serves OpenAPI/Swagger specification for API documentation tools.
 *
 * **Supports:**
 * - Swagger UI: Add to /swagger-ui with `swaggerUrl` param
 * - Redoc: Add to /redoc with `specUrl` param
 * - OpenAPI tools: Direct access to JSON spec
 *
 * @route GET /api/docs
 * @returns {Response} OpenAPI schema as JSON
 *
 * @example
 * // Get OpenAPI spec
 * fetch('https://togwaarde.nl/api/docs')
 *   .then(r => r.json())
 *   .then(spec => console.log(spec))
 *
 * @example
 * // View with Swagger UI
 * https://swagger.io/tools/swagger-ui/?url=https://togwaarde.nl/api/docs
 */
export async function GET(request: NextRequest) {
  try {
    const schema = getOpenAPISchema()

    return NextResponse.json(schema, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        'Access-Control-Allow-Origin': '*', // Allow CORS for documentation tools
      },
    })
  } catch (error) {
    console.error('Error serving API documentation:', error)

    return NextResponse.json(
      { error: 'Failed to serve API documentation' },
      { status: 500 }
    )
  }
}

/**
 * Allow OPTIONS for CORS preflight
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
