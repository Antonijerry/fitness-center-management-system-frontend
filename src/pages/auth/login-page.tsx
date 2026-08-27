import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

import { LoginForm } from "@/features/auth/components/login-form";
import { AuthNavbar } from "@/features/auth/components/auth-navbar";
import { AppBackground } from "@/layouts/app-layout/components/app-background";

export function LoginPage() {
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
      <AppBackground />

      <AuthNavbar />

      <div
        className="
          pointer-events-none
          fixed
          left-1/2
          top-0
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
        "
      >
        <div className="w-full max-w-md">
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
              Welcome back
            </h1>

            <p
              className="
                mt-2
                text-xs
                text-slate-300
                sm:mt-3
                sm:text-sm
              "
            >
              Sign in to manage your fitness
              center account.
            </p>
          </div>

          {/* Login card */}
          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-slate-900/85
              p-5
              shadow-2xl
              shadow-black/30
              backdrop-blur-2xl
              sm:p-7
              md:p-8
            "
          >
            <div className="mb-6">
              <h2
                className="
                  text-lg
                  font-bold
                  text-white
                  sm:text-xl
                "
              >
                Sign in
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-400
                  sm:text-sm
                "
              >
                Enter your credentials to
                continue.
              </p>
            </div>

            <LoginForm />

            <div
              className="
                mt-6
                border-t
                border-white/10
                pt-5
                text-center
                text-xs
                text-slate-400
                sm:text-sm
              "
            >
              Don't have an account?{" "}

              <Link
                to="/register"
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
                Create an account
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <p
            className="
              mt-5
              text-center
              text-[10px]
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