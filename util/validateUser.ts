import { UserState } from "../slice/userSlice";

export function validateUser(user: UserState): boolean {
  if (!user.userId || !user.username) {
    return false;
  }

  if (user.username.length === 0) {
    return false;
  }
  return true;
}
