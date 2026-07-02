import { API_BASE_URL } from "../constants/api";
import { Pokemon, PokemonResponse } from "../types/pokemon";

const DEX_NUMBERS: Record<string, string> = {
  Bulbasaur: "001",
  Charmander: "004",
  Squirtle: "007",
};

export const fetchPokemon = async (): Promise<Pokemon[]> => {
  const response = await fetch(`${API_BASE_URL}/api/pokemon`);

  if (!response.ok) {
    throw new Error("Failed to load Pokemon data");
  }

  const data = (await response.json()) as PokemonResponse;

  return data.pokemon.map((pokemon) => ({
    ...pokemon,
    dexNumber: DEX_NUMBERS[pokemon.name] ?? "???",
  }));
};
