import {
  ArrowLeft,
  BriefcaseBusiness,
  Edit,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { ROUTES } from "@/app/routes/route-paths";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { TrainerStatusControl } from "@/features/trainers/components/trainer-status-control";
import { useTrainer } from "@/features/trainers/hooks/use-trainer";
import { canUpdateTrainer } from "@/features/trainers/lib/trainer-permissions";
import type { TrainerStatus } from "@/features/trainers/types/trainer-types";

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

function formatRate(rate: number | null): string {
  if (rate === null) {
    return "Not specified";
  }

  return `₦${rate.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}/hour`;
}

function formatExperience(years: number | null): string {
  if (years === null) {
    return "Not specified";
  }

  return `${years} ${years === 1 ? "year" : "years"}`;
}

export function TrainerDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const trainerId = id ? Number(id) : undefined;

  const { user } = useAuth();
  const roles = user?.roles ?? [];

  const trainerQuery = useTrainer(trainerId);

  if (!trainerId || Number.isNaN(trainerId)) {
    return (
      <div className="flex min-h-100 items-center justify-center">
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
      <div className="flex min-h-100 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400" />
      </div>
    );
  }

  if (trainerQuery.isError || !trainerQuery.data) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Trainer not found
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            We could not retrieve this trainer.
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

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate(ROUTES.app.trainers)}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Trainers
      </button>

      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600/10 text-xl font-bold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              {trainer.firstName.charAt(0)}
              {trainer.lastName.charAt(0)}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {trainer.firstName} {trainer.lastName}
                </h1>

                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[trainer.status]
                    }`}
                >
                  {formatStatus(trainer.status)}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {trainer.specialization}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Employee #{trainer.employeeNumber}
              </p>
            </div>
          </div>

          {canUpdateTrainer(roles) && (
            <button
              type="button"
              onClick={() =>
                navigate(
                  ROUTES.app.trainerEdit(trainer.id),
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Edit className="h-4 w-4" />
              Edit Trainer
            </button>
          )}
        </div>
      </div>

      {/* Main information */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Professional information */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <BriefcaseBusiness className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Professional Information
              </h2>

              <p className="text-sm text-slate-500">
                Trainer profile and professional details.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <InfoItem
              label="Specialization"
              value={trainer.specialization}
            />

            <InfoItem
              label="Years of Experience"
              value={formatExperience(
                trainer.yearsOfExperience,
              )}
            />

            <InfoItem
              label="Hourly Rate"
              value={formatRate(trainer.hourlyRate)}
            />

            <InfoItem
              label="Employee Number"
              value={trainer.employeeNumber}
            />
          </div>
        </div>

        {/* Account information */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/10 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
              <UserRound className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Account
              </h2>

              <p className="text-sm text-slate-500">
                Linked user account.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                <Mail className="h-3.5 w-3.5" />
                Email
              </div>

              <p className="break-all text-sm font-medium text-slate-700 dark:text-slate-300">
                {trainer.email}
              </p>
            </div>

            <div>
              <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                User ID
              </div>

              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {trainer.userId}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-semibold text-slate-900 dark:text-white">
          Certifications
        </h2>

        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-400">
          {trainer.certifications || "No certifications provided."}
        </p>
      </div>

      {/* Bio */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-semibold text-slate-900 dark:text-white">
          Biography
        </h2>

        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-400">
          {trainer.bio || "No biography provided."}
        </p>
      </div>

      {/* Status management */}
      {canUpdateTrainer(roles) && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Trainer Status
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Update the operational status of this trainer.
            </p>
          </div>

          <TrainerStatusControl
            trainerId={trainer.id}
            currentStatus={trainer.status}
          />
        </div>
      )}
    </div>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
        {value}
      </p>
    </div>
  );
}