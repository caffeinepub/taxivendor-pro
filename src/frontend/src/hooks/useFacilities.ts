import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Facility } from "../types";

let mockFacilities: Facility[] = [
  {
    id: "f1",
    name: "AC Vehicle",
    description: "Air-conditioned vehicles for comfortable travel",
    active: true,
    createdAt: Date.now() - 604800000,
  },
  {
    id: "f2",
    name: "24/7 Support",
    description: "Round-the-clock customer support via phone and WhatsApp",
    active: true,
    createdAt: Date.now() - 518400000,
  },
  {
    id: "f3",
    name: "GPS Tracking",
    description: "Real-time vehicle tracking for passenger safety",
    active: true,
    createdAt: Date.now() - 432000000,
  },
  {
    id: "f4",
    name: "Driver Verification",
    description:
      "All drivers go through background check and licence verification",
    active: true,
    createdAt: Date.now() - 345600000,
  },
  {
    id: "f5",
    name: "Insurance Coverage",
    description: "Comprehensive travel insurance for all bookings",
    active: false,
    createdAt: Date.now() - 259200000,
  },
];

export function useFacilities() {
  return useQuery<Facility[]>({
    queryKey: ["facilities"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return [...mockFacilities];
    },
  });
}

export function useAddFacility() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Pick<Facility, "name" | "description">) => {
      await new Promise((r) => setTimeout(r, 400));
      const facility: Facility = {
        id: `f${Date.now()}`,
        name: data.name,
        description: data.description,
        active: true,
        createdAt: Date.now(),
      };
      mockFacilities.push(facility);
      return facility;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
    },
  });
}

export function useUpdateFacility() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: { id: string; data: Partial<Facility> }) => {
      await new Promise((r) => setTimeout(r, 300));
      const idx = mockFacilities.findIndex((f) => f.id === id);
      if (idx !== -1) {
        mockFacilities[idx] = { ...mockFacilities[idx], ...data };
      }
      return mockFacilities[idx];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
    },
  });
}

export function useDeleteFacility() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise((r) => setTimeout(r, 300));
      mockFacilities = mockFacilities.filter((f) => f.id !== id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
    },
  });
}
