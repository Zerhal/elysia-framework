// src/middlewares/loggingMiddleware.ts
import { Elysia } from 'elysia'
import { lowLogger, detailedLogger } from '../config/logger'

export const lowLoggingMiddleware = (app: Elysia) =>
  app.onResponse(ctx => {
    const { request } = ctx
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('host') ||
      'unknown'
    const status = ctx.set.status
    const message = `${ip} - "${request.method} ${request.url}" ${status}`
    lowLogger.info(message)
  })

export const detailedLoggingMiddleware = (app: Elysia) =>
  app.onResponse(ctx => {
    const { request, body, query, params } = ctx
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('host') ||
      'unknown'
    const status = ctx.set.status
    const logObject = {
      ip,
      method: request.method,
      url: request.url,
      status,
      params,
      query,
      body,
      response: ctx.body,
    }
    detailedLogger.debug(JSON.stringify(logObject, null, 2))
  })
