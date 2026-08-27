import {
    useMemo,
    useState,
} from "react";

import type {
    UserProfile,
    UserRole,
} from "@/features/users/types/user-types";

import {
    canAssignRole,
} from "@/features/users/lib/user-permissions";

import { RoleBadge } from "./role-badge";

const ALL_ROLES: UserRole[] = [
    "ADMIN",
    "MANAGER",
    "TRAINER",
    "RECEPTIONIST",
    "MEMBER",
];

interface UserRoleDialogProps {
    open: boolean;
    user: UserProfile;
    currentUserRoles: UserRole[];
    isSubmitting?: boolean;
    error?: string;
    onClose: () => void;
    onAssign: (role: UserRole) => void;
    onRemove: (role: UserRole) => void;
}

export function UserRoleDialog({
    open,
    user,
    currentUserRoles,
    isSubmitting = false,
    error,
    onClose,
    onAssign,
    onRemove,
}: UserRoleDialogProps) {
    const [selectedRole, setSelectedRole] =
        useState<UserRole | "">("");

    const assignableRoles = useMemo(() => {
        return ALL_ROLES.filter((role) =>
            canAssignRole(
                currentUserRoles,
                role,
            ),
        );
    }, [currentUserRoles]);

    const availableRoles = useMemo(() => {
        return assignableRoles.filter(
            (role) =>
                !user.roles.includes(role),
        );
    }, [
        assignableRoles,
        user.roles,
    ]);

    const effectiveSelectedRole =
        selectedRole &&
            availableRoles.includes(selectedRole)
            ? selectedRole
            : availableRoles[0] ?? "";

    if (!open) {
        return null;
    }

    function handleAssign() {
        console.log("=== ASSIGN BUTTON CLICKED ===");
        console.log("selectedRole:", selectedRole);
        console.log(
            "effectiveSelectedRole:",
            effectiveSelectedRole,
        );
        console.log("isSubmitting:", isSubmitting);
        console.log("availableRoles:", availableRoles);
        console.log("user.roles:", user.roles);
        console.log(
            "currentUserRoles:",
            currentUserRoles,
        );

        if (!effectiveSelectedRole) {
            console.log(
                "ASSIGN BLOCKED: no role selected",
            );
            return;
        }

        if (isSubmitting) {
            console.log(
                "ASSIGN BLOCKED: mutation is already submitting",
            );
            return;
        }

        console.log(
            "CALLING onAssign:",
            effectiveSelectedRole,
        );

        onAssign(effectiveSelectedRole);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div
                className="w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg"
                role="dialog"
                aria-modal="true"
                aria-labelledby="user-role-dialog-title"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h2
                            id="user-role-dialog-title"
                            className="text-lg font-semibold"
                        >
                            Manage roles
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            {user.firstName}{" "}
                            {user.lastName}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        aria-label="Close"
                        className="text-xl text-muted-foreground hover:text-foreground disabled:opacity-50"
                    >
                        ×
                    </button>
                </div>

                {error && (
                    <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
                        {error}
                    </div>
                )}

                <div className="mt-6">
                    <p className="mb-2 text-sm font-medium">
                        Current roles
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {user.roles.length > 0 ? (
                            user.roles.map((role) => {
                                const canRemove =
                                    canAssignRole(
                                        currentUserRoles,
                                        role,
                                    );

                                return (
                                    <div
                                        key={role}
                                        className="flex items-center gap-1"
                                    >
                                        <RoleBadge
                                            role={role}
                                        />

                                        {canRemove && (
                                            <button
                                                type="button"
                                                disabled={
                                                    isSubmitting
                                                }
                                                onClick={() =>
                                                    onRemove(role)
                                                }
                                                className="text-xs text-red-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                remove
                                            </button>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <span className="text-sm text-muted-foreground">
                                No roles assigned
                            </span>
                        )}
                    </div>
                </div>

                {availableRoles.length > 0 ? (
                    <div className="mt-6 space-y-3">
                        <label
                            htmlFor="assign-role"
                            className="text-sm font-medium"
                        >
                            Assign role
                        </label>

                        <div className="flex gap-2">
                            <select
                                id="assign-role"
                                value={effectiveSelectedRole}
                                onChange={(event) =>
                                    setSelectedRole(
                                        event.target.value as UserRole,
                                    )
                                }
                                disabled={isSubmitting}
                                className="h-10 flex-1 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {availableRoles.map(
                                    (role) => (
                                        <option
                                            key={role}
                                            value={role}
                                        >
                                            {role}
                                        </option>
                                    ),
                                )}
                            </select>

                            <button
                                type="button"
                                disabled={
                                    isSubmitting ||
                                    !effectiveSelectedRole
                                }
                                onClick={handleAssign}
                                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isSubmitting
                                    ? "Saving..."
                                    : "Assign"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="mt-6 rounded-md border bg-muted/30 p-4">
                        <p className="text-sm text-muted-foreground">
                            There are no additional roles
                            available for this user.
                        </p>
                    </div>
                )}

                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}