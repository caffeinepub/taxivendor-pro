import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { BookOpen, CheckCircle, Clock, Plus, TrendingUp } from "lucide-react";
import ClickableContact from "../components/ClickableContact";
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

export default function Dashboard() {
  const { session } = useVendorAuth();
  const navigate = useNavigate();
  const { data: bookings, isLoading, error } = useBookings(session?.id);

  const total = bookings?.length ?? 0;
  const pending = bookings?.filter((b) => b.status === "new").length ?? 0;
  const completed =
    bookings?.filter((b) => b.status === "completed").length ?? 0;
  const recent =
    bookings
      ?.slice()
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5) ?? [];

  const stats = [
    {
      label: "Total",
      value: total,
      icon: BookOpen,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock,
      color: "text-secondary",
      bg: "bg-secondary/15",
    },
    {
      label: "Done",
      value: completed,
      icon: CheckCircle,
      color: "text-accent",
      bg: "bg-accent/15",
    },
  ];

  return (
    <div className="px-4 py-5 space-y-6 relative">
      {/* Greeting */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            Welcome back
          </p>
          <h1 className="text-xl font-display font-bold text-foreground leading-tight">
            {session?.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {session?.companyName}
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-sm">
          <TrendingUp className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold text-foreground">Active</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3" data-ocid="stats-row">
        {stats.map((s) => (
          <div
            key={s.label}
            className="form-card flex flex-col items-center text-center gap-1 p-3"
          >
            <div
              className={`w-9 h-9 rounded-md flex items-center justify-center ${s.bg}`}
            >
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            {isLoading ? (
              <div className="h-5 w-8 bg-muted animate-pulse rounded" />
            ) : (
              <span className="text-xl font-display font-bold text-foreground">
                {s.value}
              </span>
            )}
            <span className="text-xs text-muted-foreground leading-tight">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-display font-bold text-foreground">
            Recent Bookings
          </h2>
          <Link
            to="/bookings"
            className="text-xs font-semibold text-primary hover:underline"
            data-ocid="view-all-bookings-link"
          >
            View all
          </Link>
        </div>

        {isLoading && <LoadingSpinner size="sm" />}
        {error && <ErrorMessage message="Could not load bookings." />}

        {!isLoading && !error && recent.length === 0 && (
          <div
            className="form-card flex flex-col items-center py-8 gap-2 text-center"
            data-ocid="empty-bookings"
          >
            <BookOpen className="w-10 h-10 text-muted-foreground/50" />
            <p className="text-sm font-semibold text-foreground">
              No bookings yet
            </p>
            <p className="text-xs text-muted-foreground">
              Tap the + button below to create your first booking.
            </p>
          </div>
        )}

        {!isLoading && recent.length > 0 && (
          <div className="space-y-2" data-ocid="recent-bookings-list">
            {recent.map((booking) => (
              <button
                key={booking.id}
                type="button"
                className="form-card w-full text-left hover:border-primary/40 transition-smooth cursor-pointer"
                data-ocid={`booking-row-${booking.id}`}
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
                <div className="mt-2 flex items-center gap-1.5 text-sm text-foreground min-w-0">
                  <span className="font-semibold truncate">
                    {booking.pickupCity}
                  </span>
                  <span className="text-muted-foreground flex-shrink-0">→</span>
                  <span className="font-semibold truncate">
                    {booking.dropCity}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {booking.date} at {booking.time}
                </p>
                <div className="mt-2 pt-2 border-t border-border/50">
                  <ClickableContact
                    mobile={booking.vendorMobile}
                    whatsapp={booking.vendorWhatsapp}
                    compact
                  />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <div
        className="fixed bottom-20 right-4 z-30"
        data-ocid="create-booking-fab"
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
