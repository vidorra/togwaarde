/**
 * OpenAPI 3.1.0 Schema for Togwaarde API
 *
 * This file defines the OpenAPI specification for all API endpoints.
 * Can be used with:
 * - Swagger UI
 * - Redoc
 * - API documentation generators
 *
 * @see https://spec.openapis.org/oas/v3.1.0
 */

export const openAPISchema = {
  openapi: '3.1.0',
  info: {
    title: 'Togwaarde API',
    description:
      'API for the Togwaarde TOG baby clothing calculator. Handles contact form submissions and dynamic sitemap generation.',
    version: '1.0.0',
    contact: {
      name: 'Togwaarde Support',
      url: 'https://togwaarde.nl'
    },
    license: {
      name: 'MIT'
    }
  },
  servers: [
    {
      url: 'https://togwaarde.nl',
      description: 'Production server'
    },
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    }
  ],
  tags: [
    {
      name: 'Contact',
      description: 'Contact form submission endpoints'
    },
    {
      name: 'Sitemap',
      description: 'Dynamic sitemap generation'
    }
  ],
  paths: {
    '/api/contact': {
      post: {
        tags: ['Contact'],
        summary: 'Submit contact form',
        description:
          'Submit a contact form or feedback message. Includes spam detection, input validation, and optional reCAPTCHA verification.',
        operationId: 'submitContact',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'message', 'type'],
                properties: {
                  name: {
                    type: 'string',
                    minLength: 2,
                    maxLength: 100,
                    description: 'Full name of sender',
                    example: 'Jan de Vries'
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    maxLength: 254,
                    description: 'Email address for reply',
                    example: 'jan@example.nl'
                  },
                  subject: {
                    type: 'string',
                    maxLength: 200,
                    description: 'Message subject (optional)',
                    example: 'Vraag over TOG-waardes'
                  },
                  message: {
                    type: 'string',
                    minLength: 10,
                    maxLength: 5000,
                    description: 'Message body',
                    example: 'Ik heb een vraag over de TOG-calculator...'
                  },
                  type: {
                    type: 'string',
                    enum: ['feedback', 'contact'],
                    description: 'Message type: feedback or contact request',
                    example: 'feedback'
                  },
                  recaptchaToken: {
                    type: 'string',
                    description: 'reCAPTCHA v3 token (optional)',
                    example: 'reCAPTCHA_token_here'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Message submitted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true
                    },
                    message: {
                      type: 'string',
                      example: 'Bericht succesvol verzonden'
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Validation error or spam detected',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Formuliervalidatie mislukt'
                    },
                    details: {
                      type: 'array',
                      items: {
                        type: 'string'
                      },
                      example: ['Name must be between 2 and 100 characters']
                    }
                  }
                }
              }
            }
          },
          429: {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Too many requests'
                    },
                    retryAfter: {
                      type: 'number',
                      description: 'Seconds to wait before retrying',
                      example: 60
                    }
                  }
                }
              }
            }
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Er ging iets mis. Probeer het later opnieuw.'
                    }
                  }
                }
              }
            }
          }
        },
        security: [],
        'x-rate-limit': {
          limit: 5,
          window: '15 minutes',
          description: 'Rate limited to 5 requests per 15 minutes per IP'
        }
      },
      get: {
        tags: ['Contact'],
        summary: 'Method not allowed',
        description: 'GET requests are not supported on this endpoint',
        operationId: 'getContactNotAllowed',
        responses: {
          405: {
            description: 'Method Not Allowed',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Method not allowed'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/sitemap.xml': {
      get: {
        tags: ['Sitemap'],
        summary: 'Get dynamic sitemap',
        description:
          'Returns an XML sitemap with all pages for search engine crawling. Automatically updated based on knowledge base articles.',
        operationId: 'getSitemap',
        responses: {
          200: {
            description: 'XML sitemap',
            content: {
              'application/xml': {
                schema: {
                  type: 'string',
                  description: 'Valid XML sitemap following sitemap.org protocol'
                }
              }
            }
          },
          500: {
            description: 'Server error generating sitemap',
            content: {
              'application/xml': {
                schema: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      ContactRequest: {
        type: 'object',
        required: ['name', 'email', 'message', 'type'],
        properties: {
          name: {
            type: 'string',
            minLength: 2,
            maxLength: 100
          },
          email: {
            type: 'string',
            format: 'email'
          },
          subject: {
            type: 'string',
            maxLength: 200
          },
          message: {
            type: 'string',
            minLength: 10,
            maxLength: 5000
          },
          type: {
            type: 'string',
            enum: ['feedback', 'contact']
          },
          recaptchaToken: {
            type: 'string'
          }
        }
      },
      ContactResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean'
          },
          message: {
            type: 'string'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string'
          },
          details: {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  'x-api-notes': {
    rateLimit: 'All endpoints are rate-limited using Redis-backed sliding window algorithm',
    security:
      'reCAPTCHA v3 validation prevents automated attacks. All input is sanitized with DOMPurify.',
    cors: 'CORS is allowed for localhost (development) and togwaarde.nl (production)',
    contentType: 'All POST endpoints expect application/json'
  }
}

/**
 * Get OpenAPI schema as JSON
 * Useful for Swagger UI integration
 */
export function getOpenAPISchema() {
  return openAPISchema
}

/**
 * Get OpenAPI schema with custom servers
 * @param {string[]} servers - Array of server URLs
 * @returns {typeof openAPISchema} OpenAPI schema with custom servers
 */
export function getOpenAPISchemWithServers(servers: Array<{ url: string; description: string }>) {
  return {
    ...openAPISchema,
    servers
  }
}
