import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  LogIn,
  Mail,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/login-schema";

import { useLogin } from "@/features/auth/hooks/use-login";
import { getApiErrorMessage } from "@/api/api-error";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    await loginMutation.mutateAsync({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">
        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Secure access
            </p>

            <p className="text-xs text-gray-600 dark:text-gray-400">
              Sign in to your FitManage dashboard
            </p>
          </div>
        </div>
      </div>

      {/* EMAIL */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-900 dark:text-white"
        >
          Email address
        </label>

        <div className="group relative">
          <Mail
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              z-10
              h-5
              w-5
              -translate-y-1/2
              text-gray-500
              transition-colors
              group-focus-within:text-blue-500
              dark:text-gray-400
            "
          />

          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            disabled={loginMutation.isPending}
            {...form.register("email")}
            className="
              h-12
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
              pl-11
              pr-4
              text-base
              font-medium
              text-gray-900
              caret-blue-600

              placeholder:text-gray-500
              placeholder:opacity-100

              shadow-sm
              outline-none

              transition-all
              duration-200

              hover:border-blue-400

              focus:border-blue-500
              focus:bg-white
              focus:ring-4
              focus:ring-blue-500/10

              disabled:cursor-not-allowed
              disabled:opacity-60

              dark:border-gray-700
              dark:bg-gray-950
              dark:text-white
              dark:placeholder:text-gray-400
              dark:focus:bg-gray-950
            "
          />
        </div>

        {form.formState.errors.email && (
          <p
            role="alert"
            className="text-xs font-medium text-red-500"
          >
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* PASSWORD */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-900 dark:text-white"
          >
            Password
          </label>

          <button
            type="button"
            className="text-xs font-semibold text-blue-600 transition-colors hover:text-blue-500 hover:underline dark:text-blue-400"
          >
            Forgot password?
          </button>
        </div>

        <div className="group relative">
          <LockKeyhole
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              z-10
              h-5
              w-5
              -translate-y-1/2
              text-gray-500
              transition-colors
              group-focus-within:text-blue-500
              dark:text-gray-400
            "
          />

          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            autoComplete="current-password"
            disabled={loginMutation.isPending}
            {...form.register("password")}
            className="
              h-12
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
              pl-11
              pr-12
              text-base
              font-medium
              text-gray-900
              caret-blue-600

              placeholder:text-gray-500
              placeholder:opacity-100

              shadow-sm
              outline-none

              transition-all
              duration-200

              hover:border-blue-400

              focus:border-blue-500
              focus:bg-white
              focus:ring-4
              focus:ring-blue-500/10

              disabled:cursor-not-allowed
              disabled:opacity-60

              dark:border-gray-700
              dark:bg-gray-950
              dark:text-white
              dark:placeholder:text-gray-400
              dark:focus:bg-gray-950
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword((current) => !current)
            }
            disabled={loginMutation.isPending}
            className="
              absolute
              right-2
              top-1/2
              flex
              h-8
              w-8
              -translate-y-1/2
              items-center
              justify-center
              rounded-lg
              text-gray-500
              transition-colors

              hover:bg-blue-500/10
              hover:text-blue-600

              focus:outline-none
              focus:ring-2
              focus:ring-blue-500/30

              dark:text-gray-400
              dark:hover:text-blue-400
            "
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {form.formState.errors.password && (
          <p
            role="alert"
            className="text-xs font-medium text-red-500"
          >
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {/* API ERROR */}
      {loginMutation.isError && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/30 bg-red-500/10 p-4"
        >
          <p className="text-sm font-semibold text-red-600 dark:text-red-400">
            Authentication failed
          </p>

          <p className="mt-1 text-xs text-red-600/80 dark:text-red-400/80">
            {getApiErrorMessage(loginMutation.error)}
          </p>
        </div>
      )}

      {/* LOGIN BUTTON */}
      <Button
        type="submit"
        disabled={loginMutation.isPending}
        className="
          group
          relative
          h-12
          w-full
          overflow-hidden
          rounded-xl
          bg-blue-600
          text-sm
          font-bold
          text-white
          shadow-lg
          shadow-blue-500/20

          transition-all
          duration-300

          hover:-translate-y-0.5
          hover:bg-blue-700
          hover:shadow-xl
          hover:shadow-blue-500/30

          active:translate-y-0

          dark:bg-blue-500
          dark:hover:bg-blue-600
        "
      >
        {!loginMutation.isPending && (
          <span
            className="
              absolute
              inset-y-0
              -left-full
              w-1/2
              skew-x-[-20deg]
              bg-white/20
              transition-all
              duration-700
              group-hover:left-[120%]
            "
          />
        )}

        <span className="relative flex items-center justify-center">
          {loginMutation.isPending ? (
            <>
              <span
                className="
                  mr-2
                  h-4
                  w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-white
                  border-t-transparent
                "
              />

              Authenticating...
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-4 w-4" />

              Sign in to FitManage
            </>
          )}
        </span>
      </Button>

      {/* Security indicator */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />

        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />

          Secure connection
        </div>

        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
      </div>
    </form>
  );
}