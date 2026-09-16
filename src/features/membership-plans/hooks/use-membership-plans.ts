import { useQuery } from "@tanstack/react-query";

import {
  membershipPlanApi,
} from "@/features/membership-plans/api/membership-plan-api";

export const membershipPlansQueryKeys = {
  all: ["membership-plans"] as const,

  lists: () =>
    [...membershipPlansQueryKeys.all, "list"] as const,

  list: () =>
    [...membershipPlansQueryKeys.lists()] as const,

  active: () =>
    [...membershipPlansQueryKeys.all, "active"] as const,

  details: () =>
    [...membershipPlansQueryKeys.all, "detail"] as const,

  detail: (id: number) =>
    [...membershipPlansQueryKeys.details(), id] as const,
};

export function useMembershipPlans() {
  return useQuery({
    queryKey: membershipPlansQueryKeys.list(),
    queryFn: membershipPlanApi.getMembershipPlans,
  });
}