
import {
  useQuery,
} from "@tanstack/react-query";

import {
  memberApi,
} from "@/features/members/api/member-api";

export const membersQueryKeys = {
  all: ["members"] as const,

  lists: () =>
    [...membersQueryKeys.all, "list"] as const,

  list: () =>
    [...membersQueryKeys.lists()] as const,

  details: () =>
    [...membersQueryKeys.all, "detail"] as const,

  detail: (id: number) =>
    [...membersQueryKeys.details(), id] as const,
};

export function useMembers() {
  return useQuery({
    queryKey: membersQueryKeys.list(),

    queryFn: memberApi.getMembers,
  });
}
