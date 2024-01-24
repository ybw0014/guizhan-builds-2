import { StatusCode } from '~/types/api'
import { ApiError } from '~/api/ApiError'

export const RouteNotFound = new ApiError(
  404,
  StatusCode.NOT_FOUND,
  'Route not found.'
)

export const InternalError = new ApiError(
  500,
  StatusCode.INTERNAL_SERVER_ERROR,
  'An interal error has occurred while processing request.'
)

export const ProjectNotFound = new ApiError(
  1000,
  StatusCode.NOT_FOUND,
  'Project not found.'
)

export const BuildNotFound = new ApiError(
  2000,
  StatusCode.NOT_FOUND,
  'Build not found.'
)

export const BuildArtifactNotFound = new ApiError(
  2001,
  StatusCode.NOT_FOUND,
  'Build artifact not found.'
)
