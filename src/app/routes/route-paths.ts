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
    memberCreate: "/app/members/new",
    memberDetails: (id: number | string) =>
      `/app/members/${id}`,
    memberEdit: (id: number | string) =>
      `/app/members/${id}/edit`,



    memberships: "/app/memberships",
    membershipCreate: "/app/memberships/new",
    membershipDetails: (id: number | string) =>
      `/app/memberships/${id}`,


    membershipPlans: "/app/membership-plans",

    trainers: "/app/trainers",
    trainerCreate: "/app/trainers/new",
    trainerDetails: (id: number | string) =>
      `/app/trainers/${id}`,
    trainerEdit: (id: number | string) =>
      `/app/trainers/${id}/edit`,

    classes: "/app/classes",
    schedules: "/app/schedules",

    bookings: "/app/bookings",

    attendance: "/app/attendance",

    workouts: "/app/workouts",

    payments: "/app/payments",
    paymentVerification: "/app/payments/verify",

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