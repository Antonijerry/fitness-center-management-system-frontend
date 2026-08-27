import {
  LogOut,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  useLogout,
} from "@/features/auth/hooks/use-logout";

export function LogoutButton() {
  const logoutMutation =
    useLogout();

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() =>
        logoutMutation.mutate()
      }
      disabled={
        logoutMutation.isPending
      }
    >
      {logoutMutation.isPending ? (
        <>
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />

          Signing out...
        </>
      ) : (
        <>
          <LogOut className="mr-2 h-4 w-4" />

          Sign out
        </>
      )}
    </Button>
  );
}