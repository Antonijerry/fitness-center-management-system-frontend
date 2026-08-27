import type {
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

import { apiClient } from "@/api/client";

import {
  toApiError,
} from "@/api/error-handler";

import {
  unwrapApiResponse,
} from "@/api/response";

import type {
  ApiResponse,
} from "@/types/api";

export async function apiRequest<T>(
  config: AxiosRequestConfig,
): Promise<T> {
  try {
    const response:
      AxiosResponse<ApiResponse<T>> =
      await apiClient.request<
        ApiResponse<T>
      >(config);

    return unwrapApiResponse(
      response.data,
    );
  } catch (error) {
    throw toApiError(error);
  }
}