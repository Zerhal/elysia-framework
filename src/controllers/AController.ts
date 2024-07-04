import { Elysia } from 'elysia'
import { IController } from '@/interfaces/IController'

export abstract class AController implements IController {
  protected app: Elysia

  constructor() {
    this.app = new Elysia()
    this.initializeRoutes()
  }

  // Méthode abstraite que chaque contrôleur enfant doit implémenter
  protected abstract initializeRoutes(): void

  // Getter pour obtenir les routes du contrôleur
  public getRoutes(): Elysia {
    return this.app
  }
}
