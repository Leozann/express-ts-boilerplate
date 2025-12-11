export const defaultPaths = {
  '/': {
    get: {
      tags: ['Default'],
      summary: 'Server Ping Response',
      description:
        'A simple endpoint to verify that the API is running. Useful for connectivity tests, uptime monitors, or load balancers.',
      responses: {
        200: {
          description: 'The server is reachable and responding normally.',
          content: {
            'application/json': {
              example: {
                success: true,
                message: 'Express Server Already Connected',
                timestamp: '2025-01-01T10:00:00.000Z',
              },
            },
          },
        },
      },
    },
  },

  '/health': {
    get: {
      tags: ['Default'],
      summary: 'Health Check',
      description:
        "Returns the application's current health status, uptime duration, and timestamp. Commonly used for liveness/readiness checks.",
      responses: {
        200: {
          description: 'The service is healthy and running normally.',
          content: {
            'application/json': {
              example: {
                success: true,
                data: {
                  status: 'ok',
                  uptime: '5 minutes 12 seconds',
                  timestamp: '2025-01-01T10:10:00.000Z',
                },
              },
            },
          },
        },
      },
    },
  },

  '/version': {
    get: {
      tags: ['Default'],
      summary: 'Current Build Version',
      description: 'Returns the current application version and project name. Useful for deployment verification.',
      responses: {
        200: {
          description: 'Successfully retrieved version metadata.',
          content: {
            'application/json': {
              example: {
                success: true,
                data: {
                  version: '1.0.0',
                  name: 'express-ts-boilerplate',
                },
              },
            },
          },
        },
      },
    },
  },

  '/info': {
    get: {
      tags: ['Default'],
      summary: 'Runtime Information',
      description: 'Provides environment and Node.js runtime details. Useful for debugging and environment validation.',
      responses: {
        200: {
          description: 'Runtime information successfully returned.',
          content: {
            'application/json': {
              example: {
                success: true,
                data: {
                  environment: 'development',
                  node: 'v18.18.2',
                },
              },
            },
          },
        },
      },
    },
  },
}
