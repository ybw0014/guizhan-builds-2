import { z } from 'zod'
import { createRoute } from '@hono/zod-openapi'
import { openApiErrorResponses } from '~/schema/errors/openApiErrors'
import { responseSuccessSchema } from '~/schema/response'
import { ProjectSchema as ProjectRequestSchema, BuildSchema as BuildRequestSchema } from '~/schema/request'
import { BuildSchema } from '~/schema/builds'

export const buildsRoute = createRoute({
  method: 'get',
  path: '/builds/{author}/{repository}/{branch}',
  description: 'Get the list of all the builds of the project',
  request: {
    params: ProjectRequestSchema
  },
  responses: {
    200: {
      description: 'Get all the builds',
      content: {
        'application/json': {
          schema: responseSuccessSchema(z.array(
            BuildSchema
          ))
        }
      }
    },
    ...openApiErrorResponses
  }
})

export const buildRoute = createRoute({
  method: 'get',
  path: '/build/{author}/{repository}/{branch}/{build}',
  description: 'Get the information of the build of the project',
  request: {
    params: BuildRequestSchema
  },
  responses: {
    200: {
      description: 'Get the information of the build',
      content: {
        'application/json': {
          schema: responseSuccessSchema(
            BuildSchema
          )
        }
      }
    },
    ...openApiErrorResponses
  }
})

