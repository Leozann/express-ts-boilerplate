import swaggerUi from 'swagger-ui-express'
import type { Express } from 'express'
import { env } from '@/lib/utils/env.util'
import { readFileSync } from 'fs'
import path from 'path'

import { swaggerBase } from './setup/base.swagger'
import { swaggerTags } from './setup/tags.swagger'
import { components } from './components/index.components'
import { paths } from './paths/index.paths'

export const swaggerShowDocs = (app: Express) => {
  if (env.isProd) return // disable in production
  const swaggerPath = path.join(__dirname, './swagger.json')

  app.get('/swagger.json', (_req, res) => {
    const rawJson = readFileSync(swaggerPath, 'utf-8')
    const swaggerDocument = JSON.parse(rawJson)
    const finalSwagger = {
      ...swaggerBase,
      ...swaggerDocument,
      tags: swaggerTags,
      paths: {
        ...(swaggerDocument.paths || {}),
        ...paths,
      },
      components: {
        ...(swaggerDocument.components || {}),
        ...components,
      },
    }
    res.json(finalSwagger)
  })

  app.use(
    '/dev/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(null, {
      explorer: false, //disable search bar temporarily
      swaggerOptions: {
        url: '/swagger.json',
        persistAuthorization: true,
        displayRequestDuration: true,
      },
      customCss: `
        .swagger-ui .link .url { display: none !important; }
        .swagger-ui .info hgroup.main { margin: 0 !important; padding: 0 !important; }
        .swagger-ui .markdown p,
        .swagger-ui .markdown pre,
        .swagger-ui .renderedMarkdown p,
        .swagger-ui .renderedMarkdown pre { margin: 0 !important; }
      `,
    }),
  )
}
