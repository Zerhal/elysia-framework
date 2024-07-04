import { GenericQuery } from '@/types/query.types'
import { UserCreateDTO, UserUpdateDTO } from './dto/UserDTO'
import { User } from '@prisma/client'
import { UserFilterFields, UserSortFields } from '@/types/user.types'
import { PaginatedResult } from '@/types/pagination.types'

export interface IUserRepository {
  findAll(
    query: GenericQuery<UserSortFields, UserFilterFields>,
  ): Promise<PaginatedResult<User>>
  create(userData: UserCreateDTO): Promise<User>
  findById(id: string): Promise<User | null>
  update(id: string, userData: UserUpdateDTO): Promise<User>
  delete(id: string): Promise<User>
  findByEmail(email: string): Promise<User | null>
  // Ajoutez d'autres méthodes selon vos besoins
}
