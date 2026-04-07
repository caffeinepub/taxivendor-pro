import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Types "../types/facility";
import Common "../types/common";

module {
  /// Create a new facility
  public func createFacility(
    facilities : Map.Map<Common.FacilityId, Types.Facility>,
    nextId : Nat,
    input : Types.FacilityInput,
    now : Int,
  ) : Common.FacilityId {
    let id = nextId;
    let facility : Types.Facility = {
      id;
      name = input.name;
      description = input.description;
      active = input.active;
      createdAt = now;
    };
    facilities.add(id, facility);
    id;
  };

  /// Update an existing facility
  public func updateFacility(
    facilities : Map.Map<Common.FacilityId, Types.Facility>,
    id : Common.FacilityId,
    input : Types.FacilityInput,
  ) : () {
    switch (facilities.get(id)) {
      case null Runtime.trap("Facility not found");
      case (?f) {
        facilities.add(id, { f with name = input.name; description = input.description; active = input.active });
      };
    };
  };

  /// Delete a facility
  public func deleteFacility(
    facilities : Map.Map<Common.FacilityId, Types.Facility>,
    id : Common.FacilityId,
  ) : () {
    facilities.remove(id);
  };

  /// List all facilities
  public func listFacilities(
    facilities : Map.Map<Common.FacilityId, Types.Facility>,
  ) : [Types.Facility] {
    facilities.values().toArray();
  };
};
