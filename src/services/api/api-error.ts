export interface ApiErrorResponse {
  success?: boolean;
  message?: string;
  error?: string;
  status?: number;
  timestamp?: string;
  path?: string;
}

export class ApiError extends Error {
  readonly status?: number;
  readonly response?: ApiErrorResponse;

  constructor(
    message: string,
    status?: number,
    response?: ApiErrorResponse,
  ) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.response = response;
  }
}