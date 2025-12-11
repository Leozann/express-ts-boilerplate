import express, { Router } from 'express'
import { DefaultController } from '@/controllers/v1/default.controller'

const router: Router = express.Router() // type safe for tsconfig "isolatedModules": true

router.get('/', DefaultController.root)
router.get('/health', DefaultController.health)
router.get('/version', DefaultController.version)
router.get('/info', DefaultController.info)
router.get('/docs', DefaultController.docs)

export default router
