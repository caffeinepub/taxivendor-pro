import { u as useVendorAuth, r as reactExports, j as jsxRuntimeExports, L as Link, B as Button, C as Car, a as LoadingSpinner } from "./index-CPOLE32K.js";
import { D as DocumentUpload } from "./DocumentUpload-CSf1te-d.js";
import { E as ErrorMessage } from "./ErrorMessage-CUktorBB.js";
import { C as CircleCheckBig } from "./circle-check-big-C9YSsxKh.js";
import { E as EyeOff, a as Eye } from "./eye-tiSiYjam.js";
import "./file-text-WQYbQpTu.js";
import "./circle-x-DtGT8mYe.js";
import "./refresh-cw-Bt-VQHyD.js";
const INITIAL = {
  name: "",
  mobile: "",
  companyName: "",
  drivingLicence: "",
  aadhaarCard: "",
  password: "",
  confirmPassword: ""
};
function Signup() {
  const { signup, isLoading } = useVendorAuth();
  const [form, setForm] = reactExports.useState(INITIAL);
  const [showPw, setShowPw] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  const [submitError, setSubmitError] = reactExports.useState(null);
  const [success, setSuccess] = reactExports.useState(false);
  const [licenceFile, setLicenceFile] = reactExports.useState(null);
  const [aadhaarFile, setAadhaarFile] = reactExports.useState(null);
  const set = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: void 0 }));
    setSubmitError(null);
  };
  const validate = () => {
    const next = {};
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    if (!licenceFile || !aadhaarFile) return;
    const data = {
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      companyName: form.companyName.trim(),
      drivingLicence: form.drivingLicence.trim(),
      aadhaarCard: form.aadhaarCard.trim(),
      password: form.password
    };
    const result = await signup(data, licenceFile, aadhaarFile);
    if (result.success) {
      setSuccess(true);
    } else {
      setSubmitError(
        result.error ?? "Registration failed. Please try again. / Registration fail ho gayi. Dobara try karein."
      );
    }
  };
  if (success) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[70vh] flex flex-col items-center justify-center px-5 py-12 text-center",
        "data-ocid": "signup-success",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-9 h-9 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Application Submitted! / आवेदन सबमिट हो गया!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm max-w-xs leading-relaxed mb-8", children: [
            "Application submitted! Waiting for admin approval before you can login.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "आवेदन सबमिट हो गया! Admin approval ke baad hi aap login kar sakte hain. Please wait." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "btn-primary h-11 px-8", "data-ocid": "go-to-login-btn", children: "Go to Login" }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-8 max-w-md mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-6 h-6 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Vendor Registration" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 text-center", children: "Join Sarthi Vendors — submit your details for admin approval" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "form-label", htmlFor: "name", children: [
          "Full Name ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "name",
            type: "text",
            placeholder: "Rajesh Kumar",
            value: form.name,
            onChange: set("name"),
            className: "form-input",
            autoComplete: "name",
            "data-ocid": "signup-name"
          }
        ),
        errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: errors.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "form-label", htmlFor: "mobile", children: [
          "Mobile Number ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "mobile",
            type: "tel",
            placeholder: "9876543210",
            value: form.mobile,
            onChange: set("mobile"),
            className: "form-input",
            maxLength: 10,
            autoComplete: "tel",
            "data-ocid": "signup-mobile"
          }
        ),
        errors.mobile && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: errors.mobile })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "form-label", htmlFor: "companyName", children: [
          "Company Name ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "companyName",
            type: "text",
            placeholder: "Kumar Travels Pvt Ltd",
            value: form.companyName,
            onChange: set("companyName"),
            className: "form-input",
            "data-ocid": "signup-company"
          }
        ),
        errors.companyName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: errors.companyName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "form-label", htmlFor: "drivingLicence", children: [
          "Driving Licence Number ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "drivingLicence",
            type: "text",
            placeholder: "DL-1420110012345",
            value: form.drivingLicence,
            onChange: set("drivingLicence"),
            className: "form-input uppercase",
            "data-ocid": "signup-licence-number"
          }
        ),
        errors.drivingLicence && !licenceFile && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: errors.drivingLicence })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DocumentUpload,
        {
          label: "Upload Driving Licence",
          required: true,
          onUpload: (file) => setLicenceFile(file),
          onRemove: () => setLicenceFile(null),
          "data-ocid": "signup-licence-upload"
        }
      ),
      errors.drivingLicence && !licenceFile && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive -mt-3", children: "Please upload your driving licence document" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "form-label", htmlFor: "aadhaarCard", children: [
          "Aadhaar Card Number ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "aadhaarCard",
            type: "text",
            placeholder: "1234 5678 9012",
            value: form.aadhaarCard,
            onChange: set("aadhaarCard"),
            className: "form-input",
            maxLength: 14,
            "data-ocid": "signup-aadhaar-number"
          }
        ),
        errors.aadhaarCard && !aadhaarFile && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: errors.aadhaarCard })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DocumentUpload,
        {
          label: "Upload Aadhaar Card",
          required: true,
          onUpload: (file) => setAadhaarFile(file),
          onRemove: () => setAadhaarFile(null),
          "data-ocid": "signup-aadhaar-upload"
        }
      ),
      errors.aadhaarCard && !aadhaarFile && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive -mt-3", children: "Please upload your Aadhaar card document" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "form-label", htmlFor: "password", children: [
          "Create Password ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "password",
              type: showPw ? "text" : "password",
              placeholder: "Min. 6 characters",
              value: form.password,
              onChange: set("password"),
              className: "form-input pr-10",
              autoComplete: "new-password",
              "data-ocid": "signup-password"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowPw((v) => !v),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
              "aria-label": showPw ? "Hide password" : "Show password",
              children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
            }
          )
        ] }),
        errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: errors.password })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "form-label", htmlFor: "confirmPassword", children: [
          "Confirm Password ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "confirmPassword",
              type: showConfirm ? "text" : "password",
              placeholder: "Re-enter password",
              value: form.confirmPassword,
              onChange: set("confirmPassword"),
              className: "form-input pr-10",
              autoComplete: "new-password",
              "data-ocid": "signup-confirm-password"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowConfirm((v) => !v),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
              "aria-label": showConfirm ? "Hide confirm password" : "Show confirm password",
              children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
            }
          )
        ] }),
        errors.confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: errors.confirmPassword }),
        form.password && form.confirmPassword && form.password === form.confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-accent mt-1 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
          " Passwords match"
        ] })
      ] }),
      submitError && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { message: submitError, compact: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: isLoading,
          className: "btn-primary w-full h-12 text-base font-bold",
          "data-ocid": "signup-submit-btn",
          children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
            "Submitting application..."
          ] }) : "Submit Application"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/login",
            className: "text-primary font-semibold hover:underline",
            "data-ocid": "signup-login-link",
            children: "Login here"
          }
        )
      ] })
    ] })
  ] });
}
export {
  Signup as default
};
