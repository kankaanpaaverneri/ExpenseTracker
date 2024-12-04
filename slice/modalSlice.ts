import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface ModalState {
  showModal: boolean;
}

const initialState: ModalState = {
  showModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalAction: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
  },
});

export const { modalAction } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modalReducer;
export default modalSlice.reducer;
