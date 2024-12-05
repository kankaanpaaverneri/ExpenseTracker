import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UpdateSlice {
  update: boolean;
}

const initialState: UpdateSlice = {
  update: true,
};

export const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    updateData: (state, action: PayloadAction<boolean>) => {
      state.update = action.payload;
    },
  },
});

export const { updateData } = updateSlice.actions;
export default updateSlice.reducer;
