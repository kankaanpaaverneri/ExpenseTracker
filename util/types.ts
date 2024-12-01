export type Category = {
  categoryName: string;
  categoryId: number;
};

export interface Expense {
  expenseAmount: number;
  expenseType: Category;
}
