import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Car, User } from "lucide-react";
import { useAllCabs } from "../../hooks/useCabs";
import { useVendors } from "../../hooks/useVendors";

export default function AdminCabs() {
  const { data: cabs, isLoading: cabsLoading, error: cabsError } = useAllCabs();
  const { data: vendors, isLoading: vendorsLoading } = useVendors();

  const isLoading = cabsLoading || vendorsLoading;

  const vendorMap = new Map<string, { name: string; mobile: string }>(
    (vendors ?? []).map((v) => [v.id, { name: v.name, mobile: v.mobile }]),
  );

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/admin"
          className="w-8 h-8 flex items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Back to admin"
          data-ocid="admin-cabs-back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-display font-bold text-foreground">
            All Cabs
          </h1>
          <p className="text-xs text-muted-foreground">
            All registered cabs with vendor info
          </p>
        </div>
      </div>

      {isLoading && <LoadingSpinner size="sm" />}
      {cabsError && (
        <ErrorMessage message="Could not load cabs. Please try again." />
      )}

      {!isLoading && !cabsError && cabs && cabs.length === 0 && (
        <div
          className="form-card flex flex-col items-center py-12 gap-3 text-center"
          data-ocid="admin-cabs-empty"
        >
          <Car className="w-12 h-12 text-muted-foreground/40" />
          <p className="text-base font-semibold text-foreground">
            No cabs registered yet
          </p>
          <p className="text-sm text-muted-foreground">
            Cabs appear here after vendors add driver details to a booking.
          </p>
        </div>
      )}

      {!isLoading && cabs && cabs.length > 0 && (
        <div className="space-y-3" data-ocid="admin-cabs-list">
          {cabs.map((cab) => {
            const vendor = vendorMap.get(cab.vendorId);
            return (
              <div
                key={cab.id}
                className="form-card space-y-3"
                data-ocid={`admin-cab-card-${cab.id}`}
              >
                {/* Cab info */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Car className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-foreground truncate">
                      {cab.carModel}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Driver: {cab.driverName} &bull; 📞 {cab.driverMobile}
                    </p>
                    {cab.rcBook && (
                      <p className="text-xs text-muted-foreground truncate">
                        RC: {cab.rcBook}
                      </p>
                    )}
                  </div>
                </div>

                {/* Vendor info */}
                <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                  <div className="w-6 h-6 rounded-full bg-secondary/15 flex items-center justify-center flex-shrink-0">
                    <User className="w-3 h-3 text-secondary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    {vendor ? (
                      <p className="text-xs font-semibold text-foreground truncate">
                        {vendor.name}
                        <span className="font-normal text-muted-foreground ml-1">
                          ({vendor.mobile})
                        </span>
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground font-mono truncate">
                        {cab.vendorId.slice(0, 16)}…
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    Vendor
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
