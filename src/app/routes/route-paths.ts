export const ROUTES = {
  home: "/",

  auth: {
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
  },

  app: {
    root: "/app",
    dashboard: "/app/dashboard",

    members: "/app/members",
    memberDetails: (id: number | string) =>
      `/app/members/${id}`,

    memberships: "/app/memberships",
    membershipPlans: "/app/membership-plans",

    trainers: "/app/trainers",

    classes: "/app/classes",
    schedules: "/app/schedules",

    bookings: "/app/bookings",

    attendance: "/app/attendance",

    workouts: "/app/workouts",

    payments: "/app/payments",

    notifications: "/app/notifications",

    reports: "/app/reports",

    users: "/app/users",
    
    userDetails: (id: number) =>
      `/app/users/${id}`,

    userEdit: (id: number) =>
      `/app/users/${id}/edit`,

    userCreate: "/app/users/new",

    settings: "/app/settings",
  },

  notFound: "*",
} as const;