import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

import type { UserProfile } from "@/features/users/types/user-types";

import { RoleBadge } from "./role-badge";
import { UserStatusBadge } from "./user-status-badge";

interface UserTableProps {
  users: UserProfile[];
}

export function UserTable({
  users,
}: UserTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium">
                User
              </th>

              <th className="px-4 py-3 text-left font-medium">
                Email
              </th>

              <th className="px-4 py-3 text-left font-medium">
                Phone
              </th>

              <th className="px-4 py-3 text-left font-medium">
                Roles
              </th>

              <th className="px-4 py-3 text-left font-medium">
                Status
              </th>

              <th className="px-4 py-3 text-right font-medium">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {users.map((user) => (
              <tr
                key={user.id}
                className="transition-colors hover:bg-muted/50"
              >
                <td className="px-4 py-3">
                  <div className="font-medium">
                    {user.firstName}{" "}
                    {user.lastName}
                  </div>
                </td>

                <td className="px-4 py-3 text-muted-foreground">
                  {user.email}
                </td>

                <td className="px-4 py-3 text-muted-foreground">
                  {user.phone || "—"}
                </td>

                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {user.roles.length > 0 ? (
                      user.roles.map(
                        (role) => (
                          <RoleBadge
                            key={role}
                            role={role}
                          />
                        ),
                      )
                    ) : (
                      <span className="text-muted-foreground">
                        No role
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-4 py-3">
                  <UserStatusBadge
                    enabled={user.enabled}
                  />
                </td>

                <td className="px-4 py-3 text-right">
                  <Link
                    to={`/app/users/${user.id}`}
                    className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}