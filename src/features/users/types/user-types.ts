import type { PaginatedResponse } from "@/types/api";

export type UserRole =
  | "ADMIN"
  | "MANAGER"
  | "TRAINER"
  | "RECEPTIONIST"
  | "MEMBER";

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  enabled: boolean;
  accountNonLocked: boolean;
  roles: UserRole[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  password: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string | null;
}

export interface UpdateUserStatusRequest {
  enabled: boolean;
}

export interface AssignRoleRequest {
  roleName: UserRole;
}

export interface GetUsersParams {
  search?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: "asc" | "desc";
}

export type UsersPageResponse =
  PaginatedResponse<UserProfile>;