export function canViewMembership(
  roles: string[],
): boolean {
  return roles.some(
    (role) =>
      role === "ADMIN" ||
      role === "MANAGER" ||
      role === "RECEPTIONIST",
  );
}

export function canCreateMembership(
  roles: string[],
): boolean {
  return roles.some(
    (role) =>
      role === "ADMIN" ||
      role === "MANAGER" ||
      role === "RECEPTIONIST",
  );
}

export function canActivateMembership(
  roles: string[],
): boolean {
  return roles.some(
    (role) =>
      role === "ADMIN" ||
      role === "MANAGER" ||
      role === "RECEPTIONIST",
  );
}

export function canSuspendMembership(
  roles: string[],
): boolean {
  return roles.some(
    (role) =>
      role === "ADMIN" ||
      role === "MANAGER",
  );
}

export function canCancelMembership(
  roles: string[],
): boolean {
  return roles.some(
    (role) =>
      role === "ADMIN" ||
      role === "MANAGER",
  );
}