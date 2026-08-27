import type {
  UserProfile,
  UserRole,
} from "@/features/users/types/user-types";

const ROLE_LEVEL: Record<UserRole, number> = {
  MEMBER: 1,
  RECEPTIONIST: 2,
  TRAINER: 3,
  MANAGER: 4,
  ADMIN: 5,
};

export function canManageUsers(
  currentUserRoles: UserRole[],
): boolean {
  return currentUserRoles.some(
    (role) =>
      role === "ADMIN" ||
      role === "MANAGER",
  );
}

export function canManageUser(
  currentUserRoles: UserRole[],
  targetUser: UserProfile,
): boolean {
  if (
    currentUserRoles.includes("ADMIN")
  ) {
    return true;
  }

  if (
    currentUserRoles.includes("MANAGER")
  ) {
    return targetUser.roles.every(
      (role) =>
        ROLE_LEVEL[role] <
        ROLE_LEVEL.MANAGER,
    );
  }

  return false;
}

export function canAssignRole(
  currentUserRoles: UserRole[],
  role: UserRole,
): boolean {
  if (
    currentUserRoles.includes("ADMIN")
  ) {
    return true;
  }

  if (
    currentUserRoles.includes("MANAGER")
  ) {
    return (
      role === "TRAINER" ||
      role === "RECEPTIONIST" ||
      role === "MEMBER"
    );
  }

  return false;
}

export function canDeleteUser(
  currentUserRoles: UserRole[],
  targetUser: UserProfile,
): boolean {
  if (
    currentUserRoles.includes("ADMIN")
  ) {
    return true;
  }

  if (
    currentUserRoles.includes("MANAGER")
  ) {
    return targetUser.roles.every(
      (role) =>
        ROLE_LEVEL[role] <
        ROLE_LEVEL.MANAGER,
    );
  }

  return false;
}