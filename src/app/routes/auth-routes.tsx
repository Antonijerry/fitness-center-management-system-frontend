import type { RouteObject } from "react-router-dom";

import { LoginPage } from "@/pages/auth/login-page";
import { RegisterPage } from "@/pages/auth/register-page";

import { PublicRoute } from "./public-route";

import { ROUTES } from "./route-paths";

import { ForgotPasswordPage } from "@/pages/auth/forgot-password-page";

export const authRoutes: RouteObject = {
    element: <PublicRoute />,
    children: [
        {
            path: ROUTES.auth.login,
            element: <LoginPage />,
        },

        {
            path: ROUTES.auth.register,
            element: <RegisterPage />,
        },

        {
            path: ROUTES.auth.forgotPassword,
            element: <ForgotPasswordPage />,
        },
    ],
};