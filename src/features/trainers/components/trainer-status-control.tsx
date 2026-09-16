import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

import { useUpdateTrainerStatus } from "@/features/trainers/hooks/use-trainer-mutations";
import type {
    TrainerStatus,
} from "@/features/trainers/types/trainer-types";

interface TrainerStatusControlProps {
    trainerId: number;
    currentStatus: TrainerStatus;
}

const statuses: TrainerStatus[] = [
    "ACTIVE",
    "INACTIVE",
    "SUSPENDED",
];

const statusLabels: Record<TrainerStatus, string> = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    SUSPENDED: "Suspended",
};

export function TrainerStatusControl({
    trainerId,
    currentStatus,
}: TrainerStatusControlProps) {
    const [selectedStatus, setSelectedStatus] =
        useState<TrainerStatus>(currentStatus);

    const updateStatusMutation = useUpdateTrainerStatus();

    function handleStatusChange(status: TrainerStatus) {
        setSelectedStatus(status);

        if (status === currentStatus) {
            return;
        }

        updateStatusMutation.mutate({
            id: trainerId,
            status,
        });
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            {statuses.map((status) => {
                const isSelected = selectedStatus === status;

                return (
                    <button
                        key={status}
                        type="button"
                        disabled={updateStatusMutation.isPending}
                        onClick={() => handleStatusChange(status)}
                        className={[
                            "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition",
                            isSelected
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800",
                            "disabled:cursor-not-allowed disabled:opacity-60",
                        ].join(" ")}
                    >
                        {updateStatusMutation.isPending &&
                            selectedStatus === status ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : isSelected ? (
                            <Check className="h-4 w-4" />
                        ) : null}

                        {statusLabels[status]}
                    </button>
                );
            })}
        </div>
    );
}