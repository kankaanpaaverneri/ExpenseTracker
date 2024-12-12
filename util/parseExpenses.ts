import { Expense } from "./types";

export function parseExpenses(expenses: any[]): Expense[] {
  const parsedExpenses: Expense[] = expenses.map((expense) => {
    return {
      expenseId: expense?.expenseId,
      expenseAmount: expense?.expenseAmount,
      expenseType: expense?.expenseType,
    } as Expense;
  });
  return parsedExpenses;
}
