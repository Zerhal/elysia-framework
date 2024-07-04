// src/schemas/user.schemas.ts
import { t } from 'elysia'
import { genericQuerySchema } from '@/types/query.types'
import { UserSortFields, UserFilterFields } from '@/types/user.types'

export const userSchemas = {
  getAllUsers: {
    query: genericQuerySchema<UserSortFields, UserFilterFields>(
      ['id', 'email', 'name', 'createdAt', 'updatedAt'],
      ['id', 'email', 'name', 'createdAt', 'updatedAt'],
    ),
  },
  createUser: {
    body: t.Object({
      email: t.String(),
      password: t.String(),
      name: t.String(),
    }),
  },
  getUserById: {
    params: t.Object({
      id: t.String(),
    }),
  },
  updateUser: {
    params: t.Object({
      id: t.String(),
    }),
    body: t.Object({
      email: t.Optional(t.String()),
      name: t.Optional(t.String()),
    }),
  },
}
