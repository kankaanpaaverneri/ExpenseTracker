import { View, Pressable, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfileScreenNavigationProp } from "../../App";
import { useAppDispatch } from "../../hooks/hooks";
import { updateData } from "../../slice/updateSlice";
import { mainColor } from "../../util/colors";

export const Navigation = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const dispatch = useAppDispatch();
  return (
    <View style={styles.navigationContainer}>
      <Pressable
        style={styles.navigationItem}
        onPress={() => navigation.navigate("Categories")}
      >
        <Text style={styles.navigationText}>Categories</Text>
      </Pressable>
      <Pressable
        style={styles.navigationItem}
        onPress={() => {
          navigation.navigate("Expenses");
        }}
      >
        <Text style={styles.navigationText}>Expenses</Text>
      </Pressable>
      <Pressable
        style={styles.navigationItem}
        onPress={() => navigation.navigate("Account")}
      >
        <Text style={styles.navigationText}>Account</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: "row",
  },
  navigationItem: {
    width: 100,
    marginLeft: 10,
    marginRight: 10,
  },
  navigationText: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    textAlign: "center",
  },
});
