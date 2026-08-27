
import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    memberApi,
} from "@/features/members/api/member-api";

import type {
    MemberStatus,
} from "@/features/members/types/member-status";

import {
    membersQueryKeys,
} from "./use-members";

interface UpdateMemberStatusVariables {
    id: number;
    status: MemberStatus;
}

export function useUpdateMemberStatus() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            status,
        }: UpdateMemberStatusVariables) =>
            memberApi.updateMemberStatus(
                id,
                status,
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
