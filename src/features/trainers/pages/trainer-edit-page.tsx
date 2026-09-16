import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { ROUTES } from "@/app/routes/route-paths";
import { TrainerForm } from "@/features/trainers/components/trainer-form";
import {
    useTrainer,
} from "@/features/trainers/hooks/use-trainer";
import {
    useUpdateTrainer,
} from "@/features/trainers/hooks/use-trainer-mutations";
import type { TrainerFormValues } from "@/features/trainers/schemas/trainer-schema";

export function TrainerEditPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const trainerId = id ? Number(id) : undefined;

    const trainerQuery = useTrainer(trainerId);
    const updateTrainerMutation = useUpdateTrainer();

    if (!trainerId || Number.isNaN(trainerId)) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Invalid trainer ID
                    </h2>

                    <button
                        type="button"
                        onClick={() => navigate(ROUTES.app.trainers)}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Trainers
                    </button>
                </div>
            </div>
        );
    }

    if (trainerQuery.isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (trainerQuery.isError || !trainerQuery.data) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Trainer not found
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        The trainer could not be loaded.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate(ROUTES.app.trainers)}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Trainers
                    </button>
                </div>
            </div>
        );
    }

    const trainer = trainerQuery.data;

    const initialValues: TrainerFormValues = {
        userId: trainer.userId,
        specialization: trainer.specialization,
        certifications: trainer.certifications ?? "",
        yearsOfExperience: trainer.yearsOfExperience ?? undefined,
        bio: trainer.bio ?? "",
        hourlyRate: trainer.hourlyRate ?? undefined,
    };

    function handleSubmit(values: TrainerFormValues) {
        updateTrainerMutation.mutate(
            {
                id: trainer.id,
                request: {
                    specialization: values.specialization.trim(),
                    certifications: values.certifications?.trim() || null,
                    yearsOfExperience: values.yearsOfExperience ?? null,
                    bio: values.bio?.trim() || null,
                    hourlyRate: values.hourlyRate ?? null,
                },
            },
            {
                onSuccess: () => {
                    navigate(ROUTES.app.trainerDetails(trainer.id));
                },
            },
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <button
                        type="button"
                        onClick={() =>
                            navigate(ROUTES.app.trainerDetails(trainer.id))
                        }
                        className="mb-3 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900 dark:hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Trainer
                    </button>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Edit Trainer
                    </h1>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Update {trainer.firstName} {trainer.lastName}&apos;s trainer
                        profile.
                    </p>
                </div>
            </div>

            {/* Form */}
            <TrainerForm
                mode="edit"
                initialValues={initialValues}
                onSubmit={handleSubmit}
                isSubmitting={updateTrainerMutation.isPending}
                submitLabel="Save Changes"
            />
        </div>
    );
}