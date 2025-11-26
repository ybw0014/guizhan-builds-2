import type { MiddlewareHandler } from 'hono'
import { cors } from 'hono/cors'

export const corsMiddleware = (): MiddlewareHandler => {
  return cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
    exposeHeaders: ['Content-Length', 'X-JSON-Response-Time'],
    maxAge: 600,
    credentials: false
  })
}
