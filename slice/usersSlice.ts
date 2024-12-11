import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./userSlice";

interface Users {
  users: UserState[];
}

const initialState: Users = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUsers: (state, action: PayloadAction<Users>) => {
      state.users = action.payload.users.map((user) => user);
    },
  },
});

export const { updateUsers } = usersSlice.actions;
export default usersSlice.reducer;
