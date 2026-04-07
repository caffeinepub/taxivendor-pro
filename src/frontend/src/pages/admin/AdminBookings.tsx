import CityAutocomplete from "@/components/CityAutocomplete";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  useAllBookings,
  useCreateBooking,
  useUpdateBookingStatus,
} from "@/hooks/useBookings";
import { useVendors } from "@/hooks/useVendors";
import type {
  Booking,
  BookingStatus,
  BookingType,
  CreateBookingData,
} from "@/types";
import { Calendar, ClipboardList, MapPin, Phone, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type FilterVendor = "all" | string;
type FilterStatus = "all" | BookingStatus;

const BOOKING_TYPES: { label: string; value: BookingType }[] = [
  { label: "One Way", value: "one_way" },
  { label: "Round Trip", value: "round_trip" },
  { label: "Local", value: "local" },
];

const STATUS_OPTIONS: { label: string; value: BookingStatus }[] = [
  { label: "New", value: "new" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const BOOKING_TYPE_LABELS: Record<BookingType, string> = {
  one_way: "One Way",
  round_trip: "Round Trip",
  local: "Local",
};

interface CreateBookingModalProps {
  onClose: () => void;
}

function CreateBookingModal({ onClose }: CreateBookingModalProps) {
  const { data: vendors = [] } = useVendors();
  const createBooking = useCreateBooking();

  const [vendorId, setVendorId] = useState("");
  const [form, setForm] = useState<CreateBookingData>({
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
    vendorWhatsapp: "",
  });

  const approvedVendors = vendors.filter((v) => v.status === "approved");
  const selectedVendor = approvedVendors.find((v) => v.id === vendorId);

  const set = (field: keyof CreateBookingData, value: string | number) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVendor) {
      toast.error("Please select a vendor");
      return;
    }
    if (!form.pickupCity || !form.dropCity || !form.date || !form.time) {
      toast.error("Please fill all required fields");
      return;
    }
    createBooking.mutate(
      {
        ...form,
        vendorId: selectedVendor.id,
        vendorName: selectedVendor.name,
      },
      {
        onSuccess: () => {
          toast.success("Booking created successfully");
          onClose();
        },
        onError: () => toast.error("Failed to create booking"),
      },
    );
  };

  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-foreground/20 backdrop-blur-sm border-0 max-w-none w-full h-full m-0"
    >
      <div className="bg-card w-full sm:max-w-lg rounded-t-2xl sm:rounded-xl border border-border shadow-elevated overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="font-display font-bold text-foreground">
            Create Booking
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Vendor */}
          <div>
            <label className="form-label" htmlFor="admin-booking-vendor">
              Vendor *
            </label>
            <select
              id="admin-booking-vendor"
              className="form-input text-sm"
              value={vendorId}
              onChange={(e) => {
                setVendorId(e.target.value);
                const v = approvedVendors.find((v) => v.id === e.target.value);
                if (v) {
                  set("vendorMobile", v.mobile);
                  set("vendorWhatsapp", v.mobile);
                }
              }}
              required
              data-ocid="admin-booking-vendor-select"
            >
              <option value="">Select vendor...</option>
              {approvedVendors.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} — {v.companyName}
                </option>
              ))}
            </select>
          </div>

          {/* Booking type */}
          <fieldset>
            <legend className="form-label">Booking Type *</legend>
            <div className="flex gap-2">
              {BOOKING_TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => set("bookingType", t.value)}
                  className={`flex-1 py-2 rounded-sm text-xs font-semibold border transition-smooth ${
                    form.bookingType === t.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-input text-muted-foreground hover:border-primary hover:text-foreground"
                  }`}
                  data-ocid={`booking-type-${t.value}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Pickup / Drop */}
          <CityAutocomplete
            label="Pickup Location *"
            value={form.pickupCity}
            state={form.pickupState}
            onChange={(city, state) => {
              set("pickupCity", city);
              set("pickupState", state);
            }}
            id="admin-pickup"
            data-ocid="admin-pickup-input"
          />
          <CityAutocomplete
            label="Drop Location *"
            value={form.dropCity}
            state={form.dropState}
            onChange={(city, state) => {
              set("dropCity", city);
              set("dropState", state);
            }}
            id="admin-drop"
            data-ocid="admin-drop-input"
          />

          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="form-label" htmlFor="admin-date">
                Date *
              </label>
              <input
                id="admin-date"
                type="date"
                className="form-input text-sm"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                required
                data-ocid="admin-booking-date"
              />
            </div>
            <div>
              <label className="form-label" htmlFor="admin-time">
                Time *
              </label>
              <input
                id="admin-time"
                type="time"
                className="form-input text-sm"
                value={form.time}
                onChange={(e) => set("time", e.target.value)}
                required
                data-ocid="admin-booking-time"
              />
            </div>
          </div>

          {/* Earning + Commission */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="form-label" htmlFor="admin-earning">
                Driver Earning (₹) *
              </label>
              <input
                id="admin-earning"
                type="number"
                min={0}
                className="form-input text-sm"
                value={form.driverEarning || ""}
                onChange={(e) => set("driverEarning", Number(e.target.value))}
                required
                data-ocid="admin-booking-earning"
              />
            </div>
            <div>
              <label className="form-label" htmlFor="admin-commission">
                Commission (₹) *
              </label>
              <input
                id="admin-commission"
                type="number"
                min={0}
                className="form-input text-sm"
                value={form.commission || ""}
                onChange={(e) => set("commission", Number(e.target.value))}
                required
                data-ocid="admin-booking-commission"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="form-label" htmlFor="admin-mobile">
                Submitter Mobile *
              </label>
              <input
                id="admin-mobile"
                type="tel"
                maxLength={10}
                className="form-input text-sm"
                value={form.vendorMobile}
                onChange={(e) => set("vendorMobile", e.target.value)}
                required
                data-ocid="admin-booking-mobile"
              />
            </div>
            <div>
              <label className="form-label" htmlFor="admin-whatsapp">
                WhatsApp No. *
              </label>
              <input
                id="admin-whatsapp"
                type="tel"
                maxLength={10}
                className="form-input text-sm"
                value={form.vendorWhatsapp}
                onChange={(e) => set("vendorWhatsapp", e.target.value)}
                required
                data-ocid="admin-booking-whatsapp"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full mt-2 disabled:opacity-60"
            disabled={createBooking.isPending}
            data-ocid="admin-create-booking-submit"
          >
            {createBooking.isPending ? "Creating..." : "Create Booking"}
          </button>
        </form>
      </div>
    </dialog>
  );
}

interface BookingRowProps {
  booking: Booking;
  onStatusChange: (id: string, status: BookingStatus) => void;
  isUpdating: boolean;
  updatingId: string | null;
}

function BookingRow({
  booking,
  onStatusChange,
  isUpdating,
  updatingId,
}: BookingRowProps) {
  return (
    <div
      className="form-card space-y-3 table-row-alt"
      data-ocid={`booking-row-${booking.id}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold text-primary">
              #{booking.id}
            </span>
            <span className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground font-medium">
              {BOOKING_TYPE_LABELS[booking.bookingType]}
            </span>
          </div>
          <p className="text-sm font-semibold text-foreground mt-1">
            {booking.vendorName}
          </p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      {/* Route */}
      <div className="flex items-center gap-1.5 text-sm min-w-0">
        <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
        <span className="truncate text-foreground font-medium">
          {booking.pickupCity}
        </span>
        <span className="text-muted-foreground flex-shrink-0">→</span>
        <span className="truncate text-foreground font-medium">
          {booking.dropCity}
        </span>
      </div>

      {/* Date & Earnings row */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>
            {new Date(booking.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
            })}{" "}
            {booking.time}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-foreground font-medium">
            ₹{booking.driverEarning}
          </span>
          <span>driver</span>
        </div>
        <div>
          <span className="text-foreground font-medium">
            ₹{booking.commission}
          </span>
          <span> comm.</span>
        </div>
      </div>

      {/* Contact + Status update */}
      <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
        <div className="flex items-center gap-3">
          <a
            href={`tel:${booking.vendorMobile}`}
            className="flex items-center gap-1 text-xs text-primary hover:underline"
            data-ocid={`booking-call-${booking.id}`}
          >
            <Phone className="w-3.5 h-3.5" />
            {booking.vendorMobile}
          </a>
        </div>
        <select
          className="form-input text-xs py-1 px-2 w-auto min-w-[120px]"
          value={booking.status}
          disabled={isUpdating && updatingId === booking.id}
          onChange={(e) =>
            onStatusChange(booking.id, e.target.value as BookingStatus)
          }
          data-ocid={`booking-status-select-${booking.id}`}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function AdminBookings() {
  const { data: bookings = [], isLoading, error, refetch } = useAllBookings();
  const { data: vendors = [] } = useVendors();
  const updateStatus = useUpdateBookingStatus();

  const [filterVendor, setFilterVendor] = useState<FilterVendor>("all");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [showCreate, setShowCreate] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = bookings.filter((b) => {
    const matchVendor = filterVendor === "all" || b.vendorId === filterVendor;
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    return matchVendor && matchStatus;
  });

  const handleStatusChange = (id: string, status: BookingStatus) => {
    setUpdatingId(id);
    updateStatus.mutate(
      { id, status },
      {
        onSuccess: () => {
          toast.success("Booking status updated");
          setUpdatingId(null);
        },
        onError: () => {
          toast.error("Failed to update status");
          setUpdatingId(null);
        },
      },
    );
  };

  if (isLoading) return <LoadingSpinner size="lg" fullPage />;
  if (error)
    return (
      <ErrorMessage
        message="Could not load bookings"
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
            data-ocid="admin-bookings-title"
          >
            All Bookings
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {bookings.length} total bookings
          </p>
        </div>
        <button
          type="button"
          className="btn-primary flex items-center gap-1.5 text-sm whitespace-nowrap"
          onClick={() => setShowCreate(true)}
          data-ocid="admin-create-booking-btn"
        >
          <Plus className="w-4 h-4" />
          New Booking
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <select
          className="form-input text-sm flex-1"
          value={filterVendor}
          onChange={(e) => setFilterVendor(e.target.value)}
          data-ocid="filter-vendor-select"
        >
          <option value="all">All Vendors</option>
          {vendors.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
        <select
          className="form-input text-sm flex-1"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
          data-ocid="filter-status-select"
        >
          <option value="all">All Statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 gap-3 text-center"
          data-ocid="empty-state-bookings"
        >
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <ClipboardList className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">No bookings found</p>
          <button
            type="button"
            className="btn-primary text-sm"
            onClick={() => setShowCreate(true)}
          >
            Create first booking
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((booking) => (
            <BookingRow
              key={booking.id}
              booking={booking}
              onStatusChange={handleStatusChange}
              isUpdating={updateStatus.isPending}
              updatingId={updatingId}
            />
          ))}
        </div>
      )}

      {showCreate && (
        <CreateBookingModal onClose={() => setShowCreate(false)} />
      )}
    </div>
  );
}
