import axios from "axios";

import { API_CONFIG } from "@/config/api";

import {
    authStorage,
} from "@/lib/auth-storage";

import {
    authEvents,
} from "@/lib/auth-events";

import type {
    ApiResponse,
} from "@/types/api";

import type {
    AuthResponse,
} from "@/features/auth/types/auth-types";

let refreshPromise:
    Promise<AuthResponse> | null = null;

async function performRefresh(): Promise<AuthResponse> {
    const refreshToken =
        authStorage.getRefreshToken();

    if (!refreshToken) {
        throw new Error(
            "No refresh token is available.",
        );
    }

    const response =
        await axios.post<
            ApiResponse<AuthResponse>
        >(
            `${API_CONFIG.baseUrl}/auth/refresh`,
            {
                refreshToken,
            },
            {
                headers: {
                    "Content-Type":
                        "application/json",

                    Accept:
                        "application/json",
                },

                timeout:
                    API_CONFIG.timeout,
            },
        );

    const data =
        response.data;

    if (
        !data.success ||
        !data.data
    ) {
        throw new Error(
            data.message ||
            "Token refresh failed.",
        );
    }

    const authResponse =
        data.data;

    /*
     * Your backend rotates both tokens.
     *
     * Always replace the old token pair.
     */
    authStorage.setTokens(
        authResponse.accessToken,
        authResponse.refreshToken,
    );

    return authResponse;
}

export async function refreshAccessToken(): Promise<AuthResponse> {
    /*
     * If another request is already
     * refreshing, wait for that same
     * refresh operation.
     */
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise =
        performRefresh();

    try {
        return await refreshPromise;
    } catch (error) {
        /*
         * The refresh token is no longer
         * usable, so clear the local session.
         */
        authStorage.clear();

        authEvents.emitUnauthorized();

        throw error;
    } finally {
        refreshPromise = null;
    }
}