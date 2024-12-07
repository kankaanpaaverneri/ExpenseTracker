import { ParsedDate } from "./getDate";

export type Category = {
  categoryName: string;
  categoryId: number;
};

export interface Expense {
  expenseId: number;
  expenseAmount: number;
  expenseType: Category;
  date: ParsedDate;
}

export interface CategoryFilters {
  categoryName: string;
  categoryId: number;
  selected: boolean;
}

export interface DateFilters {
  from: string;
  to: string;
}

export enum DateFilterType {
  FROM,
  TO,
}

export interface ExpenseFilters {
  categoryFilters: CategoryFilters[];
  dateFilters: DateFilters;
}
