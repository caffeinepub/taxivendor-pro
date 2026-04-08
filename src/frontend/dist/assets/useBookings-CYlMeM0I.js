import { h as useActor, i as useQuery, k as useQueryClient, l as BookingType, E as ExternalBlob, m as BookingStatus, n as createActor } from "./index-nIM7Hndz.js";
import { u as useMutation } from "./useMutation-CWf3igRP.js";
function mapBookingType(bt) {
  if (bt === BookingType.roundTrip) return "round_trip";
  if (bt === BookingType.local) return "local";
  return "one_way";
}
function toBackendBookingType(bt) {
  if (bt === "round_trip") return BookingType.roundTrip;
  if (bt === "local") return BookingType.local;
  return BookingType.oneWay;
}
function mapBookingStatus(bs) {
  if (bs === BookingStatus.confirmed) return "confirmed";
  if (bs === BookingStatus.completed) return "completed";
  if (bs === BookingStatus.cancelled) return "cancelled";
  return "new";
}
function toBackendBookingStatus(bs) {
  if (bs === "confirmed") return BookingStatus.confirmed;
  if (bs === "completed") return BookingStatus.completed;
  if (bs === "cancelled") return BookingStatus.cancelled;
  return BookingStatus.new_;
}
function mapBackendBooking(b) {
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
    driverDetails: b.driverDetails ? {
      driverName: b.driverDetails.driverName,
      mobile: b.driverDetails.mobile,
      car: b.driverDetails.carModel,
      // FIX: read rcNumber from backend response instead of hardcoding ""
      rcNumber: b.driverDetails.rcNumber,
      rcBookUrl: b.driverDetails.rcBook.getDirectURL()
    } : void 0,
    createdAt: Number(b.createdAt / 1000000n)
  };
}
function useBookings(vendorId) {
  const { actor } = useActor(createActor);
  return useQuery({
    queryKey: ["bookings", vendorId ?? "all"],
    queryFn: async () => {
      if (!actor) throw new Error("Backend not ready");
      if (vendorId && vendorId !== "admin") {
        try {
          const bookings = await actor.listMyBookings();
          return bookings.map(mapBackendBooking);
        } catch {
          return [];
        }
      } else {
        const bookings = await actor.listAllBookings(null);
        return bookings.map(mapBackendBooking);
      }
    },
    enabled: !!actor,
    retry: 1
  });
}
function useBooking(id) {
  const { actor } = useActor(createActor);
  return useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      if (!actor) throw new Error("Backend not ready");
      if (!id) return void 0;
      const numericId = BigInt(id);
      const booking = await actor.getBooking(numericId);
      if (!booking) return void 0;
      return mapBackendBooking(booking);
    },
    enabled: !!actor && !!id,
    retry: 1
  });
}
function useAllBookings() {
  const { actor } = useActor(createActor);
  return useQuery({
    queryKey: ["bookings", "all"],
    queryFn: async () => {
      if (!actor) throw new Error("Backend not ready");
      const bookings = await actor.listAllBookings(null);
      return bookings.map(mapBackendBooking);
    },
    enabled: !!actor,
    retry: 1
  });
}
function useCreateBooking() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
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
        commission: BigInt(Math.round(data.commission))
      };
      const bookingId = await actor.createBooking(input);
      return { id: bookingId.toString() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    }
  });
}
function useCreateAdminBooking() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
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
        commission: BigInt(Math.round(data.commission))
      };
      if (data.vendorId) {
        const bookingId2 = await actor.adminCreateBooking(input);
        return { id: bookingId2.toString() };
      }
      const bookingId = await actor.createBooking(input);
      return { id: bookingId.toString() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    }
  });
}
function useUpdateBookingStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status
    }) => {
      if (!actor) throw new Error("Backend not ready");
      const numericId = BigInt(id);
      await actor.updateBookingStatus(
        numericId,
        toBackendBookingStatus(status)
      );
      return { id, status };
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking", id] });
    }
  });
}
function useUpdateDriverDetails() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      bookingId,
      details,
      rcBookFile
    }) => {
      if (!actor) throw new Error("Backend not ready");
      let rcBlob;
      if (rcBookFile) {
        const buffer = await rcBookFile.arrayBuffer();
        rcBlob = ExternalBlob.fromBytes(new Uint8Array(buffer));
      } else if (details.rcBookUrl) {
        rcBlob = ExternalBlob.fromURL(details.rcBookUrl);
      } else {
        rcBlob = ExternalBlob.fromBytes(new Uint8Array(0));
      }
      const numericId = BigInt(bookingId);
      const driverResult = await actor.setDriverDetails(numericId, {
        driverName: details.driverName,
        mobile: details.mobile,
        carModel: details.car,
        rcBook: rcBlob,
        rcNumber: details.rcNumber ?? ""
      });
      if (driverResult.__kind__ === "err") {
        throw new Error(driverResult.err);
      }
      try {
        const rcBookUrl = details.rcBookUrl ?? "";
        await actor.addCab(
          details.driverName,
          details.mobile,
          details.car,
          rcBookUrl,
          details.rcNumber ?? ""
        );
      } catch {
      }
      return { bookingId, details };
    },
    onSuccess: (_data, { bookingId }) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
      queryClient.invalidateQueries({ queryKey: ["cabs"] });
    }
  });
}
export {
  useCreateBooking as a,
  useBooking as b,
  useUpdateBookingStatus as c,
  useUpdateDriverDetails as d,
  useAllBookings as e,
  useCreateAdminBooking as f,
  useBookings as u
};
