import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { AdminStats } from "../types";

const DEFAULT_STATS: AdminStats = {
  totalVendors: 0,
  pendingApprovals: 0,
  totalBookings: 0,
  activeBookings: 0,
  totalFacilities: 0,
};

export function useAdminStats() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<AdminStats>({
    queryKey: ["admin", "stats"],
    queryFn: async (): Promise<AdminStats> => {
      // Actor not ready — return zeros, don't error
      if (!actor) return { ...DEFAULT_STATS };

      // Attempt 1: privileged getDashboardStats
      try {
        const [stats, facilities] = await Promise.all([
          actor.getDashboardStats(),
          actor
            .listFacilities()
            .catch(
              () => [] as Awaited<ReturnType<typeof actor.listFacilities>>,
            ),
        ]);
        return {
          totalVendors: Number(stats.totalVendors),
          pendingApprovals: Number(stats.pendingVendors),
          totalBookings: Number(stats.totalBookings),
          activeBookings:
            Number(stats.confirmedBookings) + Number(stats.newBookings),
          totalFacilities: facilities.length,
        };
      } catch {
        // Attempt 2: compute from individual endpoints — each is independently guarded
        try {
          const [vendors, bookings, facilities] = await Promise.all([
            actor
              .listAllVendors()
              .catch(
                () => [] as Awaited<ReturnType<typeof actor.listAllVendors>>,
              ),
            actor
              .listAllBookings(null)
              .catch(
                () => [] as Awaited<ReturnType<typeof actor.listAllBookings>>,
              ),
            actor
              .listFacilities()
              .catch(
                () => [] as Awaited<ReturnType<typeof actor.listFacilities>>,
              ),
          ]);

          const pendingApprovals = vendors.filter(
            (v) => String(v.status) === "pending",
          ).length;
          const activeBookings = bookings.filter(
            (b) =>
              String(b.status) === "new" || String(b.status) === "confirmed",
          ).length;

          return {
            totalVendors: vendors.length,
            pendingApprovals,
            totalBookings: bookings.length,
            activeBookings,
            totalFacilities: facilities.length,
          };
        } catch {
          // All backend calls failed — return zeros, never throw
          return { ...DEFAULT_STATS };
        }
      }
    },
    // Only enable once actor is fully ready (not mid-fetch)
    enabled: !!actor && !isFetching,
    // Never retry on error — the queryFn itself handles errors gracefully
    retry: false,
    // Keep stale data visible while refetching so panel never blanks
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    // Return default stats on any unhandled error (extra safety net)
    placeholderData: { ...DEFAULT_STATS },
  });
}
