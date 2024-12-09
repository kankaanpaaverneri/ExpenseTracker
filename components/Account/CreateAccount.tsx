import { TextInput, View, Text, StyleSheet, Pressable } from "react-native";
import { errorColor, mainColor } from "../../util/colors";
import { useState } from "react";
import { isAccountValid } from "../../util/isAccountValid";
import { fetchPost } from "../../http/http";
import { addNewUserUrl } from "../../http/url";
import { User } from "../../util/types";

export const CreateAccount = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

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

    const response = await fetchPost(addNewUserUrl, user);
    console.log("response: ", response);
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <View style={styles.createAccountContainer}>
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
});
