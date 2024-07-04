// src/types/pagination.types.ts

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  limit: number
}
