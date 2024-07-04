export interface IJsonResponse<T> {
  status: number
  data?: T
  error?: string
}
