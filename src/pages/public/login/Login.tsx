
import { useState, type FormEvent } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Please enter your Register and password.");
      return;
    }

    // Connect your authentication API here.
    // Pass rememberMe to your auth service if supported.
    setLoading(true);

    // Remove this temporary state when connecting the API.
    setLoading(false);
    setError("Authentication API is not connected yet.");
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Login section */}
      <section className="flex min-h-screen flex-col px-6 py-7 sm:px-10 lg:px-16">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <div className="mb-8">

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back
            </h1>

            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              Sign in to manage your school, access records,
              and stay connected with your community.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="Register"
                className="text-sm font-medium"
              >
                Username/Email or Mobile Number
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  placeholder="you@school.edu"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                  className="h-12 w-full rounded-lg border border-input bg-background pl-11 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="password"
                  className="text-sm font-medium"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="h-12 w-full rounded-lg border border-input bg-background pl-11 pr-12 text-sm outline-none transition placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  aria-pressed={showPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>


            <div className="flex items-center justify-between gap-4">
              <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="size-4 rounded accent-[#4D3FD6]"
                />
                Remember me
              </label>

              <p className="text-sm text-muted-foreground">
                Not Yet Registered?{" "}
                <Link
                  to="/register"
                  className="font-medium text-[#4D3FD6] hover:underline"
                >
                  Register Here
                </Link>
              </p>
            </div>


            {error && (
              <p
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
