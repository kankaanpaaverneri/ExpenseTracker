import { useState, useEffect } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
} from "react-native";
import AddExpense from "./AddExpense";
import { parseExpense } from "../util/parseExpense";
import { Expense, Category } from "../util/types";
import { CustomModal } from "./CustomModal";
import { findCategory } from "../util/findCategory";
import { useNavigation } from "@react-navigation/native";
import { ProfileScreenNavigationProp } from "../App";
import { fetchGet } from "../http/http";
import { getCategoriesUrl } from "../http/url";
import { mainColor } from "../util/colors";
import { Error } from "./Error";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { updateCategories } from "../slice/categoriesSlice";
import { modalAction } from "../slice/modalSlice";
import { CustomPressable } from "./CustomPressable";

export const Home = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories,
  );
  const showModal = useAppSelector((state) => state.modalReducer.showModal);
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

  useEffect(() => {
    if (!showModal) getCategories();
  }, [showModal]);

  async function onPressTryAgain() {
    setError("");
    await getCategories();
  }

  const [expense, setExpense] = useState<Expense>({
    expenseAmount: 0,
    expenseType: {
      categoryName: "",
      categoryId: 0,
    },
  });
  const [feedback, setFeedback] = useState<string>("");

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
    dispatch(modalAction(true));
    //Send to backend
  }

  function closeModal() {
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
            categories={categories}
          />
        )}
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
            <Text>Account</Text>
          </Pressable>
        </View>
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
  navigationContainer: {
    verticalAlign: "bottom",
    flexDirection: "row",
  },
  navigationItem: {
    margin: 20,
  },
  activityIndicator: {
    margin: 10,
  },
});
