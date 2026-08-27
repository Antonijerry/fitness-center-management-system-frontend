export type UserRole =
  | "ADMIN"
  | "MANAGER"
  | "TRAINER"
  | "RECEPTIONIST"
  | "MEMBER";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: UserResponse;
}

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  enabled: boolean;
  accountNonLocked: boolean;
  roles: UserRole[];
  createdAt: string;
  updatedAt: string;
}