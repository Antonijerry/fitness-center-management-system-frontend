
import {
  useQuery,
} from "@tanstack/react-query";

import {
  memberApi,
} from "@/features/members/api/member-api";

import {
  membersQueryKeys,
} from "./use-members";

export function useMember(
  id: number | undefined,
) {
  return useQuery({
    queryKey:
      id !== undefined
        ? membersQueryKeys.detail(id)
        : ["members", "detail", "disabled"],

    queryFn: () =>
      memberApi.getMember(id as number),

    enabled:
      id !== undefined,
  });
}
