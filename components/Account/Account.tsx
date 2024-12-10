import { View, Text, Pressable, StyleSheet } from "react-native";
import { CreateAccount } from "./CreateAccount";
import { Login } from "./Login";
import { mainColor } from "../../util/colors";
import { useState } from "react";
import { CustomModal } from "../Custom/CustomModal";
import { useAppDispatch } from "../../hooks/hooks";
import { modalAction } from "../../slice/modalSlice";
import { ProfileScreenNavigationProp } from "../../App";
import { useNavigation } from "@react-navigation/native";

export const Account = () => {
  const [login, setLogin] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  function onPressCreateAnAccount() {
    setLogin((prev) => (prev ? false : true));
  }

  function openModal() {
    dispatch(modalAction(true));
  }

  function closeModal() {
    dispatch(modalAction(false));
    navigation.goBack();
  }

  return (
    <View>
      <CustomModal>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>
            {login ? "You are logged in" : "Account created"}
          </Text>
          <Pressable onPress={closeModal}>
            <Text style={styles.okButton}>Ok</Text>
          </Pressable>
        </View>
      </CustomModal>
      {login ? (
        <Login openModal={openModal} />
      ) : (
        <CreateAccount openModal={openModal} />
      )}
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
  modalContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeading: {
    margin: 20,
    fontSize: 25,
  },
  okButton: {
    fontSize: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: mainColor,
    color: "white",
    margin: 10,
    borderRadius: 5,
  },
});
