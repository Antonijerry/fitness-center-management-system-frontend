import {
  Activity,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Dumbbell,
  RefreshCw,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";

import {
  useDashboard,
} from "@/features/dashboard/hooks/use-dashboard";

import {
  Button,
} from "@/components/ui/button";

export function DashboardPage() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useDashboard();

  /* =========================================================
     LOADING STATE
  ========================================================== */

  if (isLoading) {
    return (
      <div className="relative min-h-full overflow-hidden">
        <DashboardBackground />

        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <div className="h-8 w-40 animate-pulse rounded-lg bg-white/10" />
            <div className="h-4 w-64 animate-pulse rounded-lg bg-white/5" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="
                  h-36
                  animate-pulse
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/4
                  backdrop-blur-xl
                "
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     ERROR STATE
  ========================================================== */

  if (isError) {
    return (
      <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <DashboardBackground />

        <div
          className="
            relative
            z-10
            w-full
            max-w-lg
            rounded-3xl
            border
            border-red-500/20
            bg-slate-950/80
            p-8
            text-center
            shadow-2xl
            shadow-black/40
            backdrop-blur-2xl
          "
        >
          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-red-500/10
              text-red-400
              shadow-lg
              shadow-red-500/10
            "
          >
            <Activity className="h-6 w-6" />
          </div>

          <h1 className="mt-5 text-xl font-bold text-white">
            Unable to load dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred."}
          </p>

          <Button
            variant="outline"
            onClick={() => refetch()}
            disabled={isFetching}
            className="
              mt-6
              rounded-xl
              border-white/10
              bg-white/5
              text-white
              hover:bg-white/10
            "
          >
            <RefreshCw
              className={[
                "mr-2 h-4 w-4",
                isFetching ? "animate-spin" : "",
              ].join(" ")}
            />
            Try again
          </Button>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  /* =========================================================
     STATISTICS
  ========================================================== */

  const statistics = [
    {
      title: "Total Members",
      value: data.totalMembers,
      description: "Registered members",
      icon: Users,
      gradient: "from-blue-500 to-cyan-400",
      glow: "shadow-blue-500/10",
    },
    {
      title: "Active Members",
      value: data.activeMembers,
      description: "Currently active",
      icon: UserCheck,
      gradient: "from-emerald-500 to-teal-400",
      glow: "shadow-emerald-500/10",
    },
    {
      title: "Trainers",
      value: data.totalTrainers,
      description: "Registered trainers",
      icon: Dumbbell,
      gradient: "from-violet-500 to-fuchsia-400",
      glow: "shadow-violet-500/10",
    },
    {
      title: "Memberships",
      value: data.totalMemberships,
      description: `${data.activeMemberships} active`,
      icon: CreditCard,
      gradient: "from-orange-500 to-amber-400",
      glow: "shadow-orange-500/10",
    },
    {
      title: "Training Sessions",
      value: data.totalTrainingSessions,
      description: "Total sessions",
      icon: CalendarDays,
      gradient: "from-cyan-500 to-blue-500",
      glow: "shadow-cyan-500/10",
    },
    {
      title: "Today's Attendance",
      value: data.todayAttendance,
      description: "Attendance records today",
      icon: CheckCircle2,
      gradient: "from-green-500 to-emerald-400",
      glow: "shadow-green-500/10",
    },
    {
      title: "Expiring Soon",
      value: data.expiringMemberships,
      description: "Within the next 7 days",
      icon: Clock,
      gradient: "from-pink-500 to-rose-400",
      glow: "shadow-pink-500/10",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(data.totalRevenue),
      description: "Successful payments",
      icon: Wallet,
      gradient: "from-indigo-500 to-violet-500",
      glow: "shadow-indigo-500/10",
    },
  ];

  return (
    <div className="relative min-h-full overflow-hidden">
      <DashboardBackground />

      <div className="relative z-10 space-y-6">
        {/* =====================================================
            HERO / HEADER
        ====================================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-linear-to-br
            from-blue-500/8
            via-indigo-500/5
            to-violet-500/8
            p-5
            shadow-2xl
            shadow-black/10
            backdrop-blur-2xl
            sm:p-6
            lg:p-7
          "
        >
          {/* Hero glow */}
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-24
              h-64
              w-64
              rounded-full
              bg-blue-500/15
              blur-[90px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-24
              right-20
              h-52
              w-52
              rounded-full
              bg-violet-500/10
              blur-[80px]
            "
          />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="
                    inline-flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    bg-linear-to-br
                    from-blue-500
                    to-violet-600
                    text-white
                    shadow-lg
                    shadow-blue-500/20
                  "
                >
                  <Activity className="h-4 w-4" />
                </span>

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                  Fitness Overview
                </span>
              </div>

              <h1
                className="
                  bg-gradient-to-r
                  from-white
                  via-blue-100
                  to-violet-200
                  bg-clip-text
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-transparent
                  sm:text-4xl
                "
              >
                Dashboard
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Monitor your fitness center, members,
                training activity, memberships and
                revenue from one place.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => refetch()}
              disabled={isFetching}
              className="
                w-full
                rounded-xl
                border-white/10
                bg-white/[0.04]
                text-slate-300
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-blue-500/30
                hover:bg-blue-500/10
                hover:text-white
                sm:w-auto
              "
            >
              <RefreshCw
                className={[
                  "mr-2 h-4 w-4",
                  isFetching ? "animate-spin" : "",
                ].join(" ")}
              />
              Refresh
            </Button>
          </div>
        </section>

        {/* =====================================================
            STATISTICS GRID
        ====================================================== */}

        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">
                Performance Overview
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Real-time statistics from your fitness center.
              </p>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400" />

              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Live
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statistics.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className={[
                    `
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-slate-950/60
                    p-5
                    backdrop-blur-2xl
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-white/20
                    hover:bg-white/[0.05]
                    hover:shadow-2xl
                    ${stat.glow}
                    `,
                  ].join(" ")}
                >
                  {/* Card glow */}
                  <div
                    className={[
                      `
                      pointer-events-none
                      absolute
                      -right-10
                      -top-10
                      h-28
                      w-28
                      rounded-full
                      bg-gradient-to-br
                      opacity-10
                      blur-3xl
                      transition-opacity
                      duration-300
                      group-hover:opacity-30
                      `,
                      stat.gradient,
                    ].join(" ")}
                  />

                  <div className="relative flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {stat.title}
                      </p>

                      <p className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                        {typeof stat.value === "number"
                          ? stat.value.toLocaleString()
                          : stat.value}
                      </p>

                      <p className="mt-1.5 text-xs text-slate-500">
                        {stat.description}
                      </p>
                    </div>

                    <div
                      className={[
                        `
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-gradient-to-br
                        text-white
                        shadow-lg
                        transition-all
                        duration-300
                        group-hover:scale-110
                        `,
                        stat.gradient,
                      ].join(" ")}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            MEMBERSHIP OVERVIEW
        ====================================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-slate-950/60
            shadow-2xl
            shadow-black/10
            backdrop-blur-2xl
          "
        >
          {/* Background glow */}
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-52
              w-52
              rounded-full
              bg-indigo-500/10
              blur-[80px]
            "
          />

          {/* Header */}
          <div className="relative flex flex-col gap-3 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <div className="flex items-center gap-2">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-br
                    from-indigo-500
                    to-violet-600
                    text-white
                    shadow-lg
                    shadow-indigo-500/20
                  "
                >
                  <CreditCard className="h-4 w-4" />
                </div>

                <h2 className="font-bold text-white">
                  Membership Overview
                </h2>
              </div>

              <p className="mt-2 text-xs text-slate-500 sm:ml-11">
                Current membership status across the fitness center.
              </p>
            </div>

            <div className="hidden items-center gap-1 text-xs text-slate-500 sm:flex">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              Membership activity
            </div>
          </div>

          {/* Summary */}
          <div className="relative grid gap-px bg-white/5 sm:grid-cols-3">
            <SummaryItem
              label="Total Memberships"
              value={data.totalMemberships}
              icon={CreditCard}
              gradient="from-blue-500 to-cyan-400"
            />

            <SummaryItem
              label="Active Memberships"
              value={data.activeMemberships}
              icon={CheckCircle2}
              gradient="from-emerald-500 to-teal-400"
            />

            <SummaryItem
              label="Expiring Within 7 Days"
              value={data.expiringMemberships}
              icon={Clock}
              gradient="from-orange-500 to-amber-400"
            />
          </div>
        </section>

        {/* =====================================================
            QUICK ACTION / STATUS STRIP
        ====================================================== */}

        <section
          className="
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          <QuickStatus
            icon={Users}
            title="Members"
            description="Manage your fitness community"
            gradient="from-blue-500 to-cyan-400"
          />

          <QuickStatus
            icon={Dumbbell}
            title="Training"
            description="Monitor training sessions"
            gradient="from-violet-500 to-fuchsia-400"
          />

          <QuickStatus
            icon={Wallet}
            title="Revenue"
            description="Track successful payments"
            gradient="from-emerald-500 to-teal-400"
          />
        </section>
      </div>
    </div>
  );
}

/* =============================================================
   SUMMARY ITEM
============================================================= */

function SummaryItem({
  label,
  value,
  icon: Icon,
  gradient,
}: {
  label: string;
  value: number;
  icon: typeof CreditCard;
  gradient: string;
}) {
  return (
    <div
      className="
        group
        relative
        bg-slate-950/70
        p-5
        transition-all
        duration-300
        hover:bg-white/[0.04]
        sm:p-6
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-2xl font-extrabold tracking-tight text-white">
            {value.toLocaleString()}
          </p>
        </div>

        <div
          className={[
            `
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              text-white
              shadow-lg
              transition-transform
              duration-300
              group-hover:scale-110
            `,
            gradient,
          ].join(" ")}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   QUICK STATUS
============================================================= */

function QuickStatus({
  icon: Icon,
  title,
  description,
  gradient,
}: {
  icon: typeof Users;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div
      className="
        group
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-white/10
        bg-slate-950/50
        p-4
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-white/20
        hover:bg-white/[0.05]
      "
    >
      <div
        className={[
          `
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            text-white
            shadow-lg
          `,
          gradient,
        ].join(" ")}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-semibold text-white">
          {title}
        </p>

        <p className="mt-0.5 truncate text-xs text-slate-500">
          {description}
        </p>
      </div>

      <ChevronRight
        className="
          h-4
          w-4
          text-slate-600
          transition-all
          duration-300
          group-hover:translate-x-1
          group-hover:text-blue-400
        "
      />
    </div>
  );
}

/* =============================================================
   DASHBOARD BACKGROUND
============================================================= */

function DashboardBackground() {
  return (
    <>
      {/* Main blue glow */}
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          -top-32
          h-96
          w-96
          rounded-full
          bg-blue-500/[0.06]
          blur-[120px]
        "
      />

      {/* Violet glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-32
          top-40
          h-96
          w-96
          rounded-full
          bg-violet-500/[0.05]
          blur-[120px]
        "
      />

      {/* Cyan glow */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/3
          h-80
          w-80
          rounded-full
          bg-cyan-500/[0.035]
          blur-[120px]
        "
      />

      {/* Subtle grid */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
          [background-size:40px_40px]
        "
      />
    </>
  );
}

/* =============================================================
   CURRENCY
============================================================= */

function formatCurrency(
  value: number,
): string {
  return new Intl.NumberFormat(
    "en-NG",
    {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 2,
    },
  ).format(value);
}