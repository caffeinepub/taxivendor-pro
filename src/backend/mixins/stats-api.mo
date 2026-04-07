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
};
