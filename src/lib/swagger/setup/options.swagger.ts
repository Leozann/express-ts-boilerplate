import { SwaggerOptions } from 'swagger-ui-express'

export const swaggerOptions: SwaggerOptions = {
  explorer: true,
  customSiteTitle: 'Express API Docs',
  swaggerOptions: {
    persistAuthorization: true, // keep JWT in UI on reload
    displayRequestDuration: true,
  },
}
