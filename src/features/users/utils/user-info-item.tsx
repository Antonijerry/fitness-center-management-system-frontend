import type { ReactNode } from "react";

interface UserInfoItemProps {
  label: string;
  value: string;
  icon?: ReactNode;
}

export function UserInfoItem({
  label,
  value,
  icon,
}: UserInfoItemProps) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <div className="mt-1 flex items-center gap-2 text-sm font-medium">
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
}