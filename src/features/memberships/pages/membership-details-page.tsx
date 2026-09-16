
import { useNavigate, useParams } from "react-router-dom";

import { ROUTES } from "@/app/routes/route-paths";

import { useMembership } from "@/features/memberships/hooks/use-membership";
import {
    useCancelMembership,
    useSuspendMembership,
} from "@/features/memberships/hooks/use-membership-mutations";

import type { MembershipStatus } from "@/features/memberships/types/membership-types";

import { PaymentButton } from "@/features/payments/components/payment-button";

function formatDate(value: string): string {
    return new Intl.DateTimeFormat("en-NG", {
        dateStyle: "medium",
    }).format(new Date(value));
}

function formatPrice(value: number): string {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
    }).format(value);
}

function getStatusClass(status: MembershipStatus): string {
    switch (status) {
        case "ACTIVE":
            return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300";

        case "PENDING":
            return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300";

        case "SUSPENDED":
            return "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300";

        case "EXPIRED":
            return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";

        case "CANCELLED":
            return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";

        default:
            return "bg-gray-100 text-gray-700";
    }
}

export function MembershipDetailsPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const membershipId = id ? Number(id) : undefined;

    const {
        data: membership,
        isLoading,
        error,
    } = useMembership(membershipId);

    const suspendMutation = useSuspendMembership();
    const cancelMutation = useCancelMembership();

    /**
     * Validate membership ID
     */
    if (!membershipId || Number.isNaN(membershipId)) {
        return (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
                Invalid membership ID.
            </div>
        );
    }

    /**
     * Loading state
     */
    if (isLoading) {
        return (
            <div className="text-sm text-muted-foreground">
                Loading membership...
            </div>
        );
    }

    /**
     * Error state
     */
    if (error || !membership) {
        return (
            <div className="space-y-4">
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
                    Failed to load membership.
                </div>

                <button
                    type="button"
                    onClick={() =>
                        navigate(ROUTES.app.memberships)
                    }
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    Back to Memberships
                </button>
            </div>
        );
    }

    /**
     * Capture the membership ID after the
     * membership existence check above.
     *
     * This guarantees the mutation functions
     * always receive a number.
     */
    const currentMembershipId = membership.id;

    /**
     * Membership actions
     */
    function handleSuspend() {
        suspendMutation.mutate(currentMembershipId);
    }

    function handleCancel() {
        cancelMutation.mutate(currentMembershipId);
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Membership Details
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        View and manage this membership.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        navigate(ROUTES.app.memberships)
                    }
                    className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                    Back to Memberships
                </button>
            </div>

            {/* Status and Actions */}
            <div className="flex flex-col gap-4 rounded-lg border p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Status
                    </p>

                    <span
                        className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-medium ${getStatusClass(
                            membership.status,
                        )}`}
                    >
                        {membership.status}
                    </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {/* Pending Membership */}
                    {membership.status === "PENDING" && (
                        <>
                            <PaymentButton
                                membershipId={membership.id}
                            />

                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={cancelMutation.isPending}
                                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {cancelMutation.isPending
                                    ? "Cancelling..."
                                    : "Cancel"}
                            </button>
                        </>
                    )}

                    {/* Active Membership */}
                    {membership.status === "ACTIVE" && (
                        <>
                            <button
                                type="button"
                                onClick={handleSuspend}
                                disabled={suspendMutation.isPending}
                                className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {suspendMutation.isPending
                                    ? "Suspending..."
                                    : "Suspend"}
                            </button>

                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={cancelMutation.isPending}
                                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {cancelMutation.isPending
                                    ? "Cancelling..."
                                    : "Cancel"}
                            </button>
                        </>
                    )}

                    {/* Suspended Membership */}
                    {membership.status === "SUSPENDED" && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={cancelMutation.isPending}
                            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {cancelMutation.isPending
                                ? "Cancelling..."
                                : "Cancel"}
                        </button>
                    )}
                </div>
            </div>

            {/* Membership Information */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Member Information */}
                <div className="rounded-lg border p-6">
                    <h2 className="mb-4 text-lg font-semibold">
                        Member Information
                    </h2>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">
                                Name
                            </span>

                            <span className="text-right font-medium">
                                {membership.userName}
                            </span>
                        </div>

                        <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">
                                User ID
                            </span>

                            <span className="font-medium">
                                {membership.userId}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Plan Information */}
                <div className="rounded-lg border p-6">
                    <h2 className="mb-4 text-lg font-semibold">
                        Plan Information
                    </h2>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">
                                Plan
                            </span>

                            <span className="text-right font-medium">
                                {membership.planName}
                            </span>
                        </div>

                        <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">
                                Price
                            </span>

                            <span className="font-medium">
                                {formatPrice(membership.price)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Dates */}
                <div className="rounded-lg border p-6">
                    <h2 className="mb-4 text-lg font-semibold">
                        Dates
                    </h2>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">
                                Start Date
                            </span>

                            <span className="font-medium">
                                {formatDate(
                                    membership.startDate,
                                )}
                            </span>
                        </div>

                        <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">
                                End Date
                            </span>

                            <span className="font-medium">
                                {formatDate(
                                    membership.endDate,
                                )}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Settings */}
                <div className="rounded-lg border p-6">
                    <h2 className="mb-4 text-lg font-semibold">
                        Settings
                    </h2>

                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">
                                Auto Renewable
                            </span>

                            <span className="font-medium">
                                {membership.autoRenewable
                                    ? "Yes"
                                    : "No"}
                            </span>
                        </div>

                        <div>
                            <span className="text-muted-foreground">
                                Notes
                            </span>

                            <p className="mt-2">
                                {membership.notes ||
                                    "No notes added."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
