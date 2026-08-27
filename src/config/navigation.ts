import type { LucideIcon } from "lucide-react";

import {
  BarChart3,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  Dumbbell,
  Home,
  IdCard,
  Layers,
  Megaphone,
  Settings,
  UserCog,
  Users,
} from "lucide-react";

import { ROUTES } from "@/app/routes/route-paths";

export type UserRole =
  | "ADMIN"
  | "MANAGER"
  | "TRAINER"
  | "RECEPTIONIST"
  | "MEMBER";

export interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
  roles: UserRole[];
}

export const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: ROUTES.app.dashboard,
    icon: Home,
    roles: [
      "ADMIN",
      "MANAGER",
      "TRAINER",
      "RECEPTIONIST",
      "MEMBER",
    ],
  },

  {
    title: "Members",
    href: ROUTES.app.members,
    icon: Users,
    roles: [
      "ADMIN",
      "MANAGER",
      "TRAINER",
      "RECEPTIONIST",

    ],
  },

  {
    title: "Memberships",
    href: ROUTES.app.memberships,
    icon: IdCard,
    roles: [
      "ADMIN",
      "MANAGER",
      "RECEPTIONIST",
      "MEMBER",
    ],
  },

  {
    title: "Membership Plans",
    href: ROUTES.app.membershipPlans,
    icon: Layers,
    roles: [
      "ADMIN",
      "MANAGER",
      "RECEPTIONIST",
    ],
  },

  {
    title: "Trainers",
    href: ROUTES.app.trainers,
    icon: Dumbbell,
    roles: [
      "ADMIN",
      "MANAGER",
    ],
  },

  {
    title: "Classes",
    href: ROUTES.app.classes,
    icon: CalendarDays,
    roles: [
      "ADMIN",
      "MANAGER",
      "TRAINER",
      "RECEPTIONIST",
      "MEMBER",
    ],
  },

  {
    title: "Attendance",
    href: ROUTES.app.attendance,
    icon: ClipboardCheck,
    roles: [
      "ADMIN",
      "MANAGER",
      "TRAINER",
      "RECEPTIONIST",
      "MEMBER",
    ],
  },

  {
    title: "Payments",
    href: ROUTES.app.payments,
    icon: CreditCard,
    roles: [
      "ADMIN",
      "MANAGER",
      "RECEPTIONIST",
      "MEMBER",
    ],
  },

  {
    title: "Workouts",
    href: ROUTES.app.workouts,
    icon: Dumbbell,
    roles: [
      "ADMIN",
      "MANAGER",
      "TRAINER",
      "MEMBER",
    ],
  },

  {
    title: "Notifications",
    href: ROUTES.app.notifications,
    icon: Megaphone,
    roles: [
      "ADMIN",
      "MANAGER",
      "TRAINER",
      "RECEPTIONIST",
      "MEMBER",
    ],
  },

  {
    title: "Reports",
    href: ROUTES.app.reports,
    icon: BarChart3,
    roles: [
      "ADMIN",
      "MANAGER",
    ],
  },

  {
    title: "Users",
    href: ROUTES.app.users,
    icon: UserCog,
    roles: [
      "ADMIN",
      "MANAGER",

    ],
  },

  {
    title: "Settings",
    href: ROUTES.app.settings,
    icon: Settings,
    roles: [
      "ADMIN",
      "MANAGER",
      "TRAINER",
      "RECEPTIONIST",
      "MEMBER",
    ],
  },
];