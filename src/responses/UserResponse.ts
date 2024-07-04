// src/responses/UserResponse.ts
import { IJsonResponse } from '@/interfaces/IJsonResponse'
import { PaginatedResult } from '@/types/pagination.types'
import { User } from '@prisma/client'

export type UserResponse = IJsonResponse<User | User[] | PaginatedResult<User>>

export const UserResponse = {
  success(data: User | User[] | PaginatedResult<User>): UserResponse {
    return {
      status: 200,
      data,
    }
  },

  notFound(): UserResponse {
    return {
      status: 404,
      error: 'User not found',
    }
  },

  unauthorized(): UserResponse {
    return {
      status: 401,
      error: 'Unauthorized',
    }
  },

  badRequest(error: string): UserResponse {
    return {
      status: 400,
      error,
    }
  },
}
