import { e as useQuery, f as useQueryClient } from "./index-CxP7RHi8.js";
import { u as useMutation } from "./useMutation-BgRpJWW8.js";
let mockFacilities = [
  {
    id: "f1",
    name: "AC Vehicle",
    description: "Air-conditioned vehicles for comfortable travel",
    active: true,
    createdAt: Date.now() - 6048e5
  },
  {
    id: "f2",
    name: "24/7 Support",
    description: "Round-the-clock customer support via phone and WhatsApp",
    active: true,
    createdAt: Date.now() - 5184e5
  },
  {
    id: "f3",
    name: "GPS Tracking",
    description: "Real-time vehicle tracking for passenger safety",
    active: true,
    createdAt: Date.now() - 432e6
  },
  {
    id: "f4",
    name: "Driver Verification",
    description: "All drivers go through background check and licence verification",
    active: true,
    createdAt: Date.now() - 3456e5
  },
  {
    id: "f5",
    name: "Insurance Coverage",
    description: "Comprehensive travel insurance for all bookings",
    active: false,
    createdAt: Date.now() - 2592e5
  }
];
function useFacilities() {
  return useQuery({
    queryKey: ["facilities"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return [...mockFacilities];
    }
  });
}
function useAddFacility() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      await new Promise((r) => setTimeout(r, 400));
      const facility = {
        id: `f${Date.now()}`,
        name: data.name,
        description: data.description,
        active: true,
        createdAt: Date.now()
      };
      mockFacilities.push(facility);
      return facility;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
    }
  });
}
function useUpdateFacility() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data
    }) => {
      await new Promise((r) => setTimeout(r, 300));
      const idx = mockFacilities.findIndex((f) => f.id === id);
      if (idx !== -1) {
        mockFacilities[idx] = { ...mockFacilities[idx], ...data };
      }
      return mockFacilities[idx];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
    }
  });
}
function useDeleteFacility() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await new Promise((r) => setTimeout(r, 300));
      mockFacilities = mockFacilities.filter((f) => f.id !== id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
    }
  });
}
export {
  useAddFacility as a,
  useUpdateFacility as b,
  useDeleteFacility as c,
  useFacilities as u
};
