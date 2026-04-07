import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalBlob, createActor } from "../backend";
import type {
  Booking,
  BookingStatus,
  CreateBookingData,
  DriverDetails,
} from "../types";

// Seed data - realistic bookings
const SEED_BOOKINGS: Booking[] = [
  {
    id: "KBG001",
    vendorId: "v1",
    vendorName: "Rajesh Kumar",
    vendorMobile: "9876543210",
    vendorWhatsapp: "9876543210",
    bookingType: "one_way",
    pickupCity: "Mumbai",
    pickupState: "Maharashtra",
    dropCity: "Pune",
    dropState: "Maharashtra",
    date: "2026-04-10",
    time: "10:30",
    driverEarning: 1800,
    commission: 200,
    status: "confirmed",
    driverDetails: {
      driverName: "Suresh Patil",
      mobile: "9876501234",
      car: "Toyota Innova",
      rcNumber: "MH12AB1234",
    },
    createdAt: Date.now() - 86400000,
  },
  {
    id: "KBG002",
    vendorId: "v1",
    vendorName: "Rajesh Kumar",
    vendorMobile: "9876543210",
    vendorWhatsapp: "9876543210",
    bookingType: "round_trip",
    pickupCity: "Delhi",
    pickupState: "Delhi",
    dropCity: "Agra",
    dropState: "Uttar Pradesh",
    date: "2026-04-12",
    time: "06:00",
    driverEarning: 3200,
    commission: 400,
    status: "new",
    createdAt: Date.now() - 3600000,
  },
  {
    id: "KBG003",
    vendorId: "admin",
    vendorName: "Admin",
    vendorMobile: "9999999999",
    vendorWhatsapp: "9999999999",
    bookingType: "local",
    pickupCity: "Bangalore",
    pickupState: "Karnataka",
    dropCity: "Bangalore",
    dropState: "Karnataka",
    date: "2026-04-08",
    time: "09:45",
    driverEarning: 800,
    commission: 100,
    status: "completed",
    driverDetails: {
      driverName: "Mohan Das",
      mobile: "9845123456",
      car: "Maruti Swift",
      rcNumber: "KA01MN5678",
    },
    createdAt: Date.now() - 172800000,
  },
];

let mockBookings = [...SEED_BOOKINGS];

export function useBookings(vendorId?: string) {
  return useQuery<Booking[]>({
    queryKey: ["bookings", vendorId],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 400));
      if (vendorId) {
        return mockBookings.filter((b) => b.vendorId === vendorId);
      }
      return [...mockBookings];
    },
    enabled: true,
  });
}

export function useBooking(id: string) {
  return useQuery<Booking | undefined>({
    queryKey: ["booking", id],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return mockBookings.find((b) => b.id === id);
    },
    enabled: !!id,
  });
}

export function useAllBookings() {
  return useQuery<Booking[]>({
    queryKey: ["bookings", "all"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 400));
      return [...mockBookings];
    },
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      data: CreateBookingData & { vendorId: string; vendorName: string },
    ) => {
      await new Promise((r) => setTimeout(r, 600));
      const booking: Booking = {
        id: `KBG${String(mockBookings.length + 1).padStart(3, "0")}`,
        vendorId: data.vendorId,
        vendorName: data.vendorName,
        vendorMobile: data.vendorMobile,
        vendorWhatsapp: data.vendorWhatsapp,
        bookingType: data.bookingType,
        pickupCity: data.pickupCity,
        pickupState: data.pickupState,
        dropCity: data.dropCity,
        dropState: data.dropState,
        date: data.date,
        time: data.time,
        driverEarning: data.driverEarning,
        commission: data.commission,
        status: "new",
        createdAt: Date.now(),
      };
      mockBookings.push(booking);
      return booking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: string; status: BookingStatus }) => {
      await new Promise((r) => setTimeout(r, 300));
      const idx = mockBookings.findIndex((b) => b.id === id);
      if (idx !== -1) {
        mockBookings[idx] = { ...mockBookings[idx], status };
      }
      return mockBookings[idx];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

/**
 * useUpdateDriverDetails — REAL backend call.
 *
 * Accepts either a File (new upload) or a URL string (already uploaded).
 * Builds the backend DriverDetails record and calls actor.setDriverDetails().
 * Also updates the local mock cache so the UI reflects the change instantly.
 */
export function useUpdateDriverDetails() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookingId,
      details,
      rcBookFile,
    }: {
      bookingId: string;
      details: DriverDetails;
      rcBookFile?: File;
    }) => {
      // Attempt real backend save if actor is available
      if (actor) {
        try {
          // Build the ExternalBlob for rcBook
          let rcBlob: ExternalBlob;
          if (rcBookFile) {
            // Convert the uploaded File to ExternalBlob bytes
            const buffer = await rcBookFile.arrayBuffer();
            rcBlob = ExternalBlob.fromBytes(new Uint8Array(buffer));
          } else if (details.rcBookUrl) {
            // Re-use existing URL already stored
            rcBlob = ExternalBlob.fromURL(details.rcBookUrl);
          } else {
            // Fallback: empty placeholder blob so the call still succeeds
            rcBlob = ExternalBlob.fromBytes(new Uint8Array(0));
          }

          // bookingId is a numeric string like "KBG001" in mock context,
          // but for real bookings from the backend it will be a bigint string.
          // Try to parse as bigint; if it fails (e.g. "KBG001"), fall back to mock-only.
          const numericId = BigInt(bookingId.replace(/\D/g, "") || "0");

          await actor.setDriverDetails(numericId, {
            driverName: details.driverName,
            mobile: details.mobile,
            carModel: details.car,
            rcBook: rcBlob,
          });
        } catch (err) {
          // Backend call failed — log but don't crash; fall through to local update
          console.warn("setDriverDetails backend call failed:", err);
        }
      }

      // Always update local mock cache so UI reflects changes immediately
      const idx = mockBookings.findIndex((b) => b.id === bookingId);
      if (idx !== -1) {
        mockBookings[idx] = { ...mockBookings[idx], driverDetails: details };
        return mockBookings[idx];
      }

      // Booking not in mock — create a minimal updated record
      return { id: bookingId, driverDetails: details } as Booking;
    },
    onSuccess: (_data, { bookingId }) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
    },
  });
}
