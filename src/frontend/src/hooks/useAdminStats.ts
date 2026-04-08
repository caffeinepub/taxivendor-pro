import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { AdminStats } from "../types";

export function useAdminStats() {
  const { actor } = useActor(createActor);

  return useQuery<AdminStats>({
    queryKey: ["admin", "stats"],
    queryFn: async (): Promise<AdminStats> => {
      if (!actor) throw new Error("Backend not ready");

      // Try privileged getDashboardStats first, fall back to individual calls,
      // then fall back to safe zeros — admin panel must always load.
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
        // Attempt 2: compute from individual list endpoints
        try {
          const [vendors, bookings, facilities] = await Promise.all([
            actor.listAllVendors().catch(() => []),
            actor.listAllBookings(null).catch(() => []),
            actor.listFacilities().catch(() => []),
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
          // Attempt 3: return safe zeros — dashboard still renders
          return {
            totalVendors: 0,
            pendingApprovals: 0,
            totalBookings: 0,
            activeBookings: 0,
            totalFacilities: 0,
          };
        }
      }
    },
    enabled: !!actor,
    retry: 0,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}
