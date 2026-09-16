import { apiRequest } from "@/api/request";

import type {
  CreateMembershipRequest,
  Membership,
} from "@/features/memberships/types/membership-types";

export function getMemberships(): Promise<Membership[]> {
  return apiRequest<Membership[]>({
    method: "GET",
    url: "/memberships",
  });
}

export function getMembership(id: number): Promise<Membership> {
  return apiRequest<Membership>({
    method: "GET",
    url: `/memberships/${id}`,
  });
}

export function getMembershipsByUserId(
  userId: number,
): Promise<Membership[]> {
  return apiRequest<Membership[]>({
    method: "GET",
    url: `/memberships/user/${userId}`,
  });
}

export function createMembership(
  request: CreateMembershipRequest,
): Promise<Membership> {
  return apiRequest<Membership>({
    method: "POST",
    url: "/memberships",
    data: request,
  });
}

export function activateMembership(
  id: number,
): Promise<Membership> {
  return apiRequest<Membership>({
    method: "PATCH",
    url: `/memberships/${id}/activate`,
  });
}

export function suspendMembership(
  id: number,
): Promise<Membership> {
  return apiRequest<Membership>({
    method: "PATCH",
    url: `/memberships/${id}/suspend`,
  });
}

export function cancelMembership(
  id: number,
): Promise<Membership> {
  return apiRequest<Membership>({
    method: "PATCH",
    url: `/memberships/${id}/cancel`,
  });
}

export const membershipApi = {
  getMemberships,
  getMembership,
  getMembershipsByUserId,
  createMembership,
  activateMembership,
  suspendMembership,
  cancelMembership,
};