import { f as createLucideIcon, g as useActor, h as useQuery, m as createActor, j as jsxRuntimeExports, s as Users, e as BookOpen, S as Star, C as ClipboardList, L as Link } from "./index-DQCkNZNn.js";
import { R as RefreshCw } from "./refresh-cw-Db75svbM.js";
import { C as CircleCheck } from "./circle-check-FtZZQecZ.js";
import { C as Clock } from "./clock-DJQe9v6A.js";
import { T as TrendingUp } from "./trending-up-DHIxT1b0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode);
function useAdminStats() {
  const { actor } = useActor(createActor);
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      if (!actor) throw new Error("Backend not ready");
      try {
        const [stats, facilities] = await Promise.all([
          actor.getDashboardStats(),
          actor.listFacilities().catch(
            () => []
          )
        ]);
        return {
          totalVendors: Number(stats.totalVendors),
          pendingApprovals: Number(stats.pendingVendors),
          totalBookings: Number(stats.totalBookings),
          activeBookings: Number(stats.confirmedBookings) + Number(stats.newBookings),
          totalFacilities: facilities.length
        };
      } catch {
        try {
          const [vendors, bookings, facilities] = await Promise.all([
            actor.listAllVendors().catch(() => []),
            actor.listAllBookings(null).catch(() => []),
            actor.listFacilities().catch(() => [])
          ]);
          const pendingApprovals = vendors.filter(
            (v) => String(v.status) === "pending"
          ).length;
          const activeBookings = bookings.filter(
            (b) => String(b.status) === "new" || String(b.status) === "confirmed"
          ).length;
          return {
            totalVendors: vendors.length,
            pendingApprovals,
            totalBookings: bookings.length,
            activeBookings,
            totalFacilities: facilities.length
          };
        } catch {
          return {
            totalVendors: 0,
            pendingApprovals: 0,
            totalBookings: 0,
            activeBookings: 0,
            totalFacilities: 0
          };
        }
      }
    },
    enabled: !!actor,
    retry: 0,
    staleTime: 3e4,
    refetchOnWindowFocus: false
  });
}
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent = "primary",
  href
}) {
  const accentMap = {
    primary: "text-primary bg-primary/10",
    secondary: "text-secondary bg-secondary/10",
    accent: "text-accent bg-accent/10",
    destructive: "text-destructive bg-destructive/10"
  };
  const card = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-card flex items-start gap-4 hover:shadow-sm transition-smooth", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${accentMap[accent]}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground leading-tight", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mt-0.5", children: label }),
      sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: sub })
    ] })
  ] });
  if (href) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: href,
        "data-ocid": `stat-card-${label.toLowerCase().replace(/\s/g, "-")}`,
        children: card
      }
    );
  }
  return card;
}
const QUICK_ACTIONS = [
  {
    href: "/admin/applications",
    icon: Users,
    label: "Vendor Applications",
    desc: "Review and approve vendor signups",
    accent: "primary"
  },
  {
    href: "/admin/bookings",
    icon: ClipboardList,
    label: "Manage Bookings",
    desc: "View, filter and create bookings",
    accent: "secondary"
  },
  {
    href: "/admin/facilities",
    icon: Star,
    label: "Facilities",
    desc: "Add or update service offerings",
    accent: "accent"
  }
];
function AdminPanel() {
  const { data: stats, isLoading, error, refetch } = useAdminStats();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-40 rounded-md bg-muted animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-56 rounded-md bg-muted animate-pulse mt-2" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: ["v1", "v2", "v3", "v4", "v5", "v6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-card flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-lg bg-muted animate-pulse flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-12 rounded bg-muted animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-20 rounded bg-muted animate-pulse" })
        ] })
      ] }, k)) })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-4 py-12 flex flex-col items-center justify-center gap-4 text-center",
        "data-ocid": "admin-stats-error",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-6 h-6 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Could not load admin stats" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Backend connection failed. Please retry." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => refetch(),
              className: "btn-primary flex items-center gap-2 text-sm",
              "data-ocid": "admin-stats-retry-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                "Retry"
              ]
            }
          )
        ]
      }
    );
  }
  const approvedVendors = ((stats == null ? void 0 : stats.totalVendors) ?? 0) - ((stats == null ? void 0 : stats.pendingApprovals) ?? 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          className: "font-display text-2xl font-bold text-foreground",
          "data-ocid": "admin-overview-title",
          children: "Admin Overview"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "KabGo platform at a glance" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: Users,
          label: "Total Vendors",
          value: (stats == null ? void 0 : stats.totalVendors) ?? 0,
          sub: "All registered",
          accent: "primary",
          href: "/admin/applications"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: CircleCheck,
          label: "Approved",
          value: approvedVendors,
          sub: "Active vendors",
          accent: "accent",
          href: "/admin/applications"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: Clock,
          label: "Pending",
          value: (stats == null ? void 0 : stats.pendingApprovals) ?? 0,
          sub: "Awaiting review",
          accent: "secondary",
          href: "/admin/applications"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: BookOpen,
          label: "Total Bookings",
          value: (stats == null ? void 0 : stats.totalBookings) ?? 0,
          sub: "All time",
          accent: "primary",
          href: "/admin/bookings"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: TrendingUp,
          label: "Active Rides",
          value: (stats == null ? void 0 : stats.activeBookings) ?? 0,
          sub: "In progress",
          accent: "accent",
          href: "/admin/bookings"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: Star,
          label: "Facilities",
          value: (stats == null ? void 0 : stats.totalFacilities) ?? 0,
          sub: "Services listed",
          accent: "secondary",
          href: "/admin/facilities"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold text-foreground mb-3", children: "Quick Actions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: QUICK_ACTIONS.map((action) => {
        const accentMap = {
          primary: "text-primary bg-primary/10",
          secondary: "text-secondary bg-secondary/10",
          accent: "text-accent bg-accent/10"
        };
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: action.href,
            className: "form-card flex items-center gap-4 hover:shadow-sm transition-smooth",
            "data-ocid": `quick-action-${action.label.toLowerCase().replace(/\s/g, "-")}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${accentMap[action.accent]}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(action.icon, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: action.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: action.desc })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  className: "w-4 h-4",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  "aria-hidden": "true",
                  role: "presentation",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M9 5l7 7-7 7"
                    }
                  )
                }
              ) })
            ]
          },
          action.href
        );
      }) })
    ] })
  ] });
}
export {
  AdminPanel as default
};
