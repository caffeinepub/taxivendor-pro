import { useAdminStats } from "@/hooks/useAdminStats";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Clock,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  sub?: string;
  accent?: "primary" | "secondary" | "accent" | "destructive";
  href?: string;
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent = "primary",
  href,
}: StatCardProps) {
  const accentMap = {
    primary: "text-primary bg-primary/10",
    secondary: "text-secondary bg-secondary/10",
    accent: "text-accent bg-accent/10",
    destructive: "text-destructive bg-destructive/10",
  };
  const card = (
    <div className="form-card flex items-start gap-4 hover:shadow-sm transition-smooth">
      <div
        className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${accentMap[accent]}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-display font-bold text-foreground leading-tight">
          {value}
        </p>
        <p className="text-sm font-medium text-foreground mt-0.5">{label}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        to={href}
        data-ocid={`stat-card-${label.toLowerCase().replace(/\s/g, "-")}`}
      >
        {card}
      </Link>
    );
  }
  return card;
}

const QUICK_ACTIONS = [
  {
    href: "/admin/applications",
    icon: Users,
    label: "Vendor Applications",
    desc: "Review and approve vendor signups",
    accent: "primary" as const,
  },
  {
    href: "/admin/bookings",
    icon: ClipboardList,
    label: "Manage Bookings",
    desc: "View, filter and create bookings",
    accent: "secondary" as const,
  },
  {
    href: "/admin/facilities",
    icon: Star,
    label: "Facilities",
    desc: "Add or update service offerings",
    accent: "accent" as const,
  },
];

export default function AdminPanel() {
  const { data: stats, isLoading } = useAdminStats();

  // Show skeleton while stats are loading — prevents blank/flickering render
  if (isLoading) {
    return (
      <div className="px-4 py-6 space-y-6">
        <div>
          <div className="h-7 w-40 rounded-md bg-muted animate-pulse" />
          <div className="h-4 w-56 rounded-md bg-muted animate-pulse mt-2" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {["v1", "v2", "v3", "v4", "v5", "v6"].map((k) => (
            <div key={k} className="form-card flex items-start gap-4">
              <div className="w-11 h-11 rounded-lg bg-muted animate-pulse flex-shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-7 w-12 rounded bg-muted animate-pulse" />
                <div className="h-3 w-20 rounded bg-muted animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const approvedVendors =
    (stats?.totalVendors ?? 0) - (stats?.pendingApprovals ?? 0);

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1
          className="font-display text-2xl font-bold text-foreground"
          data-ocid="admin-overview-title"
        >
          Admin Overview
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          KabGo platform at a glance
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard
          icon={Users}
          label="Total Vendors"
          value={stats?.totalVendors ?? 0}
          sub="All registered"
          accent="primary"
          href="/admin/applications"
        />
        <StatCard
          icon={CheckCircle2}
          label="Approved"
          value={approvedVendors}
          sub="Active vendors"
          accent="accent"
          href="/admin/applications"
        />
        <StatCard
          icon={Clock}
          label="Pending"
          value={stats?.pendingApprovals ?? 0}
          sub="Awaiting review"
          accent="secondary"
          href="/admin/applications"
        />
        <StatCard
          icon={BookOpen}
          label="Total Bookings"
          value={stats?.totalBookings ?? 0}
          sub="All time"
          accent="primary"
          href="/admin/bookings"
        />
        <StatCard
          icon={TrendingUp}
          label="Active Rides"
          value={stats?.activeBookings ?? 0}
          sub="In progress"
          accent="accent"
          href="/admin/bookings"
        />
        <StatCard
          icon={Star}
          label="Facilities"
          value={stats?.totalFacilities ?? 0}
          sub="Services listed"
          accent="secondary"
          href="/admin/facilities"
        />
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-display text-base font-semibold text-foreground mb-3">
          Quick Actions
        </h2>
        <div className="space-y-2">
          {QUICK_ACTIONS.map((action) => {
            const accentMap = {
              primary: "text-primary bg-primary/10",
              secondary: "text-secondary bg-secondary/10",
              accent: "text-accent bg-accent/10",
            };
            return (
              <Link
                key={action.href}
                to={action.href}
                className="form-card flex items-center gap-4 hover:shadow-sm transition-smooth"
                data-ocid={`quick-action-${action.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${accentMap[action.accent]}`}
                >
                  <action.icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {action.label}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {action.desc}
                  </p>
                </div>
                <div className="ml-auto text-muted-foreground">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    role="presentation"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
