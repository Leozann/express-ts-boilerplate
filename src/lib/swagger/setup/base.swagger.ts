export const swaggerBase = {
  openapi: '3.0.0',
  info: {
    title: 'Express Boilerplate API',
    version: '1.0.0',
    description: 'REST API documentation for the Express + TypeScript boilerplate by Adzano.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server',
    },
  ],
}
