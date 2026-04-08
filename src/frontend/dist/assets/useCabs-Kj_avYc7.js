import { h as useActor, i as useQuery, n as createActor } from "./index-CPOLE32K.js";
function mapBackendCab(c) {
  return {
    id: c.id.toString(),
    vendorId: c.vendorId.toText(),
    driverName: c.driverName,
    driverMobile: c.driverMobile,
    carModel: c.carModel,
    // rcBook is a plain string in the backend (RC number or URL)
    rcBook: typeof c.rcBook === "string" ? c.rcBook : "",
    rcNumber: c.rcNumber ?? "",
    createdAt: Number(c.createdAt / 1000000n)
  };
}
function useVendorCabs() {
  const { actor } = useActor(createActor);
  return useQuery({
    queryKey: ["cabs", "vendor"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const cabs = await actor.getVendorCabs();
        return Array.isArray(cabs) ? cabs.map(mapBackendCab) : [];
      } catch (err) {
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
    refetchInterval: 15e3
  });
}
function useAllCabs() {
  const { actor } = useActor(createActor);
  return useQuery({
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
    retry: 1
  });
}
export {
  useAllCabs as a,
  useVendorCabs as u
};
