import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Expense } from "../util/types";

interface Expenses {
  expenses: Expense[];
}

const initialState: Expenses = {
  expenses: [],
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    updateExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload.map((expense) => expense);
    },
  },
});

export const { updateExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;
