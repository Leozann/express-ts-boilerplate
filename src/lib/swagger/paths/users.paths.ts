export const userPaths = {
  '/api/v1/users': {
    get: {
      tags: ['Users'],
      summary: 'Retrieve All Users',
      description: 'Returns a full list of registered users. Access restricted to administrators or privileged roles.',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Successfully retrieved the list of all users.',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/UserResponse' },
              },
            },
          },
        },
        401: { description: 'Unauthorized — Valid token required.' },
        403: { description: 'Forbidden — Requires ADMIN role.' },
      },
    },
  },

  '/api/v1/users/register': {
    post: {
      tags: ['Users'],
      summary: 'Register a New User',
      description: 'Creates a new user account. Public endpoint requiring full name, email, and password.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/RegisterUserRequest' },
          },
        },
      },
      responses: {
        201: {
          description: 'User successfully created.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserResponse' },
            },
          },
        },
        409: { description: 'Conflict — Email already registered.' },
      },
    },
  },

  '/api/v1/users/login': {
    post: {
      tags: ['Users'],
      summary: 'User Login',
      description: 'Authenticates a user using email and password. Returns a JWT token upon successful authentication.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/LoginRequest' },
          },
        },
      },
      responses: {
        200: {
          description: 'Login successful — JWT token and user details returned.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginResponse' },
            },
          },
        },
        401: { description: 'Invalid credentials — Incorrect email or password.' },
        403: { description: 'Account deactivated — User disabled.' },
      },
    },
  },

  '/api/v1/users/{id}': {
    get: {
      tags: ['Users'],
      summary: 'Get User by ID',
      description: 'Retrieves detailed information about a specific user using their unique ID.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      ],
      responses: {
        200: {
          description: 'User found and returned.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserResponse' },
            },
          },
        },
        404: { description: 'User not found.' },
      },
    },

    patch: {
      tags: ['Users'],
      summary: 'Update User by ID — ADMIN',
      description: 'Allows administrators to update user attributes such as name, email, role, or status.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateUserRequest' },
          },
        },
      },
      responses: {
        200: {
          description: 'User updated successfully.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserResponse' },
            },
          },
        },
        404: { description: 'User not found — Cannot update non-existing user.' },
      },
    },
  },

  '/api/v1/users/{id}/deactivate': {
    patch: {
      tags: ['Users'],
      summary: 'Deactivate User (Soft Delete) — ADMIN',
      description: 'Deactivates a user without deleting their data. Useful for account moderation and compliance.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      ],
      responses: {
        200: {
          description: 'User successfully deactivated.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { deleted: { type: 'boolean' } },
              },
            },
          },
        },
        404: { description: 'User not found.' },
      },
    },
  },

  '/api/v1/users/{id}/force': {
    delete: {
      tags: ['Users'],
      summary: 'Force Delete User (Permanent) — SUPERUSER',
      description: 'Permanently removes a user and all associated data. This operation is irreversible.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      ],
      responses: {
        200: {
          description: 'User permanently deleted.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { deleted: { type: 'boolean' } },
              },
            },
          },
        },
        403: { description: 'Forbidden — Requires SUPERUSER role.' },
        404: { description: 'User not found.' },
      },
    },
  },
}
