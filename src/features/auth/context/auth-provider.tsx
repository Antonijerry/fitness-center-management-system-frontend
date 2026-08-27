import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { authApi } from "@/features/auth/api/auth-api";

import type {
  AuthResponse,
} from "@/features/auth/types/auth-types";

import {
  AuthContext,
  type AuthContextValue,
} from "@/features/auth/context/auth-context";

import { authEvents } from "@/lib/auth-events";
import { authStorage } from "@/lib/auth-storage";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<AuthContextValue["user"]>(
      null,
    );

  const [accessToken, setAccessToken] =
    useState<string | null>(null);

  const [isInitializing, setIsInitializing] =
    useState(true);

  /**
   * Store a successful authentication response.
   *
   * Used by:
   *
   * - login
   * - registration
   * - session restoration
   */
  const setAuthentication = useCallback(
    (response: AuthResponse) => {
      authStorage.setTokens(
        response.accessToken,
        response.refreshToken,
      );

      setAccessToken(
        response.accessToken,
      );

      setUser(response.user);
    },
    [],
  );

  /**
   * Completely clear the current
   * authentication state.
   */
  const clearAuthentication =
    useCallback(() => {
      authStorage.clear();

      setAccessToken(null);
      setUser(null);
    }, []);

  /**
   * Restore the authentication session
   * when the application starts.
   */
  useEffect(() => {
    let mounted = true;

    async function restoreSession() {
      const refreshToken =
        authStorage.getRefreshToken();

      /*
       * No refresh token means there is
       * no session to restore.
       */
      if (!refreshToken) {
        if (mounted) {
          setIsInitializing(false);
        }

        return;
      }

      try {
        const response =
          await authApi.refreshToken({
            refreshToken,
          });

        /*
         * The backend returns:
         *
         * - new access token
         * - new refresh token
         * - user
         */
        if (mounted) {
          setAuthentication(response);
        }
      } catch {
        /*
         * Refresh token is invalid,
         * expired, or revoked.
         */
        if (mounted) {
          clearAuthentication();
        }
      } finally {
        if (mounted) {
          setIsInitializing(false);
        }
      }
    }

    restoreSession();

    return () => {
      mounted = false;
    };
  }, [
    setAuthentication,
    clearAuthentication,
  ]);

  /**
   * Listen for unauthorized events
   * emitted by Axios.
   */
  useEffect(() => {
    return authEvents.onUnauthorized(() => {
      clearAuthentication();
    });
  }, [clearAuthentication]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,

      accessToken,

      isAuthenticated:
        Boolean(accessToken) &&
        Boolean(user),

      isInitializing,

      setAuthentication,

      clearAuthentication,
    }),
    [
      user,
      accessToken,
      isInitializing,
      setAuthentication,
      clearAuthentication,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}