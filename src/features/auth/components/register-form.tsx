import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  User,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/schemas/register-schema";

import { useRegister } from "@/features/auth/hooks/use-register";
import { getApiErrorMessage } from "@/api/api-error";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const registerMutation = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    await registerMutation.mutateAsync({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      phone: values.phone?.trim() || null,
      password: values.password,
    });
  };

  const inputClass =
    "h-12 border-white/15 bg-white/[0.06] text-white placeholder:text-slate-400 " +
    "caret-cyan-400 shadow-inner transition-all duration-300 " +
    "hover:border-cyan-400/30 hover:bg-white/[0.08] " +
    "focus:border-cyan-400 focus:bg-white/[0.09] focus:ring-2 focus:ring-cyan-400/20";

  const iconClass =
    "text-cyan-400/80 transition-colors";

  const labelClass =
    "text-sm font-semibold tracking-wide text-slate-100";

  const errorClass =
    "text-xs font-medium text-rose-400";

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* First Name */}
      <div className="space-y-2">
        <label htmlFor="firstName" className={labelClass}>
          First name
        </label>

        <div className="relative">
          <User
            className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${iconClass}`}
          />

          <Input
            id="firstName"
            type="text"
            placeholder="John"
            autoComplete="given-name"
            disabled={registerMutation.isPending}
            className={`pl-10 ${inputClass}`}
            {...form.register("firstName")}
          />
        </div>

        {form.formState.errors.firstName && (
          <p className={errorClass}>
            {form.formState.errors.firstName.message}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div className="space-y-2">
        <label htmlFor="lastName" className={labelClass}>
          Last name
        </label>

        <div className="relative">
          <User
            className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${iconClass}`}
          />

          <Input
            id="lastName"
            type="text"
            placeholder="Doe"
            autoComplete="family-name"
            disabled={registerMutation.isPending}
            className={`pl-10 ${inputClass}`}
            {...form.register("lastName")}
          />
        </div>

        {form.formState.errors.lastName && (
          <p className={errorClass}>
            {form.formState.errors.lastName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="register-email" className={labelClass}>
          Email address
        </label>

        <div className="relative">
          <Mail
            className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${iconClass}`}
          />

          <Input
            id="register-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            disabled={registerMutation.isPending}
            className={`pl-10 ${inputClass}`}
            {...form.register("email")}
          />
        </div>

        {form.formState.errors.email && (
          <p className={errorClass}>
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label htmlFor="phone" className={labelClass}>
          Phone number{" "}
          <span className="font-normal text-slate-400">
            (optional)
          </span>
        </label>

        <div className="relative">
          <Phone
            className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${iconClass}`}
          />

          <Input
            id="phone"
            type="tel"
            placeholder="+234 800 000 0000"
            autoComplete="tel"
            disabled={registerMutation.isPending}
            className={`pl-10 ${inputClass}`}
            {...form.register("phone")}
          />
        </div>

        {form.formState.errors.phone && (
          <p className={errorClass}>
            {form.formState.errors.phone.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label htmlFor="register-password" className={labelClass}>
          Password
        </label>

        <div className="relative">
          <LockKeyhole
            className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${iconClass}`}
          />

          <Input
            id="register-password"
            type={showPassword ? "text" : "password"}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            disabled={registerMutation.isPending}
            className={`pl-10 pr-11 ${inputClass}`}
            {...form.register("password")}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword((current) => !current)
            }
            disabled={registerMutation.isPending}
            className="
              absolute right-3 top-1/2
              -translate-y-1/2
              text-slate-400
              transition-colors
              hover:text-cyan-400
              focus:outline-none
              focus:text-cyan-400
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
          <p className={errorClass}>
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {/* Backend error */}
      {registerMutation.isError && (
        <div
          role="alert"
          className="
            rounded-xl
            border
            border-rose-500/30
            bg-rose-500/10
            p-4
            text-sm
            font-medium
            text-rose-300
            shadow-lg
            shadow-rose-500/5
          "
        >
          {getApiErrorMessage(registerMutation.error)}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={registerMutation.isPending}
        className="
          h-12
          w-full
          border-0
          bg-linear-to-r
          from-cyan-500
          via-blue-500
          to-violet-600
          text-sm
          font-bold
          text-white
          shadow-lg
          shadow-cyan-500/20
          transition-all
          duration-300
          hover:scale-[1.01]
          hover:from-cyan-400
          hover:via-blue-500
          hover:to-violet-500
          hover:shadow-xl
          hover:shadow-cyan-500/30
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {registerMutation.isPending ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Creating account...
          </>
        ) : (
          <>
            <UserPlus className="mr-2 h-4 w-4" />
            Create account
          </>
        )}
      </Button>
    </form>
  );
}