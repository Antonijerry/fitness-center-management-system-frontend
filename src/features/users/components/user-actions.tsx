import {
    Link,
} from "react-router-dom";

import type {
    UserProfile,
    UserRole,
} from "@/features/users/types/user-types";

import {
    canDeleteUser,
    canManageUser,
} from "@/features/users/lib/user-permissions";

interface UserActionsProps {
    user: UserProfile;
    currentUserRoles: UserRole[];
    onToggleStatus: () => void;
    onManageRoles: () => void;
    onDelete: () => void;
}

export function UserActions({
    user,
    currentUserRoles,
    onToggleStatus,
    onManageRoles,
    onDelete,
}: UserActionsProps) {
    const canManage = canManageUser(
        currentUserRoles,
        user,
    );

    const canDelete = canDeleteUser(
        currentUserRoles,
        user,
    );

    return (
        <div className="flex flex-wrap gap-2">
            <Link
                to={`/app/users/${user.id}/edit`}
                className="rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"
            >
                Edit
            </Link>

            {canManage && (
                <button
                    type="button"
                    onClick={onToggleStatus}
                    className="rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                    {user.enabled
                        ? "Disable"
                        : "Enable"}
                </button>
            )}

            {canManage && (
                <button
                    type="button"
                    onClick={onManageRoles}
                    className="rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                    Manage roles
                </button>
            )}

            {canDelete && (
                <button
                    type="button"
                    onClick={onDelete}
                    className="rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
                >
                    Delete
                </button>
            )}
        </div>
    );
}