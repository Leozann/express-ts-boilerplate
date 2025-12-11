export const userSchemas = {
  User: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid', example: '8f9c1b78-1b01-4f79-b323-cd2bb9b0a200' },
      fullName: { type: 'string', example: 'John Doe' },
      email: { type: 'string', example: 'john.doe@gmail.com' },
      role: { type: 'string', example: 'USER' },
      isActive: { type: 'boolean', example: true },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  },

  UserResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      data: { $ref: '#/components/schemas/User' },
    },
  },

  RegisterUserRequest: {
    type: 'object',
    required: ['fullName', 'email', 'password'],
    properties: {
      fullName: { type: 'string', example: 'John Doe' },
      email: { type: 'string', example: 'john.doe@gmail.com' },
      password: { type: 'string', example: 'StrongP4ssword!' },
    },
  },

  LoginRequest: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', example: 'john.doe@gmail.com' },
      password: { type: 'string', example: 'StrongP4ssword!' },
    },
  },

  LoginResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      token: { type: 'string', example: 'jwt.token.string' },
      user: { $ref: '#/components/schemas/User' },
    },
  },

  UpdateUserRequest: {
    type: 'object',
    properties: {
      fullName: { type: 'string', example: 'Updated Name' },
      email: { type: 'string', example: 'new.email@gmail.com' },
      role: { type: 'string', example: 'ADMIN' },
      isActive: { type: 'boolean', example: true },
    },
  },
}
