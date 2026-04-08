import { h as useActor, i as useQuery, n as createActor } from "./index-Dg4inA2B.js";
function mapBackendCab(c) {
  return {
    id: c.id.toString(),
    vendorId: c.vendorId.toText(),
    driverName: c.driverName,
    driverMobile: c.driverMobile,
    carModel: c.carModel,
    // rcBook is a plain string in the backend (RC number or URL)
    rcBook: typeof c.rcBook === "string" ? c.rcBook : "",
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
      } catch {
        return [];
      }
    },
    enabled: !!actor,
    retry: 1
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
