import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Types "../types/vendor";

module {
  /// Register a new vendor (status = pending).
  /// Returns #ok("registered") on success, #err(reason) on failure.
  public func signup(
    vendors : Map.Map<Principal, Types.Vendor>,
    mobileIndex : Map.Map<Text, Principal>,
    caller : Principal,
    input : Types.VendorSignupInput,
    now : Int,
  ) : { #ok : Text; #err : Text } {
    if (mobileIndex.get(input.mobile) != null) {
      return #err("Mobile number already registered");
    };
    if (vendors.get(caller) != null) {
      return #err("Vendor already registered with this identity");
    };
    let vendor : Types.Vendor = {
      principal = caller;
      name = input.name;
      mobile = input.mobile;
      companyName = input.companyName;
      passwordHash = input.passwordHash;
      drivingLicence = input.drivingLicence;
      aadhaarCard = input.aadhaarCard;
      status = #pending;
      createdAt = now;
    };
    vendors.add(caller, vendor);
    mobileIndex.add(input.mobile, caller);
    #ok("registered");
  };

  /// Authenticate vendor: check mobile+password, return principal if approved
  public func login(
    vendors : Map.Map<Principal, Types.Vendor>,
    mobileIndex : Map.Map<Text, Principal>,
    mobile : Text,
    passwordHash : Text,
  ) : ?Principal {
    switch (mobileIndex.get(mobile)) {
      case null null;
      case (?principal) {
        switch (vendors.get(principal)) {
          case null null;
          case (?vendor) {
            if (vendor.passwordHash == passwordHash and vendor.status == #approved) {
              ?principal
            } else {
              null
            };
          };
        };
      };
    };
  };

  /// Get vendor info by principal
  public func getVendor(
    vendors : Map.Map<Principal, Types.Vendor>,
    principal : Principal,
  ) : ?Types.VendorInfo {
    switch (vendors.get(principal)) {
      case null null;
      case (?v) ?toInfo(v);
    };
  };

  /// List all vendor applications (admin)
  public func listAllVendors(
    vendors : Map.Map<Principal, Types.Vendor>,
  ) : [Types.VendorInfo] {
    vendors.values()
      .map(func(v : Types.Vendor) : Types.VendorInfo { toInfo(v) })
      .toArray();
  };

  /// Update vendor approval status (admin)
  public func setVendorStatus(
    vendors : Map.Map<Principal, Types.Vendor>,
    principal : Principal,
    status : Types.VendorStatus,
  ) : () {
    switch (vendors.get(principal)) {
      case null Runtime.trap("Vendor not found");
      case (?v) {
        vendors.add(principal, { v with status });
      };
    };
  };

  /// Check if vendor is approved
  public func isApproved(
    vendors : Map.Map<Principal, Types.Vendor>,
    principal : Principal,
  ) : Bool {
    switch (vendors.get(principal)) {
      case null false;
      case (?v) v.status == #approved;
    };
  };

  /// Convert internal Vendor to public VendorInfo
  public func toInfo(v : Types.Vendor) : Types.VendorInfo {
    {
      principal = v.principal;
      name = v.name;
      mobile = v.mobile;
      companyName = v.companyName;
      drivingLicence = v.drivingLicence;
      aadhaarCard = v.aadhaarCard;
      status = v.status;
      createdAt = v.createdAt;
    };
  };
};
