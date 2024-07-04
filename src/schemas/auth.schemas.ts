// src/schemas/user.schemas.ts
import { t } from 'elysia'

export const authSchemas = {
  login: {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  },
}
