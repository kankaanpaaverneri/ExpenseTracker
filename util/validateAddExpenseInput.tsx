export function validateAddExpenseInput(
  textInput: string,
  selectedCategoryId: number,
): string {
  if (textInput.includes(",")) {
    const [integer, decimal] = textInput.split(",");
    if (!integer && !decimal) {
      return "Not valid expense";
    }

    if (decimal.length > 2) {
      return "Decimals should be rounded to two";
    }
  }

  if (textInput.length === 0) {
    return "Enter an expense";
  }

  if (selectedCategoryId === 0) {
    return "Select a category";
  }

  return "";
}
