import { z } from 'zod'
import { createRoute } from '@hono/zod-openapi'
import { openApiErrorResponses } from '~/schema/errors/openApiErrors'
import { responseSuccessSchema } from '~/schema/response'
import { ProjectSchema as ProjectRequestSchema } from '~/schema/request'
import { ProjectInListSchema, ProjectSchema } from '~/schema/projects'

export const projectsRoute = createRoute({
  method: 'get',
  path: '/projects',
  description: 'Get the list of all projects available on Guizhan Builds',
  responses: {
    200: {
      description: 'Get all the projects',
      content: {
        'application/json': {
          schema: responseSuccessSchema(
            z.array(ProjectInListSchema)
          )
        }
      }
    },
    ...openApiErrorResponses
  }
})

export const projectRoute = createRoute({
  method: 'get',
  path: '/project/{author}/{repository}/{branch}',
  description: 'Get the specific information of the project',
  request: {
    params: ProjectRequestSchema
  },
  responses: {
    200: {
      description: 'Get the information of the project',
      content: {
        'application/json': {
          schema: responseSuccessSchema(
            ProjectSchema
          )
        }
      }
    },
    ...openApiErrorResponses
  }
})
