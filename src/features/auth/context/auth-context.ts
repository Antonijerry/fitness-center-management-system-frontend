import {
  createContext,
} from "react";

import type {
  AuthResponse,
  UserResponse,
} from "@/features/auth/types/auth-types";

export interface AuthContextValue {
  user: UserResponse | null;

  accessToken: string | null;

  isAuthenticated: boolean;

  isInitializing: boolean;

  setAuthentication: (
    response: AuthResponse,
  ) => void;

  clearAuthentication: () => void;
}

export const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined,
  );