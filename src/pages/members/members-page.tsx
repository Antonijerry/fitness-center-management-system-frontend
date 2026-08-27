
import { Eye, Search, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/app/routes/route-paths";
import { MemberStatusBadge, useMembers } from "@/features/members";

export function MembersPage() {
  const [search, setSearch] = useState("");

  const {
    data: members = [],
    isLoading,
    isError,
  } = useMembers();

  const filteredMembers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return members;
    }

    return members.filter((member) => {
      const fullName =
        `${member.firstName} ${member.lastName}`.toLowerCase();

      return (
        fullName.includes(normalizedSearch) ||
        member.memberNumber
          .toLowerCase()
          .includes(normalizedSearch) ||
        member.email.toLowerCase().includes(normalizedSearch) ||
        member.phone.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [members, search]);

  return (
    <div className="relative min-h-full space-y-8 text-white">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[130px]" />

        <div className="absolute -right-40 top-[20%] h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[140px]" />

        <div className="absolute bottom-[-15%] left-[35%] h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[130px]" />
      </div>

      {/* =========================================================
                PAGE HEADER
            ========================================================== */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-400">
            <Users className="h-3 w-3" />

            Members Management
          </div>

          <h1 className="text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
            Members
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Manage your fitness center members.
          </p>
        </div>
      </div>

      {/* =========================================================
                SEARCH
            ========================================================== */}
      <div
        className="
                    relative
                    w-full
                    rounded-2xl
                    border border-white/[0.08]
                    bg-white/[0.035]
                    p-3
                    shadow-xl
                    backdrop-blur-xl
                    sm:max-w-xl
                "
      >
        <div className="relative">
          <Search
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            aria-hidden="true"
          />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search by name, member number, email or phone..."
            aria-label="Search members"
            className="
                            flex h-11 w-full
                            rounded-xl
                            border border-white/[0.08]
                            bg-[#020617]/70
                            px-3 py-2 pl-10
                            text-sm text-white
                            outline-none
                            placeholder:text-slate-600
                            transition-all
                            focus:border-blue-500/40
                            focus:bg-[#020617]
                            focus:ring-2
                            focus:ring-blue-500/10
                        "
          />
        </div>
      </div>

      {/* =========================================================
                LOADING STATE
            ========================================================== */}
      {isLoading && (
        <div
          className="
                        relative flex min-h-60
                        items-center justify-center
                        overflow-hidden
                        rounded-3xl
                        border border-white/[0.08]
                        bg-white/[0.035]
                        backdrop-blur-xl
                    "
        >
          <div
            aria-hidden="true"
            className="absolute h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"
          />

          <p className="relative text-sm text-slate-400">
            Loading members...
          </p>
        </div>
      )}

      {/* =========================================================
                ERROR STATE
            ========================================================== */}
      {isError && !isLoading && (
        <div
          className="
                        relative flex min-h-60
                        items-center justify-center
                        overflow-hidden
                        rounded-3xl
                        border border-red-500/10
                        bg-red-500/[0.025]
                        backdrop-blur-xl
                    "
        >
          <div className="relative text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
              <Users className="h-5 w-5" />
            </div>

            <p className="mt-4 font-bold text-white">
              Unable to load members
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Please try again later.
            </p>
          </div>
        </div>
      )}

      {/* =========================================================
                EMPTY STATE
            ========================================================== */}
      {!isLoading &&
        !isError &&
        filteredMembers.length === 0 && (
          <div
            className="
                            relative flex min-h-72
                            flex-col items-center justify-center
                            overflow-hidden
                            rounded-3xl
                            border border-white/[0.08]
                            bg-white/[0.035]
                            px-6
                            text-center
                            backdrop-blur-xl
                        "
          >
            <div
              aria-hidden="true"
              className="absolute h-48 w-48 rounded-full bg-blue-500/10 blur-[90px]"
            />

            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
              <Users className="h-6 w-6" />
            </div>

            <h2 className="relative mt-5 font-bold text-white">
              {search
                ? "No members found"
                : "No members yet"}
            </h2>

            <p className="relative mt-2 text-sm text-slate-500">
              {search
                ? "Try adjusting your search."
                : "Members will appear here once they are added."}
            </p>
          </div>
        )}

      {/* =========================================================
                MEMBERS TABLE
            ========================================================== */}
      {!isLoading &&
        !isError &&
        filteredMembers.length > 0 && (
          <div
            className="
                            relative
                            overflow-hidden
                            rounded-3xl
                            border border-white/[0.08]
                            bg-white/[0.035]
                            shadow-2xl
                            backdrop-blur-xl
                        "
          >
            {/* Table header */}
            <div className="flex flex-col gap-2 border-b border-white/[0.08] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <h2 className="font-bold text-white">
                  All Members
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {filteredMembers.length}{" "}
                  {filteredMembers.length === 1
                    ? "member"
                    : "members"}{" "}
                  displayed
                </p>
              </div>

              <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-400">
                {filteredMembers.length} Results
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-sm">
                <thead className="border-b border-white/[0.08] bg-white/[0.025]">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 sm:px-6">
                      Member
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Member Number
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Email
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Phone
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500 sm:px-6">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/[0.06]">
                  {filteredMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="
                                                group
                                                transition-all
                                                duration-300
                                                hover:bg-blue-500/[0.025]
                                            "
                    >
                      {/* Member */}
                      <td className="px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className="
                                                            flex h-10 w-10
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-xl
                                                            border border-blue-500/20
                                                            bg-gradient-to-br
                                                            from-blue-500/15
                                                            to-violet-500/10
                                                            text-sm
                                                            font-bold
                                                            text-blue-400
                                                            transition-all
                                                            duration-300
                                                            group-hover:border-blue-400/40
                                                            group-hover:bg-blue-500/20
                                                        "
                          >
                            {member.firstName.charAt(
                              0,
                            )}
                          </div>

                          <div>
                            <div className="font-semibold text-white">
                              {member.firstName}{" "}
                              {member.lastName}
                            </div>

                            <p className="mt-0.5 text-xs text-slate-600">
                              Fitness Member
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Member Number */}
                      <td className="px-5 py-4 text-slate-400">
                        {member.memberNumber}
                      </td>

                      {/* Email */}
                      <td className="px-5 py-4 text-slate-400">
                        {member.email}
                      </td>

                      {/* Phone */}
                      <td className="px-5 py-4 text-slate-400">
                        {member.phone}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <MemberStatusBadge
                          status={member.status}
                        />
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right sm:px-6">
                        <Link
                          to={ROUTES.app.memberDetails(
                            member.id,
                          )}
                          className="
                                                        inline-flex
                                                        items-center
                                                        gap-2
                                                        rounded-xl
                                                        border
                                                        border-white/[0.08]
                                                        bg-white/[0.03]
                                                        px-3
                                                        py-2
                                                        text-sm
                                                        font-semibold
                                                        text-slate-400
                                                        transition-all
                                                        duration-300
                                                        hover:border-blue-500/30
                                                        hover:bg-blue-500/10
                                                        hover:text-blue-400
                                                    "
                          aria-label={`View ${member.firstName} ${member.lastName}`}
                        >
                          <Eye
                            className="h-4 w-4"
                            aria-hidden="true"
                          />

                          <span>View</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
    </div>
  );
}
