import { useCallback, useEffect, useState } from "react";
import { fetchPokemon } from "../api/pokemon";
import { Pokemon } from "../types/pokemon";

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPokemon = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const data = await fetchPokemon();
      setPokemon(data);
    } catch {
      setError("Could not connect to robs-pokemon-server");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadPokemon();
  }, [loadPokemon]);

  const refresh = useCallback(() => {
    loadPokemon(true);
  }, [loadPokemon]);

  return { pokemon, loading, refreshing, error, refresh };
};
