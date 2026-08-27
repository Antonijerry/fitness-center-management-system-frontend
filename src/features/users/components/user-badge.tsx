interface RoleBadgeProps {
  role: string;
}

export function RoleBadge({
  role,
}: RoleBadgeProps) {
  return (
    <span className="bg-muted inline-flex items-center rounded-full px-2 py-1 text-xs font-medium">
      {formatRole(role)}
    </span>
  );
}

function formatRole(
  role: string,
): string {
  return role
    .toLowerCase()
    .replace(
      /_/g,
      " ",
    )
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase(),
    );
}