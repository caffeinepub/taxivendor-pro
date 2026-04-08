import { f as createLucideIcon, p as useParams, u as useVendorAuth, b as useNavigate, r as reactExports, j as jsxRuntimeExports, a as LoadingSpinner, B as Button, C as Car } from "./index-nIM7Hndz.js";
import { u as ue } from "./index-D1f0rTi0.js";
import { C as ClickableContact } from "./ClickableContact-DhTxwZAh.js";
import { D as DocumentUpload } from "./DocumentUpload-DsC66vfu.js";
import { E as ErrorMessage } from "./ErrorMessage-_ntjaXJd.js";
import { S as StatusBadge } from "./StatusBadge-Doc8wx5F.js";
import { b as useBooking, c as useUpdateBookingStatus, d as useUpdateDriverDetails } from "./useBookings-CYlMeM0I.js";
import { A as ArrowLeft } from "./arrow-left-ICmVTFg0.js";
import { I as IndianRupee } from "./indian-rupee-CLoIENIX.js";
import { P as Phone } from "./phone-DTccB7ed.js";
import { F as FileText } from "./file-text-jlhTn3-H.js";
import { C as CircleCheck } from "./circle-check-CbCjY1de.js";
import "./circle-check-big-BEdEqCAN.js";
import "./circle-x-GejIGPgX.js";
import "./refresh-cw-Bxfrm-wh.js";
import "./useMutation-CWf3igRP.js";
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
const BOOKING_TYPE_LABELS = {
  one_way: "One Way",
  round_trip: "Round Trip",
  local: "Local"
};
const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" }
];
function BookingDetail() {
  const { id } = useParams({ strict: false });
  const { session } = useVendorAuth();
  const navigate = useNavigate();
  const { data: booking, isLoading, error } = useBooking(id);
  const updateStatus = useUpdateBookingStatus();
  const updateDriver = useUpdateDriverDetails();
  const [driverName, setDriverName] = reactExports.useState("");
  const [driverMobile, setDriverMobile] = reactExports.useState("");
  const [car, setCar] = reactExports.useState("");
  const [rcNumber, setRcNumber] = reactExports.useState("");
  const [rcBookUrl, setRcBookUrl] = reactExports.useState(void 0);
  const [rcBookFile, setRcBookFile] = reactExports.useState(void 0);
  const [driverSaving, setDriverSaving] = reactExports.useState(false);
  const [driverSaved, setDriverSaved] = reactExports.useState(false);
  const [statusValue, setStatusValue] = reactExports.useState("new");
  const [fieldErrors, setFieldErrors] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (booking) {
      setStatusValue(booking.status);
      if (booking.driverDetails) {
        setDriverName(booking.driverDetails.driverName);
        setDriverMobile(booking.driverDetails.mobile);
        setCar(booking.driverDetails.car);
        setRcNumber(booking.driverDetails.rcNumber);
        setRcBookUrl(booking.driverDetails.rcBookUrl);
      }
    }
  }, [booking]);
  const handleStatusChange = async (status) => {
    setStatusValue(status);
    try {
      await updateStatus.mutateAsync({ id, status });
      ue.success(`Status updated to ${status}`);
    } catch {
      ue.error("Failed to update status");
    }
  };
  const handleSaveDriver = async () => {
    const errors = {};
    if (!driverName.trim()) errors.driverName = "Driver name is required";
    if (!driverMobile.trim()) errors.driverMobile = "Mobile number is required";
    if (!car.trim()) errors.car = "Car details are required";
    if (!rcNumber.trim()) errors.rcNumber = "RC number is required";
    if (!rcBookUrl) errors.rcBook = "Please upload RC Book";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setDriverSaving(true);
    setDriverSaved(false);
    try {
      const details = {
        driverName,
        mobile: driverMobile,
        car,
        rcNumber,
        rcBookUrl
      };
      await updateDriver.mutateAsync({ bookingId: id, details, rcBookFile });
      setDriverSaved(true);
      ue.success("Driver details saved successfully!");
      setTimeout(() => setDriverSaved(false), 1500);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setDriverSaving(false);
      setDriverSaved(false);
      ue.error(msg || "Failed to save driver details. Please try again.");
    } finally {
      setDriverSaving(false);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" }) });
  }
  if (error || !booking) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { message: "Booking not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "btn-outline mt-4",
          onClick: () => navigate({ to: "/bookings" }),
          children: "Back to Bookings"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5 space-y-5 pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/bookings" }),
          className: "w-8 h-8 flex items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground transition-colors",
          "aria-label": "Go back",
          "data-ocid": "back-btn",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-display font-bold text-foreground", children: [
            "#",
            booking.id
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: booking.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: BOOKING_TYPE_LABELS[booking.bookingType] })
      ] })
    ] }),
    (session == null ? void 0 : session.isAdmin) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-card space-y-2", "data-ocid": "admin-status-control", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "booking-status", children: "Update Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          id: "booking-status",
          className: "form-input",
          value: statusValue,
          onChange: (e) => handleStatusChange(e.target.value),
          "data-ocid": "status-select",
          children: STATUS_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-card space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-display font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-4 rounded-full bg-primary inline-block" }),
        "Route"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-md p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium mb-0.5", children: "Pickup" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: booking.pickupCity }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: booking.pickupState })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-md p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium mb-0.5", children: "Drop" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: booking.dropCity }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: booking.dropState })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: booking.date })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-8 bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Time" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: booking.time })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-card space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-display font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-4 h-4 text-primary" }),
        "Earnings"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-md p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Driver Earning" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-display font-bold text-primary", children: [
            "₹",
            booking.driverEarning.toLocaleString("en-IN")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary/10 border border-secondary/20 rounded-md p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Commission" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-display font-bold text-secondary", children: [
            "₹",
            booking.commission.toLocaleString("en-IN")
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-card space-y-3", "data-ocid": "contact-box", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-display font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-primary" }),
        "Submitted By"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: booking.vendorName }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ClickableContact,
        {
          mobile: booking.vendorMobile,
          whatsapp: booking.vendorWhatsapp
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-card space-y-4", "data-ocid": "driver-details-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-display font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-4 h-4 text-primary" }),
        "Driver Details"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "driver-name", children: "Driver Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "driver-name",
            type: "text",
            className: `form-input ${fieldErrors.driverName ? "border-destructive" : ""}`,
            placeholder: "Full name",
            value: driverName,
            onChange: (e) => {
              setDriverName(e.target.value);
              if (fieldErrors.driverName)
                setFieldErrors((prev) => ({ ...prev, driverName: "" }));
            },
            "data-ocid": "driver-name-input"
          }
        ),
        fieldErrors.driverName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: fieldErrors.driverName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "driver-mobile", children: "Mobile Number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "driver-mobile",
            type: "tel",
            className: `form-input ${fieldErrors.driverMobile ? "border-destructive" : ""}`,
            placeholder: "10-digit number",
            maxLength: 10,
            value: driverMobile,
            onChange: (e) => {
              setDriverMobile(e.target.value);
              if (fieldErrors.driverMobile)
                setFieldErrors((prev) => ({ ...prev, driverMobile: "" }));
            },
            "data-ocid": "driver-mobile-input"
          }
        ),
        fieldErrors.driverMobile && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: fieldErrors.driverMobile })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "driver-car", children: "Car (Model & Colour)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "driver-car",
            type: "text",
            className: `form-input ${fieldErrors.car ? "border-destructive" : ""}`,
            placeholder: "e.g. Toyota Innova (White)",
            value: car,
            onChange: (e) => {
              setCar(e.target.value);
              if (fieldErrors.car)
                setFieldErrors((prev) => ({ ...prev, car: "" }));
            },
            "data-ocid": "driver-car-input"
          }
        ),
        fieldErrors.car && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: fieldErrors.car })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "rc-number", children: "RC Number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "rc-number",
            type: "text",
            className: `form-input uppercase ${fieldErrors.rcNumber ? "border-destructive" : ""}`,
            placeholder: "e.g. MH12AB1234",
            value: rcNumber,
            onChange: (e) => {
              setRcNumber(e.target.value.toUpperCase());
              if (fieldErrors.rcNumber)
                setFieldErrors((prev) => ({ ...prev, rcNumber: "" }));
            },
            "data-ocid": "rc-number-input"
          }
        ),
        fieldErrors.rcNumber && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: fieldErrors.rcNumber })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DocumentUpload,
          {
            label: "RC Book",
            accept: "image/*,.pdf",
            currentUrl: rcBookUrl,
            onUpload: (file, url) => {
              setRcBookFile(file);
              setRcBookUrl(url);
              if (fieldErrors.rcBook)
                setFieldErrors((prev) => ({ ...prev, rcBook: "" }));
            },
            onRemove: () => {
              setRcBookFile(void 0);
              setRcBookUrl(void 0);
            },
            "data-ocid": "rc-book-upload"
          }
        ),
        fieldErrors.rcBook && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: fieldErrors.rcBook })
      ] }),
      booking.driverDetails && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-muted/20 p-3 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3 h-3" }),
          " Saved Details"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Driver: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: booking.driverDetails.driverName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Mobile: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: booking.driverDetails.mobile })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Car: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: booking.driverDetails.car })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "RC: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold font-mono", children: booking.driverDetails.rcNumber })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          className: `w-full h-11 flex items-center justify-center gap-2 ${driverSaved ? "btn-outline border-accent text-accent" : "btn-primary"}`,
          onClick: handleSaveDriver,
          disabled: driverSaving || driverSaved,
          "data-ocid": "save-driver-btn",
          children: driverSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
            "Saving..."
          ] }) : driverSaved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
            "Saved ✓"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
            "Save Driver Details"
          ] })
        }
      )
    ] })
  ] });
}
export {
  BookingDetail as default
};
