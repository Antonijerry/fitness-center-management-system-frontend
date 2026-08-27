import axios from "axios";

import type { ApiErrorResponse } from "@/types/api";

export class ApiError extends Error {
  status?: number;
  code?: string;
  errors?: Record<string, string>;

  constructor(
    message: string,
    options?: {
      status?: number;
      code?: string;
      errors?: Record<string, string>;
    },
  ) {
    super(message);

    this.name = "ApiError";

    this.status = options?.status;
    this.code = options?.code;
    this.errors = options?.errors;
  }
}

export function normalizeApiError(
  error: unknown,
): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const response = error.response;

    if (response?.data) {
      return new ApiError(
        response.data.message ??
        response.data.error ??
        "An unexpected error occurred.",
        {
          status:
            response.status ??
            response.data.status,

          code: response.data.code,

          errors: response.data.errors,
        },
      );
    }

    if (error.code === "ECONNABORTED") {
      return new ApiError(
        "The request timed out. Please try again.",
      );
    }

    if (!error.response) {
      return new ApiError(
        "Unable to connect to the server. Please check your connection.",
      );
    }
  }

  if (error instanceof Error) {
    return new ApiError(error.message);
  }

  return new ApiError(
    "An unexpected error occurred.",
  );
}