export type MembershipType =
    | "BASIC"
    | "STANDARD"
    | "PREMIUM"
    | "CUSTOM";

export interface MembershipPlan {
    id: number;
    name: string;
    description: string | null;
    type: MembershipType;
    price: number;
    durationInDays: number;
    maxVisitsPerMonth: number;
    active: boolean;
    autoRenewable: boolean;
}

export interface CreateMembershipPlanRequest {
    name: string;
    description?: string;
    type: MembershipType;
    price: number;
    durationInDays: number;
    maxVisitsPerMonth: number;
    autoRenewable: boolean;
}

export interface UpdateMembershipPlanRequest {
    name: string;
    description?: string;
    type: MembershipType;
    price: number;
    durationInDays: number;
    maxVisitsPerMonth: number;
    active: boolean;
    autoRenewable: boolean;
}