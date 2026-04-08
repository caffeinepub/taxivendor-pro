import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Car, IndianRupee } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import CityAutocomplete from "../components/CityAutocomplete";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCreateBooking } from "../hooks/useBookings";
import { useVendorCabs } from "../hooks/useCabs";
import { useFacilities } from "../hooks/useFacilities";
import { useVendorAuth } from "../hooks/useVendorAuth";
import type { BookingType } from "../types";

const BOOKING_TYPES: { value: BookingType; label: string }[] = [
  { value: "one_way", label: "One Way" },
  { value: "round_trip", label: "Round Trip" },
  { value: "local", label: "Local" },
];

export default function BookingForm() {
  const { session } = useVendorAuth();
  const navigate = useNavigate();
  const createBooking = useCreateBooking();
  const { data: facilities, isLoading: facilitiesLoading } = useFacilities();
  const { data: savedCabs } = useVendorCabs();

  const [bookingType, setBookingType] = useState<BookingType>("one_way");
  const [pickupCity, setPickupCity] = useState("");
  const [pickupState, setPickupState] = useState("");
  const [dropCity, setDropCity] = useState("");
  const [dropState, setDropState] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [driverEarning, setDriverEarning] = useState("");
  const [commission, setCommission] = useState("");
  const [whatsapp, setWhatsapp] = useState(session?.mobile ?? "");
  const [mobile, setMobile] = useState(session?.mobile ?? "");
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState("");

  const toggleFacility = (id: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        vendorId: session?.id ?? "",
        vendorName: session?.name ?? "",
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
        vendorWhatsapp: whatsapp,
      });
      toast.success("Booking created successfully!");
      navigate({ to: "/bookings" });
    } catch {
      setSubmitError("Failed to create booking. Please try again.");
    }
  };

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
        <div>
          <h1 className="text-xl font-display font-bold text-foreground">
            New Booking
          </h1>
          <p className="text-xs text-muted-foreground">
            Fill in the details below
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Saved Cab Quick-fill */}
        {savedCabs && savedCabs.length > 0 && (
          <div className="form-card space-y-3" data-ocid="saved-cabs-section">
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-primary" />
              <p className="text-sm font-display font-bold text-foreground">
                Saved Cabs
              </p>
            </div>
            <select
              className="form-input w-full"
              defaultValue=""
              onChange={(e) => {
                const cab = savedCabs.find((c) => c.id === e.target.value);
                if (!cab) return;
                // Store selected cab id in sessionStorage for BookingDetail driver autofill
                sessionStorage.setItem(
                  "autofill_cab",
                  JSON.stringify({
                    driverName: cab.driverName,
                    driverMobile: cab.driverMobile,
                    carModel: cab.carModel,
                    rcBook: cab.rcBook,
                  }),
                );
                toast.success(
                  `Cab "${cab.carModel}" details will auto-fill on driver entry.`,
                );
              }}
              data-ocid="saved-cab-select"
            >
              <option value="">-- Select a saved cab --</option>
              {savedCabs.map((cab) => (
                <option key={cab.id} value={cab.id}>
                  {cab.carModel} — {cab.driverName}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">
              Selecting a cab will auto-fill driver details after booking is
              created.
            </p>
          </div>
        )}

        {/* Booking Type */}
        <div className="form-card space-y-3">
          <p className="form-label">Booking Type</p>
          <div
            className="flex rounded-md border border-input overflow-hidden"
            data-ocid="booking-type-selector"
          >
            {BOOKING_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                className={`flex-1 py-2.5 text-sm font-semibold transition-smooth ${
                  bookingType === type.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-muted/50"
                }`}
                onClick={() => setBookingType(type.value)}
                data-ocid={`booking-type-${type.value}`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div className="form-card space-y-5">
          <h2 className="text-sm font-display font-bold text-foreground">
            Route
          </h2>
          <CityAutocomplete
            label="Pickup City"
            value={pickupCity}
            state={pickupState}
            onChange={(city, state) => {
              setPickupCity(city);
              setPickupState(state);
            }}
            placeholder="Search pickup city..."
            id="pickup-city"
            data-ocid="pickup-city-input"
          />
          <CityAutocomplete
            label="Drop City"
            value={dropCity}
            state={dropState}
            onChange={(city, state) => {
              setDropCity(city);
              setDropState(state);
            }}
            placeholder="Search drop city..."
            id="drop-city"
            data-ocid="drop-city-input"
          />
        </div>

        {/* Date & Time — stacked on mobile, side-by-side on sm+ */}
        <div className="form-card space-y-4">
          <h2 className="text-sm font-display font-bold text-foreground">
            Schedule
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="form-label" htmlFor="booking-date">
                Booking Date
              </label>
              <input
                id="booking-date"
                type="date"
                className="form-input w-full"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                data-ocid="date-input"
              />
            </div>
            <div className="flex-1">
              <label className="form-label" htmlFor="booking-time">
                Booking Time
              </label>
              <input
                id="booking-time"
                type="time"
                className="form-input w-full"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                data-ocid="time-input"
              />
            </div>
          </div>
        </div>

        {/* Financials — stacked on mobile, grid on sm+ */}
        <div className="form-card space-y-4">
          <h2 className="text-sm font-display font-bold text-foreground">
            Earnings
          </h2>
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label" htmlFor="driver-earning">
                Driver Earning (₹)
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
                <input
                  id="driver-earning"
                  type="number"
                  min="0"
                  className="form-input pl-9 w-full"
                  placeholder="Enter amount"
                  value={driverEarning}
                  onChange={(e) => setDriverEarning(e.target.value)}
                  required
                  data-ocid="driver-earning-input"
                />
              </div>
            </div>
            <div>
              <label className="form-label" htmlFor="commission">
                Commission (₹)
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
                <input
                  id="commission"
                  type="number"
                  min="0"
                  className="form-input pl-9 w-full"
                  placeholder="Enter amount"
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
                  required
                  data-ocid="commission-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="form-card space-y-4">
          <h2 className="text-sm font-display font-bold text-foreground">
            Your Contact Info
          </h2>
          <div>
            <label className="form-label" htmlFor="submitter-name">
              Submitter Name
            </label>
            <input
              id="submitter-name"
              type="text"
              className="form-input bg-muted/30"
              value={session?.name ?? ""}
              readOnly
              data-ocid="submitter-name-input"
            />
          </div>
          <div>
            <label className="form-label" htmlFor="whatsapp-number">
              WhatsApp Number
            </label>
            <input
              id="whatsapp-number"
              type="tel"
              className="form-input"
              placeholder="10-digit number"
              maxLength={10}
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
              data-ocid="whatsapp-input"
            />
          </div>
          <div>
            <label className="form-label" htmlFor="mobile-number">
              Mobile Number
            </label>
            <input
              id="mobile-number"
              type="tel"
              className="form-input"
              placeholder="10-digit number"
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              data-ocid="mobile-input"
            />
          </div>

          {/* Contact preview box */}
          {(mobile || whatsapp) && (
            <div className="rounded-md border border-primary/20 bg-primary/5 p-3 space-y-2">
              <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                Contact Preview
              </p>
              <p className="text-sm font-semibold text-foreground">
                {session?.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {mobile && (
                  <a
                    href={`tel:+91${mobile}`}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-sm bg-secondary/20 text-secondary border border-secondary/30 text-xs font-semibold hover:bg-secondary/30 transition-colors"
                    data-ocid="contact-preview-call"
                  >
                    📞 {mobile}
                  </a>
                )}
                {whatsapp && (
                  <a
                    href={`https://wa.me/91${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1 rounded-sm bg-accent/20 text-accent border border-accent/30 text-xs font-semibold hover:bg-accent/30 transition-colors"
                    data-ocid="contact-preview-whatsapp"
                  >
                    💬 {whatsapp}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Facilities */}
        <div className="form-card space-y-3">
          <h2 className="text-sm font-display font-bold text-foreground">
            Facilities{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </h2>
          {facilitiesLoading ? (
            <LoadingSpinner size="sm" />
          ) : (
            <div className="space-y-2" data-ocid="facilities-list">
              {(facilities ?? [])
                .filter((f) => f.active)
                .map((facility) => (
                  <label
                    key={facility.id}
                    className="flex items-start gap-3 cursor-pointer group"
                    data-ocid={`facility-${facility.id}`}
                  >
                    <input
                      type="checkbox"
                      className="mt-0.5 w-4 h-4 rounded accent-primary flex-shrink-0"
                      checked={selectedFacilities.includes(facility.id)}
                      onChange={() => toggleFacility(facility.id)}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {facility.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {facility.description}
                      </p>
                    </div>
                  </label>
                ))}
              {(facilities ?? []).filter((f) => f.active).length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No active facilities available.
                </p>
              )}
            </div>
          )}
        </div>

        {submitError && <ErrorMessage message={submitError} />}

        <Button
          type="submit"
          className="btn-primary w-full h-12 text-base"
          disabled={createBooking.isPending}
          data-ocid="submit-booking-btn"
        >
          {createBooking.isPending ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size="sm" />
              Creating...
            </span>
          ) : (
            "Create Booking"
          )}
        </Button>
      </form>
    </div>
  );
}
