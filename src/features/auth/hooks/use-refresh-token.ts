import {
  useMutation,
} from "@tanstack/react-query";

import { authApi } from "@/features/auth/api/auth-api";
import { authStorage } from "@/lib/auth-storage";

import { useAuth } from "@/features/auth/hooks/use-auth";

export function useRefreshToken() {
  const {
    setAuthentication,
    clearAuthentication,
  } = useAuth();

  return useMutation({
    mutationFn: async () => {
      const refreshToken =
        authStorage.getRefreshToken();

      if (!refreshToken) {
        throw new Error(
          "No refresh token available.",
        );
      }

      return authApi.refreshToken({
        refreshToken,
      });
    },

    onSuccess: (response) => {
      /*
       * The backend rotates both tokens and
       * returns the current user.
       */
      setAuthentication(response);
    },

    onError: () => {
      clearAuthentication();
    },
  });
}