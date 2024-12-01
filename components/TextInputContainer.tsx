import { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

interface TextInputContainerProps {
  textInput: string;
  setTextInput: (e: string) => void;
}

const TextInputContainer = ({
  textInput,
  setTextInput,
}: TextInputContainerProps) => {
  const [maxInput, setMaxInput] = useState<number>(8);

  return (
    <View style={styles.textInputContainer}>
      <TextInput
        maxLength={maxInput}
        style={styles.textInput}
        onChangeText={(e) => setTextInput(e)}
        placeholder="10.00"
        value={textInput}
        keyboardType="decimal-pad"
      />
      <Text style={{ fontSize: 20 }}> €</Text>
    </View>
  );
};

export default TextInputContainer;

const styles = StyleSheet.create({
  textInputContainer: {
    flex: 3,
    alignItems: "center",
    flexDirection: "row",
    margin: 15,
  },
  textInput: {
    fontSize: 20,
    color: "black",
  },
});
