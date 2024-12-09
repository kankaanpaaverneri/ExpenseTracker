import { View, Text, Pressable, StyleSheet } from "react-native";
import { CreateAccount } from "./CreateAccount";
import { Login } from "./Login";
import { mainColor } from "../../util/colors";
import { useState } from "react";

export const Account = () => {
  const [login, setLogin] = useState<boolean>(true);

  function onPressCreateAnAccount() {
    setLogin((prev) => (prev ? false : true));
  }

  return (
    <View>
      {login ? <Login /> : <CreateAccount />}
      <View style={styles.pressableContainer}>
        <Pressable onPress={onPressCreateAnAccount}>
          <Text style={styles.pressableText}>
            {login ? "Create an account" : "Go back"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pressableContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 50,
  },
  pressableText: {
    backgroundColor: "white",
    color: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});
