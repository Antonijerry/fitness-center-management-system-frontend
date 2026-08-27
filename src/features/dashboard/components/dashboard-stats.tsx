import {
    Activity,
    CalendarDays,
    CreditCard,
    Dumbbell,
    Users,
} from "lucide-react";

import {
    DashboardStatCard,
} from "./dashboard-stat-card";

import type {
    DashboardStats as DashboardStatsData,
} from "@/features/dashboard/types/dashboard-types";

interface DashboardStatsProps {
    stats: DashboardStatsData;
}

export function DashboardStats({
    stats,
}: DashboardStatsProps) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <DashboardStatCard
                title="Total Members"
                value={stats.totalMembers}
                description={`${stats.activeMembers} active members`}
                icon={Users}
            />

            <DashboardStatCard
                title="Trainers"
                value={stats.totalTrainers}
                description="Registered trainers"
                icon={Dumbbell}
            />

            <DashboardStatCard
                title="Today's Attendance"
                value={stats.todayAttendance}
                description="Members checked in today"
                icon={Activity}
            />

            <DashboardStatCard
                title="Total Bookings"
                value={stats.totalBookings}
                description={`${stats.totalClasses} classes`}
                icon={CalendarDays}
            />

            <DashboardStatCard
                title="Revenue"
                value={stats.totalRevenue}
                description="Total recorded revenue"
                icon={CreditCard}
            />

            <DashboardStatCard
                title="Expiring Memberships"
                value={stats.expiringMemberships}
                description="Memberships requiring attention"
                icon={Users}
            />

        </div>
    );
}