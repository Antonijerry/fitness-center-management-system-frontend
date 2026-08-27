import type {
  RouteObject,
} from "react-router-dom";

import {
  Navigate,
} from "react-router-dom";

import {
  ProtectedRoute,
} from "./protected-route";

import {
  ROUTES,
} from "./route-paths";

import {
  AppLayout,
} from "@/layouts/app-layout/app-layout";

import {
  DashboardPage,
} from "@/features/dashboard/pages/dashboard-page";

import {
  MembersPage,
} from "@/pages/members/members-page";

import {
  MembershipsPage,
} from "@/pages/memberships/memberships-page";

import {
  MembershipPlansPage,
} from "@/pages/memberships/membership-plans-page";

import {
  TrainersPage,
} from "@/pages/trainers/trainers-page";

import {
  ClassesPage,
} from "@/pages/classes/classes-page";

import {
  SchedulesPage,
} from "@/pages/classes/schedules-page";

import {
  BookingsPage,
} from "@/pages/bookings/bookings-page";

import {
  AttendancePage,
} from "@/pages/attendance/attendance-page";

import {
  WorkoutsPage,
} from "@/pages/workouts/workouts-page";

import {
  PaymentsPage,
} from "@/pages/payments/payments-page";

import {
  NotificationsPage,
} from "@/pages/notifications/notifications-page";

import {
  ReportsPage,
} from "@/pages/reports/reports-page";

import {
  UsersPage,
} from "@/pages/users/users-page";

import {
  SettingsPage,
} from "@/pages/settings/settings-page";

import {
  MemberDetailsPage,
} from "@/pages/members/member-details-page";

import {
  UserDetailsPage,
} from "@/pages/users/user-details-page";

import {
  CreateUserPage,
} from "@/pages/users/create-user-page";

import {
  EditUserPage,
} from "@/pages/users/edit-user-page";


export const appRoutes: RouteObject = {
  element: <ProtectedRoute />,

  children: [
    {
      path: ROUTES.app.root,

      element: <AppLayout />,

      children: [
        {
          index: true,

          element: (
            <Navigate
              to={ROUTES.app.dashboard}
              replace
            />
          ),
        },

        {
          path: "dashboard",
          element: <DashboardPage />,
        },

        {
          path: "members",
          element: <MembersPage />,
        },
        {
          path: "members/:id",
          element: <MemberDetailsPage />,
        },

        {
          path: "memberships",
          element: <MembershipsPage />,
        },

        {
          path: "membership-plans",
          element: <MembershipPlansPage />,
        },

        {
          path: "trainers",
          element: <TrainersPage />,
        },

        {
          path: "classes",
          element: <ClassesPage />,
        },

        {
          path: "schedules",
          element: <SchedulesPage />,
        },

        {
          path: "bookings",
          element: <BookingsPage />,
        },

        {
          path: "attendance",
          element: <AttendancePage />,
        },

        {
          path: "workouts",
          element: <WorkoutsPage />,
        },

        {
          path: "payments",
          element: <PaymentsPage />,
        },

        {
          path: "notifications",
          element: <NotificationsPage />,
        },

        {
          path: "reports",
          element: <ReportsPage />,
        },
        {
          path: "users",
          element: <UsersPage />,
        },

        {
          path: "users/new",
          element: <CreateUserPage />,
        },

        {
          path: "users/:id",
          element: <UserDetailsPage />,
        },

        {
          path: "users/:id/edit",
          element: <EditUserPage />,
        },
        {
          path: "settings",
          element: <SettingsPage />,
        },
      ],
    },
  ],
};