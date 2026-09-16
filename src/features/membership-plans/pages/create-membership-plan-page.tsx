import {
  ArrowLeft,
  ShieldAlert,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  MembershipPlanForm,
} from "@/features/membership-plans/components/membership-plan-form";

import {
  useCreateMembershipPlan,
} from "@/features/membership-plans/hooks/use-membership-plan-mutations";

import {
  canCreateMembershipPlan,
} from "@/features/membership-plans/lib/membership-plan-permissions";

import {
  useAuth,
} from "@/features/auth/hooks/use-auth";

import {
  ROUTES,
} from "@/app/routes/route-paths";

import type {
  CreateMembershipPlanRequest,
} from "@/features/membership-plans/types/membership-plan-types";

export function CreateMembershipPlanPage() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const currentUserRoles =
    user?.roles ?? [];

  const canCreate =
    canCreateMembershipPlan(
      currentUserRoles,
    );

  const createMembershipPlan =
    useCreateMembershipPlan();

  if (!canCreate) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <ShieldAlert className="mx-auto h-10 w-10 text-muted-foreground" />

          <h1 className="mt-3 text-lg font-semibold">
            Access denied
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            You do not have permission to
            create membership plans.
          </p>
        </div>
      </div>
    );
  }

  function handleSubmit(
    values: CreateMembershipPlanRequest,
  ) {
    createMembershipPlan.mutate(
      values,
      {
        onSuccess: (createdPlan) => {
          navigate(
            `${ROUTES.app.membershipPlans}/${createdPlan.id}`,
          );
        },
      },
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        to={ROUTES.app.membershipPlans}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to membership plans
      </Link>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Create membership plan
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Create a new membership plan for
          your fitness centre.
        </p>
      </div>

      {createMembershipPlan.isError && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          Unable to create the membership
          plan. Please check the information
          and try again.
        </div>
      )}

      <div className="rounded-lg border p-6">
        <MembershipPlanForm
          isSubmitting={
            createMembershipPlan.isPending
          }
          submitLabel="Create plan"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}