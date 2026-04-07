import { d as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as LoadingSpinner, B as Button, S as Star } from "./index-CxP7RHi8.js";
import { E as ErrorMessage, T as TriangleAlert } from "./ErrorMessage-8VMYR2Sg.js";
import { u as useFacilities, a as useAddFacility, b as useUpdateFacility, c as useDeleteFacility } from "./useFacilities-ChpK6TP8.js";
import { u as ue } from "./index-CFC5CBGG.js";
import { P as Plus } from "./plus-Dz_5AzH1.js";
import { X } from "./x-CweMEz5e.js";
import { C as CircleCheck } from "./circle-check-LYUoGL0R.js";
import { C as CircleX } from "./circle-x-BUTpTsVU.js";
import "./useMutation-BgRpJWW8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function FacilityForm({
  initial,
  onSubmit,
  onCancel,
  isPending,
  mode
}) {
  const [name, setName] = reactExports.useState((initial == null ? void 0 : initial.name) ?? "");
  const [description, setDescription] = reactExports.useState((initial == null ? void 0 : initial.description) ?? "");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      ue.error("Facility name is required");
      return;
    }
    onSubmit({ name: name.trim(), description: description.trim() });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "facility-name", children: "Facility Name *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "facility-name",
          type: "text",
          className: "form-input text-sm",
          placeholder: "e.g. AC Vehicle, Airport Transfer...",
          value: name,
          onChange: (e) => setName(e.target.value),
          autoComplete: "off",
          required: true,
          "data-ocid": "facility-name-input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "facility-desc", children: "Description" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          id: "facility-desc",
          className: "form-input text-sm resize-none",
          rows: 3,
          placeholder: "Brief description of this facility...",
          value: description,
          onChange: (e) => setDescription(e.target.value),
          "data-ocid": "facility-description-input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
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
          type: "submit",
          className: "btn-primary flex-1 text-sm disabled:opacity-60",
          disabled: isPending,
          "data-ocid": `facility-${mode}-submit`,
          children: isPending ? mode === "add" ? "Adding..." : "Saving..." : mode === "add" ? "Add Facility" : "Save Changes"
        }
      )
    ] })
  ] });
}
function DeleteConfirm({
  name,
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm", children: "Delete Facility" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate max-w-[200px]", children: name })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "This facility will be permanently deleted and cannot be recovered." }),
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
              className: "flex-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-sm font-semibold text-sm hover:opacity-90 transition-smooth disabled:opacity-60",
              onClick: onConfirm,
              disabled: isPending,
              "data-ocid": "facility-delete-confirm-btn",
              children: isPending ? "Deleting..." : "Delete"
            }
          )
        ] })
      ] })
    }
  );
}
function FacilityCard({
  facility,
  onEdit,
  onDelete,
  onToggle,
  isTogglingId
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "form-card space-y-3",
      "data-ocid": `facility-card-${facility.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm truncate", children: facility.name }),
              facility.active ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-accent flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" })
            ] }),
            facility.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-2", children: facility.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              role: "switch",
              "aria-checked": facility.active,
              "aria-label": facility.active ? "Deactivate" : "Activate",
              disabled: isTogglingId === facility.id,
              onClick: () => onToggle(facility),
              className: `relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-smooth cursor-pointer disabled:opacity-60 ${facility.active ? "bg-primary" : "bg-muted-foreground/30"}`,
              "data-ocid": `facility-toggle-${facility.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `inline-block h-4 w-4 rounded-full bg-card shadow-xs transition-transform ${facility.active ? "translate-x-4" : "translate-x-0"}`
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs px-2 py-0.5 rounded-sm font-medium ${facility.active ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`,
              children: facility.active ? "Active" : "Inactive"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-auto", children: new Date(facility.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "2-digit"
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onEdit(facility),
              className: "p-1.5 rounded-sm hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground",
              "aria-label": "Edit facility",
              "data-ocid": `facility-edit-btn-${facility.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onDelete(facility),
              className: "p-1.5 rounded-sm hover:bg-destructive/10 transition-smooth text-muted-foreground hover:text-destructive",
              "aria-label": "Delete facility",
              "data-ocid": `facility-delete-btn-${facility.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
            }
          )
        ] })
      ]
    }
  );
}
function AdminFacilities() {
  const { data: facilities = [], isLoading, error, refetch } = useFacilities();
  const addFacility = useAddFacility();
  const updateFacility = useUpdateFacility();
  const deleteFacility = useDeleteFacility();
  const [showAddForm, setShowAddForm] = reactExports.useState(false);
  const [editingFacility, setEditingFacility] = reactExports.useState(null);
  const [deletingFacility, setDeletingFacility] = reactExports.useState(
    null
  );
  const [isTogglingId, setIsTogglingId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!updateFacility.isPending && editingFacility) ;
  }, [updateFacility.isPending, editingFacility]);
  const handleAdd = (data) => {
    addFacility.mutate(data, {
      onSuccess: () => {
        ue.success("Facility added");
        setShowAddForm(false);
      },
      onError: () => ue.error("Failed to add facility")
    });
  };
  const handleEdit = (data) => {
    if (!editingFacility) return;
    updateFacility.mutate(
      { id: editingFacility.id, data },
      {
        onSuccess: () => {
          ue.success("Facility updated");
          setEditingFacility(null);
        },
        onError: () => ue.error("Failed to update facility")
      }
    );
  };
  const handleToggle = (facility) => {
    setIsTogglingId(facility.id);
    updateFacility.mutate(
      { id: facility.id, data: { active: !facility.active } },
      {
        onSuccess: () => {
          ue.success(
            `Facility ${facility.active ? "deactivated" : "activated"}`
          );
          setIsTogglingId(null);
        },
        onError: () => {
          ue.error("Failed to update facility");
          setIsTogglingId(null);
        }
      }
    );
  };
  const handleDelete = () => {
    if (!deletingFacility) return;
    deleteFacility.mutate(deletingFacility.id, {
      onSuccess: () => {
        ue.success("Facility deleted");
        setDeletingFacility(null);
      },
      onError: () => {
        ue.error("Failed to delete facility");
      }
    });
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", fullPage: true });
  if (error)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorMessage,
      {
        message: "Could not load facilities",
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
            "data-ocid": "admin-facilities-title",
            children: "Facilities"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
          facilities.filter((f) => f.active).length,
          " active ·",
          " ",
          facilities.length,
          " total"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "btn-primary flex items-center gap-1.5 text-sm whitespace-nowrap",
          onClick: () => {
            setShowAddForm(true);
            setEditingFacility(null);
          },
          "data-ocid": "add-facility-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "Add Facility"
          ]
        }
      )
    ] }),
    showAddForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-card border-primary/30 bg-primary/5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground", children: "New Facility" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: () => setShowAddForm(false),
            "aria-label": "Close",
            className: "w-7 h-7",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FacilityForm,
        {
          mode: "add",
          onSubmit: handleAdd,
          onCancel: () => setShowAddForm(false),
          isPending: addFacility.isPending
        }
      )
    ] }),
    editingFacility && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "dialog",
      {
        open: true,
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm border-0 max-w-none w-full h-full m-0",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-card w-full max-w-sm shadow-elevated", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Edit Facility" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => setEditingFacility(null),
                "aria-label": "Close",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FacilityForm,
            {
              mode: "edit",
              initial: {
                name: editingFacility.name,
                description: editingFacility.description
              },
              onSubmit: handleEdit,
              onCancel: () => setEditingFacility(null),
              isPending: updateFacility.isPending
            }
          )
        ] })
      }
    ),
    facilities.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 gap-3 text-center",
        "data-ocid": "empty-state-facilities",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-6 h-6 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No facilities yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "btn-primary text-sm",
              onClick: () => setShowAddForm(true),
              children: "Add first facility"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: facilities.map((facility) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      FacilityCard,
      {
        facility,
        onEdit: (f) => {
          setEditingFacility(f);
          setShowAddForm(false);
        },
        onDelete: setDeletingFacility,
        onToggle: handleToggle,
        isTogglingId
      },
      facility.id
    )) }),
    deletingFacility && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirm,
      {
        name: deletingFacility.name,
        onConfirm: handleDelete,
        onCancel: () => setDeletingFacility(null),
        isPending: deleteFacility.isPending
      }
    )
  ] });
}
export {
  AdminFacilities as default
};
