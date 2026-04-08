import Map "mo:core/Map";
import Principal "mo:core/Principal";
import VendorTypes "../types/vendor";
import BookingTypes "../types/booking";
import Common "../types/common";

module {
  public type DashboardStats = {
    totalVendors : Nat;
    approvedVendors : Nat;
    pendingVendors : Nat;
    totalBookings : Nat;
    newBookings : Nat;
    confirmedBookings : Nat;
    completedBookings : Nat;
    cancelledBookings : Nat;
  };

  public type VendorBookingStats = {
    totalBookings : Nat;
    newBookings : Nat;
    confirmedBookings : Nat;
    completedBookings : Nat;
    cancelledBookings : Nat;
  };

  /// Compute admin dashboard statistics
  public func getDashboardStats(
    vendors : Map.Map<Principal, VendorTypes.Vendor>,
    bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
  ) : DashboardStats {
    var totalVendors = 0;
    var approvedVendors = 0;
    var pendingVendors = 0;

    for ((_, v) in vendors.entries()) {
      totalVendors += 1;
      switch (v.status) {
        case (#approved) approvedVendors += 1;
        case (#pending) pendingVendors += 1;
        case (#rejected) {};
      };
    };

    var totalBookings = 0;
    var newBookings = 0;
    var confirmedBookings = 0;
    var completedBookings = 0;
    var cancelledBookings = 0;

    for ((_, b) in bookings.entries()) {
      totalBookings += 1;
      switch (b.status) {
        case (#new_) newBookings += 1;
        case (#confirmed) confirmedBookings += 1;
        case (#completed) completedBookings += 1;
        case (#cancelled) cancelledBookings += 1;
      };
    };

    {
      totalVendors;
      approvedVendors;
      pendingVendors;
      totalBookings;
      newBookings;
      confirmedBookings;
      completedBookings;
      cancelledBookings;
    };
  };

  /// Compute booking stats for a specific vendor
  public func getVendorBookingStats(
    bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
    vendorPrincipal : Principal,
  ) : VendorBookingStats {
    var totalBookings = 0;
    var newBookings = 0;
    var confirmedBookings = 0;
    var completedBookings = 0;
    var cancelledBookings = 0;

    for ((_, b) in bookings.entries()) {
      if (b.vendorPrincipal == vendorPrincipal) {
        totalBookings += 1;
        switch (b.status) {
          case (#new_) newBookings += 1;
          case (#confirmed) confirmedBookings += 1;
          case (#completed) completedBookings += 1;
          case (#cancelled) cancelledBookings += 1;
        };
      };
    };

    {
      totalBookings;
      newBookings;
      confirmedBookings;
      completedBookings;
      cancelledBookings;
    };
  };
};
