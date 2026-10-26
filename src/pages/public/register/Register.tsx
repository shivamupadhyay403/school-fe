
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  User,
} from "lucide-react";

import { registerSchema } from "@/lib/validations/auth";
import type { RegisterFormValues } from "@/lib/validations/auth";
import { useRegister } from "@/features/auth/auth.mutations";
import Loader from "@/pages/common/Loader";

export default function Register() {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setApiError("");
    try {
      await registerMutation.mutateAsync(data);
      navigate("/login", {
        replace: true,
        state: {
          message: "Registration successful. Please sign in.",
        },
      });
    } catch (error: unknown) {
      console.log(error)
      if (isAxiosError<{ message?: string }>(error)) {
        setApiError(
          error.response?.data?.message ??
            "Unable to create your account. Please try again.",
        );
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    }
  }

  const inputClass =
    "h-12 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/20";

  const passwordClass =
    "h-12 w-full rounded-lg border border-input bg-background pl-11 pr-12 text-sm outline-none transition placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/20";

  const labelClass = "text-sm font-medium";

  const errorClass = "text-sm text-destructive";

  const isSubmitting = registerMutation.isPending;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {isSubmitting && (
        <Loader message="Creating your account..." />
      )}

      <section className="flex min-h-screen flex-col px-6 py-7 sm:px-10 lg:px-16">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Create Your School Account
            </h1>

            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              Get started with your school management portal to manage
              records, streamline daily tasks, and keep your school
              community connected.
            </p>
          </div>

          {/* Registration form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >
            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="username" className={labelClass}>
                Username
              </label>

              <div className="relative">
                <User
                  size={18}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <input
                  id="username"
                  autoComplete="username"
                  placeholder="Choose a username"
                  {...register("username")}
                  aria-invalid={!!errors.username}
                  aria-describedby={
                    errors.username ? "username-error" : undefined
                  }
                  className={`${inputClass} pl-11`}
                />
              </div>

              {errors.username && (
                <p id="username-error" role="alert" className={errorClass}>
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* First name and last name */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="firstname" className={labelClass}>
                  First name
                </label>

                <input
                  id="firstname"
                  autoComplete="given-name"
                  placeholder="First name"
                  {...register("firstname")}
                  aria-invalid={!!errors.firstname}
                  aria-describedby={
                    errors.firstname ? "firstname-error" : undefined
                  }
                  className={inputClass}
                />

                {errors.firstname && (
                  <p id="firstname-error" role="alert" className={errorClass}>
                    {errors.firstname.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="lastname" className={labelClass}>
                  Last name
                </label>

                <input
                  id="lastname"
                  autoComplete="family-name"
                  placeholder="Last name"
                  {...register("lastname")}
                  aria-invalid={!!errors.lastname}
                  aria-describedby={
                    errors.lastname ? "lastname-error" : undefined
                  }
                  className={inputClass}
                />

                {errors.lastname && (
                  <p id="lastname-error" role="alert" className={errorClass}>
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>

            {/* Mobile number */}
            <div className="space-y-2">
              <label htmlFor="mobile" className={labelClass}>
                Mobile number
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <input
                  id="mobile"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="9876543210"
                  {...register("mobile")}
                  aria-invalid={!!errors.mobile}
                  aria-describedby={
                    errors.mobile ? "mobile-error" : undefined
                  }
                  className={`${inputClass} pl-11`}
                />
              </div>

              {errors.mobile && (
                <p id="mobile-error" role="alert" className={errorClass}>
                  {errors.mobile.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className={labelClass}>
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={
                    errors.email ? "email-error" : undefined
                  }
                  className={`${inputClass} pl-11`}
                />
              </div>

              {errors.email && (
                <p id="email-error" role="alert" className={errorClass}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className={labelClass}>
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  {...register("password")}
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : "password-hint"
                  }
                  className={passwordClass}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password ? (
                <p id="password-error" role="alert" className={errorClass}>
                  {errors.password.message}
                </p>
              ) : (
                <p id="password-hint" className="text-xs leading-5 text-muted-foreground">
                  Use 8–128 characters with uppercase, lowercase, a number,
                  and a special character.
                </p>
              )}
            </div>

            {/* Confirm password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  {...register("confirmPassword")}
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={
                    errors.confirmPassword
                      ? "confirm-password-error"
                      : undefined
                  }
                  className={passwordClass}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((visible) => !visible)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  aria-pressed={showConfirmPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p
                  id="confirm-password-error"
                  role="alert"
                  className={errorClass}
                >
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* API error */}
            {apiError && (
              <p
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive"
              >
                {apiError}
              </p>
            )}

            {/* Login link */}
            <div className="flex justify-end">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-[#4D3FD6] hover:underline"
                >
                  Login Here
                </Link>
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{cursor:"pointer"}}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Register"}

              {!isSubmitting && <ArrowRight size={18} />}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
