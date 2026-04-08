import Map "mo:core/Map";
import Principal "mo:core/Principal";
import CabTypes "../types/cab";

module {
  /// Add a cab for a vendor, skipping duplicates by rcNumber+vendorId pair
  public func addCab(
    cabs : Map.Map<CabTypes.CabId, CabTypes.Cab>,
    vendorId : Principal,
    driverName : Text,
    driverMobile : Text,
    carModel : Text,
    rcBook : Text,
    rcNumber : Text,
    now : Int,
  ) : () {
    // Duplicate check: same RC number for the same vendor (rcNumber is the unique vehicle identifier)
    let isDuplicate = cabs.values().any(func(c : CabTypes.Cab) : Bool {
      c.rcNumber == rcNumber and c.vendorId == vendorId
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
      rcNumber;
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
