import { TextInput, View, Text, StyleSheet, Pressable } from "react-native";
import { errorColor, mainColor } from "../../util/colors";
import { useState } from "react";
import { isAccountValid } from "../../util/isAccountValid";
import { fetchPost } from "../../http/http";
import { addNewUserUrl } from "../../http/url";
import { User } from "../../util/types";
import { useAppDispatch } from "../../hooks/hooks";
import { modalAction } from "../../slice/modalSlice";
import { CustomModal } from "../Custom/CustomModal";
import { useNavigation } from "@react-navigation/native";
import { ProfileScreenNavigationProp } from "../../App";

export const CreateAccount = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  async function onPressCreate() {
    const errorMessage = isAccountValid(username, password, confirmPassword);
    if (errorMessage.length > 0) {
      setFeedback(errorMessage);
      return;
    }
    setFeedback("");

    const user: User = {
      userId: 1,
      username: username,
      password: password,
    };

    try {
      const response = await fetchPost(addNewUserUrl, user);
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result);
      }
    } catch (error) {
      setFeedback("Something went wrong");
      return;
    }
    setFeedback("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    openModal();
  }

  function openModal() {
    dispatch(modalAction(true));
  }

  function closeModal() {
    dispatch(modalAction(false));
    navigation.goBack();
  }

  return (
    <View style={styles.createAccountContainer}>
      <CustomModal>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>Account created</Text>
          <Pressable onPress={closeModal}>
            <Text style={styles.okButton}>Ok</Text>
          </Pressable>
        </View>
      </CustomModal>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Create an account</Text>
      </View>
      <View style={styles.textInputContainer}>
        <View style={styles.textInputItem}>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            onChangeText={(e) => setUsername(e)}
            value={username}
          />
        </View>
        <View style={styles.textInputItem}>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(e) => setPassword(e)}
            value={password}
          />
        </View>
        <View style={styles.textInputItem}>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder="Confirm password"
            onChangeText={(e) => setConfirmPassword(e)}
            value={confirmPassword}
          />
        </View>
      </View>
      <View style={styles.feedbackContainer}>
        {feedback.length > 0 && (
          <Text style={styles.feedbackText}>{feedback}</Text>
        )}
      </View>
      <View style={styles.pressableContainer}>
        <Pressable onPress={onPressCreate}>
          <Text style={styles.pressableText}>Create</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  createAccountContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headingContainer: {
    margin: 20,
  },
  heading: {
    fontSize: 25,
  },
  textInputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textInputItem: {
    margin: 10,
  },
  textInput: {
    padding: 10,
    width: 200,
    borderWidth: 1,
    borderRadius: 5,
  },

  pressableContainer: {
    margin: 10,
  },
  pressableText: {
    backgroundColor: mainColor,
    color: "white",
    padding: 10,
    borderRadius: 5,
  },
  feedbackContainer: {
    flexDirection: "column",
  },
  feedbackText: {
    color: errorColor,
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
