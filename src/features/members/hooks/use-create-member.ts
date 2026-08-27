
import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    memberApi,
} from "@/features/members/api/member-api";

import type {
    CreateMemberRequest,
} from "@/features/members/types/member-types";

import {
    membersQueryKeys,
} from "./use-members";

export function useCreateMember() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: (
            request: CreateMemberRequest,
        ) =>
            memberApi.createMember(
                request,
            ),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:
                    membersQueryKeys.lists(),
            });
        },
    });
}
