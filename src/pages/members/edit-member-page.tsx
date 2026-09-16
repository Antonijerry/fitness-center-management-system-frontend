import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ROUTES } from "@/app/routes/route-paths";
import { MemberForm } from "@/features/members/components/member-form";
import { useMember } from "@/features/members/hooks/use-member";
import { useUpdateMember } from "@/features/members/hooks/use-update-member";
import type {
  CreateMemberRequest,
  UpdateMemberRequest,
} from "@/features/members/types/member-types";

export function EditMemberPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const memberId =
    id !== undefined ? Number(id) : undefined;

  const {
    data: member,
    isLoading,
    isError,
  } = useMember(memberId);

  const updateMember = useUpdateMember();

  function handleSubmit(
    values: CreateMemberRequest | UpdateMemberRequest,
  ) {
    if (
      memberId === undefined ||
      Number.isNaN(memberId) ||
      "userId" in values
    ) {
      return;
    }

    updateMember.mutate(
      {
        id: memberId,
        request: values,
      },
      {
        onSuccess: () => {
          navigate(
            ROUTES.app.memberDetails(memberId),
          );
        },
      },
    );
  }

  if (
    memberId === undefined ||
    Number.isNaN(memberId)
  ) {
    return (
      <div className="space-y-6 text-white">
        <Link
          to={ROUTES.app.members}
          className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm font-semibold text-slate-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to members
        </Link>

        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <h1 className="font-bold">
            Invalid member
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            The member ID is invalid.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-72 items-center justify-center text-sm text-slate-400">
        Loading member...
      </div>
    );
  }

  if (isError || !member) {
    return (
      <div className="space-y-6 text-white">
        <Link
          to={ROUTES.app.members}
          className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm font-semibold text-slate-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to members
        </Link>

        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <h1 className="font-bold">
            Member not found
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Unable to load this member.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-full space-y-8 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="absolute -right-40 top-[15%] h-[450px] w-[450px] rounded-full bg-violet-600/10 blur-[150px]" />
      </div>

      <div>
        <Link
          to={ROUTES.app.memberDetails(member.id)}
          className="mb-5 inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm font-semibold text-slate-400 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to member
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
            <Save className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              Edit Member
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Update {member.firstName}{" "}
              {member.lastName}'s profile.
            </p>
          </div>
        </div>
      </div>

      <MemberForm
        mode="edit"
        initialData={member}
        isSubmitting={updateMember.isPending}
        error={
          updateMember.error?.message ?? null
        }
        onSubmit={handleSubmit}
        onCancel={() =>
          navigate(
            ROUTES.app.memberDetails(member.id),
          )
        }
      />
    </div>
  );
}