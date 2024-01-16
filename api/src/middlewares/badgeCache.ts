import { MiddlewareHandler } from 'hono'
import { Ctx } from '~/types/hono'

export const badgeCache = (options: {
  cacheControl: string
}): MiddlewareHandler => {
  return async function cache(ctx: Ctx, next) {
    const key = ctx.req.url
    const cache = await caches.open('badge')
    const response = await cache.match(key)
    if (!response) {
      await next()
      if (!ctx.res.ok) {
        return
      }
      ctx.res.headers.set('Cache-Control', options.cacheControl)
      const response = ctx.res.clone()
      await cache.put(key, response)
    } else {
      return new Response(response.body, response)
    }
  }
}
