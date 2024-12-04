import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { Category } from "../util/types";

export interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    updateCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload.map((category) => category);
    },
  },
});

export const { updateCategories } = categoriesSlice.actions;
export const selectCategory = (state: RootState) => state.categoriesReducer;
export default categoriesSlice.reducer;
