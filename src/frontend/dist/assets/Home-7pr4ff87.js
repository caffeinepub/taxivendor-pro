import { f as createLucideIcon, j as jsxRuntimeExports, L as Link, B as Button } from "./index-Dg4inA2B.js";
import { C as CircleCheckBig } from "./circle-check-big-DRwabk1o.js";
import { M as MapPin } from "./map-pin-DpZeWjrZ.js";
import { S as Shield } from "./shield-HdbKJjgk.js";
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
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const FEATURES = [
  {
    icon: MapPin,
    title: "Smart City Search",
    desc: "Pickup & drop with instant city suggestions across Gujarat & India"
  },
  {
    icon: Shield,
    title: "Verified Vendors",
    desc: "Admin-approved vendors with documents on file"
  },
  {
    icon: Zap,
    title: "Real-time Bookings",
    desc: "One Way, Round Trip & Local — manage everything in one place"
  }
];
const STEPS = [
  {
    step: "01",
    title: "Register karein",
    desc: "Company details aur documents submit karein"
  },
  {
    step: "02",
    title: "Approval milega",
    desc: "Admin review karega aur account activate hoga"
  },
  {
    step: "03",
    title: "Booking post karein",
    desc: "Driver earnings aur commission ke saath trips add karein"
  }
];
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex-1 flex flex-col items-center justify-center px-5 py-16 text-center bg-gradient-to-b from-card to-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/assets/images/sarthi-logo.png",
          alt: "Sarthi Vendors",
          className: "w-24 h-24 rounded-full object-cover shadow-lg border-4 border-primary/20"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
        "Trusted by 500+ vendors across India"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl sm:text-5xl text-foreground leading-tight tracking-tight mb-2", children: "Sarthi Vendors" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-primary font-semibold mb-4", children: "सारथी कैब वेंडर्स" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground max-w-sm mb-8 leading-relaxed", children: "Cab vendors ke liye booking management platform — trips post karo, earnings track karo, drivers manage karo apne mobile se." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "btn-primary w-full h-12 text-base font-bold",
            "data-ocid": "home-signup-btn",
            children: "Abhi Register Karein"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "w-full h-12 text-base font-semibold border-border",
            "data-ocid": "home-login-btn",
            children: "Login Karein"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-xs text-muted-foreground", children: [
        "Already registered?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/login",
            className: "text-primary font-medium hover:underline",
            children: "Login here"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-muted/30 border-t border-border px-5 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground text-center mb-8", children: "Sab kuch ek jagah" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto", children: FEATURES.map(({ icon: Icon, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "form-card flex flex-col items-start gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: desc })
            ] })
          ]
        },
        title
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-background border-t border-border px-5 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground text-center mb-8", children: "Kaise kaam karta hai" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row items-start gap-6 max-w-2xl mx-auto", children: STEPS.map(({ step, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary-foreground", children: step }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: desc })
        ] })
      ] }, step)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-primary px-5 py-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-primary-foreground mb-2", children: "Apna cab business badhao?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-primary-foreground/80 mb-6", children: "Hazaron vendors Sarthi Vendors par bookings manage kar rahe hain" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "bg-primary-foreground text-primary border-primary-foreground font-bold h-11 px-8 hover:bg-primary-foreground/90",
          "data-ocid": "home-cta-signup-btn",
          children: "Vendor Account Banao"
        }
      ) })
    ] })
  ] });
}
export {
  Home as default
};
