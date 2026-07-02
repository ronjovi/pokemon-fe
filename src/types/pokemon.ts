export interface PokemonType {
  name: string;
  color: string;
}

// STUDENT TODO: Create a PokemonMeasurement interface here.
// It should have two string fields: `metric` and `imperial`.

export interface Pokemon {
  name: string;
  image: string;
  dexNumber: string;
  types: PokemonType[];
  // STUDENT TODO: Add `classification: string`
  // STUDENT TODO: Add `height: PokemonMeasurement`
  // STUDENT TODO: Add `weight: PokemonMeasurement`
}

export interface PokemonResponse {
  pokemon: Array<{
    name: string;
    image: string;
    types: PokemonType[];
    // STUDENT TODO: Add `classification`, `height`, and `weight` to match the server response
  }>;
}
