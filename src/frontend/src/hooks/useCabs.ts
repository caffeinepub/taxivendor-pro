import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Cab as BackendCab } from "../backend";
import type { Cab } from "../types";

function mapBackendCab(c: BackendCab): Cab {
  return {
    id: c.id.toString(),
    vendorId: c.vendorId.toText(),
    driverName: c.driverName,
    driverMobile: c.driverMobile,
    carModel: c.carModel,
    // rcBook is a plain string in the backend (RC number or URL)
    rcBook: typeof c.rcBook === "string" ? c.rcBook : "",
    rcNumber: c.rcNumber ?? "",
    createdAt: Number(c.createdAt / 1_000_000n),
  };
}

/** Fetch cabs belonging to the currently logged-in vendor */
export function useVendorCabs() {
  const { actor } = useActor(createActor);
  return useQuery<Cab[]>({
    queryKey: ["cabs", "vendor"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const cabs = await actor.getVendorCabs();
        return Array.isArray(cabs) ? cabs.map(mapBackendCab) : [];
      } catch (err) {
        // Log to expose silent failures that were hiding the root cause
        console.error("[useVendorCabs] Failed to fetch vendor cabs:", err);
        return [];
      }
    },
    enabled: !!actor,
    retry: 2,
    // Always fetch fresh data — stale cab list was the root cause of empty cab display.
    // refetchOnMount:'always' ensures every page visit gets the latest saved cabs,
    // including cabs just auto-added by setDriverDetails.
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    // Poll every 15 seconds so newly added cabs appear without user needing to navigate away
    refetchInterval: 15000,
  });
}

/** Fetch all cabs — admin view */
export function useAllCabs() {
  const { actor } = useActor(createActor);
  return useQuery<Cab[]>({
    queryKey: ["cabs", "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const cabs = await actor.getAllCabs();
        return Array.isArray(cabs) ? cabs.map(mapBackendCab) : [];
      } catch {
        return [];
      }
    },
    enabled: !!actor,
    retry: 1,
  });
}

/** Add a new cab directly (without a booking) */
export function useAddCab() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      driverName: string;
      driverMobile: string;
      carModel: string;
      rcBook: string;
      rcNumber?: string;
    }) => {
      if (!actor) throw new Error("Backend not ready");
      // addCab signature: (driverName, driverMobile, carModel, rcBook, rcNumber)
      const result = await actor.addCab(
        data.driverName,
        data.driverMobile,
        data.carModel,
        data.rcBook,
        data.rcNumber ?? "",
      );
      if (result.__kind__ === "err") {
        throw new Error(result.err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabs"] });
    },
  });
}
