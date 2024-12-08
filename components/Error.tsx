import { View, Text, StyleSheet, Pressable } from "react-native";
import { mainColor } from "../util/colors";

interface ErrorProps {
  error: string;
  onPressTryAgain: () => void;
}

export const Error = ({ error, onPressTryAgain }: ErrorProps) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{error}</Text>
      <Pressable onPress={onPressTryAgain}>
        <Text style={styles.pressable}>Try again</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    alignItems: "center",
    margin: 10,
  },
  errorText: {
    fontSize: 15,
    textAlign: "center",
    margin: 10,
  },
  pressable: {
    backgroundColor: mainColor,
    color: "white",
    padding: 10,
  },
});
