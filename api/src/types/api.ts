export interface ApiResponse<T = unknown> {
	code: number
	message: string
	data?: T
}

export enum StatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}
