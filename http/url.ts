import { config } from "../config";

const rootUrl = config.API_URL;
export const getCategoriesUrl = `${rootUrl}/get-categories/`;
export const addNewCategoryUrl = `${rootUrl}/add-new-category/`;
export const removeCategoryUrl = `${rootUrl}/remove-category`;
