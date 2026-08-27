import axios from "axios";

import type {
    ApiErrorResponse,
} from "@/types/api";

export class ApiError extends Error {
    readonly status?: number;

    readonly code?: string;

    readonly fieldErrors: Record<
        string,
        string
    >;

    constructor(
        message: string,
        options?: {
            status?: number;
            code?: string;
            fieldErrors?: Record<
                string,
                string
            >;
        },
    ) {
        super(message);

        this.name = "ApiError";

        this.status =
            options?.status;

        this.code =
            options?.code;

        this.fieldErrors =
            options?.fieldErrors ?? {};

        Object.setPrototypeOf(
            this,
            ApiError.prototype,
        );
    }
}

export function getApiErrorMessage(
    error: unknown,
): string {
    if (error instanceof ApiError) {
        return error.message;
    }

    if (
        axios.isAxiosError(error)
    ) {
        const data =
            error.response?.data as
            | ApiErrorResponse
            | undefined;

        if (data?.message) {
            return data.message;
        }

        if (data?.error) {
            return data.error;
        }

        if (error.response?.status === 401) {
            return "Your session has expired. Please sign in again.";
        }

        if (error.response?.status === 403) {
            return "You do not have permission to perform this action.";
        }

        if (error.response?.status === 404) {
            return "The requested resource was not found.";
        }

        if (
            error.response?.status === 409
        ) {
            return "This operation conflicts with existing data.";
        }

        if (
            error.response?.status &&
            error.response.status >= 500
        ) {
            return "A server error occurred. Please try again later.";
        }

        return "Unable to complete the request.";
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "An unexpected error occurred.";
}