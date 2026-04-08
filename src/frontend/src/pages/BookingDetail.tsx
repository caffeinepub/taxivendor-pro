import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Car,
  CheckCircle2,
  FileText,
  IndianRupee,
  Phone,
  Save,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ClickableContact from "../components/ClickableContact";
import DocumentUpload from "../components/DocumentUpload";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusBadge from "../components/StatusBadge";
import {
  useBooking,
  useUpdateBookingStatus,
  useUpdateDriverDetails,
} from "../hooks/useBookings";
import { useVendorAuth } from "../hooks/useVendorAuth";
import type { BookingStatus, BookingType, DriverDetails } from "../types";

const BOOKING_TYPE_LABELS: Record<BookingType, string> = {
  one_way: "One Way",
  round_trip: "Round Trip",
  local: "Local",
};

const STATUS_OPTIONS: { value: BookingStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export default function BookingDetail() {
  const { id } = useParams({ strict: false }) as { id: string };
  const { session } = useVendorAuth();
  const navigate = useNavigate();
  const { data: booking, isLoading, error } = useBooking(id);
  const updateStatus = useUpdateBookingStatus();
  const updateDriver = useUpdateDriverDetails();

  const [driverName, setDriverName] = useState("");
  const [driverMobile, setDriverMobile] = useState("");
  const [car, setCar] = useState("");
  const [rcNumber, setRcNumber] = useState("");
  const [rcBookUrl, setRcBookUrl] = useState<string | undefined>(undefined);
  // Keep File reference so we can pass bytes to the backend
  const [rcBookFile, setRcBookFile] = useState<File | undefined>(undefined);
  const [driverSaving, setDriverSaving] = useState(false);
  const [driverSaved, setDriverSaved] = useState(false);
  const [statusValue, setStatusValue] = useState<BookingStatus>("new");

  // Inline validation errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (booking) {
      setStatusValue(booking.status);
      if (booking.driverDetails) {
        // Booking already has driver details — populate from saved booking data
        setDriverName(booking.driverDetails.driverName);
        setDriverMobile(booking.driverDetails.mobile);
        setCar(booking.driverDetails.car);
        setRcNumber(booking.driverDetails.rcNumber);
        setRcBookUrl(booking.driverDetails.rcBookUrl);
      } else {
        // No driver details yet — try to auto-fill from a cab selected in BookingForm
        try {
          const stored = sessionStorage.getItem("autofill_cab");
          if (stored) {
            const cab = JSON.parse(stored) as {
              driverName: string;
              driverMobile: string;
              carModel: string;
              rcBook: string;
              rcNumber?: string;
            };
            setDriverName(cab.driverName);
            setDriverMobile(cab.driverMobile);
            setCar(cab.carModel);
            setRcNumber(cab.rcNumber ?? "");
            setRcBookUrl(cab.rcBook || undefined);
            // Clear after use so it doesn't bleed into future bookings
            sessionStorage.removeItem("autofill_cab");
          }
        } catch {
          // sessionStorage unavailable — ignore
        }
      }
    }
  }, [booking]);

  const handleStatusChange = async (status: BookingStatus) => {
    setStatusValue(status);
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleSaveDriver = async () => {
    // Validate fields before submitting
    const errors: Record<string, string> = {};
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
      const details: DriverDetails = {
        driverName,
        mobile: driverMobile,
        car,
        rcNumber,
        rcBookUrl,
      };
      await updateDriver.mutateAsync({ bookingId: id, details, rcBookFile });
      setDriverSaved(true);
      toast.success("Driver details saved successfully!");
      setTimeout(() => setDriverSaved(false), 1500);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setDriverSaving(false);
      setDriverSaved(false);
      toast.error(msg || "Failed to save driver details. Please try again.");
    } finally {
      setDriverSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="px-4 py-8">
        <ErrorMessage message="Booking not found." />
        <Button
          className="btn-outline mt-4"
          onClick={() => navigate({ to: "/bookings" })}
        >
          Back to Bookings
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 space-y-5 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate({ to: "/bookings" })}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Go back"
          data-ocid="back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-display font-bold text-foreground">
              #{booking.id}
            </h1>
            <StatusBadge status={booking.status} />
          </div>
          <p className="text-xs text-muted-foreground">
            {BOOKING_TYPE_LABELS[booking.bookingType]}
          </p>
        </div>
      </div>

      {/* Admin: status control */}
      {session?.isAdmin && (
        <div className="form-card space-y-2" data-ocid="admin-status-control">
          <label className="form-label" htmlFor="booking-status">
            Update Status
          </label>
          <select
            id="booking-status"
            className="form-input"
            value={statusValue}
            onChange={(e) =>
              handleStatusChange(e.target.value as BookingStatus)
            }
            data-ocid="status-select"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Route details */}
      <div className="form-card space-y-3">
        <h2 className="text-sm font-display font-bold text-foreground flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-primary inline-block" />
          Route
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/30 rounded-md p-3">
            <p className="text-xs text-muted-foreground font-medium mb-0.5">
              Pickup
            </p>
            <p className="text-sm font-bold text-foreground">
              {booking.pickupCity}
            </p>
            <p className="text-xs text-muted-foreground">
              {booking.pickupState}
            </p>
          </div>
          <div className="bg-muted/30 rounded-md p-3">
            <p className="text-xs text-muted-foreground font-medium mb-0.5">
              Drop
            </p>
            <p className="text-sm font-bold text-foreground">
              {booking.dropCity}
            </p>
            <p className="text-xs text-muted-foreground">{booking.dropState}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 pt-1">
          <div>
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="text-sm font-semibold text-foreground">
              {booking.date}
            </p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div>
            <p className="text-xs text-muted-foreground">Time</p>
            <p className="text-sm font-semibold text-foreground">
              {booking.time}
            </p>
          </div>
        </div>
      </div>

      {/* Earnings */}
      <div className="form-card space-y-3">
        <h2 className="text-sm font-display font-bold text-foreground flex items-center gap-2">
          <IndianRupee className="w-4 h-4 text-primary" />
          Earnings
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-primary/5 border border-primary/20 rounded-md p-3">
            <p className="text-xs text-muted-foreground">Driver Earning</p>
            <p className="text-lg font-display font-bold text-primary">
              ₹{booking.driverEarning.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-secondary/10 border border-secondary/20 rounded-md p-3">
            <p className="text-xs text-muted-foreground">Commission</p>
            <p className="text-lg font-display font-bold text-secondary">
              ₹{booking.commission.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      {/* Contact box */}
      <div className="form-card space-y-3" data-ocid="contact-box">
        <h2 className="text-sm font-display font-bold text-foreground flex items-center gap-2">
          <Phone className="w-4 h-4 text-primary" />
          Submitted By
        </h2>
        <p className="text-sm font-semibold text-foreground">
          {booking.vendorName}
        </p>
        <ClickableContact
          mobile={booking.vendorMobile}
          whatsapp={booking.vendorWhatsapp}
        />
      </div>

      {/* Driver Details */}
      <div className="form-card space-y-4" data-ocid="driver-details-section">
        <h2 className="text-sm font-display font-bold text-foreground flex items-center gap-2">
          <Car className="w-4 h-4 text-primary" />
          Driver Details
        </h2>

        <div>
          <label className="form-label" htmlFor="driver-name">
            Driver Name
          </label>
          <input
            id="driver-name"
            type="text"
            className={`form-input ${fieldErrors.driverName ? "border-destructive" : ""}`}
            placeholder="Full name"
            value={driverName}
            onChange={(e) => {
              setDriverName(e.target.value);
              if (fieldErrors.driverName)
                setFieldErrors((prev) => ({ ...prev, driverName: "" }));
            }}
            data-ocid="driver-name-input"
          />
          {fieldErrors.driverName && (
            <p className="text-xs text-destructive mt-1">
              {fieldErrors.driverName}
            </p>
          )}
        </div>

        <div>
          <label className="form-label" htmlFor="driver-mobile">
            Mobile Number
          </label>
          <input
            id="driver-mobile"
            type="tel"
            className={`form-input ${fieldErrors.driverMobile ? "border-destructive" : ""}`}
            placeholder="10-digit number"
            maxLength={10}
            value={driverMobile}
            onChange={(e) => {
              setDriverMobile(e.target.value);
              if (fieldErrors.driverMobile)
                setFieldErrors((prev) => ({ ...prev, driverMobile: "" }));
            }}
            data-ocid="driver-mobile-input"
          />
          {fieldErrors.driverMobile && (
            <p className="text-xs text-destructive mt-1">
              {fieldErrors.driverMobile}
            </p>
          )}
        </div>

        <div>
          <label className="form-label" htmlFor="driver-car">
            Car (Model &amp; Colour)
          </label>
          <input
            id="driver-car"
            type="text"
            className={`form-input ${fieldErrors.car ? "border-destructive" : ""}`}
            placeholder="e.g. Toyota Innova (White)"
            value={car}
            onChange={(e) => {
              setCar(e.target.value);
              if (fieldErrors.car)
                setFieldErrors((prev) => ({ ...prev, car: "" }));
            }}
            data-ocid="driver-car-input"
          />
          {fieldErrors.car && (
            <p className="text-xs text-destructive mt-1">{fieldErrors.car}</p>
          )}
        </div>

        <div>
          <label className="form-label" htmlFor="rc-number">
            RC Number
          </label>
          <input
            id="rc-number"
            type="text"
            className={`form-input uppercase ${fieldErrors.rcNumber ? "border-destructive" : ""}`}
            placeholder="e.g. MH12AB1234"
            value={rcNumber}
            onChange={(e) => {
              setRcNumber(e.target.value.toUpperCase());
              if (fieldErrors.rcNumber)
                setFieldErrors((prev) => ({ ...prev, rcNumber: "" }));
            }}
            data-ocid="rc-number-input"
          />
          {fieldErrors.rcNumber && (
            <p className="text-xs text-destructive mt-1">
              {fieldErrors.rcNumber}
            </p>
          )}
        </div>

        <div>
          <DocumentUpload
            label="RC Book"
            accept="image/*,.pdf"
            currentUrl={rcBookUrl}
            onUpload={(file, url) => {
              setRcBookFile(file);
              setRcBookUrl(url);
              if (fieldErrors.rcBook)
                setFieldErrors((prev) => ({ ...prev, rcBook: "" }));
            }}
            onRemove={() => {
              setRcBookFile(undefined);
              setRcBookUrl(undefined);
            }}
            data-ocid="rc-book-upload"
          />
          {fieldErrors.rcBook && (
            <p className="text-xs text-destructive mt-1">
              {fieldErrors.rcBook}
            </p>
          )}
        </div>

        {/* Show saved driver details */}
        {booking.driverDetails && (
          <div className="rounded-md border border-border bg-muted/20 p-3 space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
              <FileText className="w-3 h-3" /> Saved Details
            </p>
            <p className="text-sm text-foreground">
              <span className="text-muted-foreground">Driver: </span>
              <span className="font-semibold">
                {booking.driverDetails.driverName}
              </span>
            </p>
            <p className="text-sm text-foreground">
              <span className="text-muted-foreground">Mobile: </span>
              <span className="font-semibold">
                {booking.driverDetails.mobile}
              </span>
            </p>
            <p className="text-sm text-foreground">
              <span className="text-muted-foreground">Car: </span>
              <span className="font-semibold">{booking.driverDetails.car}</span>
            </p>
            <p className="text-sm text-foreground">
              <span className="text-muted-foreground">RC: </span>
              <span className="font-semibold font-mono">
                {booking.driverDetails.rcNumber}
              </span>
            </p>
          </div>
        )}

        <Button
          type="button"
          className={`w-full h-11 flex items-center justify-center gap-2 ${driverSaved ? "btn-outline border-accent text-accent" : "btn-primary"}`}
          onClick={handleSaveDriver}
          disabled={driverSaving || driverSaved}
          data-ocid="save-driver-btn"
        >
          {driverSaving ? (
            <>
              <LoadingSpinner size="sm" />
              Saving...
            </>
          ) : driverSaved ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Saved ✓
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Driver Details
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
