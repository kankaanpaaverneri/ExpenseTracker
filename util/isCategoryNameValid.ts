import { categoryNameMaxLength } from "./constants";
import { isCategoryNameUsed } from "./findCategory";
import { Category } from "./types";

export function validateCategoryName(
  categoryName: string,
  categories: Category[],
): string {
  if (categoryName === "") {
    return "Select a category.";
  }

  if (categoryName.includes(" ")) {
    return "Category name can't include spaces.";
  }

  if (categoryName.length > categoryNameMaxLength) {
    return "Category name is too long.";
  }

  if (isCategoryNameUsed(categoryName, categories)) {
    return "Category name is used";
  }

  return "";
}

export function isCategoryNameValid(categoryName: string): boolean {
  if (categoryName == "") return false;

  if (categoryName.includes(" ")) return false;

  if (categoryName.length > 20) return false;

  return true;
}
