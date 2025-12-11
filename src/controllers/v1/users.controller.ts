import { Request, Response } from 'express'
import { UsersService } from '@/services/users.svc'
import { HttpResponse } from '@/lib/utils/response.util'

const service = new UsersService()

export class UsersController {
  async getAll(req: Request, res: Response) {
    const users = await service.getAllUsers()
    return res.status(200).json(HttpResponse.list(req, users, { total: users.length }))
  }

  async getById(req: Request, res: Response) {
    const user = await service.getUserById(req.params.id!)
    return res.status(200).json(HttpResponse.success(req, user))
  }

  async register(req: Request, res: Response) {
    const user = await service.registerUser(req.body)
    return res.status(201).json(HttpResponse.success(req, user))
  }

  async update(req: Request, res: Response) {
    const updated = await service.updateUser(req.params.id!, req.body)
    return res.status(200).json(HttpResponse.success(req, updated))
  }

  async deactivate(req: Request, res: Response) {
    await service.deactivateUser(req.params.id!)
    return res.status(200).json(HttpResponse.success(req, { deleted: true }))
  }

  async forceDelete(req: Request, res: Response) {
    await service.forceDeleteUser(req.params.id!)
    return res.status(200).json(HttpResponse.success(req, { deleted: true }))
  }

  async login(req: Request, res: Response) {
    const result = await service.login(req.body.email, req.body.password)
    return res.status(200).json(HttpResponse.success(req, result))
  }
}
