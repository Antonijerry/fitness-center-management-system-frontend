import { ArrowLeft, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { ROUTES } from "@/app/routes/route-paths";
import { MemberForm } from "@/features/members/components/member-form";
import { useCreateMember } from "@/features/members/hooks/use-create-member";
import type {
  CreateMemberRequest,
  UpdateMemberRequest,
} from "@/features/members/types/member-types";

export function CreateMemberPage() {
  const navigate = useNavigate();
  const createMember = useCreateMember();

  function handleSubmit(
    values: CreateMemberRequest | UpdateMemberRequest,
  ) {
    if (!("userId" in values)) {
      return;
    }

    createMember.mutate(values, {
      onSuccess: (member) => {
        navigate(
          ROUTES.app.memberDetails(member.id),
        );
      },
    });
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
          to={ROUTES.app.members}
          className="mb-5 inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm font-semibold text-slate-400 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to members
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
            <UserPlus className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              Create Member
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Create a new member profile.
            </p>
          </div>
        </div>
      </div>

      <MemberForm
        mode="create"
        isSubmitting={createMember.isPending}
        error={
          createMember.error?.message ?? null
        }
        onSubmit={handleSubmit}
        onCancel={() =>
          navigate(ROUTES.app.members)
        }
      />
    </div>
  );
}