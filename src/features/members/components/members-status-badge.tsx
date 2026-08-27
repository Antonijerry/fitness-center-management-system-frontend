import type {
    MemberStatus,
} from "@/features/members";

interface MemberStatusBadgeProps {
    status: MemberStatus;
}

const statusLabels: Record<
    MemberStatus,
    string
> = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    SUSPENDED: "Suspended",
    BLOCKED: "Blocked",
};

export function MemberStatusBadge({
    status,
}: MemberStatusBadgeProps) {
    return (
        <span className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
            {statusLabels[status]}
        </span>
    );
}