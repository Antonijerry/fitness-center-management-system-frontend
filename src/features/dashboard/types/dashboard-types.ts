export interface DashboardStats {
    totalMembers: number;

    activeMembers: number;

    totalTrainers: number;

    totalMemberships: number;

    activeMemberships: number;

    totalTrainingSessions: number;

    todayAttendance: number;

    expiringMemberships: number;

    totalRevenue: number;
    totalBookings: number;
    totalClasses: number;
}

export interface RecentActivity {
  id: number;
  description: string;
  type: string;
  createdAt: string;
}