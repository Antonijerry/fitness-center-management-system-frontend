import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  userApi,
} from "@/features/users/api/user-api";

import type {
  AssignRoleRequest,
} from "@/features/users/types/user-types";

import {
  usersQueryKeys,
} from "./use-users";

interface RemoveRoleVariables {
  id: number;
  request: AssignRoleRequest;
}

export function useRemoveRole() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      request,
    }: RemoveRoleVariables) =>
      userApi.removeRole(
        id,
        request,
      ),

    onSuccess: (updatedUser) => {
      queryClient.setQueryData(
        usersQueryKeys.detail(
          updatedUser.id,
        ),
        updatedUser,
      );

      queryClient.invalidateQueries({
        queryKey:
          usersQueryKeys.lists(),
      });
    },
  });
}