export interface SubResponse {
  code: number
  message: string
  data: any
}

export interface OrderValidationResponse extends Omit<SubResponse, "data"> {
  data: {
    expired: boolean
    uuid: string | null
  }
}

export interface DownloadResponse extends Omit<SubResponse, "data"> {
  data: string | null
}

export interface LastUpdateResponse extends Omit<SubResponse, "data"> {
  data: number
}
