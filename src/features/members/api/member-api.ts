import { apiRequest } from "@/api/request";

import type {
  CreateMemberRequest,
  MemberProfile,
  UpdateMemberRequest,
} from "@/features/members/types/member-types";

import type {
  MemberStatus,
} from "@/features/members/types/member-status";

export function getMembers(): Promise<MemberProfile[]> {
  return apiRequest<MemberProfile[]>({
    method: "GET",
    url: "/members",
  });
}

export function getMember(
  id: number,
): Promise<MemberProfile> {
  return apiRequest<MemberProfile>({
    method: "GET",
    url: `/members/${id}`,
  });
}

export function getMemberByUserId(
  userId: number,
): Promise<MemberProfile> {
  return apiRequest<MemberProfile>({
    method: "GET",
    url: `/members/user/${userId}`,
  });
}

export function getMemberByNumber(
  memberNumber: string,
): Promise<MemberProfile> {
  return apiRequest<MemberProfile>({
    method: "GET",
    url: `/members/number/${memberNumber}`,
  });
}

export function getMembersByStatus(
  status: MemberStatus,
): Promise<MemberProfile[]> {
  return apiRequest<MemberProfile[]>({
    method: "GET",
    url: `/members/status/${status}`,
  });
}

export function searchMembers(
  query: string,
): Promise<MemberProfile[]> {
  return apiRequest<MemberProfile[]>({
    method: "GET",
    url: "/members/search",
    params: {
      query,
    },
  });
}

export function createMember(
  request: CreateMemberRequest,
): Promise<MemberProfile> {
  return apiRequest<MemberProfile>({
    method: "POST",
    url: "/members",
    data: request,
  });
}

export function updateMember(
  id: number,
  request: UpdateMemberRequest,
): Promise<MemberProfile> {
  return apiRequest<MemberProfile>({
    method: "PUT",
    url: `/members/${id}`,
    data: request,
  });
}

export function updateMemberStatus(
  id: number,
  status: MemberStatus,
): Promise<MemberProfile> {
  return apiRequest<MemberProfile>({
    method: "PATCH",
    url: `/members/${id}/status`,
    params: {
      status,
    },
  });
}

export const memberApi = {
  getMembers,
  getMember,
  getMemberByUserId,
  getMemberByNumber,
  getMembersByStatus,
  searchMembers,
  createMember,
  updateMember,
  updateMemberStatus,
};