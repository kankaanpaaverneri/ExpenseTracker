import { passwordMaxLength, usernameMaxLength } from "./constants";

export function isAccountValid(
  username: string,
  password: string,
  confirmPassword: string,
): string {
  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  if (
    password.length === 0 ||
    confirmPassword.length === 0 ||
    username.length === 0
  ) {
    return "Missing field.";
  }

  if (username.length > usernameMaxLength) {
    return "Username is too long.";
  }

  if (
    password.length > passwordMaxLength ||
    confirmPassword.length > passwordMaxLength
  ) {
    return "Password is too long.";
  }

  return "";
}
