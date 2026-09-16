import {
  useState,
} from "react";

import {
  createMembershipPlanSchema,
  updateMembershipPlanSchema,
} from "@/features/membership-plans/schemas/membership-plan-schema";

import type {
  MembershipPlan,
  MembershipType,
} from "@/features/membership-plans/types/membership-plan-types";

interface MembershipPlanFormProps {
  plan?: MembershipPlan;
  isSubmitting?: boolean;
  submitLabel?: string;
  onSubmit: (
    values: {
      name: string;
      description?: string;
      type: MembershipType;
      price: number;
      durationInDays: number;
      maxVisitsPerMonth: number;
      active?: boolean;
      autoRenewable: boolean;
    },
  ) => void;
}

const membershipTypes: MembershipType[] = [
  "BASIC",
  "STANDARD",
  "PREMIUM",
  "CUSTOM",
];

export function MembershipPlanForm({
  plan,
  isSubmitting = false,
  submitLabel = "Save",
  onSubmit,
}: MembershipPlanFormProps) {
  const isEdit = Boolean(plan);

  const [name, setName] = useState(
    plan?.name ?? "",
  );

  const [description, setDescription] =
    useState(plan?.description ?? "");

  const [type, setType] =
    useState<MembershipType>(
      plan?.type ?? "BASIC",
    );

  const [price, setPrice] = useState(
    plan?.price?.toString() ?? "",
  );

  const [durationInDays, setDurationInDays] =
    useState(
      plan?.durationInDays?.toString() ?? "",
    );

  const [
    maxVisitsPerMonth,
    setMaxVisitsPerMonth,
  ] = useState(
    plan?.maxVisitsPerMonth?.toString() ?? "",
  );

  const [autoRenewable, setAutoRenewable] =
    useState(
      plan?.autoRenewable ?? false,
    );

  const [active, setActive] = useState(
    plan?.active ?? true,
  );

  const [error, setError] = useState("");

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");

    const values = {
      name,
      description:
        description.trim() || undefined,
      type,
      price: Number(price),
      durationInDays: Number(durationInDays),
      maxVisitsPerMonth:
        Number(maxVisitsPerMonth),
      autoRenewable,
      ...(isEdit ? { active } : {}),
    };

    const result = isEdit
      ? updateMembershipPlanSchema.safeParse(
          values,
        )
      : createMembershipPlanSchema.safeParse(
          values,
        );

    if (!result.success) {
      setError(
        result.error.issues[0]?.message ??
          "Please check the form.",
      );
      return;
    }

    onSubmit(values);
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Plan name
          </label>

          <input
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="e.g. Premium Monthly"
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Membership type
          </label>

          <select
            value={type}
            onChange={(event) =>
              setType(
                event.target.value as MembershipType,
              )
            }
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          >
            {membershipTypes.map(
              (membershipType) => (
                <option
                  key={membershipType}
                  value={membershipType}
                >
                  {membershipType}
                </option>
              ),
            )}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Description
        </label>

        <textarea
          value={description}
          onChange={(event) =>
            setDescription(
              event.target.value,
            )
          }
          maxLength={500}
          rows={3}
          placeholder="Describe what this membership plan offers"
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Price
          </label>

          <input
            type="number"
            min="0.01"
            step="0.01"
            value={price}
            onChange={(event) =>
              setPrice(event.target.value)
            }
            placeholder="0.00"
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Duration (days)
          </label>

          <input
            type="number"
            min="1"
            step="1"
            value={durationInDays}
            onChange={(event) =>
              setDurationInDays(
                event.target.value,
              )
            }
            placeholder="30"
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Max visits/month
          </label>

          <input
            type="number"
            min="1"
            step="1"
            value={maxVisitsPerMonth}
            onChange={(event) =>
              setMaxVisitsPerMonth(
                event.target.value,
              )
            }
            placeholder="20"
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-3 text-sm font-medium">
          <input
            type="checkbox"
            checked={autoRenewable}
            onChange={(event) =>
              setAutoRenewable(
                event.target.checked,
              )
            }
            className="h-4 w-4"
          />

          Auto renewable
        </label>

        {isEdit && (
          <label className="flex items-center gap-3 text-sm font-medium">
            <input
              type="checkbox"
              checked={active}
              onChange={(event) =>
                setActive(
                  event.target.checked,
                )
              }
              className="h-4 w-4"
            />

            Active
          </label>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting
          ? "Saving..."
          : submitLabel}
      </button>
    </form>
  );
}