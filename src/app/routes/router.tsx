
import {
  createBrowserRouter,
} from "react-router-dom";

import { NotFoundPage } from "@/pages/not-found-page";
import { HomePage } from "@/pages/home/home-page";

import { authRoutes } from "./auth-routes";
import { appRoutes } from "./app-routes";
import { ROUTES } from "./route-paths";

export const router = createBrowserRouter([
  /*
   * =========================================================
   * Public Home Page
   * =========================================================
   *
   * Anyone can access this route:
   * - Logged-out visitors
   * - Members
   * - Trainers
   * - Managers
   * - Admins
   */
  {
    path: ROUTES.home,
    element: <HomePage />,
  },

  /*
   * =========================================================
   * Authentication Routes
   * =========================================================
   */
  authRoutes,

  /*
   * =========================================================
   * Protected Application Routes
   * =========================================================
   */
  appRoutes,

  /*
   * =========================================================
   * 404
   * =========================================================
   */
  {
    path: ROUTES.notFound,
    element: <NotFoundPage />,
  },
]);
