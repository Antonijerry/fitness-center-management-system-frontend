import type {
    UserRole,
} from "@/config/navigation";

export const USER_ROLES: readonly UserRole[] = [
    "ADMIN",
    "MANAGER",
    "TRAINER",
    "RECEPTIONIST",
    "MEMBER",
] as const;

export function hasRole(
    userRoles: readonly string[],
    allowedRoles: readonly UserRole[],
): boolean {
    return userRoles.some((role) =>
        allowedRoles.includes(
            role as UserRole,
        ),
    );
}

export function getUserRoles(
    roles: string[] | undefined,
): UserRole[] {
    if (!roles) {
        return [];
    }

    return roles.filter(
        (role): role is UserRole =>
            USER_ROLES.includes(
                role as UserRole,
            ),
    );
}