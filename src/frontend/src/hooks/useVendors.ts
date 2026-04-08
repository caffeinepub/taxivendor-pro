import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { VendorStatus as BackendVendorStatus, createActor } from "../backend";
import type { Vendor, VendorStatus } from "../types";

function mapVendorStatus(status: BackendVendorStatus): VendorStatus {
  if (status === BackendVendorStatus.approved) return "approved";
  if (status === BackendVendorStatus.rejected) return "rejected";
  return "pending";
}

export function useVendors() {
  const { actor } = useActor(createActor);

  return useQuery<Vendor[]>({
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
        createdAt: Number(v.createdAt / 1_000_000n),
        licenceDocUrl: v.drivingLicence.getDirectURL(),
        aadhaarDocUrl: v.aadhaarCard.getDirectURL(),
      }));
    },
    enabled: !!actor,
    retry: 2,
    retryDelay: 1000,
  });
}

export function useSetVendorStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: string; status: VendorStatus }) => {
      if (!actor) throw new Error("Backend not ready");

      const { Principal } = await import("@icp-sdk/core/principal");
      const principal = Principal.fromText(id);

      let backendStatus: BackendVendorStatus;
      if (status === "approved") backendStatus = BackendVendorStatus.approved;
      else if (status === "rejected")
        backendStatus = BackendVendorStatus.rejected;
      else backendStatus = BackendVendorStatus.pending;

      await actor.setVendorStatus(principal, backendStatus);
      return { id, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });
}
