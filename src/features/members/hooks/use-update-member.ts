
import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    memberApi,
} from "@/features/members/api/member-api";

import type {
    UpdateMemberRequest,
} from "@/features/members/types/member-types";

import {
    membersQueryKeys,
} from "./use-members";

interface UpdateMemberVariables {
    id: number;
    request: UpdateMemberRequest;
}

export function useUpdateMember() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            request,
        }: UpdateMemberVariables) =>
            memberApi.updateMember(
                id,
                request,
            ),

        onSuccess: (
            member,
        ) => {
            queryClient.setQueryData(
                membersQueryKeys.detail(
                    member.id,
                ),
                member,
            );

            queryClient.invalidateQueries({
                queryKey:
                    membersQueryKeys.lists(),
            });
        },
    });
}
