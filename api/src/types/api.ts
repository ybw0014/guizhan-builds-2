export interface ApiResponse {
	status: number
	message: string
	data?: any
}

export interface ApiResponseTyped<T> extends Omit<ApiResponse, 'data'> {
	data?: T
}
