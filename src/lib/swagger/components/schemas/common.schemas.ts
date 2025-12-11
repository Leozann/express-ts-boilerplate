export const commonSchemas = {
  ErrorResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: false },
      message: { type: 'string', example: 'Something went wrong.' },
      timestamp: { type: 'string', format: 'date-time' },
    },
  },

  PaginationMeta: {
    type: 'object',
    properties: {
      total: { type: 'number', example: 120 },
      page: { type: 'number', example: 1 },
      limit: { type: 'number', example: 10 },
    },
  },
}
