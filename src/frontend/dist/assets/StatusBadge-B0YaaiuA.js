import { j as jsxRuntimeExports, g as cn } from "./index-Dg4inA2B.js";
const STATUS_CONFIG = {
  pending: { label: "Pending", className: "badge-pending" },
  approved: { label: "Approved", className: "badge-approved" },
  rejected: { label: "Rejected", className: "badge-rejected" },
  new: { label: "New", className: "badge-active" },
  confirmed: { label: "Confirmed", className: "badge-approved" },
  completed: { label: "Completed", className: "badge-active" },
  cancelled: { label: "Cancelled", className: "badge-rejected" }
};
function StatusBadge({ status, className }) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: "badge-pending"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(config.className, className),
      "data-ocid": `status-badge-${status}`,
      children: config.label
    }
  );
}
export {
  StatusBadge as S
};
