import { useQuery } from "@tanstack/react-query";

import { membershipApi } from "@/features/memberships/api/membership-api";
import { membershipsQueryKeys } from "@/features/memberships/hooks/use-memberships";

export function useUserMemberships(
  userId: number | undefined,
) {
  return useQuery({
    queryKey:
      userId !== undefined
        ? membershipsQueryKeys.user(userId)
        : ["memberships", "user", "disabled"],

    queryFn: () =>
      membershipApi.getMembershipsByUserId(
        userId as number,
      ),

    enabled: userId !== undefined,
  });
}