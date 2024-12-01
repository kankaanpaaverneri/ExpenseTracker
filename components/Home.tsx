import { useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AddExpense from "./AddExpense";
import { parseExpense } from "../util/parseExpense";
import { Expense, Category } from "../util/types";
import { CustomModal } from "./CustomModal";
import { findCategory } from "../util/findCategory";
import { useNavigation } from "@react-navigation/native";
import { ProfileScreenNavigationProp } from "../App";

export const Home = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [categories, setCategories] = useState<Category[]>([
    {
      categoryName: "No category",
      categoryId: 0,
    },
    {
      categoryName: "Groceries",
      categoryId: 1,
    },
    {
      categoryName: "Impulse Buy",
      categoryId: 2,
    },
  ]);
  const [expense, setExpense] = useState<Expense>({
    expenseAmount: 0,
    expenseType: categories[0],
  });
  const [feedback, setFeedback] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  function onPressAddExpense(
    textInput: string,
    selectedCategoryId: number,
  ): void {
    // Parse textInput
    const parsedExpense: number = parseExpense(textInput);

    //Find category from categories list
    const category = findCategory(categories, selectedCategoryId);
    if (!category) return;

    // If input is not a number
    if (Number.isNaN(parsedExpense) || !parsedExpense) {
      setFeedback("Not a number");
      return;
    }
    //Set states
    setFeedback("");
    setExpense(() => {
      return {
        expenseAmount: parsedExpense,
        expenseType: category,
      };
    });
    setShowModal(true);
    //Send to backend
  }

  function closeModal(): void {
    setShowModal(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <CustomModal
          showModal={showModal}
          expense={expense}
          closeModal={closeModal}
        />
        <Text style={styles.titleText}>Expense Tracker</Text>
        <AddExpense
          feedback={feedback}
          onPressAddExpense={onPressAddExpense}
          categories={categories}
        />
        <View style={styles.navigationContainer}>
          <Pressable
            style={styles.navigationItem}
            onPress={() => navigation.navigate("Categories")}
          >
            <Text>Add category</Text>
          </Pressable>
          <Pressable
            style={styles.navigationItem}
            onPress={() => navigation.navigate("Expenses")}
          >
            <Text>Expenses</Text>
          </Pressable>
          <Pressable
            style={styles.navigationItem}
            onPress={() => navigation.navigate("Account")}
          >
            <Text>Expenses</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 25,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  navigationContainer: {
    flexDirection: "row",
  },
  navigationItem: {
    margin: 20,
  },
});