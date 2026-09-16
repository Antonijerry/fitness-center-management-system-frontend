import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/app/routes/route-paths";
import { useMemberships } from "@/features/memberships/hooks/use-memberships";
import type {
    Membership,
    MembershipStatus,
} from "@/features/memberships/types/membership-types";

const STATUS_OPTIONS: Array<"ALL" | MembershipStatus> = [
    "ALL",
    "PENDING",
    "ACTIVE",
    "EXPIRED",
    "SUSPENDED",
    "CANCELLED",
];

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

export function MembershipsPage() {
    const { data: memberships = [], isLoading, error } = useMemberships();

    const [search, setSearch] = useState("");
    const [status, setStatus] =
        useState<"ALL" | MembershipStatus>("ALL");

    const filteredMemberships = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        return memberships.filter((membership: Membership) => {
            const matchesSearch =
                normalizedSearch.length === 0 ||
                membership.userName.toLowerCase().includes(normalizedSearch) ||
                membership.planName.toLowerCase().includes(normalizedSearch) ||
                membership.userId.toString().includes(normalizedSearch);

            const matchesStatus =
                status === "ALL" || membership.status === status;

            return matchesSearch && matchesStatus;
        });
    }, [memberships, search, status]);

    const totalCount = memberships.length;

    const activeCount = memberships.filter(
        (membership) => membership.status === "ACTIVE",
    ).length;

    const pendingCount = memberships.filter(
        (membership) => membership.status === "PENDING",
    ).length;

    const suspendedCount = memberships.filter(
        (membership) => membership.status === "SUSPENDED",
    ).length;

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Memberships
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage member subscriptions and membership status.
                    </p>
                </div>

                <div className="rounded-lg border p-6 text-sm text-muted-foreground">
                    Loading memberships...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Memberships
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage member subscriptions and membership status.
                    </p>
                </div>

                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
                    Failed to load memberships.
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Memberships
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Manage member subscriptions and membership status.
                    </p>
                </div>

                <Link
                    to={ROUTES.app.membershipCreate}
                    className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    Create Membership
                </Link>
            </div>

            {/* Summary */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border bg-background p-5">
                    <p className="text-sm text-muted-foreground">
                        Total
                    </p>

                    <p className="mt-2 text-2xl font-semibold">
                        {totalCount}
                    </p>
                </div>

                <div className="rounded-lg border bg-background p-5">
                    <p className="text-sm text-muted-foreground">
                        Active
                    </p>

                    <p className="mt-2 text-2xl font-semibold">
                        {activeCount}
                    </p>
                </div>

                <div className="rounded-lg border bg-background p-5">
                    <p className="text-sm text-muted-foreground">
                        Pending
                    </p>

                    <p className="mt-2 text-2xl font-semibold">
                        {pendingCount}
                    </p>
                </div>

                <div className="rounded-lg border bg-background p-5">
                    <p className="text-sm text-muted-foreground">
                        Suspended
                    </p>

                    <p className="mt-2 text-2xl font-semibold">
                        {suspendedCount}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-3 sm:flex-row">
                <input
                    type="search"
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                    placeholder="Search member or plan..."
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 sm:max-w-md"
                />

                <select
                    value={status}
                    onChange={(event) =>
                        setStatus(
                            event.target.value as
                            | "ALL"
                            | MembershipStatus,
                        )
                    }
                    className="rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {STATUS_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                            {option === "ALL" ? "All statuses" : option}
                        </option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-lg border">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">
                                    Member
                                </th>

                                <th className="px-4 py-3 text-left font-medium">
                                    Plan
                                </th>

                                <th className="px-4 py-3 text-left font-medium">
                                    Start Date
                                </th>

                                <th className="px-4 py-3 text-left font-medium">
                                    End Date
                                </th>

                                <th className="px-4 py-3 text-left font-medium">
                                    Price
                                </th>

                                <th className="px-4 py-3 text-left font-medium">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-right font-medium">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredMemberships.map((membership) => (
                                <tr
                                    key={membership.id}
                                    className="border-b last:border-b-0"
                                >
                                    <td className="px-4 py-4">
                                        <div className="font-medium">
                                            {membership.userName}
                                        </div>

                                        <div className="text-xs text-muted-foreground">
                                            User #{membership.userId}
                                        </div>
                                    </td>

                                    <td className="px-4 py-4">
                                        {membership.planName}
                                    </td>

                                    <td className="px-4 py-4">
                                        {formatDate(membership.startDate)}
                                    </td>

                                    <td className="px-4 py-4">
                                        {formatDate(membership.endDate)}
                                    </td>

                                    <td className="px-4 py-4">
                                        {formatPrice(membership.price)}
                                    </td>

                                    <td className="px-4 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                                                membership.status,
                                            )}`}
                                        >
                                            {membership.status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-4 text-right">
                                        <Link
                                            to={ROUTES.app.membershipDetails(
                                                membership.id,
                                            )}
                                            className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {filteredMemberships.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-4 py-10 text-center text-sm text-muted-foreground"
                                    >
                                        No memberships found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}