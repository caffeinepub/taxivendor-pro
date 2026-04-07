import { e as useQuery, f as useQueryClient, g as useActor, E as ExternalBlob, h as createActor } from "./index-CxP7RHi8.js";
import { u as useMutation } from "./useMutation-BgRpJWW8.js";
const SEED_BOOKINGS = [
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
      rcNumber: "MH12AB1234"
    },
    createdAt: Date.now() - 864e5
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
    createdAt: Date.now() - 36e5
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
      rcNumber: "KA01MN5678"
    },
    createdAt: Date.now() - 1728e5
  }
];
let mockBookings = [...SEED_BOOKINGS];
function useBookings(vendorId) {
  return useQuery({
    queryKey: ["bookings", vendorId],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 400));
      if (vendorId) {
        return mockBookings.filter((b) => b.vendorId === vendorId);
      }
      return [...mockBookings];
    },
    enabled: true
  });
}
function useBooking(id) {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return mockBookings.find((b) => b.id === id);
    },
    enabled: !!id
  });
}
function useAllBookings() {
  return useQuery({
    queryKey: ["bookings", "all"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 400));
      return [...mockBookings];
    }
  });
}
function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      await new Promise((r) => setTimeout(r, 600));
      const booking = {
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
        createdAt: Date.now()
      };
      mockBookings.push(booking);
      return booking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    }
  });
}
function useUpdateBookingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status
    }) => {
      await new Promise((r) => setTimeout(r, 300));
      const idx = mockBookings.findIndex((b) => b.id === id);
      if (idx !== -1) {
        mockBookings[idx] = { ...mockBookings[idx], status };
      }
      return mockBookings[idx];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
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
      if (actor) {
        try {
          let rcBlob;
          if (rcBookFile) {
            const buffer = await rcBookFile.arrayBuffer();
            rcBlob = ExternalBlob.fromBytes(new Uint8Array(buffer));
          } else if (details.rcBookUrl) {
            rcBlob = ExternalBlob.fromURL(details.rcBookUrl);
          } else {
            rcBlob = ExternalBlob.fromBytes(new Uint8Array(0));
          }
          const numericId = BigInt(bookingId.replace(/\D/g, "") || "0");
          await actor.setDriverDetails(numericId, {
            driverName: details.driverName,
            mobile: details.mobile,
            carModel: details.car,
            rcBook: rcBlob
          });
        } catch (err) {
          console.warn("setDriverDetails backend call failed:", err);
        }
      }
      const idx = mockBookings.findIndex((b) => b.id === bookingId);
      if (idx !== -1) {
        mockBookings[idx] = { ...mockBookings[idx], driverDetails: details };
        return mockBookings[idx];
      }
      return { id: bookingId, driverDetails: details };
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
