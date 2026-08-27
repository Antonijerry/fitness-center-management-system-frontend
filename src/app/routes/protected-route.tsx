import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { AuthLoadingScreen } from "@/features/auth";

import { useAuth } from "@/features/auth/hooks/use-auth";

export function ProtectedRoute() {
  const {
    isAuthenticated,
    isInitializing,
  } = useAuth();

  const location = useLocation();

  if (isInitializing) {
    return <AuthLoadingScreen />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return <Outlet />;
}