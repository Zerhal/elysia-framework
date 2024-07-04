import { GenericQuery } from '@/types/query.types'
import { UserCreateDTO, UserUpdateDTO } from './dto/UserDTO'
import { UserFilterFields, UserSortFields } from '@/types/user.types'
import { AuthenticatedUser } from '@/middlewares/authMiddleware'
import { UserResponse } from '@/responses/UserResponse'

export interface IUserService {
  createUser(userData: UserCreateDTO): Promise<UserResponse>
  getUserById(id: string): Promise<UserResponse>
  updateUser(id: string, userData: UserUpdateDTO): Promise<UserResponse>
  deleteUser(id: string): Promise<UserResponse>
  getUserByEmail(email: string): Promise<UserResponse>
  getAllUsers(
    query: GenericQuery<UserSortFields, UserFilterFields>,
  ): Promise<UserResponse>
  getUserProfile(user: AuthenticatedUser): Promise<UserResponse>
  // Ajoutez d'autres méthodes métier selon vos besoins
}
