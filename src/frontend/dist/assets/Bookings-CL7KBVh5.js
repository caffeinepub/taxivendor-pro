import { u as useVendorAuth, b as useNavigate, j as jsxRuntimeExports, B as Button, a as LoadingSpinner, c as BookOpen } from "./index-CxP7RHi8.js";
import { E as ErrorMessage } from "./ErrorMessage-8VMYR2Sg.js";
import { S as StatusBadge } from "./StatusBadge-sxUY90gg.js";
import { u as useBookings } from "./useBookings-FzHW0iS-.js";
import { P as Plus } from "./plus-Dz_5AzH1.js";
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
function BookingsPage() {
  const { session } = useVendorAuth();
  const navigate = useNavigate();
  const {
    data: bookings,
    isLoading,
    error
  } = useBookings((session == null ? void 0 : session.isAdmin) ? void 0 : session == null ? void 0 : session.id);
  const sorted = (bookings == null ? void 0 : bookings.slice().sort((a, b) => b.createdAt - a.createdAt)) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5 space-y-4 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: "Bookings" }),
        !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          sorted.length,
          " total"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "btn-primary flex items-center gap-1.5 h-9",
          onClick: () => navigate({ to: "/bookings/new" }),
          "data-ocid": "create-booking-header-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "New" })
          ]
        }
      )
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md" }) }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { message: "Could not load bookings. Please try again." }),
    !isLoading && !error && sorted.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "form-card flex flex-col items-center py-12 gap-3 text-center",
        "data-ocid": "empty-bookings-list",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-12 h-12 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "No bookings yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Create your first booking to get started." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "btn-primary mt-2",
              onClick: () => navigate({ to: "/bookings/new" }),
              "data-ocid": "empty-state-create-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
                " Create Booking"
              ]
            }
          )
        ]
      }
    ),
    !isLoading && sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "bookings-list", children: sorted.map((booking, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: `w-full text-left rounded-md border border-border p-3.5 hover:border-primary/40 transition-smooth cursor-pointer ${idx % 2 === 1 ? "bg-muted/20" : "bg-card"}`,
        "data-ocid": `booking-item-${booking.id}`,
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 flex items-center gap-1.5 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: booking.pickupCity }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: booking.pickupState })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground flex-shrink-0 text-base font-bold mx-0.5", children: "→" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: booking.dropCity }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: booking.dropState })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              booking.date,
              " · ",
              booking.time
            ] }),
            (session == null ? void 0 : session.isAdmin) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate max-w-[120px]", children: booking.vendorName })
          ] })
        ]
      },
      booking.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed bottom-20 right-4 z-30",
        "data-ocid": "bookings-create-fab",
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
  BookingsPage as default
};
