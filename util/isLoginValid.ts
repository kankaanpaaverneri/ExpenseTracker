import { passwordMaxLength, usernameMaxLength } from "./constants";

export function isLoginValid(username: string, password: string): string {
  if (username.length > usernameMaxLength) {
    return "Username is too long.";
  }

  if (password.length > passwordMaxLength) {
    return "Password is too long.";
  }

  if (username.length === 0) {
    return "Username field is empty.";
  }

  if (password.length === 0) {
    return "Password field is empty.";
  }

  return "";
}
