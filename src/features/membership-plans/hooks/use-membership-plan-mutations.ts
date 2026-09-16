import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  membershipPlanApi,
} from "@/features/membership-plans/api/membership-plan-api";

import {
  membershipPlansQueryKeys,
} from "./use-membership-plans";

import type {
  CreateMembershipPlanRequest,
  UpdateMembershipPlanRequest,
} from "@/features/membership-plans/types/membership-plan-types";

export function useCreateMembershipPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      request: CreateMembershipPlanRequest,
    ) =>
      membershipPlanApi.createMembershipPlan(
        request,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          membershipPlansQueryKeys.lists(),
      });
    },
  });
}


interface Variables {
  id: number;
  request: UpdateMembershipPlanRequest;
}

export function useUpdateMembershipPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      request,
    }: Variables) =>
      membershipPlanApi.updateMembershipPlan(
        id,
        request,
      ),

    onSuccess: (plan) => {
      queryClient.setQueryData(
        membershipPlansQueryKeys.detail(
          plan.id,
        ),
        plan,
      );

      queryClient.invalidateQueries({
        queryKey:
          membershipPlansQueryKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey:
          membershipPlansQueryKeys.active(),
      });
    },
  });
}

export function useDeactivateMembershipPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      membershipPlanApi.deactivateMembershipPlan(
        id,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          membershipPlansQueryKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey:
          membershipPlansQueryKeys.active(),
      });
    },
  });
}