import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import CabLib "../lib/cab";
import CabTypes "../types/cab";

mixin (
  cabs : Map.Map<CabTypes.CabId, CabTypes.Cab>,
) {
  /// Add a cab for the calling vendor.
  /// Returns #ok or #err so frontend always gets a parseable response.
  public shared ({ caller }) func addCab(
    driverName : Text,
    driverMobile : Text,
    carModel : Text,
    rcBook : Text,
  ) : async { #ok : Text; #err : Text } {
    CabLib.addCab(cabs, caller, driverName, driverMobile, carModel, rcBook, Time.now());
    #ok("added");
  };

  /// Return cabs belonging to the calling vendor
  public query ({ caller }) func getVendorCabs() : async [CabTypes.Cab] {
    CabLib.getVendorCabs(cabs, caller);
  };

  /// Return all cabs with vendorId — admin view (access enforced frontend-only)
  public query func getAllCabs() : async [CabTypes.Cab] {
    CabLib.getAllCabs(cabs);
  };
};
