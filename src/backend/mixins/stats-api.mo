import Map "mo:core/Map";
import Principal "mo:core/Principal";
import StatsLib "../lib/stats";
import VendorTypes "../types/vendor";
import BookingTypes "../types/booking";
import Common "../types/common";

mixin (
  vendors : Map.Map<Principal, VendorTypes.Vendor>,
  bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
) {
  /// Get admin dashboard statistics — open to all callers (admin identity enforced frontend-only)
  public query func getDashboardStats() : async StatsLib.DashboardStats {
    StatsLib.getDashboardStats(vendors, bookings);
  };

  /// Get booking stats for the calling vendor (total + per-status counts)
  public query ({ caller }) func getMyBookingStats() : async StatsLib.VendorBookingStats {
    StatsLib.getVendorBookingStats(bookings, caller);
  };

  /// Get booking stats for a specific vendor principal (admin use)
  public query func getVendorBookingStats(vendorPrincipal : Principal) : async StatsLib.VendorBookingStats {
    StatsLib.getVendorBookingStats(bookings, vendorPrincipal);
  };
};
