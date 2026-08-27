import {
  Plus,
  Search,
  ShieldAlert,
  Users,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  UserTable,
} from "@/features/users/components/user-table";

import {
  useUsers,
} from "@/features/users/hooks/use-users";

import {
  canManageUsers,
} from "@/features/users/lib/user-permissions";

import {
  useAuth,
} from "@/features/auth/hooks/use-auth";

import {
  ROUTES,
} from "@/app/routes/route-paths";

export function UsersPage() {
  const { user } = useAuth();

  const currentUserRoles =
    user?.roles ?? [];

  const canManage = canManageUsers(
    currentUserRoles,
  );

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(0);

  const pageSize = 20;

  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = useUsers({
    search:
      search.trim() || undefined,
    page,
    size: pageSize,
    sortBy: "createdAt",
    direction: "desc",
  });

  const users = useMemo(
    () => data?.content ?? [],
    [data],
  );

  const totalPages =
    data?.totalPages ?? 0;

  function handleSearch(
    value: string,
  ) {
    setSearch(value);
    setPage(0);
  }

  if (!canManage) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">

        <div
          className="
                        relative
                        w-full
                        max-w-md
                        overflow-hidden
                        rounded-3xl
                        border
                        border-white/[0.08]
                        bg-white/[0.035]
                        p-8
                        text-center
                        shadow-2xl
                        backdrop-blur-xl
                    "
        >

          {/* Ambient glow */}

          <div
            aria-hidden="true"
            className="
                            pointer-events-none
                            absolute
                            -right-20
                            -top-20
                            h-40
                            w-40
                            rounded-full
                            bg-red-500/10
                            blur-3xl
                        "
          />

          <div className="relative">

            <div
              className="
                                mx-auto
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-red-500/20
                                bg-red-500/10
                                text-red-400
                            "
            >
              <ShieldAlert className="h-7 w-7" />
            </div>

            <h1 className="mt-5 text-xl font-bold text-white">
              Access denied
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              You do not have permission to
              manage system users.
            </p>

          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="relative space-y-6">

      {/* =========================================================
                HEADER
            ========================================================== */}

      <div
        className="
                    flex
                    flex-col
                    gap-5
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
      >
        <div>
          <div className="flex items-center gap-3">

            <div
              className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-blue-500/20
                                bg-blue-500/10
                                text-blue-400
                            "
            >
              <Users className="h-5 w-5" />
            </div>

            <div>
              <h1
                className="
                                    text-2xl
                                    font-black
                                    tracking-tight
                                    text-white
                                "
              >
                Users
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage system users, roles and
                account access.
              </p>
            </div>

          </div>
        </div>

        <Link
          to={`${ROUTES.app.users}/new`}
          className="
                        group
                        inline-flex
                        h-10
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-gradient-to-r
                        from-blue-600
                        to-indigo-600
                        px-4
                        text-sm
                        font-bold
                        text-white
                        shadow-lg
                        shadow-blue-600/20
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:from-blue-500
                        hover:to-indigo-500
                        hover:shadow-blue-500/30
                    "
        >
          <Plus
            className="
                            h-4
                            w-4
                            transition-transform
                            duration-300
                            group-hover:rotate-90
                        "
          />

          Create user
        </Link>
      </div>

      {/* =========================================================
                SEARCH
            ========================================================== */}

      <div
        className="
                    relative
                    w-full
                    max-w-md
                "
      >
        <Search
          className="
                        absolute
                        left-3.5
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-slate-500
                    "
          aria-hidden="true"
        />

        <input
          type="search"
          value={search}
          onChange={(event) =>
            handleSearch(
              event.target.value,
            )
          }
          placeholder="Search users..."
          aria-label="Search users"
          className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-white/[0.035]
                        px-3
                        pl-10
                        text-sm
                        text-white
                        outline-none
                        backdrop-blur-xl
                        transition-all
                        duration-300
                        placeholder:text-slate-600
                        hover:border-white/[0.12]
                        focus:border-blue-500/40
                        focus:bg-white/[0.05]
                        focus:ring-2
                        focus:ring-blue-500/10
                    "
        />
      </div>

      {/* =========================================================
                LOADING
            ========================================================== */}

      {isLoading && (
        <div
          className="
                        flex
                        min-h-60
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-white/[0.08]
                        bg-white/[0.025]
                        backdrop-blur-xl
                    "
        >
          <div className="text-center">

            <div
              className="
                                mx-auto
                                h-9
                                w-9
                                animate-spin
                                rounded-full
                                border-2
                                border-blue-500/20
                                border-t-blue-400
                            "
            />

            <p className="mt-4 text-sm text-slate-500">
              Loading users...
            </p>

          </div>
        </div>
      )}

      {/* =========================================================
                ERROR
            ========================================================== */}

      {isError && !isLoading && (
        <div
          className="
                        relative
                        flex
                        min-h-60
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-2xl
                        border
                        border-red-500/15
                        bg-red-500/[0.025]
                        backdrop-blur-xl
                    "
        >

          <div
            aria-hidden="true"
            className="
                            pointer-events-none
                            absolute
                            right-0
                            top-0
                            h-40
                            w-40
                            rounded-full
                            bg-red-500/10
                            blur-3xl
                        "
          />

          <div className="relative text-center">

            <div
              className="
                                mx-auto
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-red-500/20
                                bg-red-500/10
                                text-red-400
                            "
            >
              <ShieldAlert className="h-6 w-6" />
            </div>

            <p className="mt-4 font-bold text-white">
              Unable to load users
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Please try again later.
            </p>

          </div>
        </div>
      )}

      {/* =========================================================
                EMPTY
            ========================================================== */}

      {!isLoading &&
        !isError &&
        users.length === 0 && (
          <div
            className="
                            relative
                            flex
                            min-h-60
                            flex-col
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-2xl
                            border
                            border-white/[0.08]
                            bg-white/[0.025]
                            backdrop-blur-xl
                        "
          >

            <div
              aria-hidden="true"
              className="
                                pointer-events-none
                                absolute
                                left-1/2
                                top-1/2
                                h-40
                                w-40
                                -translate-x-1/2
                                -translate-y-1/2
                                rounded-full
                                bg-blue-500/5
                                blur-3xl
                            "
            />

            <div
              className="
                                relative
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-blue-500/20
                                bg-blue-500/10
                                text-blue-400
                            "
            >
              <Users className="h-6 w-6" />
            </div>

            <h2 className="relative mt-4 font-bold text-white">
              {search
                ? "No users found"
                : "No users yet"}
            </h2>

            <p className="relative mt-1 text-sm text-slate-500">
              {search
                ? "Try adjusting your search."
                : "Create your first system user."}
            </p>

          </div>
        )}

      {/* =========================================================
                TABLE
            ========================================================== */}

      {!isLoading &&
        !isError &&
        users.length > 0 && (
          <>
            <div
              className="
                                relative
                                overflow-hidden
                                rounded-2xl
                                border
                                border-white/[0.08]
                                bg-white/[0.025]
                                shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                                backdrop-blur-xl
                            "
            >

              {/* Top accent */}

              <div
                aria-hidden="true"
                className="
                                    absolute
                                    inset-x-0
                                    top-0
                                    h-px
                                    bg-gradient-to-r
                                    from-transparent
                                    via-blue-500/60
                                    to-transparent
                                "
              />

              <UserTable users={users} />

              {isFetching && (
                <div
                  className="
                                        absolute
                                        right-4
                                        top-4
                                        rounded-lg
                                        border
                                        border-blue-500/20
                                        bg-[#020617]/90
                                        px-3
                                        py-1.5
                                        text-xs
                                        font-medium
                                        text-blue-300
                                        shadow-lg
                                        backdrop-blur-xl
                                    "
                >
                  <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-blue-400" />
                  Updating...
                </div>
              )}
            </div>

            {/* =================================================
                            PAGINATION
                        ================================================== */}

            {totalPages > 1 && (
              <div
                className="
                                    flex
                                    flex-col
                                    gap-4
                                    border-t
                                    border-white/[0.08]
                                    pt-5
                                    sm:flex-row
                                    sm:items-center
                                    sm:justify-between
                                "
              >

                <p className="text-sm text-slate-500">
                  Page{" "}
                  <span className="font-semibold text-slate-300">
                    {page + 1}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-300">
                    {totalPages}
                  </span>
                </p>

                <div className="flex gap-2">

                  <button
                    type="button"
                    disabled={page === 0}
                    onClick={() =>
                      setPage(
                        (current) =>
                          current - 1,
                      )
                    }
                    className="
                                            rounded-xl
                                            border
                                            border-white/[0.08]
                                            bg-white/[0.025]
                                            px-4
                                            py-2
                                            text-sm
                                            font-medium
                                            text-slate-300
                                            transition-all
                                            duration-300
                                            hover:border-blue-500/20
                                            hover:bg-blue-500/10
                                            hover:text-white
                                            disabled:cursor-not-allowed
                                            disabled:opacity-30
                                        "
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    disabled={
                      page >=
                      totalPages - 1
                    }
                    onClick={() =>
                      setPage(
                        (current) =>
                          current + 1,
                      )
                    }
                    className="
                                            rounded-xl
                                            border
                                            border-blue-500/20
                                            bg-blue-500/10
                                            px-4
                                            py-2
                                            text-sm
                                            font-bold
                                            text-blue-300
                                            transition-all
                                            duration-300
                                            hover:border-blue-400/30
                                            hover:bg-blue-500/20
                                            hover:text-cyan-300
                                            disabled:cursor-not-allowed
                                            disabled:opacity-30
                                        "
                  >
                    Next
                  </button>

                </div>
              </div>
            )}
          </>
        )}
    </div>
  );
}