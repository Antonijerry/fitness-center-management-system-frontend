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
  CreateMemberPage,
} from "@/pages/members/create-member-page";
import {
  EditMemberPage,
} from "@/pages/members/edit-member-page";


import {
  MembershipsPage,
} from "@/features/memberships/pages/memberships-page";
import {
  CreateMembershipPage,
} from "@/features/memberships/pages/create-membership-page";
import {
  MembershipDetailsPage,
} from "@/features/memberships/pages/membership-details-page";



import {
  MembershipPlansPage,
} from "@/features/membership-plans/pages/membership-plans-page";
import {
  CreateMembershipPlanPage,
} from "@/features/membership-plans/pages/create-membership-plan-page";

import {
  MembershipPlanDetailsPage,
} from "@/features/membership-plans/pages/membership-plan-details-page";

import {
  EditMembershipPlanPage,
} from "@/features/membership-plans/pages/edit-membership-plan-page";

import {
  TrainersPage,
} from "@/features/trainers/pages/trainers-page";
import {
  CreateTrainerPage,
} from "@/features/trainers/pages/create-trainer-page";
import {
  TrainerDetailsPage,
} from "@/features/trainers/pages/trainer-details-page";
import {
  TrainerEditPage,
} from "@/features/trainers/pages/trainer-edit-page";

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
} from "@/features/payments/pages/payments-page";
import {
  PaymentVerificationPage,
} from "@/features/payments/pages/payment-verification-page";

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
          path: "members/new",
          element: <CreateMemberPage />,
        },
        {
          path: "members/:id/edit",
          element: <EditMemberPage />,
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
          path: "memberships/new",
          element: <CreateMembershipPage />,
        },
        {
          path: "memberships/:id",
          element: <MembershipDetailsPage />,
        },




        {
          path: "membership-plans",
          element: <MembershipPlansPage />,
        },
        {
          path: "membership-plans/new",
          element: <CreateMembershipPlanPage />,
        },
        {
          path: "membership-plans/:id",
          element: <MembershipPlanDetailsPage />,
        },
        {
          path: "membership-plans/:id/edit",
          element: <EditMembershipPlanPage />,
        },




        {
          path: "trainers",
          element: <TrainersPage />,
        },
        {
          path: "trainers/new",
          element: <CreateTrainerPage />,
        },
        {
          path: "trainers/:id",
          element: <TrainerDetailsPage />,
        },
        {
          path: "trainers/:id/edit",
          element: <TrainerEditPage />,
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
          path: "payments/verify",
          element: <PaymentVerificationPage />,
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