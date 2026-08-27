import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { RegisterForm } from "@/features/auth/components/register-form";
import { AuthNavbar } from "@/features/auth/components/auth-navbar";
import { AppBackground } from "@/layouts/app-layout/components/app-background";

export function RegisterPage() {
  return (
    <main
      className="
        relative
        min-h-screen
        overflow-x-hidden
        bg-slate-950
        text-white
      "
    >
      {/* Background */}
      <AppBackground />

      {/* Navbar */}
      <AuthNavbar />

      {/* Decorative glow */}
      <div
        className="
          pointer-events-none
          fixed
          left-1/2
          top-0
          z-0
          h-72
          w-72
          -translate-x-1/2
          rounded-full
          bg-cyan-500/10
          blur-3xl
          sm:h-96
          sm:w-96
        "
      />

      <div
        className="
          pointer-events-none
          fixed
          bottom-0
          right-0
          z-0
          h-64
          w-64
          rounded-full
          bg-violet-600/10
          blur-3xl
          sm:h-80
          sm:w-80
        "
      />

      {/* Page content */}
      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          items-start
          justify-center
          px-4
          pb-8
          pt-24
          sm:px-6
          sm:pb-12
          sm:pt-28
          lg:items-center
          lg:pt-24
        "
      >
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="mb-6 text-center sm:mb-8">
            <div
              className="
                mb-3
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-400/20
                bg-cyan-400/10
                px-3
                py-1.5
                text-[10px]
                font-bold
                tracking-[0.2em]
                text-cyan-300
                sm:px-4
                sm:text-xs
              "
            >
              <Sparkles className="h-3.5 w-3.5" />
              FITMANAGE
            </div>

            <h1
              className="
                text-2xl
                font-black
                tracking-tight
                text-white
                sm:text-3xl
                md:text-4xl
              "
            >
              Create your account
            </h1>

            <p
              className="
                mx-auto
                mt-2
                max-w-md
                px-2
                text-xs
                leading-5
                text-slate-300
                sm:mt-3
                sm:text-sm
                sm:leading-6
              "
            >
              Join your fitness center and
              start your fitness journey.
            </p>
          </div>

          {/* Registration card */}
          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-slate-900/85
              p-4
              shadow-2xl
              shadow-black/30
              backdrop-blur-2xl
              sm:p-6
              md:p-8
            "
          >
            {/* Card heading */}
            <div className="mb-6 sm:mb-7">
              <div
                className="
                  mb-3
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-cyan-400
                  to-violet-600
                  text-white
                  shadow-lg
                  shadow-cyan-500/20
                "
              >
                <Sparkles className="h-5 w-5" />
              </div>

              <h2
                className="
                  text-lg
                  font-bold
                  text-white
                  sm:text-xl
                "
              >
                Get started
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-400
                  sm:text-sm
                "
              >
                Enter your information to
                create your account.
              </p>
            </div>

            <RegisterForm />

            {/* Login link */}
            <div
              className="
                mt-6
                border-t
                border-white/10
                pt-5
                text-center
                text-xs
                text-slate-400
                sm:mt-7
                sm:pt-6
                sm:text-sm
              "
            >
              Already have an account?{" "}

              <Link
                to="/login"
                className="
                  inline-flex
                  items-center
                  gap-1
                  font-bold
                  text-cyan-400
                  transition-colors
                  hover:text-cyan-300
                  hover:underline
                "
              >
                Sign in
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Footer */}
          <p
            className="
              mt-5
              pb-2
              text-center
              text-[10px]
              font-medium
              text-slate-500
              sm:mt-6
              sm:text-xs
            "
          >
            © {new Date().getFullYear()}{" "}
            <span className="text-cyan-400">
              FitManage
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}