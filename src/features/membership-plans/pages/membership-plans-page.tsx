import { useMemo, useState } from "react";
import {
    CreditCard,
    Layers,
    Plus,
    Search,
    ShieldAlert,
} from "lucide-react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/app/routes/route-paths";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useMembershipPlans } from "@/features/membership-plans/hooks/use-membership-plans";
import {
    canCreateMembershipPlan,
} from "@/features/membership-plans/lib/membership-plan-permissions";
import type {
    MembershipPlan,
    MembershipType,
} from "@/features/membership-plans/types/membership-plan-types";

type PlanFilter = "ALL" | "ACTIVE" | "INACTIVE";

const membershipTypeLabels: Record<MembershipType, string> = {
    BASIC: "Basic",
    STANDARD: "Standard",
    PREMIUM: "Premium",
    CUSTOM: "Custom",
};

export function MembershipPlansPage() {
    const { user } = useAuth();

    const { data: plans = [], isLoading, isError } = useMembershipPlans();

    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState<MembershipType | "ALL">(
        "ALL",
    );
    const [statusFilter, setStatusFilter] = useState<PlanFilter>("ALL");

    const userRoles = user?.roles ?? [];

    /*
     * IMPORTANT:
     * This permission only controls whether the user can CREATE a plan.
     *
     * It must NOT be used to prevent users from viewing this page.
     */
    const canCreate = canCreateMembershipPlan(userRoles);

    const filteredPlans = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        return plans.filter((plan) => {
            const matchesSearch =
                normalizedSearch.length === 0 ||
                plan.name.toLowerCase().includes(normalizedSearch) ||
                plan.description?.toLowerCase().includes(normalizedSearch);

            const matchesType =
                typeFilter === "ALL" || plan.type === typeFilter;

            const matchesStatus =
                statusFilter === "ALL" ||
                (statusFilter === "ACTIVE" && plan.active) ||
                (statusFilter === "INACTIVE" && !plan.active);

            return matchesSearch && matchesType && matchesStatus;
        });
    }, [plans, search, typeFilter, statusFilter]);

    const activePlans = plans.filter((plan) => plan.active).length;
    const inactivePlans = plans.filter((plan) => !plan.active).length;

    return (
        <div className="mx-auto max-w-7xl space-y-6">
            {/* ============================================================
          HEADER
      ============================================================ */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                            <Layers className="h-5 w-5" />
                        </div>

                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                            Membership
                        </span>
                    </div>

                    <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                        Membership Plans
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        View and manage the membership plans available at the fitness
                        center.
                    </p>
                </div>

                {canCreate && (
                    <Link
                        to={`${ROUTES.app.membershipPlans}/new`}
                        className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              px-4
              py-2.5
              text-sm
              font-bold
              text-white
              shadow-lg
              shadow-blue-600/20
              transition
              hover:bg-blue-500
              hover:shadow-blue-500/30
            "
                    >
                        <Plus className="h-4 w-4" />
                        Create Plan
                    </Link>
                )}
            </div>

            {/* ============================================================
          SUMMARY
      ============================================================ */}
            <div className="grid gap-4 sm:grid-cols-3">
                <SummaryCard
                    icon={Layers}
                    label="Total Plans"
                    value={plans.length}
                />

                <SummaryCard
                    icon={CreditCard}
                    label="Active Plans"
                    value={activePlans}
                />

                <SummaryCard
                    icon={ShieldAlert}
                    label="Inactive Plans"
                    value={inactivePlans}
                />
            </div>

            {/* ============================================================
          FILTERS
      ============================================================ */}
            <div
                className="
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.025]
          p-4
          shadow-xl
          shadow-black/10
          backdrop-blur-xl
        "
            >
                <div className="flex flex-col gap-3 lg:flex-row">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search
                            className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-slate-600
              "
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search membership plans..."
                            className="
                w-full
                rounded-xl
                border
                border-white/[0.08]
                bg-[#020617]/70
                py-2.5
                pl-10
                pr-4
                text-sm
                text-white
                outline-none
                transition
                placeholder:text-slate-600
                focus:border-blue-500/40
                focus:ring-2
                focus:ring-blue-500/10
              "
                        />
                    </div>

                    {/* Type */}
                    <select
                        value={typeFilter}
                        onChange={(event) =>
                            setTypeFilter(
                                event.target.value as MembershipType | "ALL",
                            )
                        }
                        className="
              rounded-xl
              border
              border-white/[0.08]
              bg-[#020617]/70
              px-4
              py-2.5
              text-sm
              text-slate-300
              outline-none
              focus:border-blue-500/40
            "
                    >
                        <option value="ALL">All Types</option>
                        <option value="BASIC">Basic</option>
                        <option value="STANDARD">Standard</option>
                        <option value="PREMIUM">Premium</option>
                        <option value="CUSTOM">Custom</option>
                    </select>

                    {/* Status */}
                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(event.target.value as PlanFilter)
                        }
                        className="
              rounded-xl
              border
              border-white/[0.08]
              bg-[#020617]/70
              px-4
              py-2.5
              text-sm
              text-slate-300
              outline-none
              focus:border-blue-500/40
            "
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                    </select>
                </div>
            </div>

            {/* ============================================================
          LOADING
      ============================================================ */}
            {isLoading && (
                <div
                    className="
            rounded-2xl
            border
            border-white/[0.08]
            bg-white/[0.025]
            p-12
            text-center
          "
                >
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-blue-500/20 border-t-blue-500" />

                    <p className="mt-4 text-sm text-slate-500">
                        Loading membership plans...
                    </p>
                </div>
            )}

            {/* ============================================================
          ERROR
      ============================================================ */}
            {isError && !isLoading && (
                <div
                    className="
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/[0.04]
            p-6
          "
                >
                    <div className="flex items-start gap-3">
                        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />

                        <div>
                            <h3 className="font-semibold text-red-300">
                                Unable to load membership plans
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                There was a problem retrieving the membership plans.
                                Please try again.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* ============================================================
          EMPTY / NO SEARCH RESULTS
      ============================================================ */}
            {!isLoading && !isError && filteredPlans.length === 0 && (
                <div
                    className="
            rounded-2xl
            border
            border-white/[0.08]
            bg-white/[0.025]
            p-12
            text-center
          "
                >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                        <Layers className="h-6 w-6" />
                    </div>

                    <h3 className="mt-4 text-base font-bold text-white">
                        {plans.length === 0
                            ? "No membership plans found"
                            : "No matching plans"}
                    </h3>

                    <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
                        {plans.length === 0
                            ? "There are currently no membership plans available."
                            : "Try changing your search or filters."}
                    </p>

                    {canCreate && plans.length === 0 && (
                        <Link
                            to={`${ROUTES.app.membershipPlans}/new`}
                            className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-blue-600
                px-4
                py-2.5
                text-sm
                font-bold
                text-white
                transition
                hover:bg-blue-500
              "
                        >
                            <Plus className="h-4 w-4" />
                            Create your first plan
                        </Link>
                    )}
                </div>
            )}

            {/* ============================================================
          TABLE
      ============================================================ */}
            {!isLoading && !isError && filteredPlans.length > 0 && (
                <div
                    className="
            overflow-hidden
            rounded-2xl
            border
            border-white/[0.08]
            bg-white/[0.025]
            shadow-xl
            shadow-black/10
          "
                >
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px]">
                            <thead>
                                <tr className="border-b border-white/[0.08] text-left">
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-600">
                                        Plan
                                    </th>

                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-600">
                                        Type
                                    </th>

                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-600">
                                        Price
                                    </th>

                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-600">
                                        Duration
                                    </th>

                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-600">
                                        Visits
                                    </th>

                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-600">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-[0.15em] text-slate-600">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-white/[0.06]">
                                {filteredPlans.map((plan) => (
                                    <MembershipPlanRow
                                        key={plan.id}
                                        plan={plan}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="border-t border-white/[0.06] px-6 py-4">
                        <p className="text-xs text-slate-600">
                            Showing{" "}
                            <span className="font-semibold text-slate-400">
                                {filteredPlans.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-slate-400">
                                {plans.length}
                            </span>{" "}
                            membership plans
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ================================================================
   SUMMARY CARD
================================================================ */

interface SummaryCardProps {
    icon: typeof Layers;
    label: string;
    value: number;
}

function SummaryCard({
    icon: Icon,
    label,
    value,
}: SummaryCardProps) {
    return (
        <div
            className="
        rounded-2xl
        border
        border-white/[0.08]
        bg-white/[0.025]
        p-5
        shadow-xl
        shadow-black/10
      "
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-600">
                        {label}
                    </p>

                    <p className="mt-2 text-2xl font-black text-white">
                        {value}
                    </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <Icon className="h-5 w-5" />
                </div>
            </div>
        </div>
    );
}

/* ================================================================
   PLAN ROW
================================================================ */

interface MembershipPlanRowProps {
    plan: MembershipPlan;
}

function MembershipPlanRow({
    plan,
}: MembershipPlanRowProps) {
    return (
        <tr className="transition-colors hover:bg-white/[0.02]">
            {/* Plan */}
            <td className="px-6 py-4">
                <div>
                    <p className="font-semibold text-white">
                        {plan.name}
                    </p>

                    {plan.description && (
                        <p className="mt-1 max-w-xs truncate text-xs text-slate-600">
                            {plan.description}
                        </p>
                    )}
                </div>
            </td>

            {/* Type */}
            <td className="px-6 py-4">
                <span className="rounded-lg bg-white/[0.05] px-2.5 py-1 text-xs font-semibold text-slate-400">
                    {membershipTypeLabels[plan.type]}
                </span>
            </td>

            {/* Price */}
            <td className="px-6 py-4">
                <span className="font-bold text-white">
                    ₦{plan.price.toLocaleString("en-NG")}
                </span>
            </td>

            {/* Duration */}
            <td className="px-6 py-4">
                <span className="text-sm text-slate-400">
                    {plan.durationInDays}{" "}
                    {plan.durationInDays === 1 ? "day" : "days"}
                </span>
            </td>

            {/* Visits */}
            <td className="px-6 py-4">
                <span className="text-sm text-slate-400">
                    {plan.maxVisitsPerMonth}/month
                </span>
            </td>

            {/* Status */}
            <td className="px-6 py-4">
                <span
                    className={[
                        "inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold",
                        plan.active
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-slate-500/10 text-slate-500",
                    ].join(" ")}
                >
                    <span
                        className={[
                            "h-1.5 w-1.5 rounded-full",
                            plan.active
                                ? "bg-emerald-400"
                                : "bg-slate-500",
                        ].join(" ")}
                    />

                    {plan.active ? "Active" : "Inactive"}
                </span>
            </td>

            {/* Action */}
            <td className="px-6 py-4 text-right">
                <Link
                    to={`${ROUTES.app.membershipPlans}/${plan.id}`}
                    className="
            inline-flex
            items-center
            rounded-lg
            border
            border-white/[0.08]
            px-3
            py-1.5
            text-xs
            font-semibold
            text-slate-400
            transition
            hover:border-blue-500/20
            hover:bg-blue-500/10
            hover:text-blue-400
          "
                >
                    View
                </Link>
            </td>
        </tr>
    );
}