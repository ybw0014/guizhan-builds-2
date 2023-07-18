export interface SubResponse {
  code: number;
  message: string;
  data: any;
}

export interface OrderValidationData {
  expire_time: number;
  expired: boolean;
  uuid: string | null;
}

export interface OrderValidationResponse extends Omit<SubResponse, "data"> {
  data: OrderValidationData;
}

export interface DownloadResponse extends Omit<SubResponse, "data"> {
  data: string | null;
}

export interface LastUpdateResponse extends Omit<SubResponse, "data"> {
  data: number;
}
