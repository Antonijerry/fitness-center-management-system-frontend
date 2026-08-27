import { apiRequest } from "@/api/request";

import type {
    DashboardStats,
} from "@/features/dashboard/types/dashboard-types";

export function getDashboardStats(): Promise<DashboardStats> {
    return apiRequest<DashboardStats>({
        method: "GET",
        url: "/dashboard/stats",
    });
}

export const dashboardApi = {
    getDashboardStats,
};