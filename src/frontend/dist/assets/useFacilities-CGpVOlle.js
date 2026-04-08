import { g as useActor, h as useQuery, i as useQueryClient, m as createActor } from "./index-DQCkNZNn.js";
import { u as useMutation } from "./index-DmdezZb4.js";
function useFacilities() {
  const { actor } = useActor(createActor);
  return useQuery({
    queryKey: ["facilities"],
    queryFn: async () => {
      if (!actor) throw new Error("Backend not ready");
      const list = await actor.listFacilities();
      return list.map((f) => ({
        id: f.id.toString(),
        name: f.name,
        description: f.description,
        active: f.active,
        createdAt: Number(f.createdAt / 1000000n)
      }));
    },
    enabled: !!actor,
    retry: 1
  });
}
function useAddFacility() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Backend not ready");
      const id = await actor.createFacility({
        name: data.name,
        description: data.description,
        active: true
      });
      return { id: id.toString() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    }
  });
}
function useUpdateFacility() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data
    }) => {
      if (!actor) throw new Error("Backend not ready");
      const numericId = BigInt(id);
      const current = await actor.listFacilities();
      const existing = current.find((f) => f.id === numericId);
      if (!existing) throw new Error("Facility not found");
      await actor.updateFacility(numericId, {
        name: data.name ?? existing.name,
        description: data.description !== void 0 ? data.description : existing.description,
        active: data.active !== void 0 ? data.active : existing.active
      });
      return { id };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    }
  });
}
function useDeleteFacility() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Backend not ready");
      await actor.deleteFacility(BigInt(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    }
  });
}
export {
  useAddFacility as a,
  useUpdateFacility as b,
  useDeleteFacility as c,
  useFacilities as u
};
