import { Pressable, StyleSheet, Text, View } from "react-native";

type PokemonControlsProps = {
  index: number;
  total: number;
  canGoBack: boolean;
  canGoForward: boolean;
  disabled: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export default function PokemonControls({
  index,
  total,
  canGoBack,
  canGoForward,
  disabled,
  onPrevious,
  onNext,
}: PokemonControlsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.dots}>
        {Array.from({ length: total }).map((_, dotIndex) => (
          <View
            key={dotIndex}
            style={[styles.dot, dotIndex === index && styles.dotActive]}
          />
        ))}
      </View>

      <View style={styles.buttons}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            !canGoBack && styles.buttonDisabled,
            pressed && canGoBack && !disabled && styles.buttonPressed,
          ]}
          onPress={onPrevious}
          disabled={!canGoBack || disabled}
          hitSlop={8}
        >
          <Text style={styles.buttonText}>← Prev</Text>
        </Pressable>

        <View style={styles.counter}>
          <Text style={styles.counterText}>
            {total > 0 ? `${index + 1} / ${total}` : "--"}
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            !canGoForward && styles.buttonDisabled,
            pressed && canGoForward && !disabled && styles.buttonPressed,
          ]}
          onPress={onNext}
          disabled={!canGoForward || disabled}
          hitSlop={8}
        >
          <Text style={styles.buttonText}>Next →</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingTop: 4,
    paddingHorizontal: 24,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  dotActive: {
    width: 24,
    backgroundColor: "#FFFFFF",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 10,
  },
  button: {
    flex: 1,
    minHeight: 48,
    backgroundColor: "#1C2128",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  buttonPressed: {
    backgroundColor: "#2D333B",
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  counter: {
    minWidth: 72,
    minHeight: 48,
    backgroundColor: "#1C2128",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  counterText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    fontWeight: "700",
  },
});
