import { useQuery } from "@tanstack/react-query";

import { membershipApi } from "@/features/memberships/api/membership-api";
import { membershipsQueryKeys } from "@/features/memberships/hooks/use-memberships";

export function useMembership(
  id: number | undefined,
) {
  return useQuery({
    queryKey:
      id !== undefined
        ? membershipsQueryKeys.detail(id)
        : ["memberships", "detail", "disabled"],

    queryFn: () =>
      membershipApi.getMembership(id as number),

    enabled: id !== undefined,
  });
}