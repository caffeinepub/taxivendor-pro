import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useVendorAuth } from "@/hooks/useVendorAuth";
import type { LoginCredentials } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import { Car, Clock, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { useState } from "react";

interface FormState {
  mobile: string;
  password: string;
}

const INITIAL: FormState = { mobile: "", password: "" };

export default function Login() {
  const { login, isLoading } = useVendorAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(INITIAL);
  const [showPw, setShowPw] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<FormState>>({});
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const set =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
      setLoginError(null);
      setIsPending(false);
    };

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!/^[6-9]\d{9}$/.test(form.mobile) && form.mobile !== "7499685759")
      next.mobile = "Enter a valid 10-digit mobile number";
    if (!form.password) next.password = "Password is required";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const credentials: LoginCredentials = {
      mobile: form.mobile.trim(),
      password: form.password,
    };

    const result = await login(credentials);

    if (result.success) {
      // Navigate handled by App.tsx route guard via session
      navigate({ to: "/" });
    } else {
      const errMsg = result.error ?? "Login failed. Please try again.";
      // Distinguish pending vs other errors
      if (errMsg.toLowerCase().includes("pending")) {
        setIsPending(true);
      } else {
        setLoginError(errMsg);
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-md">
            <Car className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Welcome back
          </h1>
          <p className="text-muted-foreground text-sm mt-1 text-center">
            Login with your registered mobile number
          </p>
        </div>

        {/* Pending state */}
        {isPending && (
          <div
            className="mb-5 flex items-start gap-3 bg-secondary/10 border border-secondary/30 rounded-md p-4"
            role="alert"
            data-ocid="login-pending-notice"
          >
            <Clock className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Account Pending Approval
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Your application is being reviewed by admin. You'll be notified
                once approved.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Mobile */}
          <div>
            <label className="form-label" htmlFor="mobile">
              Mobile Number <span className="text-destructive">*</span>
            </label>
            <input
              id="mobile"
              type="tel"
              placeholder="9876543210"
              value={form.mobile}
              onChange={set("mobile")}
              className="form-input"
              maxLength={10}
              autoComplete="tel"
              inputMode="numeric"
              data-ocid="login-mobile"
            />
            {fieldErrors.mobile && (
              <p className="text-xs text-destructive mt-1">
                {fieldErrors.mobile}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="form-label" htmlFor="password">
              Password <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={set("password")}
                className="form-input pr-10"
                autoComplete="current-password"
                data-ocid="login-password"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="text-xs text-destructive mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* General error */}
          {loginError && (
            <div
              className="flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-md p-3"
              role="alert"
              data-ocid="login-error"
            >
              <ShieldAlert className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{loginError}</p>
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full h-12 text-base font-bold"
            data-ocid="login-submit-btn"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                Signing in...
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        {/* Hint for admin */}
        <div className="mt-5 p-3 bg-muted/40 border border-border rounded-md">
          <p className="text-xs text-muted-foreground text-center">
            <span className="font-semibold text-foreground">Admin:</span> use{" "}
            <span className="font-mono text-foreground">7499685759</span> /{" "}
            <span className="font-mono text-foreground">123252</span>
          </p>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          New vendor?{" "}
          <Link
            to="/signup"
            className="text-primary font-semibold hover:underline"
            data-ocid="login-signup-link"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
