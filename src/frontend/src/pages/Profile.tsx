import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  Building2,
  CheckCircle,
  CreditCard,
  FileText,
  LogOut,
  Phone,
  Shield,
  User,
} from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import { useBookings } from "../hooks/useBookings";
import { useVendorAuth } from "../hooks/useVendorAuth";

export default function Profile() {
  const { session, logout } = useVendorAuth();
  const navigate = useNavigate();
  const { data: bookings } = useBookings(session?.id);

  const totalBookings = bookings?.length ?? 0;
  const completedBookings =
    bookings?.filter((b) => b.status === "completed").length ?? 0;

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  if (!session) return null;

  return (
    <div className="px-4 py-5 space-y-5 pb-24">
      {/* Profile header */}
      <div
        className="form-card flex items-start gap-4"
        data-ocid="profile-header"
      >
        <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
          <User className="w-7 h-7 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-display font-bold text-foreground truncate">
            {session.name}
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Building2 className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            <p className="text-sm text-muted-foreground truncate">
              {session.companyName}
            </p>
          </div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <StatusBadge status={session.status} />
            {session.isAdmin && (
              <span className="badge-active flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Admin
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="form-card space-y-3">
        <h2 className="text-sm font-display font-bold text-foreground">
          Contact Information
        </h2>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-secondary/15 flex items-center justify-center flex-shrink-0">
            <Phone className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Mobile Number</p>
            <p
              className="text-sm font-semibold text-foreground"
              data-ocid="profile-mobile"
            >
              {session.mobile}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="form-card text-center py-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground">
            {totalBookings}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">Total Bookings</p>
        </div>
        <div className="form-card text-center py-4">
          <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-2">
            <CheckCircle className="w-5 h-5 text-accent" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground">
            {completedBookings}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">Completed</p>
        </div>
      </div>

      {/* Document status */}
      <div className="form-card space-y-3" data-ocid="document-status">
        <h2 className="text-sm font-display font-bold text-foreground">
          Documents
        </h2>

        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
              <FileText className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Driving Licence
              </p>
              <p className="text-xs text-muted-foreground">
                Identity verification
              </p>
            </div>
          </div>
          <span
            className="badge-pending text-xs"
            data-ocid="driving-licence-status"
          >
            Pending
          </span>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Aadhaar Card
              </p>
              <p className="text-xs text-muted-foreground">Address proof</p>
            </div>
          </div>
          <span className="badge-pending text-xs" data-ocid="aadhaar-status">
            Pending
          </span>
        </div>
      </div>

      {/* Account status info */}
      {session.status === "pending" && (
        <div className="rounded-md border border-secondary/30 bg-secondary/10 p-3 flex items-start gap-2.5">
          <Shield className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">
              Account Under Review
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Your application is being reviewed by the admin. You will be
              notified once approved.
            </p>
          </div>
        </div>
      )}

      {session.status === "approved" && (
        <div className="rounded-md border border-accent/30 bg-accent/10 p-3 flex items-start gap-2.5">
          <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">
              Account Approved
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Your account is active. You can create and manage bookings.
            </p>
          </div>
        </div>
      )}

      {/* Logout */}
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 h-12 border-destructive/30 text-destructive bg-destructive/5 hover:bg-destructive/10 hover:text-destructive transition-smooth font-semibold text-sm"
        onClick={handleLogout}
        data-ocid="logout-btn"
      >
        <LogOut className="w-4 h-4" />
        Log Out
      </Button>

      {/* Footer */}
      <p className="text-xs text-center text-muted-foreground pb-2">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          caffeine.ai
        </a>
      </p>
    </div>
  );
}
