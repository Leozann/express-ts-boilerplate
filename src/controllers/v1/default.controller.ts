import { Request, Response } from 'express'
import { createRequire } from 'module'
import { HttpResponse } from '@/lib/utils/response.util'
import { formatDuration, formatTimestamp } from '@/lib/utils/time.util'
import { env } from '@/lib/utils/env.util'

const customRequire = createRequire(__filename)
const pkg = customRequire('../../../package.json')

export class DefaultController {
  static root(req: Request, res: Response) {
    return res.status(200).json(
      HttpResponse.success(req, {
        message: 'Express Server Already Connected',
        timestamp: formatTimestamp(),
      }),
    )
  }

  static health(req: Request, res: Response) {
    const uptimeSeconds = process.uptime()

    return res.status(200).json(
      HttpResponse.success(req, {
        status: 'ok',
        uptime: formatDuration(uptimeSeconds),
        timestamp: formatTimestamp(),
      }),
    )
  }
  static version(req: Request, res: Response) {
    return res.status(200).json(
      HttpResponse.success(req, {
        version: pkg.version,
        name: pkg.name,
      }),
    )
  }

  static info(req: Request, res: Response) {
    return res.status(200).json(
      HttpResponse.success(req, {
        environment: env.NODE_ENV,
        node: process.version,
      }),
    )
  }

  static docs(_req: Request, res: Response) {
    return res.redirect('/dev/api-docs')
  }
}
