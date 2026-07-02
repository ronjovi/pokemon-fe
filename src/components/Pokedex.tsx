import { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { usePokemon } from "../hooks/usePokemon";
import { Pokemon } from "../types/pokemon";
import PokemonCard from "./PokemonCard";
import PokemonControls from "./PokemonControls";

export default function Pokedex() {
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<Pokemon>>(null);
  const [index, setIndex] = useState(0);
  const [contentWidth, setContentWidth] = useState(width);

  const { pokemon, loading, refreshing, error, refresh } = usePokemon();

  const canGoBack = index > 0;
  const canGoForward = index < pokemon.length - 1;
  const controlsDisabled = loading || !!error || pokemon.length === 0;

  const handleScreenLayout = (event: LayoutChangeEvent) => {
    setContentWidth(event.nativeEvent.layout.width);
  };

  const goToIndex = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= pokemon.length) {
      return;
    }
    setIndex(nextIndex);
    listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (contentWidth === 0) {
      return;
    }
    const nextIndex = Math.round(
      event.nativeEvent.contentOffset.x / contentWidth
    );
    setIndex(nextIndex);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.listArea} onLayout={handleScreenLayout}>
          {loading ? (
            <View style={styles.stateContainer}>
              <ActivityIndicator size="large" color="#FFFFFF" />
              <Text style={styles.stateText}>Searching database...</Text>
            </View>
          ) : error ? (
            <View style={styles.stateContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <Text style={styles.hintText}>
                Start robs-pokemon-server with npm run dev
              </Text>
            </View>
          ) : (
            <FlatList
              ref={listRef}
              data={pokemon}
              keyExtractor={(item) => item.name}
              horizontal
              pagingEnabled
              bounces
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleScrollEnd}
              getItemLayout={(_, itemIndex) => ({
                length: contentWidth,
                offset: contentWidth * itemIndex,
                index: itemIndex,
              })}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={refresh}
                  tintColor="#4CAF50"
                />
              }
              renderItem={({ item }) => (
                <PokemonCard pokemon={item} cardWidth={contentWidth} />
              )}
            />
          )}
        </View>

        <PokemonControls
          index={index}
          total={pokemon.length}
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          disabled={controlsDisabled}
          onPrevious={() => goToIndex(index - 1)}
          onNext={() => goToIndex(index + 1)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0D1117",
  },
  container: {
    flex: 1,
    paddingBottom: 16,
  },
  listArea: {
    flex: 1,
  },
  stateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 12,
  },
  stateText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  errorText: {
    color: "#FF5722",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  hintText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
});
