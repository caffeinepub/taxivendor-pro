import Common "common";

module {
  public type CabId = Nat;

  /// A cab record linked to the vendor who added it
  public type Cab = {
    id : CabId;
    vendorId : Principal;
    driverName : Text;
    driverMobile : Text;
    carModel : Text;
    rcBook : Text;
    rcNumber : Text;
    createdAt : Int;
  };
};
