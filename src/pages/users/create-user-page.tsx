import {
    ArrowLeft,
    ShieldAlert,
} from "lucide-react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    UserForm,
} from "@/features/users/components/user-form";

import {
    useCreateUser,
} from "@/features/users/hooks/use-create-user";

import {
    canManageUsers,
} from "@/features/users/lib/user-permissions";

import {
    useAuth,
} from "@/features/auth/hooks/use-auth";

import {
    ROUTES,
} from "@/app/routes/route-paths";

import type {
    CreateUserRequest,
} from "@/features/users/types/user-types";

export function CreateUserPage() {
    const navigate = useNavigate();

    const { user } = useAuth();

    const currentUserRoles =
        user?.roles ?? [];

    const canManage = canManageUsers(
        currentUserRoles,
    );

    const createUser =
        useCreateUser();

    if (!canManage) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                    <ShieldAlert className="mx-auto h-10 w-10 text-muted-foreground" />

                    <h1 className="mt-3 text-lg font-semibold">
                        Access denied
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        You do not have permission to
                        create users.
                    </p>
                </div>
            </div>
        );
    }

    function handleSubmit(
        values: {
            firstName: string;
            lastName: string;
            email: string;
            phone?: string;
            password?: string;
        },
    ) {
        if (!values.password) {
            return;
        }

        const request: CreateUserRequest = {
            firstName:
                values.firstName,
            lastName:
                values.lastName,
            email: values.email,
            phone:
                values.phone || undefined,
            password: values.password,
        };

        createUser.mutate(
            request,
            {
                onSuccess: (createdUser) => {
                    navigate(
                        `${ROUTES.app.users}/${createdUser.id}`,
                    );
                },
            },
        );
    }

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <Link
                to={ROUTES.app.users}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to users
            </Link>

            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    Create user
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Create a new system user account.
                </p>
            </div>

            {createUser.isError && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
                    Unable to create the user.
                    Please check the information and
                    try again.
                </div>
            )}

            <div className="rounded-lg border p-6">
                <UserForm
                    isSubmitting={
                        createUser.isPending
                    }
                    submitLabel="Create user"
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}