import { useEffect, useRef, useState } from "react";
import type { City } from "../types";

const CITIES: City[] = [
  { id: "c1", name: "Mumbai", state: "Maharashtra" },
  { id: "c2", name: "Pune", state: "Maharashtra" },
  { id: "c3", name: "Nagpur", state: "Maharashtra" },
  { id: "c4", name: "Nashik", state: "Maharashtra" },
  { id: "c5", name: "Aurangabad", state: "Maharashtra" },
  { id: "c6", name: "Delhi", state: "Delhi" },
  { id: "c7", name: "New Delhi", state: "Delhi" },
  { id: "c8", name: "Bangalore", state: "Karnataka" },
  { id: "c9", name: "Mysore", state: "Karnataka" },
  { id: "c10", name: "Hubli", state: "Karnataka" },
  { id: "c11", name: "Chennai", state: "Tamil Nadu" },
  { id: "c12", name: "Coimbatore", state: "Tamil Nadu" },
  { id: "c13", name: "Madurai", state: "Tamil Nadu" },
  { id: "c14", name: "Hyderabad", state: "Telangana" },
  { id: "c15", name: "Warangal", state: "Telangana" },
  { id: "c16", name: "Kolkata", state: "West Bengal" },
  { id: "c17", name: "Howrah", state: "West Bengal" },
  { id: "c18", name: "Ahmedabad", state: "Gujarat" },
  { id: "c19", name: "Surat", state: "Gujarat" },
  { id: "c20", name: "Vadodara", state: "Gujarat" },
  { id: "c21", name: "Rajkot", state: "Gujarat" },
  { id: "c22", name: "Jaipur", state: "Rajasthan" },
  { id: "c23", name: "Jodhpur", state: "Rajasthan" },
  { id: "c24", name: "Udaipur", state: "Rajasthan" },
  { id: "c25", name: "Kota", state: "Rajasthan" },
  { id: "c26", name: "Lucknow", state: "Uttar Pradesh" },
  { id: "c27", name: "Agra", state: "Uttar Pradesh" },
  { id: "c28", name: "Varanasi", state: "Uttar Pradesh" },
  { id: "c29", name: "Kanpur", state: "Uttar Pradesh" },
  { id: "c30", name: "Noida", state: "Uttar Pradesh" },
  { id: "c31", name: "Chandigarh", state: "Punjab" },
  { id: "c32", name: "Amritsar", state: "Punjab" },
  { id: "c33", name: "Ludhiana", state: "Punjab" },
  { id: "c34", name: "Bhopal", state: "Madhya Pradesh" },
  { id: "c35", name: "Indore", state: "Madhya Pradesh" },
  { id: "c36", name: "Gwalior", state: "Madhya Pradesh" },
  { id: "c37", name: "Patna", state: "Bihar" },
  { id: "c38", name: "Gaya", state: "Bihar" },
  { id: "c39", name: "Bhubaneswar", state: "Odisha" },
  { id: "c40", name: "Cuttack", state: "Odisha" },
  { id: "c41", name: "Guwahati", state: "Assam" },
  { id: "c42", name: "Kochi", state: "Kerala" },
  { id: "c43", name: "Thiruvananthapuram", state: "Kerala" },
  { id: "c44", name: "Kozhikode", state: "Kerala" },
  { id: "c45", name: "Dehradun", state: "Uttarakhand" },
  { id: "c46", name: "Haridwar", state: "Uttarakhand" },
  { id: "c47", name: "Shimla", state: "Himachal Pradesh" },
  { id: "c48", name: "Manali", state: "Himachal Pradesh" },
  { id: "c49", name: "Srinagar", state: "Jammu & Kashmir" },
  { id: "c50", name: "Jammu", state: "Jammu & Kashmir" },
  { id: "c51", name: "Raipur", state: "Chhattisgarh" },
  { id: "c52", name: "Ranchi", state: "Jharkhand" },
  { id: "c53", name: "Gurgaon", state: "Haryana" },
  { id: "c54", name: "Faridabad", state: "Haryana" },
];

export function useCitySearch(query: string) {
  const [results, setResults] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const q = query.toLowerCase();
      const filtered = CITIES.filter(
        (c) =>
          c.name.toLowerCase().startsWith(q) ||
          c.name.toLowerCase().includes(q),
      ).slice(0, 10);
      setResults(filtered);
      setIsLoading(false);
    }, 250);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query]);

  return { results, isLoading };
}
