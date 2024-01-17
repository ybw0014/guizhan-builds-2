import { z } from '@hono/zod-openapi'

export const ProjectInListSchema = z.object({
  author: z.string().openapi({
    description: 'The author of the project',
    example: 'SlimefunGuguProject'
  }),
  repository: z.string().openapi({
    description: 'The repository of the project',
    example: 'Bump'
  }),
  branch: z.string().openapi({
    description: 'The branch of the project',
    example: 'main'
  })
})

export const ProjectSchema = z.object({
  key: z.string().openapi({
    description: 'The key of the project'
  }),
  author: z.string().openapi({
    description: 'The author of the project',
    example: 'SlimefunGuguProject'
  }),
  repository: z.string().openapi({
    description: 'The repository of the project',
    example: 'Bump'
  }),
  branch: z.string().openapi({
    description: 'The branch of the project',
    example: 'main'
  })
})
