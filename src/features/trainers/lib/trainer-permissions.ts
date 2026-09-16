export function canManageTrainers(
  roles: string[],
): boolean {
  return roles.some(
    (role) =>
      role === "ADMIN" ||
      role === "MANAGER",
  );
}

export function canViewTrainers(
  roles: string[],
): boolean {
  return roles.some(
    (role) =>
      role === "ADMIN" ||
      role === "MANAGER" ||
      role === "RECEPTIONIST",
  );
}

export function canUpdateTrainer(
  roles: string[],
): boolean {
  return roles.some(
    (role) =>
      role === "ADMIN" ||
      role === "MANAGER",
  );
}