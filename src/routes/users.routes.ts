import express, { Router } from 'express'
import authLimiter from '@/middleware/limiter.middleware'
import validate from '@/middleware/validator.middleware'
import { UsersController } from '@/controllers/v1/users.controller'
import {
  GetUserByIdSchema,
  LoginSchema,
  RegisterUserSchema,
  UpdateUserSchema,
} from '@/lib/validation/schema/users.schema'
import { authenticate, authorize } from '@/middleware/auth.middleware'
import { Roles } from '@/lib/types/roles'

const router: Router = express.Router()
const controller = new UsersController()

router.get('/', authenticate, authorize(Roles.ADMIN), controller.getAll.bind(controller))
router.post('/register', validate(RegisterUserSchema), controller.register.bind(controller))
router.get(
  '/:id',
  authenticate,
  authorize(Roles.ADMIN),
  validate(GetUserByIdSchema),
  controller.getById.bind(controller),
)
router.patch(
  '/:id',
  authenticate,
  authorize(Roles.ADMIN),
  validate(UpdateUserSchema),
  controller.update.bind(controller), // update any user by id
)
router.post('/login', authLimiter, validate(LoginSchema), controller.login.bind(controller))
router.patch(
  '/:id/deactivate',
  authenticate,
  authorize(Roles.ADMIN),
  validate(GetUserByIdSchema),
  controller.deactivate.bind(controller), // soft delete
)

router.delete(
  '/:id/force',
  authenticate,
  authorize(Roles.SUPERUSER),
  validate(GetUserByIdSchema),
  controller.forceDelete.bind(controller), // hard delete
)

export default router
