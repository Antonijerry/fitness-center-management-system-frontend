import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { membershipApi } from "@/features/memberships/api/membership-api";

import type {
  CreateMembershipRequest,
} from "@/features/memberships/types/membership-types";

import {
  membershipsQueryKeys,
} from "@/features/memberships/hooks/use-memberships";

export function useCreateMembership() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      request: CreateMembershipRequest,
    ) => membershipApi.createMembership(request),

    onSuccess: (membership) => {
      queryClient.setQueryData(
        membershipsQueryKeys.detail(membership.id),
        membership,
      );

      queryClient.invalidateQueries({
        queryKey: membershipsQueryKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: membershipsQueryKeys.user(
          membership.userId,
        ),
      });
    },
  });
}

export function useActivateMembership() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      membershipApi.activateMembership(id),

    onSuccess: (membership) => {
      queryClient.setQueryData(
        membershipsQueryKeys.detail(membership.id),
        membership,
      );

      queryClient.invalidateQueries({
        queryKey: membershipsQueryKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: membershipsQueryKeys.user(
          membership.userId,
        ),
      });
    },
  });
}

export function useSuspendMembership() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      membershipApi.suspendMembership(id),

    onSuccess: (membership) => {
      queryClient.setQueryData(
        membershipsQueryKeys.detail(membership.id),
        membership,
      );

      queryClient.invalidateQueries({
        queryKey: membershipsQueryKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: membershipsQueryKeys.user(
          membership.userId,
        ),
      });
    },
  });
}

export function useCancelMembership() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      membershipApi.cancelMembership(id),

    onSuccess: (membership) => {
      queryClient.setQueryData(
        membershipsQueryKeys.detail(membership.id),
        membership,
      );

      queryClient.invalidateQueries({
        queryKey: membershipsQueryKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: membershipsQueryKeys.user(
          membership.userId,
        ),
      });
    },
  });
}