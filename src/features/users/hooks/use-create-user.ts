import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { userApi } from "@/features/users/api/user-api";

import type {
  CreateUserRequest,
} from "@/features/users/types/user-types";

import {
  usersQueryKeys,
} from "./use-users";

export function useCreateUser() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      request: CreateUserRequest,
    ) =>
      userApi.createUser(request),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          usersQueryKeys.lists(),
      });
    },
  });
}