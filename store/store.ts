import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../slice/categoriesSlice";
import modalReducer from "../slice/modalSlice";

export const store = configureStore({
  reducer: {
    categoriesReducer,
    modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;