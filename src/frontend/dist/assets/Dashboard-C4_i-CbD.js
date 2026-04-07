import { u as useVendorAuth, b as useNavigate, j as jsxRuntimeExports, c as BookOpen, L as Link, a as LoadingSpinner, B as Button } from "./index-CxP7RHi8.js";
import { C as ClickableContact } from "./ClickableContact-DDsHKdIU.js";
import { E as ErrorMessage } from "./ErrorMessage-8VMYR2Sg.js";
import { S as StatusBadge } from "./StatusBadge-sxUY90gg.js";
import { u as useBookings } from "./useBookings-FzHW0iS-.js";
import { T as TrendingUp } from "./trending-up-LTabJl2F.js";
import { C as Clock } from "./clock-DAP6iPsu.js";
import { C as CircleCheckBig } from "./circle-check-big-DohWIESh.js";
import { P as Plus } from "./plus-Dz_5AzH1.js";
import "./phone-BzFICDoY.js";
import "./useMutation-BgRpJWW8.js";
const BOOKING_TYPE_LABELS = {
  one_way: "One Way",
  round_trip: "Round Trip",
  local: "Local"
};
const BOOKING_TYPE_COLORS = {
  one_way: "bg-primary/10 text-primary",
  round_trip: "bg-secondary/20 text-secondary",
  local: "bg-accent/15 text-accent"
};
function Dashboard() {
  const { session } = useVendorAuth();
  const navigate = useNavigate();
  const { data: bookings, isLoading, error } = useBookings(session == null ? void 0 : session.id);
  const total = (bookings == null ? void 0 : bookings.length) ?? 0;
  const pending = (bookings == null ? void 0 : bookings.filter((b) => b.status === "new").length) ?? 0;
  const completed = (bookings == null ? void 0 : bookings.filter((b) => b.status === "completed").length) ?? 0;
  const recent = (bookings == null ? void 0 : bookings.slice().sort((a, b) => b.createdAt - a.createdAt).slice(0, 5)) ?? [];
  const stats = [
    {
      label: "Total",
      value: total,
      icon: BookOpen,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock,
      color: "text-secondary",
      bg: "bg-secondary/15"
    },
    {
      label: "Done",
      value: completed,
      icon: CircleCheckBig,
      color: "text-accent",
      bg: "bg-accent/15"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5 space-y-6 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Welcome back" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground leading-tight", children: session == null ? void 0 : session.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: session == null ? void 0 : session.companyName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: "Active" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", "data-ocid": "stats-row", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "form-card flex flex-col items-center text-center gap-1 p-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-9 h-9 rounded-md flex items-center justify-center ${s.bg}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: `w-4 h-4 ${s.color}` })
            }
          ),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-8 bg-muted animate-pulse rounded" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-display font-bold text-foreground", children: s.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground leading-tight", children: s.label })
        ]
      },
      s.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-display font-bold text-foreground", children: "Recent Bookings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/bookings",
            className: "text-xs font-semibold text-primary hover:underline",
            "data-ocid": "view-all-bookings-link",
            children: "View all"
          }
        )
      ] }),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { message: "Could not load bookings." }),
      !isLoading && !error && recent.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "form-card flex flex-col items-center py-8 gap-2 text-center",
          "data-ocid": "empty-bookings",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-10 h-10 text-muted-foreground/50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "No bookings yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Tap the + button below to create your first booking." })
          ]
        }
      ),
      !isLoading && recent.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "recent-bookings-list", children: recent.map((booking) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "form-card w-full text-left hover:border-primary/40 transition-smooth cursor-pointer",
          "data-ocid": `booking-row-${booking.id}`,
          onClick: () => navigate({
            to: "/bookings/$id",
            params: { id: booking.id }
          }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs font-semibold px-2 py-0.5 rounded-sm flex-shrink-0 ${BOOKING_TYPE_COLORS[booking.bookingType]}`,
                    children: BOOKING_TYPE_LABELS[booking.bookingType]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono truncate", children: [
                  "#",
                  booking.id
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: booking.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-1.5 text-sm text-foreground min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold truncate", children: booking.pickupCity }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground flex-shrink-0", children: "→" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold truncate", children: booking.dropCity })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
              booking.date,
              " at ",
              booking.time
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 pt-2 border-t border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ClickableContact,
              {
                mobile: booking.vendorMobile,
                whatsapp: booking.vendorWhatsapp,
                compact: true
              }
            ) })
          ]
        },
        booking.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed bottom-20 right-4 z-30",
        "data-ocid": "create-booking-fab",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "icon",
            className: "w-14 h-14 rounded-full shadow-elevated bg-primary text-primary-foreground hover:opacity-90 transition-smooth",
            onClick: () => navigate({ to: "/bookings/new" }),
            "aria-label": "Create new booking",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-6 h-6" })
          }
        )
      }
    )
  ] });
}
export {
  Dashboard as default
};
