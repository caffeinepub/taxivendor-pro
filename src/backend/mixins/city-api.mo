import List "mo:core/List";
import CityLib "../lib/city";
import CityTypes "../types/city";

mixin (
  cities : List.List<CityTypes.City>,
) {
  /// Search cities by prefix — min 3 chars, returns top 10 matches (city + state)
  public query func searchCities(prefix : Text) : async [CityTypes.City] {
    CityLib.searchCities(cities, prefix);
  };
};
