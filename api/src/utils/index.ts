import type { Ctx } from '~/types/hono'

export function parseNumber(str: string | undefined, defaultVal: number, min = 1, max = Math.max()) {
  if (str === null || str === undefined) return defaultVal
  let num = parseInt(str)
  if (Number.isNaN(num)) return defaultVal
  if (num < min) num = min
  if (num > max) num = max
  return num
}

export function paginate<T>(items: T[], ctx: Ctx, defaultPerPage = 30): T[] {
  const perPage = parseNumber(ctx.req.query('per_page'), defaultPerPage, 1, 100)
  const page = parseNumber(ctx.req.query('page'), 1)
  const startIndex = (page - 1) * perPage
  return items.slice(startIndex, startIndex + perPage)
}
