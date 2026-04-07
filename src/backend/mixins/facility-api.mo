import Map "mo:core/Map";
import Time "mo:core/Time";
import FacilityLib "../lib/facility";
import FacilityTypes "../types/facility";
import Common "../types/common";

mixin (
  facilities : Map.Map<Common.FacilityId, FacilityTypes.Facility>,
) {
  /// List all facilities (public)
  public query func listFacilities() : async [FacilityTypes.Facility] {
    FacilityLib.listFacilities(facilities);
  };

  /// Create a new facility — open to all callers (admin identity enforced frontend-only)
  public shared func createFacility(input : FacilityTypes.FacilityInput) : async Common.FacilityId {
    FacilityLib.createFacility(facilities, facilities.size(), input, Time.now());
  };

  /// Update an existing facility — open to all callers (admin identity enforced frontend-only)
  public shared func updateFacility(id : Common.FacilityId, input : FacilityTypes.FacilityInput) : async () {
    FacilityLib.updateFacility(facilities, id, input);
  };

  /// Delete a facility — open to all callers (admin identity enforced frontend-only)
  public shared func deleteFacility(id : Common.FacilityId) : async () {
    FacilityLib.deleteFacility(facilities, id);
  };
};
