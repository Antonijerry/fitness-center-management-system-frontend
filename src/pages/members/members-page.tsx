import {
  Search,
  UserPlus,
  Users,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  ROUTES,
} from "@/app/routes/route-paths";

import {
  useMembers,
} from "@/features/members/hooks/use-members";

import {
  MemberStatusBadge,
} from "@/features/members/components/members-status-badge";

export function MembersPage() {
  const [searchQuery, setSearchQuery] =
    useState("");

  const {
    data: members = [],
    isLoading,
    isError,
    error,
  } = useMembers();

  const filteredMembers = useMemo(() => {
    const query =
      searchQuery.trim().toLowerCase();

    if (!query) {
      return members;
    }

    return members.filter((member) => {
      const fullName =
        `${member.firstName} ${member.lastName}`
          .toLowerCase();

      return (
        fullName.includes(query) ||
        member.memberNumber
          .toLowerCase()
          .includes(query) ||
        member.email
          .toLowerCase()
          .includes(query) ||
        member.phone
          .toLowerCase()
          .includes(query)
      );
    });
  }, [members, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Members
              </h1>

              <p className="text-sm text-muted-foreground">
                Manage and view gym members.
              </p>
            </div>
          </div>
        </div>

        <Link
          to={ROUTES.app.memberCreate}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          <UserPlus className="h-4 w-4" />
          Add Member
        </Link>
      </div>

      {/* Search */}
      <div className="rounded-xl border bg-card p-4 shadow-sm">
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="search"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
            placeholder="Search by name, member number, email or phone..."
            className="h-10 w-full rounded-lg border bg-background pl-10 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Members table */}
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        {isLoading && (
          <div className="flex min-h-64 items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted border-t-primary" />
              Loading members...
            </div>
          </div>
        )}

        {isError && (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <Users className="h-5 w-5" />
            </div>

            <h2 className="font-semibold">
              Unable to load members
            </h2>

            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              {error instanceof Error
                ? error.message
                : "Something went wrong while loading members."}
            </p>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {/* Desktop */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/40">
                  <tr>
                    <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                      Member
                    </th>

                    <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                      Member Number
                    </th>

                    <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                      Contact
                    </th>

                    <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right font-medium text-muted-foreground">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filteredMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="transition hover:bg-muted/30"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">
                            {member.firstName}{" "}
                            {member.lastName}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {member.email}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-mono text-xs">
                        {member.memberNumber}
                      </td>

                      <td className="px-6 py-4 text-muted-foreground">
                        {member.phone}
                      </td>

                      <td className="px-6 py-4">
                        <MemberStatusBadge
                          status={member.status}
                        />
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Link
                          to={ROUTES.app.memberDetails(
                            member.id,
                          )}
                          className="font-medium text-primary hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="divide-y md:hidden">
              {filteredMembers.map((member) => (
                <Link
                  key={member.id}
                  to={ROUTES.app.memberDetails(
                    member.id,
                  )}
                  className="block p-4 transition hover:bg-muted/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {member.firstName}{" "}
                        {member.lastName}
                      </p>

                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {member.email}
                      </p>

                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        {member.memberNumber}
                      </p>
                    </div>

                    <MemberStatusBadge
                      status={member.status}
                    />
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty */}
            {filteredMembers.length === 0 && (
              <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Users className="h-5 w-5 text-muted-foreground" />
                </div>

                <h2 className="font-semibold">
                  {searchQuery
                    ? "No members found"
                    : "No members yet"}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {searchQuery
                    ? "Try changing your search criteria."
                    : "Create your first member to get started."}
                </p>

                {!searchQuery && (
                  <Link
                    to={ROUTES.app.memberCreate}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    <UserPlus className="h-4 w-4" />
                    Add Member
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {!isLoading &&
        !isError &&
        filteredMembers.length > 0 && (
          <p className="text-sm text-muted-foreground">
            Showing {filteredMembers.length} of{" "}
            {members.length} members
          </p>
        )}
    </div>
  );
}