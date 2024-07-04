import { IUserRepository } from '@/interfaces/IUserRepository'
import { UserCreateDTO, UserUpdateDTO } from '@/interfaces/dto/UserDTO'
import prisma from '@/libs/prisma'
import { PaginatedResult } from '@/types/pagination.types'
import { GenericQuery } from '@/types/query.types'
import { UserFilterFields, UserSortFields } from '@/types/user.types'
import { User } from '@prisma/client'

export class UserRepository implements IUserRepository {
  private prisma = prisma
  constructor() {}

  async findAll(
    query: GenericQuery<UserSortFields, UserFilterFields>,
  ): Promise<PaginatedResult<User>> {
    const { page = 1, limit = 10, sortBy, order, ...filters } = query
    const skip = (page - 1) * limit

    // Construire l'objet de tri
    const orderBy: { [key: string]: 'asc' | 'desc' } = {}
    if (sortBy && order) {
      orderBy[sortBy] = order
    }

    // Construire l'objet de filtres
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const where: any = {}
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        where[key] = { contains: value, mode: 'insensitive' }
      }
    })

    // Exécuter la requête
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.user.count({ where }),
    ])

    return {
      items: users,
      total,
      page,
      limit,
    }
  }

  async create(userData: UserCreateDTO): Promise<User> {
    return await this.prisma.user.create({ data: userData })
  }

  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    })
  }

  async update(id: string, userData: UserUpdateDTO): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: userData,
    })
  }

  async delete(id: string): Promise<User> {
    return await this.prisma.user.delete({
      where: { id },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    })
  }
}
