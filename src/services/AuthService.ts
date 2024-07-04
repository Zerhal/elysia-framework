// src/services/AuthService.ts
import { UserService } from './UserService';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { PasswordHasher } from '@/utils/PasswordHasher';
import { AuthLoginDTO } from '@/interfaces/dto/AuthDTO';

export class AuthService {
  private userService: UserService = new UserService();
  constructor() {}

  async login(body : AuthLoginDTO): Promise<string | null> {
    const userResponse = await this.userService.getUserByEmail(body.email);
    if (!userResponse.data || Array.isArray(userResponse.data)) return null;

    const user = userResponse.data as User;
    if (!user.password) return null;

    const isPasswordValid = PasswordHasher.verifyPassword(user.password, body.password);
    if (!isPasswordValid) return null;

    return this.generateToken(user);
  }

  private generateToken(user: User): string {
    const secretKey = this.getJwtSecretKey();

    return jwt.sign(
      { userId: user.id, email: user.email },
      secretKey,
      { expiresIn: '1d' }
    );
  }

  verifyToken(token: string): { userId: string; email: string } | null {
    try {
      const secretKey = this.getJwtSecretKey();
      return jwt.verify(token, secretKey) as { userId: string; email: string };
    } catch (error) {
      return null;
    }
  }

  private getJwtSecretKey(): string {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) throw new Error('JWT secret key is not defined');
    return secretKey;
  }
}