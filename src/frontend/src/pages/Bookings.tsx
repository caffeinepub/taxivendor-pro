import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen, Plus } from "lucide-react";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusBadge from "../components/StatusBadge";
import { useBookings } from "../hooks/useBookings";
import { useVendorAuth } from "../hooks/useVendorAuth";
import type { BookingType } from "../types";

const BOOKING_TYPE_LABELS: Record<BookingType, string> = {
  one_way: "One Way",
  round_trip: "Round Trip",
  local: "Local",
};

const BOOKING_TYPE_COLORS: Record<BookingType, string> = {
  one_way: "bg-primary/10 text-primary",
  round_trip: "bg-secondary/20 text-secondary",
  local: "bg-accent/15 text-accent",
};

export default function BookingsPage() {
  const { session } = useVendorAuth();
  const navigate = useNavigate();
  const {
    data: bookings,
    isLoading,
    error,
  } = useBookings(session?.isAdmin ? undefined : session?.id);

  const sorted =
    bookings?.slice().sort((a, b) => b.createdAt - a.createdAt) ?? [];

  return (
    <div className="px-4 py-5 space-y-4 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-display font-bold text-foreground">
            Bookings
          </h1>
          {!isLoading && (
            <p className="text-xs text-muted-foreground">
              {sorted.length} total
            </p>
          )}
        </div>
        <Button
          size="sm"
          className="btn-primary flex items-center gap-1.5 h-9"
          onClick={() => navigate({ to: "/bookings/new" })}
          data-ocid="create-booking-header-btn"
        >
          <Plus className="w-4 h-4" />
          <span>New</span>
        </Button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="md" />
        </div>
      )}

      {error && (
        <ErrorMessage message="Could not load bookings. Please try again." />
      )}

      {!isLoading && !error && sorted.length === 0 && (
        <div
          className="form-card flex flex-col items-center py-12 gap-3 text-center"
          data-ocid="empty-bookings-list"
        >
          <BookOpen className="w-12 h-12 text-muted-foreground/40" />
          <div>
            <p className="text-sm font-semibold text-foreground">
              No bookings yet
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Create your first booking to get started.
            </p>
          </div>
          <Button
            size="sm"
            className="btn-primary mt-2"
            onClick={() => navigate({ to: "/bookings/new" })}
            data-ocid="empty-state-create-btn"
          >
            <Plus className="w-4 h-4 mr-1" /> Create Booking
          </Button>
        </div>
      )}

      {!isLoading && sorted.length > 0 && (
        <div className="space-y-2" data-ocid="bookings-list">
          {sorted.map((booking, idx) => (
            <button
              key={booking.id}
              type="button"
              className={`w-full text-left rounded-md border border-border p-3.5 hover:border-primary/40 transition-smooth cursor-pointer ${
                idx % 2 === 1 ? "bg-muted/20" : "bg-card"
              }`}
              data-ocid={`booking-item-${booking.id}`}
              onClick={() =>
                navigate({
                  to: "/bookings/$id",
                  params: { id: booking.id },
                })
              }
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-sm flex-shrink-0 ${BOOKING_TYPE_COLORS[booking.bookingType]}`}
                  >
                    {BOOKING_TYPE_LABELS[booking.bookingType]}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono truncate">
                    #{booking.id}
                  </span>
                </div>
                <StatusBadge status={booking.status} />
              </div>

              <div className="mt-2.5 flex items-center gap-1.5 min-w-0">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {booking.pickupCity}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {booking.pickupState}
                  </p>
                </div>
                <span className="text-muted-foreground flex-shrink-0 text-base font-bold mx-0.5">
                  →
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {booking.dropCity}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {booking.dropState}
                  </p>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {booking.date} · {booking.time}
                </p>
                {session?.isAdmin && (
                  <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                    {booking.vendorName}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* FAB */}
      <div
        className="fixed bottom-20 right-4 z-30"
        data-ocid="bookings-create-fab"
      >
        <Button
          size="icon"
          className="w-14 h-14 rounded-full shadow-elevated bg-primary text-primary-foreground hover:opacity-90 transition-smooth"
          onClick={() => navigate({ to: "/bookings/new" })}
          aria-label="Create new booking"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
