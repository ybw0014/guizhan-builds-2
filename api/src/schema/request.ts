import { z } from '@hono/zod-openapi'

const rawProject = {
  author: z.string().openapi({
    param: {
      name: 'author',
      in: 'path',
      required: true
    },
    description: 'The author of the project',
    example: 'SlimefunGuguProject'
  }),
  repository: z.string().openapi({
    param: {
      name: 'repository',
      in: 'path',
      required: true
    },
    description: 'The repository of the project',
    example: 'Bump'
  }),
  branch: z.string().openapi({
    param: {
      name: 'branch',
      in: 'path',
      required: true
    },
    description: 'The branch of the project',
    example: 'main'
  })
}

const rawBuild = {
  ...rawProject,
  build: z.string().openapi({
    param: {
      name: 'build',
      in: 'path',
      required: true
    },
    description: 'The build number of the project, or "latest" for the latest build'
  })
}

export const ProjectSchema = z.object(rawProject)
export const BuildSchema = z.object(rawBuild)
