import { Image, StyleSheet, Text, View } from "react-native";
import { Pokemon } from "../types/pokemon";

type PokemonCardProps = {
  pokemon: Pokemon;
  cardWidth: number;
};

export default function PokemonCard({ pokemon, cardWidth }: PokemonCardProps) {
  const spriteSize = Math.min(cardWidth * 0.65, 260);

  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <Text style={styles.dexNumber}>#{pokemon.dexNumber}</Text>

      <View style={[styles.spriteFrame, { width: spriteSize, height: spriteSize }]}>
        <Image
          source={{ uri: pokemon.image }}
          style={styles.sprite}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.name} numberOfLines={1} adjustsFontSizeToFit>
        {pokemon.name}
      </Text>

      <View style={styles.typeBadges}>
        {pokemon.types.map((type) => (
          <View
            key={type.name}
            style={[styles.badge, { backgroundColor: type.color }]}
          >
            <Text style={styles.badgeText}>{type.name}</Text>
          </View>
        ))}
      </View>

      {/* STUDENT TODO: Add a details section below the type badges.
          Display:
          - pokemon.classification
          - pokemon.height (metric + imperial)
          - pokemon.weight (metric + imperial)

          Hint: See robs-pokemon-app/src/components/PokemonCard.tsx for reference.
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    overflow: "hidden",
  },
  dexNumber: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 12,
  },
  spriteFrame: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  sprite: {
    width: "100%",
    height: "100%",
  },
  name: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: 0.5,
    textAlign: "center",
    marginBottom: 16,
  },
  typeBadges: {
    flexDirection: "row",
    gap: 10,
  },
  badge: {
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 20,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  // STUDENT TODO: Add styles for the classification/height/weight details section
  // Suggested style names: detailsCard, detailLabel, detailValue, detailSubvalue, statsRow, statBlock
});
