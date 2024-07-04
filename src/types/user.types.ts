// src/types/user.types.ts
import { User } from '@prisma/client'

export type UserSortFields = 'id' | 'email' | 'name' | 'createdAt' | 'updatedAt'
export type UserFilterFields = Omit<User, 'password'>

export interface CreateUserDTO {
  [key: string]: unknown // Add index signature
  email: string
  password: string
  name: string
}

export interface UpdateUserDTO {
  [key: string]: unknown // Add index signature
  email?: string
  name?: string
}
