import { h as useActor, i as useQuery, k as useQueryClient, _ as __vitePreload, V as VendorStatus, n as createActor, P as Principal, J as JSON_KEY_PRINCIPAL, G as base32Decode, H as base32Encode, I as getCrc32 } from "./index-Dg4inA2B.js";
import { u as useMutation } from "./useMutation-DZ_242xz.js";
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
      if (!Array.isArray(vendors)) return [];
      return vendors.map((v) => {
        let licenceUrl = "";
        let aadhaarUrl = "";
        try {
          licenceUrl = v.drivingLicence.getDirectURL();
        } catch {
          licenceUrl = "Document uploaded";
        }
        try {
          aadhaarUrl = v.aadhaarCard.getDirectURL();
        } catch {
          aadhaarUrl = "Document uploaded";
        }
        return {
          id: v.principal.toText(),
          name: v.name,
          mobile: v.mobile,
          drivingLicence: licenceUrl ? "Uploaded ✓" : "N/A",
          aadhaarCard: aadhaarUrl ? "Uploaded ✓" : "N/A",
          companyName: v.companyName,
          status: mapVendorStatus(v.status),
          createdAt: Number(v.createdAt / 1000000n),
          licenceDocUrl: licenceUrl,
          aadhaarDocUrl: aadhaarUrl
        };
      });
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
      try {
        await actor.setVendorStatus(principal, backendStatus);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        const isVoidDecodeError = msg.toLowerCase().includes("v3") || msg.toLowerCase().includes("expected") || msg.toLowerCase().includes("response body");
        if (!isVoidDecodeError) throw err;
      }
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
