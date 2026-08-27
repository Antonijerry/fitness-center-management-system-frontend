import type { UserRole } from "@/config/navigation";

export const PERMISSIONS = {
    users: {
        view: ["ADMIN", "MANAGER"] as UserRole[],
        create: ["ADMIN"] as UserRole[],
        edit: ["ADMIN"] as UserRole[],
        status: ["ADMIN"] as UserRole[],
        roles: ["ADMIN"] as UserRole[],
        delete: ["ADMIN"] as UserRole[],
    },

    members: {
        view: [
            "ADMIN",
            "MANAGER",
            "TRAINER",
            "RECEPTIONIST",
        ] as UserRole[],

        create: [
            "ADMIN",
            "MANAGER",
            "RECEPTIONIST",
        ] as UserRole[],

        edit: [
            "ADMIN",
            "MANAGER",
            "RECEPTIONIST",
        ] as UserRole[],

        status: [
            "ADMIN",
            "MANAGER",
            "RECEPTIONIST",
        ] as UserRole[],
    },
} as const;

export function can(
    userRoles: string[] | undefined,
    allowedRoles: readonly UserRole[],
): boolean {
    if (!userRoles?.length) {
        return false;
    }

    return userRoles.some((role) =>
        allowedRoles.includes(role as UserRole),
    );
}