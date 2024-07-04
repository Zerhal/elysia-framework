// src/interfaces/dto/UserDTO.ts

export interface UserCreateDTO {
  email: string
  password: string
  name: string
  // Ajoutez d'autres champs nécessaires pour la création d'un utilisateur
}

export interface UserUpdateDTO {
  email?: string
  username?: string
  // Ajoutez d'autres champs qui peuvent être mis à jour
}
