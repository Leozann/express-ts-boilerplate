export const swaggerSecurity = {
  bearerAuth: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description: 'Enter your JWT token in the format: **Bearer &lt;token&gt;**. Required for protected endpoints.',
  },
}
