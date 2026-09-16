import { useQuery } from "@tanstack/react-query";

import {
  membershipPlanApi,
} from "@/features/membership-plans/api/membership-plan-api";

import {
  membershipPlansQueryKeys,
} from "./use-membership-plans";

export function useMembershipPlan(
  id: number | undefined,
) {
  return useQuery({
    queryKey:
      id !== undefined
        ? membershipPlansQueryKeys.detail(id)
        : [
            "membership-plans",
            "detail",
            "disabled",
          ],

    queryFn: () =>
      membershipPlanApi.getMembershipPlan(
        id as number,
      ),

    enabled:
      id !== undefined,
  });
}