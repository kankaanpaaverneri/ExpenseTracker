import { View, Pressable, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfileScreenNavigationProp } from "../App";
import { useAppDispatch } from "../hooks/hooks";

export const Navigation = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const dispatch = useAppDispatch();
  return (
    <View style={styles.navigationContainer}>
      <Pressable
        style={styles.navigationItem}
        onPress={() => navigation.navigate("Categories")}
      >
        <Text>Add category</Text>
      </Pressable>
      <Pressable
        style={styles.navigationItem}
        onPress={() => navigation.navigate("Expenses")}
      >
        <Text>Expenses</Text>
      </Pressable>
      <Pressable
        style={styles.navigationItem}
        onPress={() => navigation.navigate("Account")}
      >
        <Text>Account</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    verticalAlign: "bottom",
    flexDirection: "row",
  },
  navigationItem: {
    margin: 20,
  },
});
