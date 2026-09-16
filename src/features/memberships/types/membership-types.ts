export type MembershipStatus =
  | "PENDING"
  | "ACTIVE"
  | "EXPIRED"
  | "SUSPENDED"
  | "CANCELLED";

export interface Membership {
  id: number;

  userId: number;
  userName: string;

  planId: number;
  planName: string;

  startDate: string;
  endDate: string;

  status: MembershipStatus;

  price: number;

  autoRenewable: boolean;

  notes: string | null;
}

export interface CreateMembershipRequest {
  userId: number;
  planId: number;
  startDate: string;
  autoRenewable: boolean;
  notes?: string;
}