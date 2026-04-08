const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-DmdezZb4.js","assets/index-DQCkNZNn.js","assets/index-0VNm4Jc2.css"])))=>i.map(i=>d[i]);
import { g as useActor, h as useQuery, i as useQueryClient, E as ExternalBlob, k as BookingType, l as BookingStatus, m as createActor, _ as __vitePreload } from "./index-DQCkNZNn.js";
import { u as useMutation } from "./index-DmdezZb4.js";
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
      rcNumber: "",
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
          const { Principal } = await __vitePreload(async () => {
            const { Principal: Principal2 } = await import("./index-DmdezZb4.js").then((n) => n.i);
            return { Principal: Principal2 };
          }, true ? __vite__mapDeps([0,1,2]) : void 0);
          const principal = Principal.fromText(vendorId);
          const bookings = await actor.listAllBookings(principal);
          return bookings.map(mapBackendBooking);
        } catch {
          const bookings = await actor.listMyBookings();
          return bookings.map(mapBackendBooking);
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
      await actor.setDriverDetails(numericId, {
        driverName: details.driverName,
        mobile: details.mobile,
        carModel: details.car,
        rcBook: rcBlob
      });
      return { bookingId, details };
    },
    onSuccess: (_data, { bookingId }) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
    }
  });
}
export {
  useCreateBooking as a,
  useBooking as b,
  useUpdateBookingStatus as c,
  useUpdateDriverDetails as d,
  useAllBookings as e,
  useBookings as u
};
