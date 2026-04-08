import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Facility } from "../types";

export function useFacilities() {
  const { actor } = useActor(createActor);

  return useQuery<Facility[]>({
    queryKey: ["facilities"],
    queryFn: async () => {
      if (!actor) throw new Error("Backend not ready");
      const list = await actor.listFacilities();
      return list.map((f) => ({
        id: f.id.toString(),
        name: f.name,
        description: f.description,
        active: f.active,
        createdAt: Number(f.createdAt / 1_000_000n),
      }));
    },
    enabled: !!actor,
    retry: 1,
  });
}

export function useAddFacility() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Pick<Facility, "name" | "description">) => {
      if (!actor) throw new Error("Backend not ready");
      const id = await actor.createFacility({
        name: data.name,
        description: data.description,
        active: true,
      });
      return { id: id.toString() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });
}

export function useUpdateFacility() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: { id: string; data: Partial<Facility> }) => {
      if (!actor) throw new Error("Backend not ready");
      const numericId = BigInt(id);
      // Must fetch current state to merge partial update
      const current = await actor.listFacilities();
      const existing = current.find((f) => f.id === numericId);
      if (!existing) throw new Error("Facility not found");
      await actor.updateFacility(numericId, {
        name: data.name ?? existing.name,
        description:
          data.description !== undefined
            ? data.description
            : existing.description,
        active: data.active !== undefined ? data.active : existing.active,
      });
      return { id };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });
}

export function useDeleteFacility() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Backend not ready");
      await actor.deleteFacility(BigInt(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });
}
