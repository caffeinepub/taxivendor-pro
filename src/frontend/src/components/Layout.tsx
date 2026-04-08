import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Settings,
  Star,
  User,
  Users,
} from "lucide-react";
import { useVendorAuth } from "../hooks/useVendorAuth";
import NotificationBell from "./NotificationBell";
import ThemeSwitcher from "./ThemeSwitcher";

const VENDOR_NAV = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { to: "/bookings", icon: BookOpen, label: "Bookings" },
  { to: "/profile", icon: User, label: "Profile" },
];

const ADMIN_NAV = [
  { to: "/admin", icon: LayoutDashboard, label: "Overview" },
  { to: "/admin/applications", icon: Users, label: "Vendors" },
  { to: "/admin/bookings", icon: ClipboardList, label: "Bookings" },
  { to: "/admin/facilities", icon: Star, label: "Facilities" },
];

export default function Layout() {
  const { session, isLoggedIn, isAdmin, logout } = useVendorAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header
        className="sticky top-0 z-40 bg-card border-b border-border shadow-xs"
        data-ocid="app-header"
      >
        <div className="flex items-center justify-between px-4 h-14 max-w-screen-lg mx-auto">
          <Link
            to={isLoggedIn ? (isAdmin ? "/admin" : "/dashboard") : "/login"}
            className="flex items-center gap-2"
          >
            <img
              src="/assets/images/sarthi-logo.png"
              alt="Sarthi Vendors"
              className="h-9 w-9 rounded-full object-cover flex-shrink-0"
            />
            <span className="font-display font-bold text-lg text-foreground tracking-tight">
              Sarthi Vendors
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <ThemeSwitcher />
            {isLoggedIn && <NotificationBell />}
            {isLoggedIn && (
              <>
                <div className="hidden sm:block text-right mr-1">
                  <p className="text-sm font-semibold text-foreground leading-tight">
                    {session?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session?.companyName}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  aria-label="Logout"
                  className="text-muted-foreground hover:text-destructive"
                  data-ocid="logout-btn"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Admin top nav */}
        {isLoggedIn && isAdmin && (
          <nav
            className="flex border-t border-border bg-card overflow-x-auto"
            data-ocid="admin-nav"
          >
            <div className="flex items-center gap-0 px-4 max-w-screen-lg mx-auto w-full">
              {ADMIN_NAV.map((item) => {
                const isActive =
                  item.to === "/admin"
                    ? currentPath === "/admin"
                    : currentPath.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                      isActive
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background overflow-y-auto pb-20 md:pb-6">
        <div className="max-w-screen-lg mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom nav for vendors */}
      {isLoggedIn && !isAdmin && (
        <nav
          className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border"
          data-ocid="vendor-bottom-nav"
        >
          <div className="flex items-center justify-around max-w-screen-lg mx-auto">
            {VENDOR_NAV.map((item) => {
              const isActive =
                currentPath === item.to ||
                currentPath.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex flex-col items-center gap-0.5 py-2 px-4 text-xs font-medium transition-colors min-w-0 flex-1",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}

      {/* Footer — always visible */}
      <footer className="bg-muted/40 border-t border-border py-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              window.location.hostname,
            )}`}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      {/* Settings FAB for vendor */}
      {isLoggedIn && !isAdmin && (
        <div className="fixed bottom-16 right-4 z-30">
          <Link to="/profile">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full shadow-elevated border-border bg-card"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
