import { Elysia } from 'elysia'
import jwt from 'jsonwebtoken'

export const JWTMiddleware = (app: Elysia) =>
  app.derive(({ headers, set }) => {
    const auth = headers['authorization']

    if (!auth || !auth.startsWith('Bearer ')) {
      set.status = 401
      return { user: null }
    }

    const token = auth.slice(7)
    try {
      if (!process.env.JWT_SECRET_KEY) throw new Error('JWT secret key is not defined')
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as { userId: string, email: string }
      return { user: decoded }
    } catch (error) {
      set.status = 401
      return { user: null }
    }
  })