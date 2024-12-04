import { View, Pressable, Text, StyleSheet } from "react-native";

interface CustomPressableProps {
  onPress: () => void;
}

export const CustomPressable = ({ onPress }: CustomPressableProps) => {
  return (
    <View>
      <Pressable onPress={onPress}>
        <Text style={styles.pressableText}>Ok</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pressableText: {
    fontSize: 20,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#465aa6",
    color: "white",
    borderRadius: 10,
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 100,
  },
});
