import Common "common";

module {
  /// Admin-managed extra facility
  public type Facility = {
    id : Common.FacilityId;
    name : Text;
    description : Text;
    active : Bool;
    createdAt : Int;
  };

  public type FacilityInput = {
    name : Text;
    description : Text;
    active : Bool;
  };
};
