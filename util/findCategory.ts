import { Category } from "./types";

export function findCategory(
  categories: Category[],
  selectedCategoryId: number,
): Category | undefined {
  const category: Category | undefined = categories.find(
    (category) => category.categoryId == selectedCategoryId,
  );
  return category;
}

export function isCategoryNameUsed(
  categoryName: string,
  categories: Category[],
): boolean {
  const result = categories.find(
    (category) => category.categoryName === categoryName,
  );
  return result ? true : false;
}
