import { apiRequest } from "@/api/request";

import type {
  CreateMembershipPlanRequest,
  MembershipPlan,
  UpdateMembershipPlanRequest,
} from "@/features/membership-plans/types/membership-plan-types";

export function getMembershipPlans(): Promise<MembershipPlan[]> {
  return apiRequest<MembershipPlan[]>({
    method: "GET",
    url: "/membership-plans",
  });
}

export function getMembershipPlan(
  id: number,
): Promise<MembershipPlan> {
  return apiRequest<MembershipPlan>({
    method: "GET",
    url: `/membership-plans/${id}`,
  });
}

export function getActiveMembershipPlans(): Promise<MembershipPlan[]> {
  return apiRequest<MembershipPlan[]>({
    method: "GET",
    url: "/membership-plans/active",
  });
}

export function createMembershipPlan(
  request: CreateMembershipPlanRequest,
): Promise<MembershipPlan> {
  return apiRequest<MembershipPlan>({
    method: "POST",
    url: "/membership-plans",
    data: request,
  });
}

export function updateMembershipPlan(
  id: number,
  request: UpdateMembershipPlanRequest,
): Promise<MembershipPlan> {
  return apiRequest<MembershipPlan>({
    method: "PUT",
    url: `/membership-plans/${id}`,
    data: request,
  });
}

export function deactivateMembershipPlan(
  id: number,
): Promise<void> {
  return apiRequest<void>({
    method: "DELETE",
    url: `/membership-plans/${id}`,
  });
}

export const membershipPlanApi = {
  getMembershipPlans,
  getMembershipPlan,
  getActiveMembershipPlans,
  createMembershipPlan,
  updateMembershipPlan,
  deactivateMembershipPlan,
};