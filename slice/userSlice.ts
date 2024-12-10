import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  userId: number;
  username: string;
}

const initialState: UserState = {
  userId: 0,
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    },
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
