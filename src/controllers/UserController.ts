// src/controllers/UserController.ts
import { JWTMiddleware } from '@/middlewares/JwtMiddleware';
import { AController } from './AController';
import { userSchemas } from '@/schemas/user.schemas';
import { UserService } from '@/services/UserService';
import { CreateUserDTO, UpdateUserDTO, UserFilterFields, UserSortFields } from '@/types/user.types';
import { GenericQuery } from '@/types/query.types'
import { AuthService } from '@/services/AuthService';
import { AuthenticatedUser } from '@/middlewares/authMiddleware';

export class UserController extends AController {
  /** eslint-disable */
  private jwtMiddleware;
  private userService: UserService;
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
    this.userService = new UserService();
    this.jwtMiddleware = JWTMiddleware
  }
  protected initializeRoutes(): void {
    this.app.group('/users', app =>
      app
        .use(this.jwtMiddleware(app))
        .get('/', ({ query } : { query:  GenericQuery<UserSortFields, UserFilterFields> }) => this.userService.getAllUsers(query), {
          query: userSchemas.getAllUsers.query,
          detail: {
            summary: 'Get all users',
            tags: ['Users'],
            description:
              'Retrieve a list of users. You can paginate, sort, and filter the results.',
          },
        })
        .post(
          '/',
          ({ body }) => this.userService.createUser(body as CreateUserDTO),
          {
            body: userSchemas.createUser.body,
            detail: {
              summary: 'Create a new user',
              tags: ['Users'],
            },
          },
        )
        .get('/:id', ({ params: { id } }) => this.userService.getUserById(id), {
          params: userSchemas.getUserById.params,
          detail: {
            summary: 'Get a user by ID',
            tags: ['Users'],
          },
        })
        .patch(
          '/:id',
          ({ params: { id }, body }) =>
            this.userService.updateUser(id, body as UpdateUserDTO),
          {
            params: userSchemas.updateUser.params,
            body: userSchemas.updateUser.body,
            detail: {
              summary: 'Update a user',
              tags: ['Users'],
            },
          },
        )
        .get(
          '/profile',
          ({ body }) =>
            this.userService.getUserProfile(body as AuthenticatedUser),
          {
            detail: {
              summary: 'Get user profile',
              tags: ['Users'],
              security: [{ bearerAuth: [] }],
            },
          },
        ),
    )
  }
}
