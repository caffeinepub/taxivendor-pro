import DocumentUpload from "@/components/DocumentUpload";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useVendorAuth } from "@/hooks/useVendorAuth";
import type { SignupData } from "@/types";
import { Link } from "@tanstack/react-router";
import { Car, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface FormState {
  name: string;
  mobile: string;
  companyName: string;
  drivingLicence: string;
  aadhaarCard: string;
  password: string;
  confirmPassword: string;
}

const INITIAL: FormState = {
  name: "",
  mobile: "",
  companyName: "",
  drivingLicence: "",
  aadhaarCard: "",
  password: "",
  confirmPassword: "",
};

export default function Signup() {
  const { signup, isLoading } = useVendorAuth();

  const [form, setForm] = useState<FormState>(INITIAL);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Document state
  const [licenceFile, setLicenceFile] = useState<File | null>(null);
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);

  const set =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      setSubmitError(null);
    };

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Full name is required";
    if (!/^[6-9]\d{9}$/.test(form.mobile))
      next.mobile = "Enter a valid 10-digit mobile number";
    if (!form.companyName.trim()) next.companyName = "Company name is required";
    if (!form.drivingLicence.trim())
      next.drivingLicence = "Driving licence number is required";
    if (!form.aadhaarCard.trim())
      next.aadhaarCard = "Aadhaar number is required";
    else if (!/^\d{12}$/.test(form.aadhaarCard.replace(/\s/g, "")))
      next.aadhaarCard = "Aadhaar must be 12 digits";
    if (!licenceFile)
      next.drivingLicence = "Please upload your driving licence document";
    if (!aadhaarFile)
      next.aadhaarCard = "Please upload your Aadhaar card document";
    if (form.password.length < 6)
      next.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      next.confirmPassword = "Passwords do not match";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    // Both files are guaranteed non-null after validate() passes
    if (!licenceFile || !aadhaarFile) return;

    const data: SignupData = {
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      companyName: form.companyName.trim(),
      drivingLicence: form.drivingLicence.trim(),
      aadhaarCard: form.aadhaarCard.trim(),
      password: form.password,
    };

    let result: { success: boolean; error?: string };
    try {
      result = await signup(data, licenceFile, aadhaarFile);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      // IC void decode artefacts should be treated as success (hook handles this,
      // but catch here as extra safety)
      const isVoidDecodeError =
        msg.toLowerCase().includes("v3") ||
        msg.toLowerCase().includes("expected") ||
        msg.toLowerCase().includes("response body");
      result = isVoidDecodeError
        ? { success: true }
        : {
            success: false,
            error:
              "Registration failed. Please try again. / Registration fail ho gayi. Dobara try karein.",
          };
    }

    if (result.success) {
      setSuccess(true);
    } else {
      setSubmitError(
        result.error ??
          "Registration failed. Please try again. / Registration fail ho gayi. Dobara try karein.",
      );
    }
  };

  if (success) {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center px-5 py-12 text-center"
        data-ocid="signup-success"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
          <CheckCircle className="w-9 h-9 text-primary" />
        </div>
        <h2 className="font-display font-bold text-2xl text-foreground mb-2">
          Application Submitted!
        </h2>
        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-8">
          Your vendor application is under review. You'll be able to log in once
          an admin approves your account.
        </p>
        <Link to="/login">
          <Button className="btn-primary h-11 px-8" data-ocid="go-to-login-btn">
            Go to Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 max-w-md mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-3">
          <Car className="w-6 h-6 text-primary-foreground" />
        </div>
        <h1 className="font-display font-bold text-2xl text-foreground">
          Vendor Registration
        </h1>
        <p className="text-muted-foreground text-sm mt-1 text-center">
          Join Sarthi Vendors — submit your details for admin approval
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="form-label" htmlFor="name">
            Full Name <span className="text-destructive">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Rajesh Kumar"
            value={form.name}
            onChange={set("name")}
            className="form-input"
            autoComplete="name"
            data-ocid="signup-name"
          />
          {errors.name && (
            <p className="text-xs text-destructive mt-1">{errors.name}</p>
          )}
        </div>

        {/* Mobile Number */}
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
            data-ocid="signup-mobile"
          />
          {errors.mobile && (
            <p className="text-xs text-destructive mt-1">{errors.mobile}</p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label className="form-label" htmlFor="companyName">
            Company Name <span className="text-destructive">*</span>
          </label>
          <input
            id="companyName"
            type="text"
            placeholder="Kumar Travels Pvt Ltd"
            value={form.companyName}
            onChange={set("companyName")}
            className="form-input"
            data-ocid="signup-company"
          />
          {errors.companyName && (
            <p className="text-xs text-destructive mt-1">
              {errors.companyName}
            </p>
          )}
        </div>

        {/* Driving Licence */}
        <div>
          <label className="form-label" htmlFor="drivingLicence">
            Driving Licence Number <span className="text-destructive">*</span>
          </label>
          <input
            id="drivingLicence"
            type="text"
            placeholder="DL-1420110012345"
            value={form.drivingLicence}
            onChange={set("drivingLicence")}
            className="form-input uppercase"
            data-ocid="signup-licence-number"
          />
          {errors.drivingLicence && !licenceFile && (
            <p className="text-xs text-destructive mt-1">
              {errors.drivingLicence}
            </p>
          )}
        </div>

        {/* Driving Licence Document */}
        <DocumentUpload
          label="Upload Driving Licence"
          required
          onUpload={(file) => setLicenceFile(file)}
          onRemove={() => setLicenceFile(null)}
          data-ocid="signup-licence-upload"
        />
        {errors.drivingLicence && !licenceFile && (
          <p className="text-xs text-destructive -mt-3">
            Please upload your driving licence document
          </p>
        )}

        {/* Aadhaar Card */}
        <div>
          <label className="form-label" htmlFor="aadhaarCard">
            Aadhaar Card Number <span className="text-destructive">*</span>
          </label>
          <input
            id="aadhaarCard"
            type="text"
            placeholder="1234 5678 9012"
            value={form.aadhaarCard}
            onChange={set("aadhaarCard")}
            className="form-input"
            maxLength={14}
            data-ocid="signup-aadhaar-number"
          />
          {errors.aadhaarCard && !aadhaarFile && (
            <p className="text-xs text-destructive mt-1">
              {errors.aadhaarCard}
            </p>
          )}
        </div>

        {/* Aadhaar Document */}
        <DocumentUpload
          label="Upload Aadhaar Card"
          required
          onUpload={(file) => setAadhaarFile(file)}
          onRemove={() => setAadhaarFile(null)}
          data-ocid="signup-aadhaar-upload"
        />
        {errors.aadhaarCard && !aadhaarFile && (
          <p className="text-xs text-destructive -mt-3">
            Please upload your Aadhaar card document
          </p>
        )}

        {/* Password */}
        <div>
          <label className="form-label" htmlFor="password">
            Create Password <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPw ? "text" : "password"}
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={set("password")}
              className="form-input pr-10"
              autoComplete="new-password"
              data-ocid="signup-password"
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
          {errors.password && (
            <p className="text-xs text-destructive mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="form-label" htmlFor="confirmPassword">
            Confirm Password <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter password"
              value={form.confirmPassword}
              onChange={set("confirmPassword")}
              className="form-input pr-10"
              autoComplete="new-password"
              data-ocid="signup-confirm-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={
                showConfirm ? "Hide confirm password" : "Show confirm password"
              }
            >
              {showConfirm ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-destructive mt-1">
              {errors.confirmPassword}
            </p>
          )}
          {form.password &&
            form.confirmPassword &&
            form.password === form.confirmPassword && (
              <p className="text-xs text-accent mt-1 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Passwords match
              </p>
            )}
        </div>

        {/* Submit error */}
        {submitError && <ErrorMessage message={submitError} compact />}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full h-12 text-base font-bold"
          data-ocid="signup-submit-btn"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size="sm" />
              Submitting application...
            </span>
          ) : (
            "Submit Application"
          )}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
            data-ocid="signup-login-link"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
