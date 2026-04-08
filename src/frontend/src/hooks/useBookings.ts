import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookingStatus as BackendBookingStatus,
  BookingType as BackendBookingType,
  ExternalBlob,
  createActor,
} from "../backend";
import type { Booking as BackendBooking } from "../backend";
import type {
  Booking,
  BookingStatus,
  BookingType,
  CreateBookingData,
  DriverDetails,
} from "../types";

// Map backend BookingType enum → frontend BookingType string
function mapBookingType(bt: BackendBookingType): BookingType {
  if (bt === BackendBookingType.roundTrip) return "round_trip";
  if (bt === BackendBookingType.local) return "local";
  return "one_way";
}

// Map frontend BookingType string → backend BookingType enum
function toBackendBookingType(bt: BookingType): BackendBookingType {
  if (bt === "round_trip") return BackendBookingType.roundTrip;
  if (bt === "local") return BackendBookingType.local;
  return BackendBookingType.oneWay;
}

// Map backend BookingStatus enum → frontend BookingStatus string
function mapBookingStatus(bs: BackendBookingStatus): BookingStatus {
  if (bs === BackendBookingStatus.confirmed) return "confirmed";
  if (bs === BackendBookingStatus.completed) return "completed";
  if (bs === BackendBookingStatus.cancelled) return "cancelled";
  return "new";
}

// Map backend BookingStatus string → backend enum
function toBackendBookingStatus(bs: BookingStatus): BackendBookingStatus {
  if (bs === "confirmed") return BackendBookingStatus.confirmed;
  if (bs === "completed") return BackendBookingStatus.completed;
  if (bs === "cancelled") return BackendBookingStatus.cancelled;
  return BackendBookingStatus.new_;
}

// Convert a backend Booking record to the frontend Booking type
function mapBackendBooking(b: BackendBooking): Booking {
  return {
    id: b.id.toString(),
    vendorId: b.vendorPrincipal.toText(),
    vendorName: b.submitterName,
    vendorMobile: b.submitterMobile,
    vendorWhatsapp: b.submitterWhatsApp,
    bookingType: mapBookingType(b.bookingType),
    pickupCity: b.pickupCity,
    pickupState: b.pickupState,
    dropCity: b.dropCity,
    dropState: b.dropState,
    date: b.date,
    time: b.time,
    driverEarning: Number(b.driverEarning),
    commission: Number(b.commission),
    status: mapBookingStatus(b.status),
    driverDetails: b.driverDetails
      ? {
          driverName: b.driverDetails.driverName,
          mobile: b.driverDetails.mobile,
          car: b.driverDetails.carModel,
          rcNumber: "",
          rcBookUrl: b.driverDetails.rcBook.getDirectURL(),
        }
      : undefined,
    createdAt: Number(b.createdAt / 1_000_000n),
  };
}

/**
 * useBookings — lists bookings for a specific vendor or all bookings.
 * vendorId: the vendor's principal string. If undefined → list all (admin).
 */
export function useBookings(vendorId?: string) {
  const { actor } = useActor(createActor);

  return useQuery<Booking[]>({
    queryKey: ["bookings", vendorId ?? "all"],
    queryFn: async () => {
      if (!actor) throw new Error("Backend not ready");

      if (vendorId && vendorId !== "admin") {
        // Fetch bookings for a specific vendor
        try {
          const { Principal } = await import("@icp-sdk/core/principal");
          const principal = Principal.fromText(vendorId);
          const bookings = await actor.listAllBookings(principal);
          return bookings.map(mapBackendBooking);
        } catch {
          // Fallback: list own bookings
          const bookings = await actor.listMyBookings();
          return bookings.map(mapBackendBooking);
        }
      } else {
        // Admin or no filter — list all bookings
        const bookings = await actor.listAllBookings(null);
        return bookings.map(mapBackendBooking);
      }
    },
    enabled: !!actor,
    retry: 1,
  });
}

export function useBooking(id: string) {
  const { actor } = useActor(createActor);

  return useQuery<Booking | undefined>({
    queryKey: ["booking", id],
    queryFn: async () => {
      if (!actor) throw new Error("Backend not ready");
      if (!id) return undefined;

      const numericId = BigInt(id);
      const booking = await actor.getBooking(numericId);
      if (!booking) return undefined;
      return mapBackendBooking(booking);
    },
    enabled: !!actor && !!id,
    retry: 1,
  });
}

export function useAllBookings() {
  const { actor } = useActor(createActor);

  return useQuery<Booking[]>({
    queryKey: ["bookings", "all"],
    queryFn: async () => {
      if (!actor) throw new Error("Backend not ready");
      const bookings = await actor.listAllBookings(null);
      return bookings.map(mapBackendBooking);
    },
    enabled: !!actor,
    retry: 1,
  });
}

export function useCreateBooking() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: CreateBookingData & { vendorId: string; vendorName: string },
    ) => {
      if (!actor) throw new Error("Backend not ready");

      const input = {
        submitterName: data.vendorName,
        submitterMobile: data.vendorMobile,
        submitterWhatsApp: data.vendorWhatsapp,
        bookingType: toBackendBookingType(data.bookingType),
        pickupCity: data.pickupCity,
        pickupState: data.pickupState,
        dropCity: data.dropCity,
        dropState: data.dropState,
        date: data.date,
        time: data.time,
        driverEarning: BigInt(Math.round(data.driverEarning)),
        commission: BigInt(Math.round(data.commission)),
      };

      const bookingId = await actor.createBooking(input);
      return { id: bookingId.toString() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

export function useUpdateBookingStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: string; status: BookingStatus }) => {
      if (!actor) throw new Error("Backend not ready");
      const numericId = BigInt(id);
      await actor.updateBookingStatus(
        numericId,
        toBackendBookingStatus(status),
      );
      return { id, status };
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking", id] });
    },
  });
}

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
      if (!actor) throw new Error("Backend not ready");

      // Build the ExternalBlob for rcBook
      let rcBlob: ExternalBlob;
      if (rcBookFile) {
        const buffer = await rcBookFile.arrayBuffer();
        rcBlob = ExternalBlob.fromBytes(new Uint8Array(buffer));
      } else if (details.rcBookUrl) {
        rcBlob = ExternalBlob.fromURL(details.rcBookUrl);
      } else {
        // No RC book file — use empty placeholder
        rcBlob = ExternalBlob.fromBytes(new Uint8Array(0));
      }

      const numericId = BigInt(bookingId);
      await actor.setDriverDetails(numericId, {
        driverName: details.driverName,
        mobile: details.mobile,
        carModel: details.car,
        rcBook: rcBlob,
      });

      return { bookingId, details };
    },
    onSuccess: (_data, { bookingId }) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
    },
  });
}
