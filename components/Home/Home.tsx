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
import { parseExpense } from "../../util/parseExpense";
import { Expense } from "../../util/types";
import { CustomModal } from "../Custom/CustomModal";
import { findCategory } from "../../util/findCategory";
import { fetchGet, fetchPost } from "../../http/http";
import {
  getExpensesUrl,
  addExpenseUrl,
  getCategoriesUrl,
  getCurrentUserUrl,
  getUsersUrl,
} from "../../http/url";
import { mainColor } from "../../util/colors";
import { ErrorComponent } from "./ErrorComponent";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { updateCategories } from "../../slice/categoriesSlice";
import { modalAction } from "../../slice/modalSlice";
import { CustomPressable } from "../Custom/CustomPressable";
import { Navigation } from "./Navigation";
import { updateData } from "../../slice/updateSlice";
import { updateExpenses } from "../../slice/expensesSlice";
import { getDate } from "../../util/getDate";
import { validateAddExpenseInput } from "../../util/validateAddExpenseInput";
import { setUser } from "../../slice/userSlice";
import { updateUsers } from "../../slice/usersSlice";

export const Home = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories,
  );
  const update = useAppSelector((state) => state.updateReducer.update);
  const expenseFilters = useAppSelector(
    (state) => state.expensesReducer.expenseFilters,
  );
  const currentUser = useAppSelector((state) => state.userReducer);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function getCategories() {
    setLoading(true);
    try {
      const response = await fetchGet(getCategoriesUrl);
      if (!response.ok) {
        setLoading(false);
        throw new Error();
      }
      const { categories } = await response.json();
      dispatch(updateCategories(categories));
      setLoading(false);
    } catch (error) {
      setError("Error fetching categories");
    }
  }

  async function getExpenses() {
    try {
      const response = await fetchGet(getExpensesUrl, expenseFilters);
      if (!response.ok) {
        throw new Error();
      }
      const { expenses } = await response.json();
      dispatch(updateExpenses(expenses));
    } catch (error) {
      setError("Error fetching expenses");
    }
  }

  async function getCurrentUser() {
    try {
      const response = await fetchGet(getCurrentUserUrl);
      if (!response.ok) {
        throw new Error();
      }
      const { userId, username } = await response.json();
      if (userId && username) {
        dispatch(setUser({ userId: userId, username: username }));
      }
    } catch (error) {
      setError("Something went wrong getting current user");
    }
  }

  async function getUsers() {
    try {
      const response = await fetchGet(getUsersUrl, expenseFilters);
      if (!response.ok) {
        throw new Error();
      }
      const result = await response.json();
      dispatch(updateUsers(result));
    } catch (error) {
      setError("Error getting all users");
    }
  }

  useEffect(() => {
    if (update) {
      getCategories();
      getExpenses();
      getCurrentUser();
      getUsers();
      dispatch(updateData(false));
    }
  }, [update]);

  async function onPressTryAgain() {
    setError("");
    dispatch(updateData(true));
  }

  const [expense, setExpense] = useState<Expense>({
    expenseId: 0,
    expenseAmount: 0,
    expenseType: {
      categoryName: "",
      categoryId: 0,
    },
    userId: currentUser.userId,
    username: currentUser.username,
    date: getDate(),
  });
  const [feedback, setFeedback] = useState<string>("");

  function onPressAddExpense(textInput: string, selectedCategoryId: number) {
    const errorMessage = validateAddExpenseInput(textInput, selectedCategoryId);
    if (errorMessage.length > 0) {
      setFeedback(errorMessage);
      return;
    }

    if (!currentUser.userId) {
      setFeedback("No user logged in");
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
    setFeedback("");
    setExpense(() => {
      return {
        expenseId: 0,
        expenseAmount: parsedExpense,
        expenseType: category,
        userId: currentUser.userId,
        username: currentUser.username,
        date: getDate(),
      };
    });
    dispatch(modalAction(true));
  }

  async function closeModal() {
    // Send expense to backend
    await fetchPost(addExpenseUrl, expense);

    // Clear expense
    setExpense(() => {
      return {
        expenseId: 0,
        expenseAmount: 0,
        expenseType: {
          categoryName: "",
          categoryId: 0,
        },
        userId: 0,
        username: "",
        date: getDate(),
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
          <CustomPressable onPress={closeModal}>
            <Text style={styles.okButton}>Ok</Text>
          </CustomPressable>
        </CustomModal>
        <View style={styles.userContainer}>
          <Text style={styles.userText}>
            Current user{" "}
            <Text style={{ fontWeight: "bold" }}>{currentUser.username}</Text>
          </Text>
        </View>
        <Text style={styles.title}>Expense Tracker</Text>
        {loading && (
          <ActivityIndicator
            style={styles.activityIndicator}
            size={"large"}
            color={mainColor}
          />
        )}
        {categories.length > 0 && (
          <AddExpense
            feedback={feedback}
            onPressAddExpense={onPressAddExpense}
          />
        )}
        {error && (
          <ErrorComponent error={error} onPressTryAgain={onPressTryAgain} />
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
  okButton: {
    fontSize: 20,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#465aa6",
    color: "white",
    borderRadius: 10,
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
  },

  userContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  userText: {
    fontSize: 15,
  },
});
