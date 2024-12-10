import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { mainColor, errorColor } from "../../util/colors";
import { isLoginValid } from "../../util/isLoginValid";
import { useState } from "react";
import { fetchPost } from "../../http/http";
import { loginUrl } from "../../http/url";
import { LoginData } from "../../util/types";
import { useAppDispatch } from "../../hooks/hooks";
import { setUser, UserState } from "../../slice/userSlice";
import { parseUser } from "../../util/parseUser";
import { validateUser } from "../../util/validateUser";

interface LoginProps {
  openModal: () => void;
}

export const Login = ({ openModal }: LoginProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const dispatch = useAppDispatch();
  async function onPressLogin() {
    const errorMessage = isLoginValid(username, password);
    if (errorMessage.length > 0) {
      setFeedback(errorMessage);
      return;
    }
    setFeedback("");

    const loginData: LoginData = {
      username: username,
      password: password,
    };
    try {
      const response = await fetchPost(loginUrl, loginData);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result);
      }
      const user: UserState = parseUser(result);
      if (!validateUser(user)) {
        return;
      }

      dispatch(setUser(user));
      openModal();
    } catch (error) {
      setFeedback(`Username or password is incorrect`);
      return;
    }
    setFeedback("");
  }

  return (
    <View style={styles.loginContainer}>
      <View>
        <Text style={styles.loginHeading}>Log in</Text>
      </View>
      <View style={styles.loginInputContainer}>
        <View style={styles.textInputItem}>
          <TextInput
            style={styles.textInput}
            placeholder="username"
            onChangeText={(e) => setUsername(e)}
            value={username}
          />
        </View>
        <View style={styles.textInputItem}>
          <TextInput
            style={styles.textInput}
            placeholder="password"
            secureTextEntry
            onChangeText={(e) => setPassword(e)}
            value={password}
          />
        </View>
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackText}>{feedback}</Text>
        </View>
        <View style={styles.loginButtonContainer}>
          <Pressable onPress={onPressLogin}>
            <Text style={styles.loginButtonPressable}>Log in</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginHeading: {
    fontSize: 25,
    margin: 20,
  },
  loginInputContainer: {
    padding: 10,
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
  loginButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonPressable: {
    backgroundColor: mainColor,
    color: "white",
    padding: 10,
    borderRadius: 5,
  },
  feedbackContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  feedbackText: {
    color: errorColor,
    textAlign: "center",
  },
});
