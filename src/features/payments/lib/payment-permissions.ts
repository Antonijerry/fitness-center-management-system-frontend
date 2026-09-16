export function canInitializePayment(
  roles: string[],
): boolean {
  return roles.some(
    (role) =>
      role === "ADMIN" ||
      role === "MANAGER" ||
      role === "RECEPTIONIST",
  );
}