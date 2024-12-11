import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Expense, ExpenseFilters, UserFilters } from "../util/types";

interface Expenses {
  expenses: Expense[];
  expenseFilters: ExpenseFilters;
}

const initialState: Expenses = {
  expenses: [],
  expenseFilters: {
    categoryFilters: [],
    dateFilters: {
      from: "",
      to: "",
    },
    userFilters: [],
  },
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    updateExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload.map((expense) => expense);
    },
    updateExpenseFilters: (state, action: PayloadAction<ExpenseFilters>) => {
      state.expenseFilters = action.payload;
    },
  },
});

export const { updateExpenses, updateExpenseFilters } = expenseSlice.actions;
export default expenseSlice.reducer;
