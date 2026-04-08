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
      } catch {
        // Graceful fallback — return empty array instead of crashing
        return [];
      }
    },
    enabled: !!actor,
    retry: 1,
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
    }) => {
      if (!actor) throw new Error("Backend not ready");
      try {
        await actor.addCab(
          data.driverName,
          data.driverMobile,
          data.carModel,
          data.rcBook,
        );
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        // Treat void decode artefacts as success
        const isVoidDecodeError =
          msg.toLowerCase().includes("v3") ||
          msg.toLowerCase().includes("expected") ||
          msg.toLowerCase().includes("response body");
        if (!isVoidDecodeError) throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabs"] });
    },
  });
}
