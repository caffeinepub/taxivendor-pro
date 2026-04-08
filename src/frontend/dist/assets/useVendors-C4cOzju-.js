const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-DmdezZb4.js","assets/index-DQCkNZNn.js","assets/index-0VNm4Jc2.css"])))=>i.map(i=>d[i]);
import { g as useActor, h as useQuery, i as useQueryClient, _ as __vitePreload, V as VendorStatus, m as createActor } from "./index-DQCkNZNn.js";
import { u as useMutation } from "./index-DmdezZb4.js";
function mapVendorStatus(status) {
  if (status === VendorStatus.approved) return "approved";
  if (status === VendorStatus.rejected) return "rejected";
  return "pending";
}
function useVendors() {
  const { actor } = useActor(createActor);
  return useQuery({
    queryKey: ["vendors"],
    queryFn: async () => {
      if (!actor) throw new Error("Backend not ready");
      const vendors = await actor.listAllVendors();
      return vendors.map((v) => ({
        id: v.principal.toText(),
        name: v.name,
        mobile: v.mobile,
        drivingLicence: v.drivingLicence.getDirectURL(),
        aadhaarCard: v.aadhaarCard.getDirectURL(),
        companyName: v.companyName,
        status: mapVendorStatus(v.status),
        createdAt: Number(v.createdAt / 1000000n),
        licenceDocUrl: v.drivingLicence.getDirectURL(),
        aadhaarDocUrl: v.aadhaarCard.getDirectURL()
      }));
    },
    enabled: !!actor,
    retry: 2,
    retryDelay: 1e3
  });
}
function useSetVendorStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status
    }) => {
      if (!actor) throw new Error("Backend not ready");
      const { Principal } = await __vitePreload(async () => {
        const { Principal: Principal2 } = await import("./index-DmdezZb4.js").then((n) => n.i);
        return { Principal: Principal2 };
      }, true ? __vite__mapDeps([0,1,2]) : void 0);
      const principal = Principal.fromText(id);
      let backendStatus;
      if (status === "approved") backendStatus = VendorStatus.approved;
      else if (status === "rejected")
        backendStatus = VendorStatus.rejected;
      else backendStatus = VendorStatus.pending;
      await actor.setVendorStatus(principal, backendStatus);
      return { id, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    }
  });
}
export {
  useSetVendorStatus as a,
  useVendors as u
};
