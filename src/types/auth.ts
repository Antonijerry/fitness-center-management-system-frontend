export type UserRole =
  | "ADMIN"
  | "MANAGER"
  | "TRAINER"
  | "RECEPTIONIST"
  | "MEMBER";

export interface AuthUser {
  id: number | string;
  username?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  enabled?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
  user?: AuthUser;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken?: string;
}