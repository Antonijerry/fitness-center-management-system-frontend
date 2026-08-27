export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp?: string;
}

export interface ApiErrorResponse {
  success?: boolean;
  message?: string;
  error?: string;
  code?: string;
  timestamp?: string;
  path?: string;
  status?: number;
  errors?: Record<string, string>;
}

export interface ApiPage<T> {
  content: T[];

  pageable?: {
    pageNumber: number;
    pageSize: number;
    sort?: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset?: number;
    paged?: boolean;
    unpaged?: boolean;
  };

  totalElements: number;
  totalPages: number;

  last: boolean;
  size: number;
  number: number;

  sort?: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };

  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface PageMetadata {
  page: number;

  size: number;

  totalElements: number;

  totalPages: number;

  first: boolean;

  last: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];

  page: PageMetadata;
}