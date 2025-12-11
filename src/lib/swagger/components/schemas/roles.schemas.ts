export const roleSchemas = {
  Role: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string', example: 'ADMIN' },
      description: { type: 'string', example: 'Administrator role with full permissions.' },
    },
  },

  RoleResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      data: { $ref: '#/components/schemas/Role' },
    },
  },
}
