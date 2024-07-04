// src/index.ts
import { Elysia } from 'elysia'
import { UserController } from './controllers/UserController'
import { swagger } from '@elysiajs/swagger'
import {
  lowLoggingMiddleware,
  detailedLoggingMiddleware,
} from './middlewares/loggingMiddleware'
import { AuthController } from './controllers/AuthController'
const app = new Elysia()

// Création du contrôleur avec ses dépendances
const userController = new UserController()
const authController = new AuthController();

// Ajout des routes du contrôleur à l'application principale
app
  .use(swagger())
  .use(lowLoggingMiddleware)
  .use(detailedLoggingMiddleware)
  .use(authController.getRoutes())
  .use(userController.getRoutes())

app.listen(3000)
console.log(
  `🦊 Aethora is running at ${app.server?.hostname}:${app.server?.port}`,
)
