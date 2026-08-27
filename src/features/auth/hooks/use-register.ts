import { useMutation } from "@tanstack/react-query";

import { authApi } from "@/features/auth/api/auth-api";

import { useAuth } from "@/features/auth/hooks/use-auth";

import type {
  RegisterRequest,
} from "@/features/auth/types/auth-types";

export function useRegister() {
  const {
    setAuthentication,
  } = useAuth();

  return useMutation({
    mutationFn: (
      request: RegisterRequest,
    ) =>
      authApi.register(request),

    onSuccess: (response) => {
      /*
       * Your backend returns AuthResponse
       * immediately after registration.
       *
       * Therefore the newly registered user
       * is automatically authenticated.
       */
      setAuthentication(response);
    },
  });
}