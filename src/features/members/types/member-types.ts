import type { MemberStatus } from "@/features/members/types/member-status";

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship?: string | null;
}

export interface MemberProfile {
  id: number;
  userId: number;
  memberNumber: string;

  firstName: string;
  lastName: string;
  email: string;

  phone: string;
  gender?: string | null;
  dateOfBirth?: string | null;
  address?: string | null;

  emergencyContact?: EmergencyContact | null;

  fitnessGoals?: string | null;
  fitnessNotes?: string | null;

  status: MemberStatus;
}

export interface CreateMemberRequest {
  userId: number;
  phone: string;
  gender?: string | null;
  dateOfBirth?: string | null;
  address?: string | null;
  emergencyContact?: EmergencyContact | null;
  fitnessGoals?: string | null;
  fitnessNotes?: string | null;
}

export interface UpdateMemberRequest {
  phone: string;
  gender?: string | null;
  dateOfBirth?: string | null;
  address?: string | null;
  emergencyContact?: EmergencyContact | null;
  fitnessGoals?: string | null;
  fitnessNotes?: string | null;
}