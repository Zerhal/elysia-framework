// src/controllers/UserController.ts
import { AuthLoginDTO } from '@/interfaces/dto/AuthDTO'
import { AController } from './AController'
import { AuthService  } from '@/services/AuthService'
import { authSchemas } from '@/schemas/auth.schemas'

export class AuthController  extends AController {
  private authService: AuthService  = new AuthService()
  constructor() {
    super()
  }

  protected initializeRoutes(): void {
    this.app.group('/auth', app =>
      app
        .post(
          '/login',
          ({ body }) => this.authService.login(body as AuthLoginDTO),
          {
            body: authSchemas.login.body,
            detail: {
              summary: 'Create a new user',
              tags: ['Auth'],
            },
          },
        )
    )
  }
}
