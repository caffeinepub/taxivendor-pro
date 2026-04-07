import { cn } from "@/lib/utils";
import { ChevronDown, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCitySearch } from "../hooks/useCitySearch";
import type { City } from "../types";

interface CityAutocompleteProps {
  label: string;
  value: string;
  state: string;
  onChange: (city: string, state: string) => void;
  placeholder?: string;
  id?: string;
  "data-ocid"?: string;
}

export default function CityAutocomplete({
  label,
  value,
  state,
  onChange,
  placeholder = "Type city name...",
  id,
  "data-ocid": dataOcid,
}: CityAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { results, isLoading } = useCitySearch(query);

  // Sync if value changes externally
  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (city: City) => {
    setQuery(city.name);
    onChange(city.name, city.state);
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div ref={containerRef} className="relative">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          id={id}
          type="text"
          className="form-input pl-9 pr-8"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.length >= 3 && setOpen(true)}
          autoComplete="off"
          data-ocid={dataOcid}
        />
        <ChevronDown
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none transition-transform",
            open && "rotate-180",
          )}
        />
      </div>

      {state && (
        <p className="text-xs text-muted-foreground mt-1 pl-1">{state}</p>
      )}

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-elevated overflow-hidden max-h-56 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-3 text-sm text-muted-foreground">
              Searching...
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-muted-foreground">
              No cities found
            </div>
          ) : (
            results.map((city) => (
              <button
                key={city.id}
                type="button"
                className="w-full flex flex-col items-start px-4 py-2.5 hover:bg-muted/50 transition-colors text-left"
                onClick={() => handleSelect(city)}
              >
                <span className="text-sm font-semibold text-foreground">
                  {city.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {city.state}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
