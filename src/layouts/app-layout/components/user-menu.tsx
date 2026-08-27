import {
    LogOut,
    User,
} from "lucide-react";

import {
    useNavigate,
} from "react-router-dom";

import {
    useAuth,
} from "@/features/auth/hooks/use-auth";

import {
    useLogout,
} from "@/features/auth/hooks/use-logout";

import {
    ROUTES,
} from "@/app/routes/route-paths";

import {
    Button,
} from "@/components/ui/button";

export function UserMenu() {
    const {
        user,
    } = useAuth();

    const navigate =
        useNavigate();

    const logoutMutation =
        useLogout();

    const fullName =
        user
            ? `${user.firstName} ${user.lastName}`
            : "User";

    const primaryRole =
        user?.roles?.[0] ??
        "MEMBER";

    const handleLogout =
        () => {
            logoutMutation.mutate(
                undefined,
                {
                    onSuccess: () => {
                        navigate(
                            ROUTES.auth.login,
                            {
                                replace: true,
                            },
                        );
                    },

                    onError: () => {
                        /*
                         * useLogout clears the local
                         * authentication state in
                         * onSettled(), so we still
                         * redirect to login.
                         */
                        navigate(
                            ROUTES.auth.login,
                            {
                                replace: true,
                            },
                        );
                    },
                },
            );
        };

    return (
        <div className="flex items-center gap-3">

            {/* ========================= */}
            {/* User Information            */}
            {/* ========================= */}

            <div className="hidden text-right sm:block">

                <p className="text-sm font-medium">
                    {fullName}
                </p>

                <p className="text-xs text-muted-foreground">
                    {primaryRole}
                </p>

            </div>


            {/* ========================= */}
            {/* User Avatar                 */}
            {/* ========================= */}

            <div
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted"
                aria-label={`Account for ${fullName}`}
            >
                <User
                    className="h-4 w-4"
                    aria-hidden="true"
                />
            </div>


            {/* ========================= */}
            {/* Logout                     */}
            {/* ========================= */}

            <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                disabled={
                    logoutMutation.isPending
                }
                aria-label="Sign out"
                title={
                    logoutMutation.isPending
                        ? "Signing out..."
                        : "Sign out"
                }
            >
                <LogOut
                    className="h-4 w-4"
                    aria-hidden="true"
                />
            </Button>

        </div>
    );
}