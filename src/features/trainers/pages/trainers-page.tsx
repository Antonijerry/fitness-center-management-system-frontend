import {
    Eye,
    Plus,
    Search,
    UserRound,
    UsersRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/app/routes/route-paths";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useTrainers } from "@/features/trainers/hooks/use-trainers";
import { canManageTrainers } from "@/features/trainers/lib/trainer-permissions";
import type {
    Trainer,
    TrainerStatus,
} from "@/features/trainers/types/trainer-types";

const statusOptions: Array<"ALL" | TrainerStatus> = [
    "ALL",
    "ACTIVE",
    "INACTIVE",
    "SUSPENDED",
];

const statusStyles: Record<TrainerStatus, string> = {
    ACTIVE:
        "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400",
    INACTIVE:
        "bg-slate-100 text-slate-700 ring-slate-600/20 dark:bg-slate-800 dark:text-slate-300",
    SUSPENDED:
        "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400",
};

function formatStatus(status: TrainerStatus): string {
    return status.charAt(0) + status.slice(1).toLowerCase();
}

function formatHourlyRate(rate: number | null): string {
    if (rate === null) {
        return "Not set";
    }

    return `₦${rate.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}/hr`;
}

function getTrainerFullName(trainer: Trainer): string {
    return `${trainer.firstName} ${trainer.lastName}`;
}

export function TrainersPage() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const trainersQuery = useTrainers();

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] =
        useState<"ALL" | TrainerStatus>("ALL");

    const roles = user?.roles ?? [];

    const filteredTrainers = useMemo(() => {
        const trainers = trainersQuery.data ?? [];

        const normalizedSearch = search.trim().toLowerCase();

        return trainers.filter((trainer) => {
            const matchesSearch =
                !normalizedSearch ||
                getTrainerFullName(trainer)
                    .toLowerCase()
                    .includes(normalizedSearch) ||
                trainer.email.toLowerCase().includes(normalizedSearch) ||
                trainer.employeeNumber
                    .toLowerCase()
                    .includes(normalizedSearch) ||
                trainer.specialization
                    .toLowerCase()
                    .includes(normalizedSearch);

            const matchesStatus =
                statusFilter === "ALL" ||
                trainer.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [trainersQuery.data, search, statusFilter]);

    const showCreateButton = canManageTrainers(roles);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                            <UsersRound className="h-5 w-5" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Trainers
                            </h1>

                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Manage fitness centre trainers and their professional profiles.
                            </p>
                        </div>
                    </div>
                </div>

                {showCreateButton && (
                    <button
                        type="button"
                        onClick={() => navigate(ROUTES.app.trainerCreate)}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <Plus className="h-4 w-4" />
                        Add Trainer
                    </button>
                )}
            </div>

            {/* Filters */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search by name, email, employee number or specialization..."
                            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        />
                    </div>

                    {/* Status */}
                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(
                                event.target.value as "ALL" | TrainerStatus,
                            )
                        }
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                    >
                        {statusOptions.map((status) => (
                            <option key={status} value={status}>
                                {status === "ALL"
                                    ? "All statuses"
                                    : formatStatus(status)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Loading */}
            {trainersQuery.isLoading && (
                <div className="rounded-xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400" />

                    <p className="mt-4 text-sm text-slate-500">
                        Loading trainers...
                    </p>
                </div>
            )}

            {/* Error */}
            {trainersQuery.isError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-950/20">
                    <h2 className="font-semibold text-red-700 dark:text-red-400">
                        Unable to load trainers
                    </h2>

                    <p className="mt-1 text-sm text-red-600/80 dark:text-red-400/80">
                        Something went wrong while retrieving trainers.
                    </p>

                    <button
                        type="button"
                        onClick={() => trainersQuery.refetch()}
                        className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Content */}
            {!trainersQuery.isLoading &&
                !trainersQuery.isError &&
                filteredTrainers.length === 0 && (
                    <div className="rounded-xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
                        <UserRound className="mx-auto h-10 w-10 text-slate-400" />

                        <h2 className="mt-4 font-semibold text-slate-900 dark:text-white">
                            No trainers found
                        </h2>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Try adjusting your search or status filter.
                        </p>
                    </div>
                )}

            {/* Desktop table */}
            {!trainersQuery.isLoading &&
                !trainersQuery.isError &&
                filteredTrainers.length > 0 && (
                    <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:block dark:border-slate-800 dark:bg-slate-900">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">
                                            Trainer
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">
                                            Employee No.
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">
                                            Specialization
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">
                                            Experience
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">
                                            Rate
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-right font-semibold text-slate-600 dark:text-slate-300">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                    {filteredTrainers.map((trainer) => (
                                        <tr
                                            key={trainer.id}
                                            className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-sm font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                                        {trainer.firstName.charAt(0)}
                                                        {trainer.lastName.charAt(0)}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="font-medium text-slate-900 dark:text-white">
                                                            {getTrainerFullName(trainer)}
                                                        </p>

                                                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                                                            {trainer.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                                {trainer.employeeNumber}
                                            </td>

                                            <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                                {trainer.specialization}
                                            </td>

                                            <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                                {trainer.yearsOfExperience !== null
                                                    ? `${trainer.yearsOfExperience} ${trainer.yearsOfExperience === 1
                                                        ? "year"
                                                        : "years"
                                                    }`
                                                    : "Not specified"}
                                            </td>

                                            <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                                {formatHourlyRate(trainer.hourlyRate)}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[trainer.status]
                                                        }`}
                                                >
                                                    {formatStatus(trainer.status)}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        navigate(
                                                            ROUTES.app.trainerDetails(trainer.id),
                                                        )
                                                    }
                                                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            {/* Mobile cards */}
            {!trainersQuery.isLoading &&
                !trainersQuery.isError &&
                filteredTrainers.length > 0 && (
                    <div className="grid gap-4 md:hidden">
                        {filteredTrainers.map((trainer) => (
                            <div
                                key={trainer.id}
                                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600/10 font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                            {trainer.firstName.charAt(0)}
                                            {trainer.lastName.charAt(0)}
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                                {getTrainerFullName(trainer)}
                                            </h3>

                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                {trainer.employeeNumber}
                                            </p>
                                        </div>
                                    </div>

                                    <span
                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[trainer.status]
                                            }`}
                                    >
                                        {formatStatus(trainer.status)}
                                    </span>
                                </div>

                                <div className="mt-5 space-y-3 text-sm">
                                    <div>
                                        <span className="text-slate-400">
                                            Specialization
                                        </span>

                                        <p className="font-medium text-slate-700 dark:text-slate-300">
                                            {trainer.specialization}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-slate-400">
                                            Email
                                        </span>

                                        <p className="break-all font-medium text-slate-700 dark:text-slate-300">
                                            {trainer.email}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-slate-400">
                                                Experience
                                            </span>

                                            <p className="font-medium text-slate-700 dark:text-slate-300">
                                                {trainer.yearsOfExperience !== null
                                                    ? `${trainer.yearsOfExperience} yrs`
                                                    : "N/A"}
                                            </p>
                                        </div>

                                        <div>
                                            <span className="text-slate-400">
                                                Hourly rate
                                            </span>

                                            <p className="font-medium text-slate-700 dark:text-slate-300">
                                                {formatHourlyRate(trainer.hourlyRate)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            ROUTES.app.trainerDetails(trainer.id),
                                        )
                                    }
                                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                                >
                                    <Eye className="h-4 w-4" />
                                    View Trainer
                                </button>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
}