import { g as useActor, e as useQuery, f as useQueryClient, _ as __vitePreload, V as VendorStatus, h as createActor, P as Principal, J as JSON_KEY_PRINCIPAL, z as base32Decode, A as base32Encode, D as getCrc32 } from "./index-CxP7RHi8.js";
import { u as useMutation } from "./useMutation-BgRpJWW8.js";
function mapVendorStatus(status) {
  if (status === VendorStatus.approved) return "approved";
  if (status === VendorStatus.rejected) return "rejected";
  return "pending";
}
function useVendors() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["vendors"],
    queryFn: async () => {
      if (!actor) return [];
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
    enabled: !!actor && !isFetching
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
      const { Principal: Principal2 } = await __vitePreload(async () => {
        const { Principal: Principal3 } = await Promise.resolve().then(() => index);
        return { Principal: Principal3 };
      }, true ? void 0 : void 0);
      const principal = Principal2.fromText(id);
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
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  JSON_KEY_PRINCIPAL,
  Principal,
  base32Decode,
  base32Encode,
  getCrc32
}, Symbol.toStringTag, { value: "Module" }));
export {
  useSetVendorStatus as a,
  useVendors as u
};
