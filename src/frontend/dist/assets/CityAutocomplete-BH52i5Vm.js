import { d as createLucideIcon, r as reactExports, j as jsxRuntimeExports, i as cn } from "./index-CxP7RHi8.js";
import { M as MapPin } from "./map-pin-BNPsUAqv.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode);
const CITIES = [
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
  { id: "c54", name: "Faridabad", state: "Haryana" }
];
function useCitySearch(query) {
  const [results, setResults] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const q = query.toLowerCase();
      const filtered = CITIES.filter(
        (c) => c.name.toLowerCase().startsWith(q) || c.name.toLowerCase().includes(q)
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
function CityAutocomplete({
  label,
  value,
  state,
  onChange,
  placeholder = "Type city name...",
  id,
  "data-ocid": dataOcid
}) {
  const [query, setQuery] = reactExports.useState(value);
  const [open, setOpen] = reactExports.useState(false);
  const containerRef = reactExports.useRef(null);
  const { results, isLoading } = useCitySearch(query);
  reactExports.useEffect(() => {
    setQuery(value);
  }, [value]);
  reactExports.useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleSelect = (city) => {
    setQuery(city.name);
    onChange(city.name, city.state);
    setOpen(false);
  };
  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val !== value) {
      onChange(val, "");
    }
    if (val.length >= 3) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: containerRef, className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: id, children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id,
          type: "text",
          className: "form-input pl-9 pr-8",
          placeholder,
          value: query,
          onChange: handleInputChange,
          onFocus: () => query.length >= 3 && setOpen(true),
          autoComplete: "off",
          "data-ocid": dataOcid
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ChevronDown,
        {
          className: cn(
            "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none transition-transform",
            open && "rotate-180"
          )
        }
      )
    ] }),
    state && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 pl-1", children: state }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute z-50 top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-elevated overflow-hidden max-h-56 overflow-y-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 text-sm text-muted-foreground", children: "Searching..." }) : results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 text-sm text-muted-foreground", children: "No cities found" }) : results.map((city) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "w-full flex flex-col items-start px-4 py-2.5 hover:bg-muted/50 transition-colors text-left",
        onClick: () => handleSelect(city),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: city.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: city.state })
        ]
      },
      city.id
    )) })
  ] });
}
export {
  CityAutocomplete as C
};
