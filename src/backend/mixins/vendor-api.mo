import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import VendorLib "../lib/vendor";
import VendorTypes "../types/vendor";

mixin (
  vendors : Map.Map<Principal, VendorTypes.Vendor>,
  mobileIndex : Map.Map<Text, Principal>,
) {
  /// Register a new vendor account (open to anyone)
  public shared ({ caller }) func vendorSignup(input : VendorTypes.VendorSignupInput) : async () {
    VendorLib.signup(vendors, mobileIndex, caller, input, Time.now());
  };

  /// Verify credentials and return principal if approved (used pre-Internet Identity)
  public query func vendorLogin(mobile : Text, passwordHash : Text) : async ?Principal {
    VendorLib.login(vendors, mobileIndex, mobile, passwordHash);
  };

  /// Get caller's own vendor profile
  public query ({ caller }) func getMyVendorProfile() : async ?VendorTypes.VendorInfo {
    VendorLib.getVendor(vendors, caller);
  };

  /// Get any vendor profile by principal (open — frontend enforces admin-only access)
  public query func getVendorProfile(principal : Principal) : async ?VendorTypes.VendorInfo {
    VendorLib.getVendor(vendors, principal);
  };

  /// List all vendor applications — open to all callers (admin panel shown frontend-only to admin)
  public query func listAllVendors() : async [VendorTypes.VendorInfo] {
    VendorLib.listAllVendors(vendors);
  };

  /// Approve or reject a vendor — open to all callers (admin identity enforced frontend-only)
  public shared func setVendorStatus(principal : Principal, status : VendorTypes.VendorStatus) : async () {
    VendorLib.setVendorStatus(vendors, principal, status);
  };
};
