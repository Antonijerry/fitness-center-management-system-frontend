import {
    useQuery,
} from "@tanstack/react-query";

import {
    dashboardApi,
} from "@/features/dashboard/api/dashboard-api";

export const dashboardQueryKeys = {
    all: ["dashboard"] as const,

    stats: () =>
        [
            ...dashboardQueryKeys.all,
            "stats",
        ] as const,
};

export function useDashboard() {
    return useQuery({
        queryKey: dashboardQueryKeys.stats(),

        queryFn:
            dashboardApi.getDashboardStats,

        staleTime: 30_000,

        refetchOnWindowFocus: true,
    });
}