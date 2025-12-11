import express from 'express'
import corsMiddleware from './middleware/cors.middleware'
import errorMiddleware from './middleware/error.middleware'
import logMiddleware from './middleware/log.middleware'
import defaultRoutes from './routes/default.routes'
import { swaggerShowDocs } from './lib/swagger/index.swagger'
import usersRoutes from './routes/users.routes'
import { addRequestIdMiddleware } from './middleware/request.middleware'
import compressionMiddleware from './middleware/compress.middleware'
import { HttpResponse } from './lib/utils/response.util'

const app: ReturnType<typeof express> = express() // type safe for initializing express app

// set the application to trust the reverse proxy
app.set('trust proxy', true)

// middleware pre-setup
app.use(corsMiddleware)
app.use(logMiddleware) // http request logger
app.use(addRequestIdMiddleware)

// body parsers; parsing json & url-encoded form data into req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// toggle compression middleware; disable if not needed
if (process.env.ENABLE_COMPRESSION === 'true') {
  app.use(compressionMiddleware)
}

// swagger api docs setup
swaggerShowDocs(app)

// routes registration
app.use('/', defaultRoutes)
app.use('/api/v1/users', usersRoutes)

// 404 route handler
app.use((req, res) => {
  const { payload, statusCode } = HttpResponse.error(req, 'ROUTE_NOT_FOUND', 'Route not found', 404)

  return res.status(statusCode).json(payload)
})

// middleware post-setup
app.use(errorMiddleware)

export { app }
