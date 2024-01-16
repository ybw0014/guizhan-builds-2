import { z } from 'zod'
import { createRoute } from '@hono/zod-openapi'
import { openApiErrorResponses } from '~/schema/errors/openApiErrors'
import { responseSuccessSchema } from '~/schema/response'

export const mcVersionsRoute = createRoute({
  method: 'get',
  path: '/mc-versions',
  description: 'Get the list of minecraft release versions above 1.16.5 (inclusive).',
  responses: {
    200: {
      description: 'Get the version list',
      content: {
        'application/json': {
          schema: responseSuccessSchema(
            z.array(z.string().openapi({
              description: 'The minecraft release version',
              example: '1.16.5'
            }))
          )
        }
      }
    },
    ...openApiErrorResponses
  }
})
