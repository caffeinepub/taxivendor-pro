import { f as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as LoadingSpinner, s as ClipboardList, B as Button, X } from "./index-Dg4inA2B.js";
import { C as CityAutocomplete } from "./CityAutocomplete-CZNuCeX-.js";
import { E as ErrorMessage } from "./ErrorMessage-XYba8C8j.js";
import { S as StatusBadge } from "./StatusBadge-B0YaaiuA.js";
import { e as useAllBookings, c as useUpdateBookingStatus, f as useCreateAdminBooking } from "./useBookings-CGrFJ29G.js";
import { u as useVendors } from "./index-DtOdTl3p.js";
import { u as ue } from "./index-rrB9sIEM.js";
import { P as Plus } from "./plus-D5jWanqj.js";
import { M as MapPin } from "./map-pin-DpZeWjrZ.js";
import { P as Phone } from "./phone-DK06e504.js";
import "./refresh-cw-Vu6KezLY.js";
import "./useMutation-DZ_242xz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode);
const BOOKING_TYPES = [
  { label: "One Way", value: "one_way" },
  { label: "Round Trip", value: "round_trip" },
  { label: "Local", value: "local" }
];
const STATUS_OPTIONS = [
  { label: "New", value: "new" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" }
];
const BOOKING_TYPE_LABELS = {
  one_way: "One Way",
  round_trip: "Round Trip",
  local: "Local"
};
function CreateBookingModal({ onClose }) {
  const { data: vendors = [] } = useVendors();
  const createAdminBooking = useCreateAdminBooking();
  const [vendorId, setVendorId] = reactExports.useState("");
  const [form, setForm] = reactExports.useState({
    bookingType: "one_way",
    pickupCity: "",
    pickupState: "",
    dropCity: "",
    dropState: "",
    date: "",
    time: "",
    driverEarning: 0,
    commission: 0,
    vendorMobile: "",
    vendorWhatsapp: ""
  });
  const approvedVendors = vendors.filter((v) => v.status === "approved");
  const selectedVendor = approvedVendors.find((v) => v.id === vendorId);
  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.pickupCity || !form.dropCity || !form.date || !form.time) {
      ue.error("Please fill all required fields");
      return;
    }
    createAdminBooking.mutate(
      {
        ...form,
        vendorId: (selectedVendor == null ? void 0 : selectedVendor.id) ?? "",
        vendorName: (selectedVendor == null ? void 0 : selectedVendor.name) ?? "Admin"
      },
      {
        onSuccess: () => {
          ue.success("Booking created successfully");
          onClose();
        },
        onError: () => ue.error("Failed to create booking")
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "dialog",
    {
      open: true,
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-foreground/20 backdrop-blur-sm border-0 max-w-none w-full h-full m-0",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card w-full sm:max-w-lg rounded-t-2xl sm:rounded-xl border border-border shadow-elevated overflow-y-auto max-h-[90vh]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-4 border-b border-border sticky top-0 bg-card z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground", children: "Create Booking" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: onClose,
              "aria-label": "Close",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "p-4 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "form-label", htmlFor: "admin-booking-vendor", children: [
              "Vendor",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional — leave blank to mark as Admin booking)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "admin-booking-vendor",
                className: "form-input text-sm",
                value: vendorId,
                onChange: (e) => {
                  setVendorId(e.target.value);
                  const v = approvedVendors.find((v2) => v2.id === e.target.value);
                  if (v) {
                    set("vendorMobile", v.mobile);
                    set("vendorWhatsapp", v.mobile);
                  }
                },
                "data-ocid": "admin-booking-vendor-select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Admin (no vendor)" }),
                  approvedVendors.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: v.id, children: [
                    v.name,
                    " — ",
                    v.companyName
                  ] }, v.id))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "form-label", children: "Booking Type *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: BOOKING_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => set("bookingType", t.value),
                className: `flex-1 py-2 rounded-sm text-xs font-semibold border transition-smooth ${form.bookingType === t.value ? "bg-primary text-primary-foreground border-primary" : "border-input text-muted-foreground hover:border-primary hover:text-foreground"}`,
                "data-ocid": `booking-type-${t.value}`,
                children: t.label
              },
              t.value
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CityAutocomplete,
            {
              label: "Pickup Location *",
              value: form.pickupCity,
              state: form.pickupState,
              onChange: (city, state) => {
                set("pickupCity", city);
                set("pickupState", state);
              },
              id: "admin-pickup",
              "data-ocid": "admin-pickup-input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CityAutocomplete,
            {
              label: "Drop Location *",
              value: form.dropCity,
              state: form.dropState,
              onChange: (city, state) => {
                set("dropCity", city);
                set("dropState", state);
              },
              id: "admin-drop",
              "data-ocid": "admin-drop-input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "admin-date", children: "Date *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "admin-date",
                  type: "date",
                  className: "form-input text-sm",
                  value: form.date,
                  onChange: (e) => set("date", e.target.value),
                  required: true,
                  "data-ocid": "admin-booking-date"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "admin-time", children: "Time *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "admin-time",
                  type: "time",
                  className: "form-input text-sm",
                  value: form.time,
                  onChange: (e) => set("time", e.target.value),
                  required: true,
                  "data-ocid": "admin-booking-time"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "admin-earning", children: "Driver Earning (₹) *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "admin-earning",
                  type: "number",
                  min: 0,
                  className: "form-input text-sm",
                  value: form.driverEarning || "",
                  onChange: (e) => set("driverEarning", Number(e.target.value)),
                  required: true,
                  "data-ocid": "admin-booking-earning"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "admin-commission", children: "Commission (₹) *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "admin-commission",
                  type: "number",
                  min: 0,
                  className: "form-input text-sm",
                  value: form.commission || "",
                  onChange: (e) => set("commission", Number(e.target.value)),
                  required: true,
                  "data-ocid": "admin-booking-commission"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "admin-mobile", children: "Submitter Mobile *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "admin-mobile",
                  type: "tel",
                  maxLength: 10,
                  className: "form-input text-sm",
                  value: form.vendorMobile,
                  onChange: (e) => set("vendorMobile", e.target.value),
                  required: true,
                  "data-ocid": "admin-booking-mobile"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "admin-whatsapp", children: "WhatsApp No. *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "admin-whatsapp",
                  type: "tel",
                  maxLength: 10,
                  className: "form-input text-sm",
                  value: form.vendorWhatsapp,
                  onChange: (e) => set("vendorWhatsapp", e.target.value),
                  required: true,
                  "data-ocid": "admin-booking-whatsapp"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              className: "btn-primary w-full mt-2 disabled:opacity-60",
              disabled: createAdminBooking.isPending,
              "data-ocid": "admin-create-booking-submit",
              children: createAdminBooking.isPending ? "Creating..." : "Create Booking"
            }
          )
        ] })
      ] })
    }
  );
}
function BookingRow({
  booking,
  onStatusChange,
  isUpdating,
  updatingId
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "form-card space-y-3 table-row-alt",
      "data-ocid": `booking-row-${booking.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono font-bold text-primary", children: [
                "#",
                booking.id
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground font-medium", children: BOOKING_TYPE_LABELS[booking.bookingType] }),
              booking.vendorName === "Admin" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold px-1.5 py-0.5 rounded bg-destructive/10 text-destructive", children: "Admin" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mt-1", children: booking.vendorName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: booking.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-primary flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-foreground font-medium", children: booking.pickupCity }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground flex-shrink-0", children: "→" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-foreground font-medium", children: booking.dropCity })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              new Date(booking.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short"
              }),
              " ",
              booking.time
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
              "₹",
              booking.driverEarning
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "driver" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
              "₹",
              booking.commission
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: " comm." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 pt-1 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: `tel:${booking.vendorMobile}`,
              className: "flex items-center gap-1 text-xs text-primary hover:underline",
              "data-ocid": `booking-call-${booking.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
                booking.vendorMobile
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              className: "form-input text-xs py-1 px-2 w-auto min-w-[120px]",
              value: booking.status,
              disabled: isUpdating && updatingId === booking.id,
              onChange: (e) => onStatusChange(booking.id, e.target.value),
              "data-ocid": `booking-status-select-${booking.id}`,
              children: STATUS_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
            }
          )
        ] })
      ]
    }
  );
}
function AdminBookings() {
  const { data: bookings = [], isLoading, error, refetch } = useAllBookings();
  const { data: vendors = [] } = useVendors();
  const updateStatus = useUpdateBookingStatus();
  const [filterVendor, setFilterVendor] = reactExports.useState("all");
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const [updatingId, setUpdatingId] = reactExports.useState(null);
  const filtered = bookings.filter((b) => {
    const matchVendor = filterVendor === "all" || b.vendorId === filterVendor;
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    return matchVendor && matchStatus;
  });
  const handleStatusChange = (id, status) => {
    setUpdatingId(id);
    updateStatus.mutate(
      { id, status },
      {
        onSuccess: () => {
          ue.success("Booking status updated");
          setUpdatingId(null);
        },
        onError: () => {
          ue.error("Failed to update status");
          setUpdatingId(null);
        }
      }
    );
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", fullPage: true });
  if (error)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorMessage,
      {
        message: "Could not load bookings",
        onRetry: () => refetch()
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-6 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "font-display text-xl font-bold text-foreground",
            "data-ocid": "admin-bookings-title",
            children: "All Bookings"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
          bookings.length,
          " total bookings"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "btn-primary flex items-center gap-1.5 text-sm whitespace-nowrap",
          onClick: () => setShowCreate(true),
          "data-ocid": "admin-create-booking-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "New Booking"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 sm:flex-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          className: "form-input text-sm flex-1",
          value: filterVendor,
          onChange: (e) => setFilterVendor(e.target.value),
          "data-ocid": "filter-vendor-select",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Vendors" }),
            vendors.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: v.id, children: v.name }, v.id))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          className: "form-input text-sm flex-1",
          value: filterStatus,
          onChange: (e) => setFilterStatus(e.target.value),
          "data-ocid": "filter-status-select",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Statuses" }),
            STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.value, children: s.label }, s.value))
          ]
        }
      )
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 gap-3 text-center",
        "data-ocid": "empty-state-bookings",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-6 h-6 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No bookings found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "btn-primary text-sm",
              onClick: () => setShowCreate(true),
              children: "Create first booking"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((booking) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      BookingRow,
      {
        booking,
        onStatusChange: handleStatusChange,
        isUpdating: updateStatus.isPending,
        updatingId
      },
      booking.id
    )) }),
    showCreate && /* @__PURE__ */ jsxRuntimeExports.jsx(CreateBookingModal, { onClose: () => setShowCreate(false) })
  ] });
}
export {
  AdminBookings as default
};
