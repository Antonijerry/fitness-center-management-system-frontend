import { useState } from "react";

import { createMembershipSchema } from "@/features/memberships/schemas/membership-schema";
import type {
    CreateMembershipRequest,
} from "@/features/memberships/types/membership-types";

import type { MemberProfile } from "@/features/members/types/member-types";
import type { MembershipPlan } from "@/features/membership-plans/types/membership-plan-types";

interface MembershipFormProps {
    members: MemberProfile[];
    plans: MembershipPlan[];
    isLoadingMembers?: boolean;
    isLoadingPlans?: boolean;
    isSubmitting?: boolean;
    submitLabel?: string;
    onSubmit: (values: CreateMembershipRequest) => void;
}

export function MembershipForm({
    members,
    plans,
    isLoadingMembers = false,
    isLoadingPlans = false,
    isSubmitting = false,
    submitLabel = "Save",
    onSubmit,
}: MembershipFormProps) {
    const [userId, setUserId] = useState("");
    const [planId, setPlanId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [autoRenewable, setAutoRenewable] = useState(false);
    const [notes, setNotes] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();
        setError("");

        const values = {
            userId: Number(userId),
            planId: Number(planId),
            startDate,
            autoRenewable,
            notes: notes.trim() || undefined,
        };

        const result =
            createMembershipSchema.safeParse(values);

        if (!result.success) {
            setError(
                result.error.issues[0]?.message ??
                "Please check the form.",
            );
            return;
        }

        onSubmit(result.data);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
                    {error}
                </div>
            )}

            {/* Member */}
            <div className="space-y-2">
                <label
                    htmlFor="member"
                    className="text-sm font-medium"
                >
                    Member
                </label>

                <select
                    id="member"
                    value={userId}
                    onChange={(event) =>
                        setUserId(event.target.value)
                    }
                    disabled={isSubmitting || isLoadingMembers}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <option value="">
                        {isLoadingMembers
                            ? "Loading members..."
                            : "Select a member"}
                    </option>

                    {members.map((member) => (
                        <option
                            key={member.id}
                            value={member.userId}
                        >
                            {member.memberNumber} -{" "}
                            {member.firstName} {member.lastName} (
                            {member.email})
                        </option>
                    ))}
                </select>
            </div>

            {/* Membership plan */}
            <div className="space-y-2">
                <label
                    htmlFor="plan"
                    className="text-sm font-medium"
                >
                    Membership Plan
                </label>

                <select
                    id="plan"
                    value={planId}
                    onChange={(event) =>
                        setPlanId(event.target.value)
                    }
                    disabled={isSubmitting || isLoadingPlans}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <option value="">
                        {isLoadingPlans
                            ? "Loading membership plans..."
                            : "Select a membership plan"}
                    </option>

                    {plans.map((plan) => (
                        <option
                            key={plan.id}
                            value={plan.id}
                        >
                            {plan.name} -{" "}
                            {new Intl.NumberFormat("en-NG", {
                                style: "currency",
                                currency: "NGN",
                            }).format(plan.price)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Start date */}
            <div className="space-y-2">
                <label
                    htmlFor="startDate"
                    className="text-sm font-medium"
                >
                    Start Date
                </label>

                <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    min={new Date()
                        .toISOString()
                        .split("T")[0]}
                    onChange={(event) =>
                        setStartDate(event.target.value)
                    }
                    disabled={isSubmitting}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>

            {/* Auto renewal */}
            <div className="flex items-center gap-3">
                <input
                    id="autoRenewable"
                    type="checkbox"
                    checked={autoRenewable}
                    onChange={(event) =>
                        setAutoRenewable(event.target.checked)
                    }
                    disabled={isSubmitting}
                    className="h-4 w-4 rounded border"
                />

                <label
                    htmlFor="autoRenewable"
                    className="text-sm font-medium"
                >
                    Auto renew membership
                </label>
            </div>

            {/* Notes */}
            <div className="space-y-2">
                <label
                    htmlFor="notes"
                    className="text-sm font-medium"
                >
                    Notes
                </label>

                <textarea
                    id="notes"
                    value={notes}
                    onChange={(event) =>
                        setNotes(event.target.value)
                    }
                    maxLength={500}
                    rows={4}
                    disabled={isSubmitting}
                    placeholder="Optional membership notes..."
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isSubmitting
                    ? "Creating..."
                    : submitLabel}
            </button>
        </form>
    );
}