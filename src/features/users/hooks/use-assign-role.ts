import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { userApi } from "@/features/users/api/user-api";
import type {
  AssignRoleRequest,
} from "@/features/users/types/user-types";

import { usersQueryKeys } from "./use-users";

interface AssignRoleVariables {
  id: number;
  request: AssignRoleRequest;
}

export function useAssignRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      request,
    }: AssignRoleVariables) =>
      userApi.assignRole(id, request),

    onSuccess: async (updatedUser) => {
      /*
       * Immediately update the individual user cache.
       */
      queryClient.setQueryData(
        usersQueryKeys.detail(updatedUser.id),
        updatedUser,
      );

      /*
       * Refresh the individual user from the backend.
       * This guarantees the UI reflects the actual
       * persisted database state.
       */
      await queryClient.invalidateQueries({
        queryKey: usersQueryKeys.detail(
          updatedUser.id,
        ),
      });

      /*
       * Refresh the users list as well.
       */
      await queryClient.invalidateQueries({
        queryKey: usersQueryKeys.lists(),
      });
    },
  });
}