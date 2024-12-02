import { useState } from "react";
import { Pressable, View, Text, TextInput, StyleSheet } from "react-native";
import TextInputContainer from "./TextInputContainer";
import { AddExpenseCategory } from "./AddExpenseCategory";
import { Category } from "../util/types";
import { mainColor } from "../util/colors";

interface AddExpenseProps {
  onPressAddExpense: (textInput: string, selectedCategoryId: number) => void;
  feedback: string;
  categories: Category[];
}

const AddExpense = ({
  onPressAddExpense,
  feedback,
  categories,
}: AddExpenseProps) => {
  const [textInput, setTextInput] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  function onSelectCategory(categoryId: number): void {
    setSelectedCategory(categoryId);
  }

  return (
    <View style={styles.addExpenseContainer}>
      <View style={styles.inputContainer}>
        <TextInputContainer textInput={textInput} setTextInput={setTextInput} />
        <AddExpenseCategory
          categories={categories}
          onSelectCategory={onSelectCategory}
          selectedCategory={selectedCategory}
        />
      </View>
      <View style={styles.pressableContainer}>
        <Pressable
          onPress={() => onPressAddExpense(textInput, selectedCategory)}
          style={styles.pressable}
        >
          <Text style={styles.pressableText}>Add Expense</Text>
        </Pressable>
        <View>
          <Text style={styles.feedbackText}>{feedback}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addExpenseContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 50,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pressableContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  pressable: {
    backgroundColor: mainColor,
    margin: 50,
    borderRadius: 15,
    padding: 10,
  },
  pressableText: {
    color: "white",
  },
  feedbackText: {
    color: "red",
  },
});

export default AddExpense;
