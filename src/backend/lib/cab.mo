import Map "mo:core/Map";
import Principal "mo:core/Principal";
import CabTypes "../types/cab";

module {
  /// Add a cab for a vendor, skipping duplicates by rcBook+vendorId pair
  public func addCab(
    cabs : Map.Map<CabTypes.CabId, CabTypes.Cab>,
    vendorId : Principal,
    driverName : Text,
    driverMobile : Text,
    carModel : Text,
    rcBook : Text,
    now : Int,
  ) : () {
    // Duplicate check: same rcBook for the same vendor
    let isDuplicate = cabs.values().any(func(c : CabTypes.Cab) : Bool {
      c.rcBook == rcBook and c.vendorId == vendorId
    });
    if (isDuplicate) return;
    let id = cabs.size();
    let cab : CabTypes.Cab = {
      id;
      vendorId;
      driverName;
      driverMobile;
      carModel;
      rcBook;
      createdAt = now;
    };
    cabs.add(id, cab);
  };

  /// Return all cabs belonging to a specific vendor
  public func getVendorCabs(
    cabs : Map.Map<CabTypes.CabId, CabTypes.Cab>,
    vendorId : Principal,
  ) : [CabTypes.Cab] {
    cabs.values()
      .filter(func(c : CabTypes.Cab) : Bool { c.vendorId == vendorId })
      .toArray();
  };

  /// Return all cabs (admin view — includes vendorId on each record)
  public func getAllCabs(
    cabs : Map.Map<CabTypes.CabId, CabTypes.Cab>,
  ) : [CabTypes.Cab] {
    cabs.values().toArray();
  };
};
