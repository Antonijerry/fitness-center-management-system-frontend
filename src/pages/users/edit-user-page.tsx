import {
    ArrowLeft,
    ShieldAlert,
} from "lucide-react";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    useUser,
} from "@/features/users/hooks/use-user";

import {
    useUpdateUser,
} from "@/features/users/hooks/use-update-user";

import {
    UserForm,
} from "@/features/users/components/user-form";

import type {
    UpdateUserRequest,
} from "@/features/users/types/user-types";

import {
    ROUTES,
} from "@/app/routes/route-paths";

export function EditUserPage() {
    const { id } = useParams();

    const navigate = useNavigate();

    const userId = Number(id);

    const {
        data: selectedUser,
        isLoading,
        isError,
    } = useUser(
        Number.isFinite(userId)
            ? userId
            : undefined,
    );

    const updateUser =
        useUpdateUser();

    /*
     * ============================
     * Loading
     * ============================
     */

    if (isLoading) {
        return (
            <div className="flex min-h-60 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Loading user...
                </p>
            </div>
        );
    }

    /*
     * ============================
     * Error / Not Found
     * ============================
     */

    if (
        isError ||
        !selectedUser
    ) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                    <ShieldAlert className="mx-auto h-10 w-10 text-muted-foreground" />

                    <h1 className="mt-3 text-lg font-semibold">
                        User not found
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        The requested user could not
                        be loaded.
                    </p>

                    <Link
                        to={ROUTES.app.users}
                        className="mt-4 inline-flex rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                    >
                        Back to users
                    </Link>
                </div>
            </div>
        );
    }

    /*
     * ============================
     * User is guaranteed to exist
     * after the guard above.
     * ============================
     */

    const user = selectedUser;

    /*
     * ============================
     * Submit
     * ============================
     */

    function handleSubmit(
        values: {
            firstName: string;
            lastName: string;
            email: string;
            phone?: string;
            password?: string;
        },
    ) {
        const request: UpdateUserRequest = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
        };

        updateUser.mutate(
            {
                id: user.id,
                request,
            },
            {
                onSuccess: () => {
                    navigate(
                        `${ROUTES.app.users}/${user.id}`,
                    );
                },
            },
        );
    }

    return (
        <div className="space-y-6">
            {/* ========================= */}
            {/* Header                    */}
            {/* ========================= */}

            <div className="flex flex-col gap-4">
                <Link
                    to={`${ROUTES.app.users}/${user.id}`}
                    className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" />

                    Back to user
                </Link>

                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Edit user
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Update the account information
                        for{" "}
                        <span className="font-medium text-foreground">
                            {user.firstName}{" "}
                            {user.lastName}
                        </span>
                        .
                    </p>
                </div>
            </div>

            {/* ========================= */}
            {/* Form                      */}
            {/* ========================= */}

            <div className="rounded-lg border p-6">
                <UserForm
                    user={user}
                    isSubmitting={
                        updateUser.isPending
                    }
                    submitLabel="Update user"
                    onSubmit={
                        handleSubmit
                    }
                />
            </div>
        </div>
    );
}