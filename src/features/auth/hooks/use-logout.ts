import {
  useMutation,
} from "@tanstack/react-query";

import {
  authApi,
} from "@/features/auth/api/auth-api";

import {
  useAuth,
} from "@/features/auth/hooks/use-auth";

import {
  authStorage,
} from "@/lib/auth-storage";

export function useLogout() {
  const {
    clearAuthentication,
  } = useAuth();

  return useMutation({
    mutationFn: async () => {
      const refreshToken =
        authStorage.getRefreshToken();

      /*
       * If there is no refresh token,
       * there is nothing to revoke remotely.
       */
      if (!refreshToken) {
        return;
      }

      await authApi.logout({
        refreshToken,
      });
    },

    onSettled: () => {
      /*
       * Clear the local session regardless
       * of whether the server logout succeeds.
       *
       * This prevents the user from remaining
       * authenticated locally when the backend
       * is unreachable.
       */
      clearAuthentication();
    },
  });
}