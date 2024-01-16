import { responseSchema } from '~/schema/response'

/* eslint-disable max-len */
export const openApiErrorResponses = {
  400: {
    description:
      'The request is malformed.',
    content: {
      'application/json': {
        schema: responseSchema(400, 'Bad Request')
      }
    }
  },
  401: {
    description: 'This API endpoint requires authentication.',
    content: {
      'application/json': {
        schema: responseSchema(401, 'Unauthorized')
      }
    }
  },
  403: {
    description: 'You do not have permission to access this resource.',
    content: {
      'application/json': {
        schema: responseSchema(403, 'Forbidden')
      }
    }
  },
  404: {
    description: 'The API endpoint does not exist, or the resource requested does not exist.',
    content: {
      'application/json': {
        schema: responseSchema(404, 'Not Found')
      }
    }
  },
  429: {
    description: 'Too many requests',
    content: {
      'application/json': {
        schema: responseSchema(429, 'Too Many Requests')
      }
    }
  },
  500: {
    description: 'An unexpected error has occurred.',
    content: {
      'application/json': {
        schema: responseSchema(500, 'Internal Server Error')
      }
    }
  }
}
