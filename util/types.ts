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
