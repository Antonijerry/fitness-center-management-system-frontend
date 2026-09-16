import { useQuery } from "@tanstack/react-query";

import { membershipApi } from "@/features/memberships/api/membership-api";

export const membershipsQueryKeys = {
  all: ["memberships"] as const,

  lists: () =>
    [...membershipsQueryKeys.all, "list"] as const,

  list: () =>
    [...membershipsQueryKeys.lists()] as const,

  details: () =>
    [...membershipsQueryKeys.all, "detail"] as const,

  detail: (id: number) =>
    [...membershipsQueryKeys.details(), id] as const,

  users: () =>
    [...membershipsQueryKeys.all, "user"] as const,

  user: (userId: number) =>
    [...membershipsQueryKeys.users(), userId] as const,
};

export function useMemberships() {
  return useQuery({
    queryKey: membershipsQueryKeys.list(),
    queryFn: membershipApi.getMemberships,
  });
}