import type { UserRole } from "@/config/navigation";

interface RoleBadgeProps {
  role: string;
}

const roleLabels: Record<UserRole, string> = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  TRAINER: "Trainer",
  RECEPTIONIST: "Receptionist",
  MEMBER: "Member",
};

export function RoleBadge({
  role,
}: RoleBadgeProps) {
  const normalizedRole =
    role.toUpperCase() as UserRole;

  const label =
    roleLabels[normalizedRole] ?? role;

  return (
    <span
      className={[
        "inline-flex items-center rounded-full",
        "border px-2.5 py-0.5 text-xs font-medium",
        "bg-muted text-muted-foreground",
      ].join(" ")}
    >
      {label}
    </span>
  );
}