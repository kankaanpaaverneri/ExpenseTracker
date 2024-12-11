import { config } from "../config";

const rootUrl = config.API_URL;
export const getCategoriesUrl = `${rootUrl}/get-categories`;
export const addNewCategoryUrl = `${rootUrl}/add-new-category`;
export const removeCategoryUrl = `${rootUrl}/remove-category/`;
export const addExpenseUrl = `${rootUrl}/add-expense`;
export const getExpensesUrl = `${rootUrl}/get-expenses`;
export const removeExpenseUrl = `${rootUrl}/remove-expense/`;
export const addNewUserUrl = `${rootUrl}/add-new-user`;
export const loginUrl = `${rootUrl}/login`;
export const getCurrentUserUrl = `${rootUrl}/get-current-user`;
export const getUsersUrl = `${rootUrl}/get-users`;
