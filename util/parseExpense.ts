export function parseExpense(expense: string): number {
  if (expense.includes(",")) {
    return Number(expense.replace(",", "."));
  }
  return Number(expense);
}
