import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../slice/categoriesSlice";
import modalReducer from "../slice/modalSlice";
import updateReducer from "../slice/updateSlice";
import expensesReducer from "../slice/expensesSlice";
import userReducer from "../slice/userSlice";

export const store = configureStore({
  reducer: {
    categoriesReducer,
    modalReducer,
    updateReducer,
    expensesReducer,
    userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
