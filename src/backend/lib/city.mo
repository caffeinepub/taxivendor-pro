import List "mo:core/List";
import Types "../types/city";

module {
  /// Seed the initial Indian cities list
  public func seedCities(cities : List.List<Types.City>) : () {
    let data : [Types.City] = [
      { city = "Mumbai"; state = "Maharashtra" },
      { city = "Delhi"; state = "Delhi" },
      { city = "Bengaluru"; state = "Karnataka" },
      { city = "Hyderabad"; state = "Telangana" },
      { city = "Ahmedabad"; state = "Gujarat" },
      { city = "Chennai"; state = "Tamil Nadu" },
      { city = "Kolkata"; state = "West Bengal" },
      { city = "Surat"; state = "Gujarat" },
      { city = "Pune"; state = "Maharashtra" },
      { city = "Jaipur"; state = "Rajasthan" },
      { city = "Lucknow"; state = "Uttar Pradesh" },
      { city = "Kanpur"; state = "Uttar Pradesh" },
      { city = "Nagpur"; state = "Maharashtra" },
      { city = "Indore"; state = "Madhya Pradesh" },
      { city = "Thane"; state = "Maharashtra" },
      { city = "Bhopal"; state = "Madhya Pradesh" },
      { city = "Visakhapatnam"; state = "Andhra Pradesh" },
      { city = "Pimpri-Chinchwad"; state = "Maharashtra" },
      { city = "Patna"; state = "Bihar" },
      { city = "Vadodara"; state = "Gujarat" },
      { city = "Ghaziabad"; state = "Uttar Pradesh" },
      { city = "Ludhiana"; state = "Punjab" },
      { city = "Agra"; state = "Uttar Pradesh" },
      { city = "Nashik"; state = "Maharashtra" },
      { city = "Faridabad"; state = "Haryana" },
      { city = "Meerut"; state = "Uttar Pradesh" },
      { city = "Rajkot"; state = "Gujarat" },
      { city = "Varanasi"; state = "Uttar Pradesh" },
      { city = "Srinagar"; state = "Jammu & Kashmir" },
      { city = "Aurangabad"; state = "Maharashtra" },
      { city = "Dhanbad"; state = "Jharkhand" },
      { city = "Amritsar"; state = "Punjab" },
      { city = "Navi Mumbai"; state = "Maharashtra" },
      { city = "Allahabad"; state = "Uttar Pradesh" },
      { city = "Howrah"; state = "West Bengal" },
      { city = "Ranchi"; state = "Jharkhand" },
      { city = "Coimbatore"; state = "Tamil Nadu" },
      { city = "Jabalpur"; state = "Madhya Pradesh" },
      { city = "Gwalior"; state = "Madhya Pradesh" },
      { city = "Vijayawada"; state = "Andhra Pradesh" },
      { city = "Jodhpur"; state = "Rajasthan" },
      { city = "Madurai"; state = "Tamil Nadu" },
      { city = "Raipur"; state = "Chhattisgarh" },
      { city = "Kota"; state = "Rajasthan" },
      { city = "Chandigarh"; state = "Chandigarh" },
      { city = "Guwahati"; state = "Assam" },
      { city = "Solapur"; state = "Maharashtra" },
      { city = "Hubli"; state = "Karnataka" },
      { city = "Mysuru"; state = "Karnataka" },
      { city = "Tiruchirappalli"; state = "Tamil Nadu" },
      { city = "Bareilly"; state = "Uttar Pradesh" },
      { city = "Aligarh"; state = "Uttar Pradesh" },
      { city = "Moradabad"; state = "Uttar Pradesh" },
      { city = "Jalandhar"; state = "Punjab" },
      { city = "Noida"; state = "Uttar Pradesh" },
      { city = "Gurugram"; state = "Haryana" },
    ];
    for (c in data.values()) {
      cities.add(c);
    };
  };

  /// Search cities by prefix (min 3 chars), return top 10 matches
  public func searchCities(
    cities : List.List<Types.City>,
    prefix : Text,
  ) : [Types.City] {
    if (prefix.size() < 3) return [];
    let lowerPrefix = prefix.toLower();
    cities.values()
      .filter(func(c : Types.City) : Bool {
        c.city.toLower().startsWith(#text lowerPrefix)
      })
      .take(10)
      .toArray();
  };
};
