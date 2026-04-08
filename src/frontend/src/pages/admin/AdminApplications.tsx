import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { useAllBookings } from "@/hooks/useBookings";
import { useSetVendorStatus, useVendors } from "@/hooks/useVendors";
import type { Vendor, VendorStatus } from "@/types";
import {
  AlertTriangle,
  BookOpen,
  Building2,
  Phone,
  Search,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type FilterStatus = "all" | VendorStatus;

const FILTER_TABS: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

interface ConfirmDialogProps {
  vendorName: string;
  action: "approve" | "reject";
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

function ConfirmDialog({
  vendorName,
  action,
  onConfirm,
  onCancel,
  isPending,
}: ConfirmDialogProps) {
  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm border-0 max-w-none w-full h-full m-0"
    >
      <div className="form-card w-full max-w-sm shadow-elevated">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${action === "approve" ? "bg-primary/10" : "bg-destructive/10"}`}
          >
            <AlertTriangle
              className={`w-5 h-5 ${action === "approve" ? "text-primary" : "text-destructive"}`}
            />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground text-sm">
              {action === "approve" ? "Approve Vendor" : "Reject Application"}
            </h3>
            <p className="text-xs text-muted-foreground">{vendorName}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          {action === "approve"
            ? "This vendor will be able to login and submit bookings."
            : "This application will be rejected and vendor cannot login."}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
          <button
            type="button"
            disabled={isPending}
            onClick={onConfirm}
            className={`flex-1 btn-${action === "approve" ? "primary" : "secondary"} text-sm disabled:opacity-60 disabled:cursor-not-allowed`}
            data-ocid={`confirm-${action}-btn`}
          >
            {isPending
              ? "Saving..."
              : action === "approve"
                ? "Approve"
                : "Reject"}
          </button>
        </div>
      </div>
    </dialog>
  );
}

interface VendorCardProps {
  vendor: Vendor;
  bookingCount: number;
  onAction: (vendor: Vendor, action: "approve" | "reject") => void;
}

function VendorCard({ vendor, bookingCount, onAction }: VendorCardProps) {
  return (
    <div
      className="form-card space-y-3 table-row-alt"
      data-ocid={`vendor-card-${vendor.id}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold text-foreground text-sm truncate">
            {vendor.name}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <Building2 className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <p className="text-xs text-muted-foreground truncate">
              {vendor.companyName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-1 px-2 py-1 rounded-sm bg-primary/10 text-primary">
            <BookOpen className="w-3 h-3" />
            <span className="text-xs font-bold">{bookingCount}</span>
          </div>
          <StatusBadge status={vendor.status} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <p className="text-muted-foreground">Mobile</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Phone className="w-3 h-3 text-muted-foreground" />
            <p className="font-medium text-foreground">{vendor.mobile}</p>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground">Driving Licence</p>
          <p className="font-medium text-foreground truncate">
            {vendor.drivingLicence}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Aadhaar</p>
          <p className="font-medium text-foreground">{vendor.aadhaarCard}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Applied</p>
          <p className="font-medium text-foreground">
            {new Date(vendor.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "2-digit",
            })}
          </p>
        </div>
      </div>

      {vendor.status === "pending" && (
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            className="btn-primary flex-1 flex items-center justify-center gap-1.5 text-sm"
            onClick={() => onAction(vendor, "approve")}
            data-ocid={`approve-btn-${vendor.id}`}
          >
            <UserCheck className="w-4 h-4" />
            Approve
          </button>
          <button
            type="button"
            className="btn-secondary flex-1 flex items-center justify-center gap-1.5 text-sm"
            onClick={() => onAction(vendor, "reject")}
            data-ocid={`reject-btn-${vendor.id}`}
          >
            <UserX className="w-4 h-4" />
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdminApplications() {
  const { data: vendors = [], isLoading, error, refetch } = useVendors();
  const { data: allBookings = [] } = useAllBookings();
  const setStatus = useSetVendorStatus();
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [search, setSearch] = useState("");
  const [confirm, setConfirm] = useState<{
    vendor: Vendor;
    action: "approve" | "reject";
  } | null>(null);

  // Build a map of vendorId → booking count
  const bookingCountMap = new Map<string, number>();
  for (const b of allBookings) {
    bookingCountMap.set(b.vendorId, (bookingCountMap.get(b.vendorId) ?? 0) + 1);
  }

  const filtered = vendors.filter((v) => {
    const matchStatus = filter === "all" || v.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      v.name.toLowerCase().includes(q) ||
      v.mobile.includes(q) ||
      v.companyName.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const handleAction = (vendor: Vendor, action: "approve" | "reject") => {
    setConfirm({ vendor, action });
  };

  const handleConfirm = () => {
    if (!confirm) return;
    const newStatus: VendorStatus =
      confirm.action === "approve" ? "approved" : "rejected";
    setStatus.mutate(
      { id: confirm.vendor.id, status: newStatus },
      {
        onSuccess: () => {
          toast.success(
            confirm.action === "approve"
              ? `${confirm.vendor.name} approved`
              : `${confirm.vendor.name} rejected`,
          );
          setConfirm(null);
        },
        onError: () => {
          toast.error("Failed to update vendor status");
          setConfirm(null);
        },
      },
    );
  };

  if (isLoading) return <LoadingSpinner size="lg" fullPage />;
  if (error)
    return (
      <ErrorMessage
        message="Could not load vendor applications"
        onRetry={() => refetch()}
      />
    );

  return (
    <div className="px-4 py-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1
            className="font-display text-xl font-bold text-foreground"
            data-ocid="admin-applications-title"
          >
            Vendor Applications
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {vendors.length} total ·{" "}
            {vendors.filter((v) => v.status === "pending").length} pending
          </p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Users className="w-5 h-5 text-primary" />
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Search by name, mobile, company..."
          className="form-input pl-9 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-ocid="vendor-search-input"
        />
      </div>

      {/* Filter tabs */}
      <div
        className="flex gap-1 bg-muted/40 rounded-md p-1 overflow-x-auto"
        data-ocid="vendor-filter-tabs"
      >
        {FILTER_TABS.map((tab) => {
          const count =
            tab.value === "all"
              ? vendors.length
              : vendors.filter((v) => v.status === tab.value).length;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setFilter(tab.value)}
              className={`flex-1 min-w-max px-3 py-1.5 rounded text-xs font-semibold transition-smooth whitespace-nowrap ${
                filter === tab.value
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid={`filter-tab-${tab.value}`}
            >
              {tab.label} ({count})
            </button>
          );
        })}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 gap-3 text-center"
          data-ocid="empty-state-vendors"
        >
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Users className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">No vendors found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              bookingCount={bookingCountMap.get(vendor.id) ?? 0}
              onAction={handleAction}
            />
          ))}
        </div>
      )}

      {/* Confirm dialog */}
      {confirm && (
        <ConfirmDialog
          vendorName={confirm.vendor.name}
          action={confirm.action}
          onConfirm={handleConfirm}
          onCancel={() => setConfirm(null)}
          isPending={setStatus.isPending}
        />
      )}
    </div>
  );
}
