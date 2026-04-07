import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import BookingLib "../lib/booking";
import VendorLib "../lib/vendor";
import BookingTypes "../types/booking";
import VendorTypes "../types/vendor";
import Common "../types/common";

mixin (
  vendors : Map.Map<Principal, VendorTypes.Vendor>,
  bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
) {
  /// Create a booking as the calling vendor
  public shared ({ caller }) func createBooking(input : BookingTypes.BookingInput) : async Common.BookingId {
    if (not VendorLib.isApproved(vendors, caller)) {
      Runtime.trap("Unauthorized: Only approved vendors can create bookings");
    };
    BookingLib.createBooking(bookings, bookings.size(), caller, input, Time.now());
  };

  /// Admin creates a booking on behalf of any vendor (admin identity enforced frontend-only)
  public shared func adminCreateBooking(vendorPrincipal : Principal, input : BookingTypes.BookingInput) : async Common.BookingId {
    BookingLib.createBooking(bookings, bookings.size(), vendorPrincipal, input, Time.now());
  };

  /// Get a single booking by id
  public query func getBooking(id : Common.BookingId) : async ?BookingTypes.Booking {
    BookingLib.getBooking(bookings, id);
  };

  /// List bookings for the calling vendor
  public query ({ caller }) func listMyBookings() : async [BookingTypes.Booking] {
    BookingLib.listByVendor(bookings, caller);
  };

  /// List all bookings, optional vendor filter — open to all callers (admin panel shown frontend-only)
  public query func listAllBookings(vendorFilter : ?Principal) : async [BookingTypes.Booking] {
    BookingLib.listAll(bookings, vendorFilter);
  };

  /// Update booking status — open to all callers (admin identity enforced frontend-only)
  public shared func updateBookingStatus(id : Common.BookingId, status : BookingTypes.BookingStatus) : async () {
    BookingLib.updateStatus(bookings, id, status);
  };

  /// Set driver details for a booking
  public shared ({ caller }) func setDriverDetails(id : Common.BookingId, details : BookingTypes.DriverDetails) : async () {
    switch (BookingLib.getBooking(bookings, id)) {
      case null Runtime.trap("Booking not found");
      case (?b) {
        BookingLib.setDriverDetails(bookings, id, details);
      };
    };
  };
};
