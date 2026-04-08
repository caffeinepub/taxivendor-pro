import { useActor } from "@caffeineai/core-infrastructure";
import { useEffect, useRef, useState } from "react";
import { createActor } from "../backend";
import type { City } from "../types";

export function useCitySearch(query: string) {
  const { actor } = useActor(createActor);
  const [results, setResults] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef(false);

  useEffect(() => {
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
          const mapped: City[] = backendCities.map((c, i) => ({
            id: `${c.city}-${c.state}-${i}`,
            name: c.city,
            state: c.state,
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
