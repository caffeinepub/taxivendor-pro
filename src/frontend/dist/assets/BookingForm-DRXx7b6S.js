import { u as useVendorAuth, b as useNavigate, r as reactExports, j as jsxRuntimeExports, C as Car, a as LoadingSpinner, B as Button } from "./index-Dg4inA2B.js";
import { u as ue } from "./index-rrB9sIEM.js";
import { C as CityAutocomplete } from "./CityAutocomplete-CZNuCeX-.js";
import { E as ErrorMessage } from "./ErrorMessage-XYba8C8j.js";
import { a as useCreateBooking } from "./useBookings-CGrFJ29G.js";
import { u as useVendorCabs } from "./useCabs-CBMVMKTO.js";
import { u as useFacilities } from "./useFacilities-B3DJ8Ibk.js";
import { A as ArrowLeft } from "./arrow-left-C3m9jBoE.js";
import { I as IndianRupee } from "./indian-rupee-DxMwLddo.js";
import "./map-pin-DpZeWjrZ.js";
import "./refresh-cw-Vu6KezLY.js";
import "./useMutation-DZ_242xz.js";
const BOOKING_TYPES = [
  { value: "one_way", label: "One Way" },
  { value: "round_trip", label: "Round Trip" },
  { value: "local", label: "Local" }
];
function BookingForm() {
  const { session } = useVendorAuth();
  const navigate = useNavigate();
  const createBooking = useCreateBooking();
  const { data: facilities, isLoading: facilitiesLoading } = useFacilities();
  const { data: savedCabs } = useVendorCabs();
  const [bookingType, setBookingType] = reactExports.useState("one_way");
  const [pickupCity, setPickupCity] = reactExports.useState("");
  const [pickupState, setPickupState] = reactExports.useState("");
  const [dropCity, setDropCity] = reactExports.useState("");
  const [dropState, setDropState] = reactExports.useState("");
  const [date, setDate] = reactExports.useState("");
  const [time, setTime] = reactExports.useState("");
  const [driverEarning, setDriverEarning] = reactExports.useState("");
  const [commission, setCommission] = reactExports.useState("");
  const [whatsapp, setWhatsapp] = reactExports.useState((session == null ? void 0 : session.mobile) ?? "");
  const [mobile, setMobile] = reactExports.useState((session == null ? void 0 : session.mobile) ?? "");
  const [selectedFacilities, setSelectedFacilities] = reactExports.useState([]);
  const [submitError, setSubmitError] = reactExports.useState("");
  const toggleFacility = (id) => {
    setSelectedFacilities(
      (prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!pickupCity || !dropCity) {
      setSubmitError("Please select both pickup and drop cities.");
      return;
    }
    if (!date || !time) {
      setSubmitError("Please enter date and time.");
      return;
    }
    if (!driverEarning || !commission) {
      setSubmitError("Please enter driver earning and commission.");
      return;
    }
    try {
      await createBooking.mutateAsync({
        vendorId: (session == null ? void 0 : session.id) ?? "",
        vendorName: (session == null ? void 0 : session.name) ?? "",
        bookingType,
        pickupCity,
        pickupState,
        dropCity,
        dropState,
        date,
        time,
        driverEarning: Number(driverEarning),
        commission: Number(commission),
        vendorMobile: mobile,
        vendorWhatsapp: whatsapp
      });
      ue.success("Booking created successfully!");
      navigate({ to: "/bookings" });
    } catch {
      setSubmitError("Failed to create booking. Please try again.");
    }
  };
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: "New Booking" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Fill in the details below" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
      savedCabs && savedCabs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-card space-y-3", "data-ocid": "saved-cabs-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-bold text-foreground", children: "Saved Cabs" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "form-input w-full",
            defaultValue: "",
            onChange: (e) => {
              const cab = savedCabs.find((c) => c.id === e.target.value);
              if (!cab) return;
              sessionStorage.setItem(
                "autofill_cab",
                JSON.stringify({
                  driverName: cab.driverName,
                  driverMobile: cab.driverMobile,
                  carModel: cab.carModel,
                  rcBook: cab.rcBook
                })
              );
              ue.success(
                `Cab "${cab.carModel}" details will auto-fill on driver entry.`
              );
            },
            "data-ocid": "saved-cab-select",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "-- Select a saved cab --" }),
              savedCabs.map((cab) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: cab.id, children: [
                cab.carModel,
                " — ",
                cab.driverName
              ] }, cab.id))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Selecting a cab will auto-fill driver details after booking is created." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-card space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "form-label", children: "Booking Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex rounded-md border border-input overflow-hidden",
            "data-ocid": "booking-type-selector",
            children: BOOKING_TYPES.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: `flex-1 py-2.5 text-sm font-semibold transition-smooth ${bookingType === type.value ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted/50"}`,
                onClick: () => setBookingType(type.value),
                "data-ocid": `booking-type-${type.value}`,
                children: type.label
              },
              type.value
            ))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-card space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-bold text-foreground", children: "Route" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CityAutocomplete,
          {
            label: "Pickup City",
            value: pickupCity,
            state: pickupState,
            onChange: (city, state) => {
              setPickupCity(city);
              setPickupState(state);
            },
            placeholder: "Search pickup city...",
            id: "pickup-city",
            "data-ocid": "pickup-city-input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CityAutocomplete,
          {
            label: "Drop City",
            value: dropCity,
            state: dropState,
            onChange: (city, state) => {
              setDropCity(city);
              setDropState(state);
            },
            placeholder: "Search drop city...",
            id: "drop-city",
            "data-ocid": "drop-city-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-card space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-bold text-foreground", children: "Schedule" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "booking-date", children: "Booking Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "booking-date",
                type: "date",
                className: "form-input w-full",
                value: date,
                onChange: (e) => setDate(e.target.value),
                required: true,
                "data-ocid": "date-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "booking-time", children: "Booking Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "booking-time",
                type: "time",
                className: "form-input w-full",
                value: time,
                onChange: (e) => setTime(e.target.value),
                required: true,
                "data-ocid": "time-input"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-card space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-bold text-foreground", children: "Earnings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "driver-earning", children: "Driver Earning (₹)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "driver-earning",
                  type: "number",
                  min: "0",
                  className: "form-input pl-9 w-full",
                  placeholder: "Enter amount",
                  value: driverEarning,
                  onChange: (e) => setDriverEarning(e.target.value),
                  required: true,
                  "data-ocid": "driver-earning-input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "commission", children: "Commission (₹)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "commission",
                  type: "number",
                  min: "0",
                  className: "form-input pl-9 w-full",
                  placeholder: "Enter amount",
                  value: commission,
                  onChange: (e) => setCommission(e.target.value),
                  required: true,
                  "data-ocid": "commission-input"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-card space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-bold text-foreground", children: "Your Contact Info" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "submitter-name", children: "Submitter Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "submitter-name",
              type: "text",
              className: "form-input bg-muted/30",
              value: (session == null ? void 0 : session.name) ?? "",
              readOnly: true,
              "data-ocid": "submitter-name-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "whatsapp-number", children: "WhatsApp Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "whatsapp-number",
              type: "tel",
              className: "form-input",
              placeholder: "10-digit number",
              maxLength: 10,
              value: whatsapp,
              onChange: (e) => setWhatsapp(e.target.value),
              required: true,
              "data-ocid": "whatsapp-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "mobile-number", children: "Mobile Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "mobile-number",
              type: "tel",
              className: "form-input",
              placeholder: "10-digit number",
              maxLength: 10,
              value: mobile,
              onChange: (e) => setMobile(e.target.value),
              required: true,
              "data-ocid": "mobile-input"
            }
          )
        ] }),
        (mobile || whatsapp) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-primary/20 bg-primary/5 p-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-wide", children: "Contact Preview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: session == null ? void 0 : session.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            mobile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: `tel:+91${mobile}`,
                className: "flex items-center gap-1 px-2.5 py-1 rounded-sm bg-secondary/20 text-secondary border border-secondary/30 text-xs font-semibold hover:bg-secondary/30 transition-colors",
                "data-ocid": "contact-preview-call",
                children: [
                  "📞 ",
                  mobile
                ]
              }
            ),
            whatsapp && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: `https://wa.me/91${whatsapp}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center gap-1 px-2.5 py-1 rounded-sm bg-accent/20 text-accent border border-accent/30 text-xs font-semibold hover:bg-accent/30 transition-colors",
                "data-ocid": "contact-preview-whatsapp",
                children: [
                  "💬 ",
                  whatsapp
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-card space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-display font-bold text-foreground", children: [
          "Facilities",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground", children: "(optional)" })
        ] }),
        facilitiesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "facilities-list", children: [
          (facilities ?? []).filter((f) => f.active).map((facility) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: "flex items-start gap-3 cursor-pointer group",
              "data-ocid": `facility-${facility.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    className: "mt-0.5 w-4 h-4 rounded accent-primary flex-shrink-0",
                    checked: selectedFacilities.includes(facility.id),
                    onChange: () => toggleFacility(facility.id)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground group-hover:text-primary transition-colors", children: facility.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: facility.description })
                ] })
              ]
            },
            facility.id
          )),
          (facilities ?? []).filter((f) => f.active).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No active facilities available." })
        ] })
      ] }),
      submitError && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { message: submitError }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          className: "btn-primary w-full h-12 text-base",
          disabled: createBooking.isPending,
          "data-ocid": "submit-booking-btn",
          children: createBooking.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
            "Creating..."
          ] }) : "Create Booking"
        }
      )
    ] })
  ] });
}
export {
  BookingForm as default
};
