// src/middlewares/authMiddleware.ts
import { Elysia } from "elysia";
import { AuthService } from '../services/AuthService';
import { UserService } from '../services/UserService';

export type AuthenticatedUser = { id: string } | null


export const createAuthMiddleware = (authService: AuthService, userService: UserService) => {
  return new Elysia().derive(async ({ headers, set }) => {
    const authHeader = headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      set.status = 401;
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }

    const token = authHeader.split(' ')[1];
    const payload = authService.verifyToken(token);
    if (!payload) {
      set.status = 401;
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }

    const user = await userService.getUserById(payload.userId);
    if (!user) {
      set.status = 401;
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }

    return {
      user,
    };
  });
};