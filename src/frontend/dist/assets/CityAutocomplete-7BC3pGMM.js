import { f as createLucideIcon, h as useActor, r as reactExports, n as createActor, j as jsxRuntimeExports, g as cn } from "./index-nIM7Hndz.js";
import { M as MapPin } from "./map-pin-BKreItuw.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode);
function useCitySearch(query) {
  const { actor } = useActor(createActor);
  const [results, setResults] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const timerRef = reactExports.useRef(null);
  const abortRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      setIsLoading(false);
      return;
    }
    abortRef.current = false;
    setIsLoading(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      if (!actor) {
        setIsLoading(false);
        return;
      }
      try {
        const backendCities = await actor.searchCities(query);
        if (!abortRef.current) {
          const mapped = backendCities.map((c, i) => ({
            id: `${c.city}-${c.state}-${i}`,
            name: c.city,
            state: c.state
          }));
          setResults(mapped.slice(0, 12));
        }
      } catch {
        if (!abortRef.current) setResults([]);
      } finally {
        if (!abortRef.current) setIsLoading(false);
      }
    }, 300);
    return () => {
      abortRef.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, actor]);
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
    setOpen(val.length >= 3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: containerRef, className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: id, children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none z-10 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id,
          type: "text",
          className: "form-input pl-9 pr-8 w-full",
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
    state && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary mt-1 pl-1 font-medium", children: state }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute z-[9999] top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-elevated overflow-hidden",
        style: { maxHeight: "240px", overflowY: "auto" },
        children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 text-sm text-muted-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin flex-shrink-0" }),
          "Dhundh raha hai..."
        ] }) : results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 text-sm text-muted-foreground", children: "Koi city nahi mili" }) : results.map((city) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted/50 transition-colors text-left border-b border-border/30 last:border-0",
            onClick: () => handleSelect(city),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground leading-tight truncate", children: city.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: city.state })
              ] })
            ]
          },
          city.id
        ))
      }
    )
  ] });
}
export {
  CityAutocomplete as C
};
