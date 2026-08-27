import {
    useState,
} from "react";

import {
    createUserSchema,
    updateUserSchema,
} from "@/features/users/schemas/user-schema";

import type {
    UserProfile,
} from "@/features/users/types/user-types";

interface UserFormProps {
    user?: UserProfile;
    isSubmitting?: boolean;
    submitLabel?: string;
    onSubmit: (
        values: {
            firstName: string;
            lastName: string;
            email: string;
            phone?: string;
            password?: string;
        },
    ) => void;
}

export function UserForm({
    user,
    isSubmitting = false,
    submitLabel = "Save",
    onSubmit,
}: UserFormProps) {
    const isEdit = Boolean(user);

    const [firstName, setFirstName] =
        useState(user?.firstName ?? "");

    const [lastName, setLastName] =
        useState(user?.lastName ?? "");

    const [email, setEmail] =
        useState(user?.email ?? "");

    const [phone, setPhone] =
        useState(user?.phone ?? "");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setError("");

        const values = {
            firstName,
            lastName,
            email,
            phone: phone || undefined,
            ...(isEdit
                ? {}
                : { password }),
        };

        const result = isEdit
            ? updateUserSchema.safeParse(
                values,
            )
            : createUserSchema.safeParse(
                values,
            );

        if (!result.success) {
            setError(
                result.error.issues[0]?.message ??
                "Please check the form.",
            );

            return;
        }

        onSubmit(values);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
                    {error}
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        First name
                    </label>

                    <input
                        value={firstName}
                        onChange={(event) =>
                            setFirstName(
                                event.target.value,
                            )
                        }
                        className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Last name
                    </label>

                    <input
                        value={lastName}
                        onChange={(event) =>
                            setLastName(
                                event.target.value,
                            )
                        }
                        className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Email
                </label>

                <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                        setEmail(event.target.value)
                    }
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Phone
                </label>

                <input
                    value={phone}
                    onChange={(event) =>
                        setPhone(event.target.value)
                    }
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            {!isEdit && (
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(
                                event.target.value,
                            )
                        }
                        className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isSubmitting
                    ? "Saving..."
                    : submitLabel}
            </button>
        </form>
    );
}