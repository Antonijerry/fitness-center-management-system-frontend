interface UserStatusBadgeProps {
  enabled: boolean;
}

export function UserStatusBadge({
  enabled,
}: UserStatusBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1",
        "text-xs font-medium",
        enabled
          ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
          : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
      ].join(" ")}
    >
      <span
        className={[
          "mr-1.5 h-1.5 w-1.5 rounded-full",
          enabled
            ? "bg-green-500"
            : "bg-red-500",
        ].join(" ")}
      />

      {enabled ? "Active" : "Disabled"}
    </span>
  );
}