type Limit = { limit: number | null };
type OffsetLimit = Limit & { offset: number; page?: never };
type PageLimit = Limit & { page: number; offset?: never };

export type Pagination = PageLimit | OffsetLimit;
