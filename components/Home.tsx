import { useState, useEffect } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
} from "react-native";
import AddExpense from "./AddExpense";
import { parseExpense } from "../util/parseExpense";
import { Expense } from "../util/types";
import { CustomModal } from "./CustomModal";
import { findCategory } from "../util/findCategory";
import { fetchGet, fetchPost } from "../http/http";
import { addExpenseUrl, getCategoriesUrl } from "../http/url";
import { mainColor } from "../util/colors";
import { Error } from "./Error";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { updateCategories } from "../slice/categoriesSlice";
import { modalAction } from "../slice/modalSlice";
import { CustomPressable } from "./CustomPressable";
import { Navigation } from "./Navigation";
import { updateData } from "../slice/updateSlice";
import { getExpensesUrl } from "../http/url";
import { updateExpenses } from "../slice/expensesSlice";

export const Home = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories,
  );
  const update = useAppSelector((state) => state.updateReducer.update);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function getCategories() {
    setLoading(true);
    try {
      const { categories } = await fetchGet(getCategoriesUrl);
      if (!categories) {
        setError("Error fetching data from server.");
        setLoading(false);
        return;
      }
      dispatch(updateCategories(categories));
      setLoading(false);
    } catch (error) {
      setError("Error fetching data from server");
    }
  }

  async function getExpenses() {
    const { expenses } = await fetchGet(getExpensesUrl);
    if (!expenses) {
      return;
    }

    const expensesArray: Expense[] = expenses.map((expense: any) => {
      return {
        expenseAmount: expense?.expenseAmount,
        expenseType: {
          categoryName: expense?.categoryName,
          categoryId: expense?.categoryId,
        },
      };
    });

    dispatch(updateExpenses(expensesArray));
  }

  useEffect(() => {
    if (update) {
      getCategories();
      getExpenses();
      dispatch(updateData(false));
    }
  }, [update]);

  async function onPressTryAgain() {
    setError("");
    dispatch(updateData(true));
  }

  const [expense, setExpense] = useState<Expense>({
    expenseAmount: 0,
    expenseType: {
      categoryName: "",
      categoryId: 0,
    },
  });
  const [feedback, setFeedback] = useState<string>("");

  function onPressAddExpense(textInput: string, selectedCategoryId: number) {
    if (textInput.length === 0) {
      setFeedback("Enter an expense");
      return;
    }

    if (selectedCategoryId === 0) {
      setFeedback("Select a category");
      return;
    }

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
    dispatch(modalAction(true));
  }

  async function closeModal() {
    await fetchPost(addExpenseUrl, expense);
    setExpense(() => {
      return {
        expenseAmount: 0,
        expenseType: {
          categoryName: "",
          categoryId: 0,
        },
      };
    });
    dispatch(updateData(true));
    dispatch(modalAction(false));
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <CustomModal>
          <Text style={styles.text}>
            {expense.expenseAmount.toFixed(2)}€ spent on
          </Text>
          <Text style={styles.text}>{expense.expenseType.categoryName}</Text>
          <CustomPressable onPress={closeModal} />
        </CustomModal>
        <Text style={styles.title}>Expense Tracker</Text>
        {loading && (
          <ActivityIndicator
            style={styles.activityIndicator}
            size={"large"}
            color={mainColor}
          />
        )}
        {error && <Error error={error} onPressTryAgain={onPressTryAgain} />}
        {categories.length > 0 && (
          <AddExpense
            feedback={feedback}
            onPressAddExpense={onPressAddExpense}
          />
        )}
        <Navigation />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
  },
  text: {
    fontSize: 25,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  activityIndicator: {
    margin: 10,
  },
});
