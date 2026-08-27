import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import { API_CONFIG } from "@/config/api";

import {
  authStorage,
} from "@/lib/auth-storage";

import {
  refreshAccessToken,
} from "@/api/token-refresh";

interface RetryableRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const apiClient =
  axios.create({
    baseURL:
      API_CONFIG.baseUrl,

    timeout:
      API_CONFIG.timeout,

    headers: {
      "Content-Type":
        "application/json",

      Accept:
        "application/json",
    },
  });

/*
 * Attach the current access token
 * to every outgoing request.
 */
apiClient.interceptors.request.use(
  (config) => {
    const accessToken =
      authStorage.getAccessToken();

    if (accessToken) {
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error),
);

/*
 * Handle expired access tokens.
 */
apiClient.interceptors.response.use(
  (response) => response,

  async (
    error: AxiosError,
  ) => {
    const originalRequest =
      error.config as
        | RetryableRequestConfig
        | undefined;

    /*
     * Only attempt refresh for 401 responses.
     */
    if (
      error.response?.status !== 401 ||
      !originalRequest
    ) {
      return Promise.reject(
        error,
      );
    }

    /*
     * Never retry the same request twice.
     */
    if (originalRequest._retry) {
      return Promise.reject(
        error,
      );
    }

    /*
     * Do not try to refresh the refresh
     * endpoint itself.
     */
    if (
      originalRequest.url?.includes(
        "/auth/refresh",
      )
    ) {
      return Promise.reject(
        error,
      );
    }

    originalRequest._retry =
      true;

    try {
      const authResponse =
        await refreshAccessToken();

      /*
       * Put the new access token
       * on the original request.
       */
      originalRequest.headers.Authorization =
        `Bearer ${authResponse.accessToken}`;

      /*
       * Retry the original request.
       */
      return apiClient(
        originalRequest,
      );
    } catch {
      return Promise.reject(
        error,
      );
    }
  },
);