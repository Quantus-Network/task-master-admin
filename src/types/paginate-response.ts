import type { ApiResponse } from "@/types/api-response";

export interface PaginateResponse<T> extends ApiResponse<T> {
  meta: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}
