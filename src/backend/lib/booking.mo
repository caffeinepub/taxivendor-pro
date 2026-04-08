import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Types "../types/booking";
import Common "../types/common";

module {
  /// Create a new booking for a vendor
  public func createBooking(
    bookings : Map.Map<Common.BookingId, Types.Booking>,
    nextId : Nat,
    vendorPrincipal : Principal,
    vendorName : Text,
    input : Types.BookingInput,
    now : Int,
  ) : Common.BookingId {
    let id = nextId;
    let booking : Types.Booking = {
      id;
      vendorPrincipal;
      vendorName;
      bookingType = input.bookingType;
      pickupCity = input.pickupCity;
      pickupState = input.pickupState;
      dropCity = input.dropCity;
      dropState = input.dropState;
      date = input.date;
      time = input.time;
      driverEarning = input.driverEarning;
      commission = input.commission;
      submitterName = input.submitterName;
      submitterWhatsApp = input.submitterWhatsApp;
      submitterMobile = input.submitterMobile;
      status = #new_;
      driverDetails = null;
      createdAt = now;
    };
    bookings.add(id, booking);
    id;
  };

  /// Get a single booking by id
  public func getBooking(
    bookings : Map.Map<Common.BookingId, Types.Booking>,
    id : Common.BookingId,
  ) : ?Types.Booking {
    bookings.get(id);
  };

  /// List all bookings for a specific vendor
  public func listByVendor(
    bookings : Map.Map<Common.BookingId, Types.Booking>,
    vendorPrincipal : Principal,
  ) : [Types.Booking] {
    bookings.values()
      .filter(func(b : Types.Booking) : Bool { b.vendorPrincipal == vendorPrincipal })
      .toArray();
  };

  /// List all bookings, optional vendor filter (admin)
  public func listAll(
    bookings : Map.Map<Common.BookingId, Types.Booking>,
    vendorFilter : ?Principal,
  ) : [Types.Booking] {
    switch (vendorFilter) {
      case null {
        bookings.values().toArray();
      };
      case (?p) {
        bookings.values()
          .filter(func(b : Types.Booking) : Bool { b.vendorPrincipal == p })
          .toArray();
      };
    };
  };

  /// Update booking status
  public func updateStatus(
    bookings : Map.Map<Common.BookingId, Types.Booking>,
    id : Common.BookingId,
    status : Types.BookingStatus,
  ) : () {
    switch (bookings.get(id)) {
      case null Runtime.trap("Booking not found");
      case (?b) {
        bookings.add(id, { b with status });
      };
    };
  };

  /// Set or update driver details for a booking — also auto-confirms the booking
  public func setDriverDetails(
    bookings : Map.Map<Common.BookingId, Types.Booking>,
    id : Common.BookingId,
    details : Types.DriverDetails,
  ) : () {
    switch (bookings.get(id)) {
      case null Runtime.trap("Booking not found");
      case (?b) {
        // Save driver details AND auto-confirm the booking in one update
        bookings.add(id, { b with driverDetails = ?details; status = #confirmed });
      };
    };
  };
};
