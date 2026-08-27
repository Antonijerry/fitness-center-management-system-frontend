import {
  useMutation,
} from "@tanstack/react-query";

import { authApi } from "@/features/auth/api/auth-api";
import { useAuth } from "@/features/auth/hooks/use-auth";

import type {
  LoginRequest,
} from "@/features/auth/types/auth-types";

export function useLogin() {
  const {
    setAuthentication,
  } = useAuth();

  return useMutation({
    mutationFn: (
      request: LoginRequest,
    ) => authApi.login(request),

    onSuccess: (response) => {
      setAuthentication(response);
    },
  });
}


// This gives the UI:

// const loginMutation = useLogin<LoginResponse>();
// loginMutation.mutate(values);

// Later we'll replace LoginResponse with your exact backend response DTO.