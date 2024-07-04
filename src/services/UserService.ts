// src/services/UserService.ts
import { IUserService } from '@/interfaces/IUserService'
import { GenericQuery } from '@/types/query.types'
import { AuthenticatedUser } from '@/middlewares/authMiddleware'
import { UserResponse } from '@/responses/UserResponse'
import { UserRepository } from '@/repositories/UserRepository'
import { UserFilterFields, UserSortFields } from '@/types/user.types'
import { PaginatedResult } from '@/types/pagination.types'
import { User } from '@prisma/client'
import { PasswordHasher } from '@/utils/PasswordHasher'

export class UserService implements IUserService {
  private userRepository: UserRepository = new UserRepository()
  constructor() {}

  async getAllUsers(
    query: GenericQuery<UserSortFields, UserFilterFields>,
  ): Promise<UserResponse> {
    try {
      const result: PaginatedResult<User> =
        await this.userRepository.findAll(query)
      return UserResponse.success(result)
    } catch (error) {
      return UserResponse.badRequest('An error occurred while fetching users')
    }
  }

  async createUser(userData: {
    email: string
    password: string
    name: string
  }): Promise<UserResponse> {
    try {
      const hashedPassword = PasswordHasher.hashPassword(userData.password)
      const user = await this.userRepository.create({
        ...userData,
        password: hashedPassword,
      })
      return UserResponse.success(user)
    } catch (error) {
      return UserResponse.badRequest(
        'An error occurred while creating the user',
      )
    }
  }

  async getUserById(id: string): Promise<UserResponse> {
    try {
      const user = await this.userRepository.findById(id)
      return user ? UserResponse.success(user) : UserResponse.notFound()
    } catch (error) {
      return UserResponse.badRequest(
        'An error occurred while fetching the user',
      )
    }
  }

  async getUserByEmail(email: string): Promise<UserResponse> {
    try {
      const user = await this.userRepository.findByEmail(email)
      return user ? UserResponse.success(user) : UserResponse.notFound()
    } catch (error) {
      return UserResponse.badRequest(
        'An error occurred while fetching the user',
      )
    }
  }

  async updateUser(
    id: string,
    userData: Partial<{ email: string; name: string }>,
  ): Promise<UserResponse> {
    try {
      const updatedUser = await this.userRepository.update(id, userData)
      return updatedUser
        ? UserResponse.success(updatedUser)
        : UserResponse.notFound()
    } catch (error) {
      return UserResponse.badRequest(
        'An error occurred while updating the user',
      )
    }
  }

  async deleteUser(id: string): Promise<UserResponse> {
    try {
      const deletedUser = await this.userRepository.delete(id)
      return deletedUser
        ? UserResponse.success(deletedUser)
        : UserResponse.notFound()
    } catch (error) {
      return UserResponse.badRequest(
        'An error occurred while deleting the user',
      )
    }
  }

  async getUserProfile(user: AuthenticatedUser): Promise<UserResponse> {
    if (!user) {
      return UserResponse.unauthorized()
    }
    try {
      const profile = await this.userRepository.findById(user.id)
      return profile ? UserResponse.success(profile) : UserResponse.notFound()
    } catch (error) {
      return UserResponse.badRequest('An error occurred while fetching profile')
    }
  }
}
