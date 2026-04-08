import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import BookingLib "../lib/booking";
import CabLib "../lib/cab";
import NotifLib "../lib/notification";
import VendorLib "../lib/vendor";
import BookingTypes "../types/booking";
import CabTypes "../types/cab";
import NotifTypes "../types/notification";
import VendorTypes "../types/vendor";
import Common "../types/common";

mixin (
  vendors : Map.Map<Principal, VendorTypes.Vendor>,
  bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
  notifications : List.List<NotifTypes.Notification>,
  cabs : Map.Map<CabTypes.CabId, CabTypes.Cab>,
  nextBookingId : { var value : Nat },
) {
  /// Create a booking as the calling vendor; also logs a notification
  public shared ({ caller }) func createBooking(input : BookingTypes.BookingInput) : async Common.BookingId {
    if (not VendorLib.isApproved(vendors, caller)) {
      Runtime.trap("Unauthorized: Only approved vendors can create bookings");
    };
    // Resolve vendor display name for feed
    let vendorName = switch (VendorLib.getVendor(vendors, caller)) {
      case (?info) info.companyName;
      case null caller.toText();
    };
    let now = Time.now();
    let id = nextBookingId.value;
    nextBookingId.value += 1;
    let createdId = BookingLib.createBooking(bookings, id, caller, vendorName, input, now);
    NotifLib.addNotification(notifications, notifications.size(), createdId, caller, now);
    createdId;
  };

  /// Admin creates a booking — no vendor approval check, labelled "Admin" in all feeds
  public shared func adminCreateBooking(input : BookingTypes.BookingInput) : async Common.BookingId {
    let now = Time.now();
    // Use anonymous principal as a stable marker for admin bookings
    let adminPrincipal = Principal.anonymous();
    let id = nextBookingId.value;
    nextBookingId.value += 1;
    let createdId = BookingLib.createBooking(bookings, id, adminPrincipal, "Admin", input, now);
    NotifLib.addNotification(notifications, notifications.size(), createdId, adminPrincipal, now);
    createdId;
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

  /// Set driver details for a booking — auto-confirms booking and auto-adds cab to vendor's cab list.
  /// Returns #ok or #err so the frontend always receives a parseable response.
  public shared func setDriverDetails(id : Common.BookingId, details : BookingTypes.DriverDetails) : async { #ok : Text; #err : Text } {
    switch (BookingLib.getBooking(bookings, id)) {
      case null { #err("Booking not found") };
      case (?b) {
        // Save driver details and auto-confirm booking in one step
        BookingLib.setDriverDetails(bookings, id, details);
        // Auto-add cab for this booking's vendor (duplicate-safe by rcBook+vendorId)
        CabLib.addCab(
          cabs,
          b.vendorPrincipal,
          details.driverName,
          details.mobile,
          details.carModel,
          debug_show(details.rcBook),
          Time.now(),
        );
        #ok("confirmed");
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
