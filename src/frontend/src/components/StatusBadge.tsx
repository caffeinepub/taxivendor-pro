import { cn } from "@/lib/utils";
import type { BookingStatus, VendorStatus } from "../types";

type Status = VendorStatus | BookingStatus;

const STATUS_CONFIG: Record<Status, { label: string; className: string }> = {
  pending: { label: "Pending", className: "badge-pending" },
  approved: { label: "Approved", className: "badge-approved" },
  rejected: { label: "Rejected", className: "badge-rejected" },
  new: { label: "New", className: "badge-active" },
  confirmed: { label: "Confirmed", className: "badge-approved" },
  completed: { label: "Completed", className: "badge-active" },
  cancelled: { label: "Cancelled", className: "badge-rejected" },
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: "badge-pending",
  };
  return (
    <span
      className={cn(config.className, className)}
      data-ocid={`status-badge-${status}`}
    >
      {config.label}
    </span>
  );
}
