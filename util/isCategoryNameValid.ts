export function isCategoryNameValid(categoryName: string): boolean {
  if (categoryName == "") return false;

  if (categoryName.includes(" ")) return false;

  if (categoryName.length > 20) return false;

  return true;
}
