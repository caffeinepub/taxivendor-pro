import { f as createLucideIcon, u as useVendorAuth, b as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button, a as LoadingSpinner, L as Link } from "./index-DQCkNZNn.js";
import { C as Car } from "./car-MBMO8q4G.js";
import { C as Clock } from "./clock-DJQe9v6A.js";
import { E as EyeOff, a as Eye } from "./eye-oB_oejFw.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode);
const INITIAL = { mobile: "", password: "" };
function Login() {
  const { login, isLoading } = useVendorAuth();
  const navigate = useNavigate();
  const [form, setForm] = reactExports.useState(INITIAL);
  const [showPw, setShowPw] = reactExports.useState(false);
  const [fieldErrors, setFieldErrors] = reactExports.useState({});
  const [loginError, setLoginError] = reactExports.useState(null);
  const [isPending, setIsPending] = reactExports.useState(false);
  const set = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setFieldErrors((prev) => ({ ...prev, [field]: void 0 }));
    setLoginError(null);
    setIsPending(false);
  };
  const validate = () => {
    const next = {};
    if (!/^[6-9]\d{9}$/.test(form.mobile) && form.mobile !== "7499685759")
      next.mobile = "Enter a valid 10-digit mobile number";
    if (!form.password) next.password = "Password is required";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const credentials = {
      mobile: form.mobile.trim(),
      password: form.password
    };
    const result = await login(credentials);
    if (result.success) {
      navigate({ to: "/" });
    } else {
      const errMsg = result.error ?? "Login failed. Please try again.";
      if (errMsg.toLowerCase().includes("pending")) {
        setIsPending(true);
      } else {
        setLoginError(errMsg);
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[80vh] flex flex-col items-center justify-center px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-7 h-7 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Welcome back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 text-center", children: "Login with your registered mobile number" })
    ] }),
    isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mb-5 flex items-start gap-3 bg-secondary/10 border border-secondary/30 rounded-md p-4",
        role: "alert",
        "data-ocid": "login-pending-notice",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-secondary flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Account Pending Approval" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Your application is being reviewed by admin. You'll be notified once approved." })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: "space-y-5", children: [
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
            inputMode: "numeric",
            "data-ocid": "login-mobile"
          }
        ),
        fieldErrors.mobile && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: fieldErrors.mobile })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "form-label", htmlFor: "password", children: [
          "Password ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "password",
              type: showPw ? "text" : "password",
              placeholder: "Enter your password",
              value: form.password,
              onChange: set("password"),
              className: "form-input pr-10",
              autoComplete: "current-password",
              "data-ocid": "login-password"
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
        fieldErrors.password && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: fieldErrors.password })
      ] }),
      loginError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-md p-3",
          role: "alert",
          "data-ocid": "login-error",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-4 h-4 text-destructive flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: loginError })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: isLoading,
          className: "btn-primary w-full h-12 text-base font-bold",
          "data-ocid": "login-submit-btn",
          children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
            "Signing in..."
          ] }) : "Login"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 p-3 bg-muted/40 border border-border rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Admin:" }),
      " use",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: "7499685759" }),
      " /",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: "123252" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-6", children: [
      "New vendor?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/signup",
          className: "text-primary font-semibold hover:underline",
          "data-ocid": "login-signup-link",
          children: "Register here"
        }
      )
    ] })
  ] }) });
}
export {
  Login as default
};
