import { useQuery } from "@tanstack/react-query";

import { userApi } from "@/features/users/api/user-api";

import { usersQueryKeys } from "./use-users";

export function useUser(
  id: number | undefined,
) {
  return useQuery({
    queryKey:
      id !== undefined
        ? usersQueryKeys.detail(id)
        : ["users", "detail", "disabled"],

    queryFn: () =>
      userApi.getUser(id as number),

    enabled:
      id !== undefined,
  });
}