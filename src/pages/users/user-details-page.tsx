import {
  ArrowLeft,
  Mail,
  Phone,
  Shield,
  ShieldAlert,
  User,
} from "lucide-react";

import { useState } from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { RoleBadge } from "@/features/users/components/role-badge";
import { UserStatusBadge } from "@/features/users/components/user-status-badge";
import { UserActions } from "@/features/users/components/user-actions";
import { UserRoleDialog } from "@/features/users/components/user-role-dialog";
import { DeleteUserDialog } from "@/features/users/components/delete-user-dialog";
import { UserInfoItem } from "@/features/users/utils/user-info-item";

import { useUser } from "@/features/users/hooks/use-user";
import { useUpdateUserStatus } from "@/features/users/hooks/use-update-user-status";
import { useAssignRole } from "@/features/users/hooks/use-assign-role";
import { useRemoveRole } from "@/features/users/hooks/use-remove-role";
import { useDeleteUser } from "@/features/users/hooks/use-delete-user";

import { canManageUser } from "@/features/users/lib/user-permissions";

import type { UserRole } from "@/features/users/types/user-types";

import { useAuth } from "@/features/auth/hooks/use-auth";

import { ROUTES } from "@/app/routes/route-paths";

import { formatUserDate } from "@/features/users/utils/format-user-date";

export function UserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const userId = Number(id);

  const { user: currentUser } = useAuth();

  const currentUserRoles =
    currentUser?.roles ?? [];

  const validUserId =
    Number.isFinite(userId) && userId > 0
      ? userId
      : undefined;

  const {
    data: selectedUser,
    isLoading,
    isError,
  } = useUser(validUserId);

  const updateStatus =
    useUpdateUserStatus();

  const assignRole =
    useAssignRole();

  const removeRole =
    useRemoveRole();

  const deleteUser =
    useDeleteUser();

  const [roleDialogOpen, setRoleDialogOpen] =
    useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading user...
        </p>
      </div>
    );
  }

  if (isError || !selectedUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <ShieldAlert className="mx-auto h-10 w-10 text-muted-foreground" />

          <h1 className="mt-3 text-lg font-semibold">
            User not found
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            The requested user could not be loaded.
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
   * selectedUser has been checked above.
   *
   * Using a local constant gives TypeScript a
   * guaranteed UserProfile reference inside
   * nested event handlers.
   */
  const user = selectedUser;

  const canManage = canManageUser(
    currentUserRoles,
    user,
  );

  const isCurrentUser =
    currentUser?.id === user.id;

  function handleToggleStatus() {
    if (!canManage) {
      return;
    }

    updateStatus.mutate({
      id: user.id,
      request: {
        enabled: !user.enabled,
      },
    });
  }

  function handleAssignRole(
    role: UserRole,
  ) {
    if (!canManage) {
      return;
    }

    assignRole.mutate({
      id: user.id,
      request: {
        roleName: role,
      },
    });
  }

  function handleRemoveRole(
    role: UserRole,
  ) {
    if (!canManage) {
      return;
    }

    removeRole.mutate({
      id: user.id,
      request: {
        roleName: role,
      },
    });
  }

  function handleDelete() {
    if (!canManage || isCurrentUser) {
      return;
    }

    deleteUser.mutate(user.id, {
      onSuccess: () => {
        navigate(ROUTES.app.users);
      },
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4">
        <Link
          to={ROUTES.app.users}
          className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />

          Back to users
        </Link>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {user.firstName} {user.lastName}
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              User account details and access
              management.
            </p>
          </div>

          <UserActions
            user={user}
            currentUserRoles={currentUserRoles}
            onToggleStatus={
              handleToggleStatus
            }
            onManageRoles={() =>
              setRoleDialogOpen(true)
            }
            onDelete={() =>
              setDeleteDialogOpen(true)
            }
          />
        </div>
      </div>

      {/* Current user notice */}

      {isCurrentUser && (
        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="flex items-start gap-3">
            <Shield className="mt-0.5 h-5 w-5 text-primary" />

            <div>
              <p className="text-sm font-medium">
                This is your account
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Be careful when changing your own
                account status or roles.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Profile */}

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-lg border p-6 lg:col-span-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h2 className="font-semibold">
                Personal information
              </h2>

              <p className="text-sm text-muted-foreground">
                Basic account information.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <UserInfoItem
              label="First name"
              value={user.firstName}
            />

            <UserInfoItem
              label="Last name"
              value={user.lastName}
            />

            <UserInfoItem
              label="Email"
              value={user.email}
              icon={
                <Mail className="h-4 w-4 text-muted-foreground" />
              }
            />

            <UserInfoItem
              label="Phone"
              value={
                user.phone || "Not provided"
              }
              icon={
                <Phone className="h-4 w-4 text-muted-foreground" />
              }
            />
          </div>
        </section>

        {/* Account status */}

        <section className="rounded-lg border p-6">
          <h2 className="font-semibold">
            Account status
          </h2>

          <div className="mt-5 space-y-5">
            <div>
              <p className="mb-2 text-xs text-muted-foreground">
                Status
              </p>

              <UserStatusBadge
                enabled={user.enabled}
              />
            </div>

            <div>
              <p className="mb-2 text-xs text-muted-foreground">
                Account lock
              </p>

              <span className="text-sm font-medium">
                {user.accountNonLocked
                  ? "Unlocked"
                  : "Locked"}
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Roles */}

      <section className="rounded-lg border p-6">
        <h2 className="font-semibold">
          Assigned roles
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Roles determine what this user can
          access.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {user.roles.length > 0 ? (
            user.roles.map((role) => (
              <RoleBadge
                key={role}
                role={role}
              />
            ))
          ) : (
            <span className="text-sm text-muted-foreground">
              No roles assigned.
            </span>
          )}
        </div>

        {canManage && (
          <button
            type="button"
            onClick={() =>
              setRoleDialogOpen(true)
            }
            className="mt-5 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Manage roles
          </button>
        )}
      </section>

      {/* Account metadata */}

      <section className="rounded-lg border p-6">
        <h2 className="font-semibold">
          Account information
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <UserInfoItem
            label="User ID"
            value={String(user.id)}
          />

          <UserInfoItem
            label="Created"
            value={formatUserDate(
              user.createdAt,
            )}
          />

          <UserInfoItem
            label="Last updated"
            value={formatUserDate(
              user.updatedAt,
            )}
          />
        </div>
      </section>

      {/* Role management */}

      {canManage && (
        <UserRoleDialog
          open={roleDialogOpen}
          user={user}
          currentUserRoles={currentUserRoles}
          isSubmitting={
            assignRole.isPending ||
            removeRole.isPending
          }
          onClose={() =>
            setRoleDialogOpen(false)
          }
          onAssign={handleAssignRole}
          onRemove={handleRemoveRole}
        />
      )}

      {/* Delete */}

      {canManage && !isCurrentUser && (
        <DeleteUserDialog
          open={deleteDialogOpen}
          userName={`${user.firstName} ${user.lastName}`}
          isDeleting={deleteUser.isPending}
          onCancel={() =>
            setDeleteDialogOpen(false)
          }
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}