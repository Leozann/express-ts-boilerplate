import 'pino-http'
import type { Response } from 'express'

declare module 'pino-http' {
  interface Res extends Response {}
}
