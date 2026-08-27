import { apiRequest } from "@/api/request";

import type {
  AuthResponse,
  LoginRequest,
  LogoutRequest,
  RefreshTokenRequest,
  RegisterRequest,
} from "@/features/auth/types/auth-types";

/**
 * Register a new member.
 *
 * Backend:
 * POST /api/v1/auth/register
 */
export function register(
  request: RegisterRequest,
): Promise<AuthResponse> {
  return apiRequest<AuthResponse>({
    method: "POST",
    url: "/auth/register",
    data: request,
  });
}

/**
 * Authenticate an existing user.
 *
 * Backend:
 * POST /api/v1/auth/login
 */
export function login(
  request: LoginRequest,
): Promise<AuthResponse> {
  return apiRequest<AuthResponse>({
    method: "POST",
    url: "/auth/login",
    data: request,
  });
}

/**
 * Refresh the current authentication session.
 *
 * Backend:
 * POST /api/v1/auth/refresh
 */
export function refreshToken(
  request: RefreshTokenRequest,
): Promise<AuthResponse> {
  return apiRequest<AuthResponse>({
    method: "POST",
    url: "/auth/refresh",
    data: request,
  });
}

/**
 * Logout the current session.
 *
 * Backend:
 * POST /api/v1/auth/logout
 */
export function logout(
  request: LogoutRequest,
): Promise<void> {
  return apiRequest<void>({
    method: "POST",
    url: "/auth/logout",
    data: request,
  });
}

export const authApi = {
  register,
  login,
  refreshToken,
  logout,
};