import {
    ArrowLeft,
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
    useUpdateMembershipPlan,
} from "@/features/membership-plans/hooks/use-membership-plan-mutations";

import {
    MembershipPlanForm,
} from "@/features/membership-plans/components/membership-plan-form";

import type {
    UpdateMembershipPlanRequest,
} from "@/features/membership-plans/types/membership-plan-types";

import {
    ROUTES,
} from "@/app/routes/route-paths";

type MembershipPlanFormValues = Omit<
    UpdateMembershipPlanRequest,
    "active"
> & {
    active?: boolean;
};

export function EditMembershipPlanPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const planId = Number(id);

    const {
        data: selectedPlan,
        isLoading,
        isError,
    } = useMembershipPlan(
        Number.isFinite(planId)
            ? planId
            : undefined,
    );

    const updateMembershipPlan =
        useUpdateMembershipPlan();

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

    if (
        isError ||
        !selectedPlan
    ) {
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

    /*
     * ============================
     * Submit
     * ============================
     */

    function handleSubmit(
        values: MembershipPlanFormValues,
    ) {
        updateMembershipPlan.mutate(
            {
                id: plan.id,
                request: {
                    ...values,
                    active: values.active ?? true,
                },
            },
            {
                onSuccess: () => {
                    navigate(
                        `${ROUTES.app.membershipPlans}/${plan.id}`,
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
                    to={`${ROUTES.app.membershipPlans}/${plan.id}`}
                    className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to membership plan
                </Link>

                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Edit membership plan
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Update the configuration for{" "}
                        <span className="font-medium text-foreground">
                            {plan.name}
                        </span>
                        .
                    </p>
                </div>
            </div>

            {/* =========================
                Form
                ========================= */}

            <div className="rounded-lg border p-6">
                <MembershipPlanForm
                    plan={plan}
                    isSubmitting={
                        updateMembershipPlan.isPending
                    }
                    submitLabel="Update membership plan"
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}