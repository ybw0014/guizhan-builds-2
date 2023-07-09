export interface Response {
  code: number
  message: string
  data: any
}

export interface OrderValidationResponse extends Omit<Response, "data"> {
  data: {
    expired: boolean
    uuid: string | null
  }
}

export interface DownloadResponse extends Omit<Response, "data"> {
  data: string | null
}
