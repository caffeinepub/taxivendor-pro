import Storage "mo:caffeineai-object-storage/Storage";

module {
  /// Approval status for vendor onboarding
  public type VendorStatus = {
    #pending;
    #approved;
    #rejected;
  };

  /// Vendor profile stored in the canister
  public type Vendor = {
    principal : Principal;
    name : Text;
    mobile : Text;
    companyName : Text;
    /// hashed password (SHA-256 hex or similar — hashing done on frontend)
    passwordHash : Text;
    drivingLicence : Storage.ExternalBlob;
    aadhaarCard : Storage.ExternalBlob;
    status : VendorStatus;
    createdAt : Int;
  };

  /// Public-facing vendor record (no password hash)
  public type VendorInfo = {
    principal : Principal;
    name : Text;
    mobile : Text;
    companyName : Text;
    drivingLicence : Storage.ExternalBlob;
    aadhaarCard : Storage.ExternalBlob;
    status : VendorStatus;
    createdAt : Int;
  };

  /// Input for vendor signup
  public type VendorSignupInput = {
    name : Text;
    mobile : Text;
    companyName : Text;
    passwordHash : Text;
    drivingLicence : Storage.ExternalBlob;
    aadhaarCard : Storage.ExternalBlob;
  };
};
