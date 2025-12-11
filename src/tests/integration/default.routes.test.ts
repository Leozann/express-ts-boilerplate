import request from 'supertest'
import { describe, it, expect } from 'vitest'
import { app } from '@/server'

describe('Default Routes - GET /', () => {
  it('should return server connection message', async () => {
    const res = await request(app).get('/')

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('requestId')
    expect(res.body).toHaveProperty('data')
    expect(res.body.data).toHaveProperty('message', 'Express Server Already Connected')
    expect(res.body.data).toHaveProperty('timestamp')
  })
})
