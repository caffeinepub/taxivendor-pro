import { f as createLucideIcon, u as useVendorAuth, b as useNavigate, j as jsxRuntimeExports, U as User, e as BookOpen, B as Button, q as LogOut } from "./index-Dg4inA2B.js";
import { S as StatusBadge } from "./StatusBadge-B0YaaiuA.js";
import { u as useBookings } from "./useBookings-CGrFJ29G.js";
import { B as Building2 } from "./building-2-CwnHLuuz.js";
import { S as Shield } from "./shield-HdbKJjgk.js";
import { P as Phone } from "./phone-DK06e504.js";
import { C as CircleCheckBig } from "./circle-check-big-DRwabk1o.js";
import { F as FileText } from "./file-text-DnXESsW0.js";
import "./useMutation-DZ_242xz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode);
function Profile() {
  const { session, logout } = useVendorAuth();
  const navigate = useNavigate();
  const { data: bookings } = useBookings(session == null ? void 0 : session.id);
  const totalBookings = (bookings == null ? void 0 : bookings.length) ?? 0;
  const completedBookings = (bookings == null ? void 0 : bookings.filter((b) => b.status === "completed").length) ?? 0;
  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };
  if (!session) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5 space-y-5 pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "form-card flex items-start gap-4",
        "data-ocid": "profile-header",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-7 h-7 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-foreground truncate", children: session.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground truncate", children: session.companyName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: session.status }),
              session.isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-active flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3 h-3" }),
                "Admin"
              ] })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-card space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-bold text-foreground", children: "Contact Information" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-md bg-secondary/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-secondary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Mobile Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm font-semibold text-foreground",
              "data-ocid": "profile-mobile",
              children: session.mobile
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-card text-center py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: totalBookings }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Total Bookings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-card text-center py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: completedBookings }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Completed" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-card space-y-3", "data-ocid": "document-status", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-bold text-foreground", children: "Documents" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 border-b border-border/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-md bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Driving Licence" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Identity verification" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "badge-pending text-xs",
            "data-ocid": "driving-licence-status",
            children: "Pending"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-md bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Aadhaar Card" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Address proof" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-pending text-xs", "data-ocid": "aadhaar-status", children: "Pending" })
      ] })
    ] }),
    session.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-secondary/30 bg-secondary/10 p-3 flex items-start gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-secondary mt-0.5 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Account Under Review" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Your application is being reviewed by the admin. You will be notified once approved." })
      ] })
    ] }),
    session.status === "approved" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-accent/30 bg-accent/10 p-3 flex items-start gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-accent mt-0.5 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Account Approved" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Your account is active. You can create and manage bookings." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        className: "w-full flex items-center justify-center gap-2 h-12 border-destructive/30 text-destructive bg-destructive/5 hover:bg-destructive/10 hover:text-destructive transition-smooth font-semibold text-sm",
        onClick: handleLogout,
        "data-ocid": "logout-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
          "Log Out"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-center text-muted-foreground pb-2", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      ". Built with love using",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
          className: "text-primary hover:underline",
          target: "_blank",
          rel: "noopener noreferrer",
          children: "caffeine.ai"
        }
      )
    ] })
  ] });
}
export {
  Profile as default
};
