
import {
  ArrowLeft,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { ROUTES } from "@/app/routes/route-paths";
import {
  MemberStatusBadge,
  useMember,
} from "@/features/members";

function formatDate(
  date: string | null | undefined,
): string {
  if (!date) {
    return "Not provided";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsedDate);
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-2 font-medium text-white">
        {value || "Not provided"}
      </p>
    </div>
  );
}

export function MemberDetailsPage() {
  const { id } = useParams<{
    id: string;
  }>();

  const memberId =
    id !== undefined
      ? Number(id)
      : undefined;

  const {
    data: member,
    isLoading,
    isError,
  } = useMember(memberId);

  /*
   * Invalid ID
   */
  if (
    !id ||
    memberId === undefined ||
    Number.isNaN(memberId)
  ) {
    return (
      <div className="relative min-h-full space-y-8 text-white">
        {/* Ambient background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[130px]" />

          <div className="absolute -right-40 top-[25%] h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[140px]" />
        </div>

        <Link
          to={ROUTES.app.members}
          className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-white/[0.03]
                        px-3
                        py-2
                        text-sm
                        font-semibold
                        text-slate-400
                        transition-all
                        duration-300
                        hover:border-blue-500/30
                        hover:bg-blue-500/10
                        hover:text-blue-400
                    "
        >
          <ArrowLeft className="h-4 w-4" />

          <span>Back to members</span>
        </Link>

        <div
          className="
                        relative flex min-h-72
                        items-center justify-center
                        overflow-hidden
                        rounded-3xl
                        border border-white/[0.08]
                        bg-white/[0.035]
                        backdrop-blur-xl
                    "
        >
          <div
            aria-hidden="true"
            className="absolute h-48 w-48 rounded-full bg-blue-500/10 blur-[90px]"
          />

          <div className="relative text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
              <User className="h-6 w-6" />
            </div>

            <h1 className="mt-5 font-bold text-white">
              Invalid member
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              The member ID is invalid.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Loading State
   */
  if (isLoading) {
    return (
      <div className="relative min-h-full space-y-8 text-white">
        {/* Ambient background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[130px]" />

          <div className="absolute -right-40 top-[25%] h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[140px]" />
        </div>

        <Link
          to={ROUTES.app.members}
          className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-white/[0.03]
                        px-3
                        py-2
                        text-sm
                        font-semibold
                        text-slate-400
                        transition-all
                        duration-300
                        hover:border-blue-500/30
                        hover:bg-blue-500/10
                        hover:text-blue-400
                    "
        >
          <ArrowLeft className="h-4 w-4" />

          <span>Back to members</span>
        </Link>

        <div
          className="
                        relative flex min-h-72
                        items-center justify-center
                        overflow-hidden
                        rounded-3xl
                        border border-white/[0.08]
                        bg-white/[0.035]
                        backdrop-blur-xl
                    "
        >
          <div
            aria-hidden="true"
            className="absolute h-48 w-48 rounded-full bg-blue-500/10 blur-[90px]"
          />

          <p className="relative text-sm text-slate-400">
            Loading member...
          </p>
        </div>
      </div>
    );
  }

  /*
   * Error / Not Found State
   */
  if (isError || !member) {
    return (
      <div className="relative min-h-full space-y-8 text-white">
        {/* Ambient background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[130px]" />

          <div className="absolute -right-40 top-[25%] h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[140px]" />
        </div>

        <Link
          to={ROUTES.app.members}
          className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-white/[0.03]
                        px-3
                        py-2
                        text-sm
                        font-semibold
                        text-slate-400
                        transition-all
                        duration-300
                        hover:border-blue-500/30
                        hover:bg-blue-500/10
                        hover:text-blue-400
                    "
        >
          <ArrowLeft className="h-4 w-4" />

          <span>Back to members</span>
        </Link>

        <div
          className="
                        relative flex min-h-72
                        items-center justify-center
                        overflow-hidden
                        rounded-3xl
                        border border-red-500/10
                        bg-red-500/[0.025]
                        backdrop-blur-xl
                    "
        >
          <div className="relative text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
              <User className="h-6 w-6" />
            </div>

            <h1 className="mt-5 font-bold text-white">
              Member not found
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Unable to load this member.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const fullName =
    `${member.firstName} ${member.lastName}`;

  return (
    <div className="relative min-h-full space-y-8 text-white">
      {/* =========================================================
                AMBIENT BACKGROUND
            ========================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="absolute -right-40 top-[15%] h-[450px] w-[450px] rounded-full bg-violet-600/10 blur-[150px]" />

        <div className="absolute bottom-[-10%] left-[35%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      {/* =========================================================
                PAGE HEADER
            ========================================================== */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link
            to={ROUTES.app.members}
            className="
                            mb-5
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-white/[0.08]
                            bg-white/[0.03]
                            px-3
                            py-2
                            text-sm
                            font-semibold
                            text-slate-400
                            transition-all
                            duration-300
                            hover:border-blue-500/30
                            hover:bg-blue-500/10
                            hover:text-blue-400
                        "
          >
            <ArrowLeft className="h-4 w-4" />

            <span>Back to members</span>
          </Link>

          <div className="flex items-center gap-4">
            <div
              className="
                                flex h-14 w-14
                                shrink-0
                                items-center justify-center
                                rounded-2xl
                                border border-blue-500/20
                                bg-gradient-to-br
                                from-blue-500/15
                                to-violet-500/10
                                text-blue-400
                                shadow-lg
                                shadow-blue-500/5
                            "
            >
              <User className="h-6 w-6" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                  {fullName}
                </h1>

                <MemberStatusBadge
                  status={member.status}
                />
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Member #{member.memberNumber}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
                PERSONAL INFORMATION
            ========================================================== */}
      <section
        className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    border border-white/[0.08]
                    bg-white/[0.035]
                    shadow-xl
                    backdrop-blur-xl
                "
      >
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"
        />

        <div className="relative border-b border-white/[0.08] px-6 py-5 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
              <User className="h-4 w-4" />
            </div>

            <div>
              <h2 className="font-bold text-white">
                Personal Information
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Basic information about the member.
              </p>
            </div>
          </div>
        </div>

        <div className="relative grid gap-7 p-6 sm:grid-cols-2 sm:p-7 lg:grid-cols-3">
          <DetailItem
            label="First Name"
            value={member.firstName}
          />

          <DetailItem
            label="Last Name"
            value={member.lastName}
          />

          <DetailItem
            label="Member Number"
            value={member.memberNumber}
          />

          <DetailItem
            label="Gender"
            value={member.gender}
          />

          <DetailItem
            label="Date of Birth"
            value={formatDate(member.dateOfBirth)}
          />

          <DetailItem
            label="Status"
            value={member.status}
          />
        </div>
      </section>

      {/* =========================================================
                CONTACT INFORMATION
            ========================================================== */}
      <section
        className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    border border-white/[0.08]
                    bg-white/[0.035]
                    shadow-xl
                    backdrop-blur-xl
                "
      >
        <div
          aria-hidden="true"
          className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl"
        />

        <div className="relative border-b border-white/[0.08] px-6 py-5 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
              <Mail className="h-4 w-4" />
            </div>

            <div>
              <h2 className="font-bold text-white">
                Contact Information
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Contact and address information.
              </p>
            </div>
          </div>
        </div>

        <div className="relative grid gap-7 p-6 sm:grid-cols-2 sm:p-7">
          {/* Email */}
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
              <Mail
                className="h-4 w-4"
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Email
              </p>

              <p className="mt-2 break-all font-medium text-white">
                {member.email}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
              <Phone
                className="h-4 w-4"
                aria-hidden="true"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Phone
              </p>

              <p className="mt-2 font-medium text-white">
                {member.phone}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex gap-4 sm:col-span-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
              <MapPin
                className="h-4 w-4"
                aria-hidden="true"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Address
              </p>

              <p className="mt-2 font-medium text-white">
                {member.address || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
                EMERGENCY CONTACT
            ========================================================== */}
      <section
        className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    border border-white/[0.08]
                    bg-white/[0.035]
                    shadow-xl
                    backdrop-blur-xl
                "
      >
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl"
        />

        <div className="relative border-b border-white/[0.08] px-6 py-5 sm:px-7">
          <h2 className="font-bold text-white">
            Emergency Contact
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Person to contact in case of an emergency.
          </p>
        </div>

        <div className="relative grid gap-7 p-6 sm:grid-cols-3 sm:p-7">
          <DetailItem
            label="Name"
            value={member.emergencyContact?.name}
          />

          <DetailItem
            label="Phone"
            value={member.emergencyContact?.phone}
          />

          <DetailItem
            label="Relationship"
            value={
              member.emergencyContact?.relationship
            }
          />
        </div>
      </section>

      {/* =========================================================
                FITNESS INFORMATION
            ========================================================== */}
      <section
        className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    border border-white/[0.08]
                    bg-white/[0.035]
                    shadow-xl
                    backdrop-blur-xl
                "
      >
        <div
          aria-hidden="true"
          className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"
        />

        <div className="relative border-b border-white/[0.08] px-6 py-5 sm:px-7">
          <h2 className="font-bold text-white">
            Fitness Information
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Fitness goals and notes for this member.
          </p>
        </div>

        <div className="relative grid gap-7 p-6 sm:grid-cols-2 sm:p-7">
          {/* Fitness Goals */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Fitness Goals
            </p>

            <div className="mt-3 min-h-28 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                {member.fitnessGoals ||
                  "Not provided"}
              </p>
            </div>
          </div>

          {/* Fitness Notes */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Fitness Notes
            </p>

            <div className="mt-3 min-h-28 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                {member.fitnessNotes ||
                  "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
