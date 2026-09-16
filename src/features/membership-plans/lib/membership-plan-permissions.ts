export function canCreateMembershipPlan(
  roles: string[],
): boolean {
  return roles.some(
    (role) =>
      role === "ADMIN" ||
      role === "MANAGER",
  );
}

export function canUpdateMembershipPlan(
  roles: string[],
): boolean {
  return roles.some(
    (role) =>
      role === "ADMIN" ||
      role === "MANAGER",
  );
}

export function canDeactivateMembershipPlan(
  roles: string[],
): boolean {
  return roles.includes("ADMIN");
}