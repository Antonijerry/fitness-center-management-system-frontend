import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  userApi,
} from "@/features/users/api/user-api";

import {
  usersQueryKeys,
} from "./use-users";

export function useDeleteUser() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      userApi.deleteUser(id),

    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey:
          usersQueryKeys.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey:
          usersQueryKeys.lists(),
      });
    },
  });
}