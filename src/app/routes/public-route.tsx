import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { AuthLoadingScreen } from "@/features/auth";

import { useAuth } from "@/features/auth/hooks/use-auth";

export function PublicRoute() {
  const {
    isAuthenticated,
    isInitializing,
  } = useAuth();

  if (isInitializing) {
    return <AuthLoadingScreen />;
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to="/app/dashboard"
        replace
      />
    );
  }

  return <Outlet />;
}