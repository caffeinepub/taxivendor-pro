import { d as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as LoadingSpinner, m as Users, B as Button } from "./index-CxP7RHi8.js";
import { E as ErrorMessage, T as TriangleAlert } from "./ErrorMessage-8VMYR2Sg.js";
import { S as StatusBadge } from "./StatusBadge-sxUY90gg.js";
import { u as useVendors, a as useSetVendorStatus } from "./index-D01YgFTK.js";
import { u as ue } from "./index-CFC5CBGG.js";
import { B as Building2 } from "./building-2-DCnxjkHD.js";
import { P as Phone } from "./phone-BzFICDoY.js";
import "./useMutation-BgRpJWW8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
const FILTER_TABS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" }
];
function ConfirmDialog({
  vendorName,
  action,
  onConfirm,
  onCancel,
  isPending
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "dialog",
    {
      open: true,
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm border-0 max-w-none w-full h-full m-0",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-card w-full max-w-sm shadow-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-10 h-10 rounded-full flex items-center justify-center ${action === "approve" ? "bg-primary/10" : "bg-destructive/10"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                TriangleAlert,
                {
                  className: `w-5 h-5 ${action === "approve" ? "text-primary" : "text-destructive"}`
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm", children: action === "approve" ? "Approve Vendor" : "Reject Application" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: vendorName })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: action === "approve" ? "This vendor will be able to login and submit bookings." : "This application will be rejected and vendor cannot login." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "flex-1",
              onClick: onCancel,
              disabled: isPending,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              disabled: isPending,
              onClick: onConfirm,
              className: `flex-1 btn-${action === "approve" ? "primary" : "secondary"} text-sm disabled:opacity-60 disabled:cursor-not-allowed`,
              "data-ocid": `confirm-${action}-btn`,
              children: isPending ? "Saving..." : action === "approve" ? "Approve" : "Reject"
            }
          )
        ] })
      ] })
    }
  );
}
function VendorCard({ vendor, onAction }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "form-card space-y-3 table-row-alt",
      "data-ocid": `vendor-card-${vendor.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm truncate", children: vendor.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-3 h-3 text-muted-foreground flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: vendor.companyName })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: vendor.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Mobile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: vendor.mobile })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Driving Licence" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: vendor.drivingLicence })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Aadhaar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: vendor.aadhaarCard })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Applied" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: new Date(vendor.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "2-digit"
            }) })
          ] })
        ] }),
        vendor.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "btn-primary flex-1 flex items-center justify-center gap-1.5 text-sm",
              onClick: () => onAction(vendor, "approve"),
              "data-ocid": `approve-btn-${vendor.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-4 h-4" }),
                "Approve"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "btn-secondary flex-1 flex items-center justify-center gap-1.5 text-sm",
              onClick: () => onAction(vendor, "reject"),
              "data-ocid": `reject-btn-${vendor.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-4 h-4" }),
                "Reject"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function AdminApplications() {
  const { data: vendors = [], isLoading, error, refetch } = useVendors();
  const setStatus = useSetVendorStatus();
  const [filter, setFilter] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const [confirm, setConfirm] = reactExports.useState(null);
  const filtered = vendors.filter((v) => {
    const matchStatus = filter === "all" || v.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || v.name.toLowerCase().includes(q) || v.mobile.includes(q) || v.companyName.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });
  const handleAction = (vendor, action) => {
    setConfirm({ vendor, action });
  };
  const handleConfirm = () => {
    if (!confirm) return;
    const newStatus = confirm.action === "approve" ? "approved" : "rejected";
    setStatus.mutate(
      { id: confirm.vendor.id, status: newStatus },
      {
        onSuccess: () => {
          ue.success(
            confirm.action === "approve" ? `${confirm.vendor.name} approved` : `${confirm.vendor.name} rejected`
          );
          setConfirm(null);
        },
        onError: () => {
          ue.error("Failed to update vendor status");
          setConfirm(null);
        }
      }
    );
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", fullPage: true });
  if (error)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorMessage,
      {
        message: "Could not load vendor applications",
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
            "data-ocid": "admin-applications-title",
            children: "Vendor Applications"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
          vendors.length,
          " total ·",
          " ",
          vendors.filter((v) => v.status === "pending").length,
          " pending"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-primary" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Search by name, mobile, company...",
          className: "form-input pl-9 text-sm",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          "data-ocid": "vendor-search-input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-1 bg-muted/40 rounded-md p-1 overflow-x-auto",
        "data-ocid": "vendor-filter-tabs",
        children: FILTER_TABS.map((tab) => {
          const count = tab.value === "all" ? vendors.length : vendors.filter((v) => v.status === tab.value).length;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setFilter(tab.value),
              className: `flex-1 min-w-max px-3 py-1.5 rounded text-xs font-semibold transition-smooth whitespace-nowrap ${filter === tab.value ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
              "data-ocid": `filter-tab-${tab.value}`,
              children: [
                tab.label,
                " (",
                count,
                ")"
              ]
            },
            tab.value
          );
        })
      }
    ),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 gap-3 text-center",
        "data-ocid": "empty-state-vendors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No vendors found" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((vendor) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      VendorCard,
      {
        vendor,
        onAction: handleAction
      },
      vendor.id
    )) }),
    confirm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        vendorName: confirm.vendor.name,
        action: confirm.action,
        onConfirm: handleConfirm,
        onCancel: () => setConfirm(null),
        isPending: setStatus.isPending
      }
    )
  ] });
}
export {
  AdminApplications as default
};
