import {
  apiRequest,
} from "@/api/request";

import type {
  ApiPage,
} from "@/types/api";

import type {
  AssignRoleRequest,
  CreateUserRequest,
  GetUsersParams,
  UpdateUserRequest,
  UpdateUserStatusRequest,
  UserProfile,
} from "@/features/users/types/user-types";

export function getUsers(
  params?: GetUsersParams,
): Promise<ApiPage<UserProfile>> {
  return apiRequest<ApiPage<UserProfile>>({
    method: "GET",
    url: "/users",
    params,
  });
}

export function getUser(
  id: number,
): Promise<UserProfile> {
  return apiRequest<UserProfile>({
    method: "GET",
    url: `/users/${id}`,
  });
}

export function createUser(
  request: CreateUserRequest,
): Promise<UserProfile> {
  return apiRequest<UserProfile>({
    method: "POST",
    url: "/users",
    data: request,
  });
}

export function updateUser(
  id: number,
  request: UpdateUserRequest,
): Promise<UserProfile> {
  return apiRequest<UserProfile>({
    method: "PUT",
    url: `/users/${id}`,
    data: request,
  });
}

export function updateUserStatus(
  id: number,
  request: UpdateUserStatusRequest,
): Promise<UserProfile> {
  return apiRequest<UserProfile>({
    method: "PATCH",
    url: `/users/${id}/status`,
    data: request,
  });
}

export function assignRole(
  id: number,
  request: AssignRoleRequest,
): Promise<UserProfile> {
  return apiRequest<UserProfile>({
    method: "POST",
    url: `/users/${id}/roles`,
    data: request,
  });
}

export function removeRole(
  id: number,
  request: AssignRoleRequest,
): Promise<UserProfile> {
  return apiRequest<UserProfile>({
    method: "DELETE",
    url: `/users/${id}/roles`,
    data: request,
  });
}

export function deleteUser(
  id: number,
): Promise<void> {
  return apiRequest<void>({
    method: "DELETE",
    url: `/users/${id}`,
  });
}

export const userApi = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserStatus,
  assignRole,
  removeRole,
  deleteUser,
};