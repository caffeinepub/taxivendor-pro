import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import BookingLib "../lib/booking";
import NotifLib "../lib/notification";
import VendorLib "../lib/vendor";
import BookingTypes "../types/booking";
import NotifTypes "../types/notification";
import VendorTypes "../types/vendor";
import Common "../types/common";

mixin (
  vendors : Map.Map<Principal, VendorTypes.Vendor>,
  bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
  notifications : List.List<NotifTypes.Notification>,
) {
  /// Create a booking as the calling vendor; also logs a notification
  public shared ({ caller }) func createBooking(input : BookingTypes.BookingInput) : async Common.BookingId {
    if (not VendorLib.isApproved(vendors, caller)) {
      Runtime.trap("Unauthorized: Only approved vendors can create bookings");
    };
    let now = Time.now();
    let id = BookingLib.createBooking(bookings, bookings.size(), caller, input, now);
    NotifLib.addNotification(notifications, notifications.size(), id, caller, now);
    id;
  };

  /// Admin creates a booking on behalf of any vendor (admin identity enforced frontend-only)
  public shared ({ caller }) func adminCreateBooking(vendorPrincipal : Principal, input : BookingTypes.BookingInput) : async Common.BookingId {
    let now = Time.now();
    let id = BookingLib.createBooking(bookings, bookings.size(), vendorPrincipal, input, now);
    NotifLib.addNotification(notifications, notifications.size(), id, vendorPrincipal, now);
    id;
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
  public shared func setDriverDetails(id : Common.BookingId, details : BookingTypes.DriverDetails) : async () {
    switch (BookingLib.getBooking(bookings, id)) {
      case null Runtime.trap("Booking not found");
      case (?_b) {
        BookingLib.setDriverDetails(bookings, id, details);
      };
    };
  };

  /// Get the last 20 notifications across all vendors (for all vendor clients to poll)
  public query func getLatestNotifications() : async [NotifTypes.Notification] {
    NotifLib.getLatestNotifications(notifications);
  };

  /// Get notifications for a specific vendor principal (bookings they created)
  public query func getVendorNotifications(vendorId : Principal) : async [NotifTypes.Notification] {
    NotifLib.getVendorNotifications(notifications, vendorId);
  };
};
