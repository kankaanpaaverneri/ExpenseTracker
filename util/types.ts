import { ParsedDate } from "./getDate";

export type Category = {
  categoryName: string;
  categoryId: number;
};

export interface Expense {
  expenseId: number;
  expenseAmount: number;
  expenseType: Category;
  userId: number;
  username: string;
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

export interface UserFilters {
  userId: number;
  username: string;
  selected: boolean;
}

export enum DateFilterType {
  FROM,
  TO,
}

export interface ExpenseFilters {
  categoryFilters: CategoryFilters[];
  dateFilters: DateFilters;
  userFilters: UserFilters[];
}

export interface User {
  userId: number;
  username: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export enum FilterNavigationItemId {
  None,
  Category,
  Date,
  User,
}

export interface FilterNavigationItem {
  id: FilterNavigationItemId;
  name: string;
}
