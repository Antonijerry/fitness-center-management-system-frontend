import {
  ArrowLeft,
  CalendarDays,
  Dumbbell,
  Edit,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
  User,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  ROUTES,
} from "@/app/routes/route-paths";

import {
  useMember,
} from "@/features/members/hooks/use-member";

import {
  MemberStatusBadge,
} from "@/features/members/components/members-status-badge";

function formatDate(
  date?: string | null,
): string {
  if (!date) {
    return "Not provided";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-card p-5 shadow-sm">
      <h2 className="mb-5 font-semibold">
        {title}
      </h2>

      {children}
    </section>
  );
}

export function MemberDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const memberId =
    id !== undefined ? Number(id) : undefined;

  const {
    data: member,
    isLoading,
    isError,
    error,
  } = useMember(memberId);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted border-t-primary" />
          Loading member...
        </div>
      </div>
    );
  }

  if (isError || !member) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <ShieldAlert className="h-5 w-5" />
        </div>

        <h1 className="text-lg font-semibold">
          Member not found
        </h1>

        <p className="mt-1 max-w-md text-sm text-muted-foreground">
          {error instanceof Error
            ? error.message
            : "The requested member could not be found."}
        </p>

        <Link
          to={ROUTES.app.members}
          className="mt-5 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Members
        </Link>
      </div>
    );
  }

  const fullName =
    `${member.firstName} ${member.lastName}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <Link
            to={ROUTES.app.members}
            className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition hover:bg-muted"
            aria-label="Back to members"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">
                {fullName}
              </h1>

              <MemberStatusBadge
                status={member.status}
              />
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              Member #{member.memberNumber}
            </p>
          </div>
        </div>

        <Link
          to={ROUTES.app.memberEdit(member.id)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          <Edit className="h-4 w-4" />
          Edit Member
        </Link>
      </div>

      {/* Summary */}
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-lg font-semibold text-primary">
            {member.firstName.charAt(0)}
            {member.lastName.charAt(0)}
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-semibold">
              {fullName}
            </h2>

            <div className="mt-2 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-5">
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {member.email}
              </span>

              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {member.phone}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal */}
      <Section title="Personal Information">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <InfoItem
            icon={User}
            label="First Name"
            value={member.firstName}
          />

          <InfoItem
            icon={User}
            label="Last Name"
            value={member.lastName}
          />

          <InfoItem
            icon={Mail}
            label="Email"
            value={member.email}
          />

          <InfoItem
            icon={Phone}
            label="Phone"
            value={member.phone}
          />

          <InfoItem
            icon={User}
            label="Gender"
            value={
              member.gender ?? "Not provided"
            }
          />

          <InfoItem
            icon={CalendarDays}
            label="Date of Birth"
            value={formatDate(
              member.dateOfBirth,
            )}
          />

          <InfoItem
            icon={MapPin}
            label="Address"
            value={
              member.address ?? "Not provided"
            }
          />
        </div>
      </Section>

      {/* Emergency */}
      <Section title="Emergency Contact">
        {member.emergencyContact ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <InfoItem
              icon={User}
              label="Name"
              value={
                member.emergencyContact.name
              }
            />

            <InfoItem
              icon={Phone}
              label="Phone"
              value={
                member.emergencyContact.phone
              }
            />

            <InfoItem
              icon={ShieldAlert}
              label="Relationship"
              value={
                member.emergencyContact
                  .relationship ??
                "Not provided"
              }
            />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No emergency contact has been
            provided.
          </p>
        )}
      </Section>

      {/* Fitness */}
      <Section title="Fitness Information">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-primary" />

              <h3 className="text-sm font-medium">
                Fitness Goals
              </h3>
            </div>

            <div className="rounded-lg bg-muted/40 p-4">
              <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                {member.fitnessGoals ||
                  "No fitness goals have been recorded."}
              </p>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-primary" />

              <h3 className="text-sm font-medium">
                Fitness Notes
              </h3>
            </div>

            <div className="rounded-lg bg-muted/40 p-4">
              <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                {member.fitnessNotes ||
                  "No fitness notes have been recorded."}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Link
          to={ROUTES.app.members}
          className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Members
        </Link>

        <Link
          to={ROUTES.app.memberEdit(member.id)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          <Edit className="h-4 w-4" />
          Edit Member
        </Link>
      </div>
    </div>
  );
}