import { useNavigate } from "react-router-dom";
import { ArrowLeft, UserRound } from "lucide-react";

import { TrainerForm } from "../components/trainer-form";
import { useCreateTrainer } from "../hooks/use-trainer-mutations";
import type { TrainerFormValues } from "../schemas/trainer-schema";
import type { CreateTrainerRequest } from "../types/trainer-types";

import { ROUTES } from "@/app/routes/route-paths";

export function CreateTrainerPage() {
    const navigate = useNavigate();

    const createTrainerMutation =
        useCreateTrainer();

    function handleSubmit(
        values: TrainerFormValues,
    ) {
        /**
         * userId is optional inside the form because
         * the user may not have selected anyone yet.
         *
         * The schema validates that it exists before
         * this handler receives the submitted values.
         *
         * This explicit guard also guarantees that the
         * API request receives a number.
         */
        if (values.userId === undefined) {
            return;
        }

        const request: CreateTrainerRequest = {
            userId: values.userId,

            specialization:
                values.specialization.trim(),

            certifications:
                values.certifications?.trim() || null,

            yearsOfExperience:
                values.yearsOfExperience ?? null,

            bio:
                values.bio?.trim() || null,

            hourlyRate:
                values.hourlyRate ?? null,
        };

        createTrainerMutation.mutate(
            request,
            {
                onSuccess: (trainer) => {
                    navigate(
                        ROUTES.app.trainerDetails(trainer.id),
                    );
                },
            },
        );
    }

    function handleBack() {
        navigate(ROUTES.app.trainers);
    }

    return (
        <div className="space-y-6">
            {/* Header */}

            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    aria-label="Back to trainers"
                >
                    <ArrowLeft className="h-4 w-4" />
                </button>

                <div>
                    <div className="flex items-center gap-2">
                        <UserRound className="h-5 w-5 text-primary" />

                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create Trainer
                        </h1>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Create a trainer profile and
                        associate it with an existing user.
                    </p>
                </div>
            </div>

            {/* Form */}

            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <TrainerForm
                    mode="create"
                    onSubmit={handleSubmit}
                    isSubmitting={
                        createTrainerMutation.isPending
                    }
                    submitLabel="Create Trainer"
                />
            </div>
        </div>
    );
}