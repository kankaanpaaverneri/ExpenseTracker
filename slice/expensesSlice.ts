import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Expense, ExpenseFilters } from "../util/types";

interface Expenses {
  expenses: Expense[];
  totalExpenses: number;
  expenseFilters: ExpenseFilters;
}

const initialState: Expenses = {
  expenses: [],
  totalExpenses: 0,
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
    updateTotal: (state, action: PayloadAction<number>) => {
      state.totalExpenses = action.payload;
    },
  },
});

export const { updateExpenses, updateExpenseFilters, updateTotal } =
  expenseSlice.actions;
export default expenseSlice.reducer;
