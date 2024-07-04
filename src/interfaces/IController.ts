import { Elysia } from 'elysia'

export interface IController {
  getRoutes(): Elysia
}
