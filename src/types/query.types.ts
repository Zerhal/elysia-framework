import { t } from 'elysia'

export type SortOrder = 'asc' | 'desc'

export type PaginationQuery = {
  page?: number
  limit?: number
}

export type SortQuery<T extends string> = {
  sortBy?: T
  order?: SortOrder
}

export type FilterQuery<T> = {
  [K in keyof T]?: T[K]
}

export type GenericQuery<T extends string, F> = PaginationQuery &
  SortQuery<T> &
  FilterQuery<F>

// Elysia schema for generic query
export const genericQuerySchema = <T extends string, F>(
  sortFields: T[],
  filterFields: (keyof F)[],
) =>
  t.Object({
    page: t.Optional(t.Numeric()),
    limit: t.Optional(t.Numeric()),
    sortBy: t.Optional(t.Union(sortFields.map(field => t.Literal(field)))),
    order: t.Optional(t.Union([t.Literal('asc'), t.Literal('desc')])),
    ...Object.fromEntries(
      filterFields.map(field => [field, t.Optional(t.Any())]),
    ),
  })
