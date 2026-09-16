import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/app/routes/route-paths";
import { useMembers } from "@/features/members/hooks/use-members";
import { useActiveMembershipPlans } from "@/features/membership-plans/hooks/use-active-membership-plans";
import { MembershipForm } from "@/features/memberships/components/membership-form";
import { useCreateMembership } from "@/features/memberships/hooks/use-membership-mutations";
import type { CreateMembershipRequest } from "@/features/memberships/types/membership-types";

export function CreateMembershipPage() {
    const navigate = useNavigate();

    const {
        data: members = [],
        isLoading: isLoadingMembers,
    } = useMembers();

    const {
        data: plans = [],
        isLoading: isLoadingPlans,
    } = useActiveMembershipPlans();

    const createMembershipMutation =
        useCreateMembership();

    function handleSubmit(
        values: CreateMembershipRequest,
    ) {
        createMembershipMutation.mutate(values, {
            onSuccess: () => {
                navigate(ROUTES.app.memberships);
            },
        });
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">
                    Create Membership
                </h1>

                <p className="text-sm text-muted-foreground">
                    Assign an active membership plan to a member.
                </p>
            </div>

            <MembershipForm
                members={members}
                plans={plans}
                isLoadingMembers={isLoadingMembers}
                isLoadingPlans={isLoadingPlans}
                isSubmitting={
                    createMembershipMutation.isPending
                }
                submitLabel="Create Membership"
                onSubmit={handleSubmit}
            />
        </div>
    );
}