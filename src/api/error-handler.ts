import axios from "axios";

import {
    ApiError,
} from "@/api/api-error";

import type {
    ApiErrorResponse,
} from "@/types/api";

export function toApiError(
    error: unknown,
): ApiError {
    if (error instanceof ApiError) {
        return error;
    }

    if (
        axios.isAxiosError(error)
    ) {
        const data =
            error.response?.data as
            | ApiErrorResponse
            | undefined;

        return new ApiError(
            data?.message ??
            data?.error ??
            "Unable to complete the request.",
            {
                status:
                    data?.status ??
                    error.response?.status,

                code:
                    data?.code,

                fieldErrors:
                    data?.errors,
            },
        );
    }

    if (error instanceof Error) {
        return new ApiError(
            error.message,
        );
    }

    return new ApiError(
        "An unexpected error occurred.",
    );
}