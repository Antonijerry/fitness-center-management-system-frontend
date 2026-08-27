import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  userApi,
} from "@/features/users/api/user-api";

import type {
  UpdateUserRequest,
} from "@/features/users/types/user-types";

import {
  usersQueryKeys,
} from "./use-users";

interface Variables {
  id: number;
  request: UpdateUserRequest;
}

export function useUpdateUser() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      request,
    }: Variables) =>
      userApi.updateUser(
        id,
        request,
      ),

    onSuccess: (user) => {
      queryClient.setQueryData(
        usersQueryKeys.detail(
          user.id,
        ),
        user,
      );

      queryClient.invalidateQueries({
        queryKey:
          usersQueryKeys.lists(),
      });
    },
  });
}