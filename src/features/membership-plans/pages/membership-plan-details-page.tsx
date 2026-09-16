import {
    ArrowLeft,
    CalendarDays,
    CreditCard,
    ShieldAlert,
} from "lucide-react";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    useMembershipPlan,
} from "@/features/membership-plans/hooks/use-membership-plan";

import {
    useDeactivateMembershipPlan,
} from "@/features/membership-plans/hooks/use-membership-plan-mutations";

import {
    canDeactivateMembershipPlan,
    canUpdateMembershipPlan,
} from "@/features/membership-plans/lib/membership-plan-permissions";

import {
    useAuth,
} from "@/features/auth/hooks/use-auth";

import {
    ROUTES,
} from "@/app/routes/route-paths";

export function MembershipPlanDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const planId = Number(id);

    const {
        user: currentUser,
    } = useAuth();

    const currentUserRoles =
        currentUser?.roles ?? [];

    const validPlanId =
        Number.isFinite(planId) && planId > 0
            ? planId
            : undefined;

    const {
        data: selectedPlan,
        isLoading,
        isError,
    } = useMembershipPlan(validPlanId);

    const deactivateMembershipPlan =
        useDeactivateMembershipPlan();

    /*
     * ============================
     * Loading
     * ============================
     */

    if (isLoading) {
        return (
            <div className="flex min-h-60 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Loading membership plan...
                </p>
            </div>
        );
    }

    /*
     * ============================
     * Error / Not Found
     * ============================
     */

    if (isError || !selectedPlan) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                    <ShieldAlert className="mx-auto h-10 w-10 text-muted-foreground" />

                    <h1 className="mt-3 text-lg font-semibold">
                        Membership plan not found
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        The requested membership plan could not
                        be loaded.
                    </p>

                    <Link
                        to={ROUTES.app.membershipPlans}
                        className="mt-4 inline-flex rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                    >
                        Back to membership plans
                    </Link>
                </div>
            </div>
        );
    }

    /*
     * ============================
     * Plan is guaranteed to exist
     * after the guard above.
     * ============================
     */

    const plan = selectedPlan;

    const canEdit = canUpdateMembershipPlan(
        currentUserRoles,
    );

    const canDeactivate =
        canDeactivateMembershipPlan(
            currentUserRoles,
        );

    /*
     * ============================
     * Deactivate
     * ============================
     */

    function handleDeactivate() {
        if (!canDeactivate || !plan.active) {
            return;
        }

        deactivateMembershipPlan.mutate(
            plan.id,
            {
                onSuccess: () => {
                    navigate(
                        ROUTES.app.membershipPlans,
                    );
                },
            },
        );
    }

    return (
        <div className="space-y-6">
            {/* =========================
                Header
                ========================= */}

            <div className="flex flex-col gap-4">
                <Link
                    to={ROUTES.app.membershipPlans}
                    className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to membership plans
                </Link>

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {plan.name}
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Membership plan configuration
                            and pricing details.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {canEdit && (
                            <Link
                                to={`${ROUTES.app.membershipPlans}/${plan.id}/edit`}
                                className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                            >
                                Edit plan
                            </Link>
                        )}

                        {canDeactivate &&
                            plan.active && (
                                <button
                                    type="button"
                                    onClick={
                                        handleDeactivate
                                    }
                                    disabled={
                                        deactivateMembershipPlan.isPending
                                    }
                                    className="rounded-md border border-destructive/30 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {deactivateMembershipPlan.isPending
                                        ? "Deactivating..."
                                        : "Deactivate plan"}
                                </button>
                            )}
                    </div>
                </div>
            </div>

            {/* =========================
                Status
                ========================= */}

            <section className="rounded-lg border p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="font-semibold">
                            Plan status
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Current availability of this
                            membership plan.
                        </p>
                    </div>

                    <span
                        className={
                            plan.active
                                ? "inline-flex w-fit rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-600"
                                : "inline-flex w-fit rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground"
                        }
                    >
                        {plan.active
                            ? "Active"
                            : "Inactive"}
                    </span>
                </div>
            </section>

            {/* =========================
                Overview
                ========================= */}

            <div className="grid gap-6 lg:grid-cols-3">
                <section className="rounded-lg border p-6 lg:col-span-2">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <CreditCard className="h-5 w-5 text-primary" />
                        </div>

                        <div>
                            <h2 className="font-semibold">
                                Plan information
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Core membership plan
                                configuration.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Plan name
                            </p>

                            <p className="mt-1 text-sm font-medium">
                                {plan.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Type
                            </p>

                            <p className="mt-1 text-sm font-medium">
                                {plan.type}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Price
                            </p>

                            <p className="mt-1 text-sm font-medium">
                                {plan.price.toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Duration
                            </p>

                            <p className="mt-1 text-sm font-medium">
                                {plan.durationInDays}{" "}
                                {plan.durationInDays === 1
                                    ? "day"
                                    : "days"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Maximum visits
                            </p>

                            <p className="mt-1 text-sm font-medium">
                                {plan.maxVisitsPerMonth}{" "}
                                per month
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Auto renewal
                            </p>

                            <p className="mt-1 text-sm font-medium">
                                {plan.autoRenewable
                                    ? "Enabled"
                                    : "Disabled"}
                            </p>
                        </div>
                    </div>
                </section>

                {/* =========================
                    Duration
                    ========================= */}

                <section className="rounded-lg border p-6">
                    <div className="flex items-center gap-3">
                        <CalendarDays className="h-5 w-5 text-primary" />

                        <h2 className="font-semibold">
                            Membership period
                        </h2>
                    </div>

                    <div className="mt-5">
                        <p className="text-xs text-muted-foreground">
                            Duration
                        </p>

                        <p className="mt-1 text-2xl font-bold">
                            {plan.durationInDays}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            {plan.durationInDays === 1
                                ? "day"
                                : "days"}
                        </p>
                    </div>

                    <div className="mt-5 border-t pt-5">
                        <p className="text-xs text-muted-foreground">
                            Monthly visit allowance
                        </p>

                        <p className="mt-1 text-lg font-semibold">
                            {plan.maxVisitsPerMonth}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            visits per month
                        </p>
                    </div>
                </section>
            </div>

            {/* =========================
                Description
                ========================= */}

            <section className="rounded-lg border p-6">
                <h2 className="font-semibold">
                    Description
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Information about this membership
                    plan.
                </p>

                <div className="mt-5">
                    {plan.description ? (
                        <p className="whitespace-pre-wrap text-sm leading-6">
                            {plan.description}
                        </p>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            No description provided.
                        </p>
                    )}
                </div>
            </section>

            {/* =========================
                Configuration
                ========================= */}

            <section className="rounded-lg border p-6">
                <h2 className="font-semibold">
                    Configuration
                </h2>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                        <p className="text-xs text-muted-foreground">
                            Auto renewable
                        </p>

                        <p className="mt-1 text-sm font-medium">
                            {plan.autoRenewable
                                ? "Yes"
                                : "No"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-muted-foreground">
                            Availability
                        </p>

                        <p className="mt-1 text-sm font-medium">
                            {plan.active
                                ? "Available for new memberships"
                                : "Unavailable for new memberships"}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}