import {
  ApiError,
} from "@/api/api-error";

import type {
  ApiResponse,
} from "@/types/api";

export function unwrapApiResponse<T>(
  response: ApiResponse<T>,
): T {
  if (!response.success) {
    throw new ApiError(
      response.message ||
        "The request was not successful.",
    );
  }

  return response.data;
}