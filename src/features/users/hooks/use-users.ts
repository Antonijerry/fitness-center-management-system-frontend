import {
  useQuery,
} from "@tanstack/react-query";

import {
  userApi,
} from "@/features/users/api/user-api";

import type {
  GetUsersParams,
} from "@/features/users/types/user-types";

export const usersQueryKeys = {
  all: ["users"] as const,

  lists: () =>
    [...usersQueryKeys.all, "list"] as const,

  list: (
    params?: GetUsersParams,
  ) =>
    [
      ...usersQueryKeys.lists(),
      params,
    ] as const,

  details: () =>
    [...usersQueryKeys.all, "detail"] as const,

  detail: (
    id: number,
  ) =>
    [
      ...usersQueryKeys.details(),
      id,
    ] as const,
};

export function useUsers(
  params?: GetUsersParams,
) {
  return useQuery({
    queryKey:
      usersQueryKeys.list(params),

    queryFn: () =>
      userApi.getUsers(params),

    placeholderData:
      (previousData) =>
        previousData,
  });
}