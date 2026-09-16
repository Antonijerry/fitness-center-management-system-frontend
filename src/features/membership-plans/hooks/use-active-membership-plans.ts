import { useQuery } from "@tanstack/react-query";

import {
  membershipPlanApi,
} from "@/features/membership-plans/api/membership-plan-api";

import {
  membershipPlansQueryKeys,
} from "./use-membership-plans";

export function useActiveMembershipPlans() {
  return useQuery({
    queryKey:
      membershipPlansQueryKeys.active(),

    queryFn:
      membershipPlanApi
        .getActiveMembershipPlans,
  });
}