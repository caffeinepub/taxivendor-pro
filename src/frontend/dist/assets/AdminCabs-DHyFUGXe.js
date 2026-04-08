import { j as jsxRuntimeExports, L as Link, a as LoadingSpinner, C as Car, U as User } from "./index-CPOLE32K.js";
import { E as ErrorMessage } from "./ErrorMessage-CUktorBB.js";
import { a as useAllCabs } from "./useCabs-Kj_avYc7.js";
import { u as useVendors } from "./index-CW8mInAf.js";
import { A as ArrowLeft } from "./arrow-left-B1SzM-8E.js";
import "./refresh-cw-Bt-VQHyD.js";
import "./useMutation-C-58pz6m.js";
function AdminCabs() {
  const { data: cabs, isLoading: cabsLoading, error: cabsError } = useAllCabs();
  const { data: vendors, isLoading: vendorsLoading } = useVendors();
  const isLoading = cabsLoading || vendorsLoading;
  const vendorMap = new Map(
    (vendors ?? []).map((v) => [v.id, { name: v.name, mobile: v.mobile }])
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/admin",
          className: "w-8 h-8 flex items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground transition-colors",
          "aria-label": "Back to admin",
          "data-ocid": "admin-cabs-back-btn",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: "All Cabs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "All registered cabs with vendor info" })
      ] })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
    cabsError && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { message: "Could not load cabs. Please try again." }),
    !isLoading && !cabsError && cabs && cabs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "form-card flex flex-col items-center py-12 gap-3 text-center",
        "data-ocid": "admin-cabs-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-12 h-12 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground", children: "No cabs registered yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Cabs appear here after vendors add driver details to a booking." })
        ]
      }
    ),
    !isLoading && cabs && cabs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "admin-cabs-list", children: cabs.map((cab) => {
      const vendor = vendorMap.get(cab.vendorId);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "form-card space-y-3",
          "data-ocid": `admin-cab-card-${cab.id}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-5 h-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground truncate", children: cab.carModel }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Driver: ",
                  cab.driverName,
                  " • 📞 ",
                  cab.driverMobile
                ] }),
                cab.rcBook && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                  "RC: ",
                  cab.rcBook
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-2 border-t border-border/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-secondary/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3 text-secondary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1", children: vendor ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground truncate", children: [
                vendor.name,
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-normal text-muted-foreground ml-1", children: [
                  "(",
                  vendor.mobile,
                  ")"
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono truncate", children: [
                cab.vendorId.slice(0, 16),
                "…"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground flex-shrink-0", children: "Vendor" })
            ] })
          ]
        },
        cab.id
      );
    }) })
  ] });
}
export {
  AdminCabs as default
};
