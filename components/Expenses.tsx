import { View, Text, StyleSheet } from "react-native";
import { useAppSelector } from "../hooks/hooks";
import { Table } from "./Table";
import { FilterExpenses } from "./FilterExpenses";

export const Expenses = () => {
  const expenses = useAppSelector((state) => state.expensesReducer.expenses);
  return (
    <View style={styles.expensesContainer}>
      <Text style={styles.title}>Expenses</Text>
      <View>
        <FilterExpenses />
      </View>
      {expenses.length === 0 && (
        <View>
          <Text style={styles.text}>No expenses available</Text>
        </View>
      )}
      {expenses.length > 0 && <Table expenses={expenses} />}
    </View>
  );
};

const styles = StyleSheet.create({
  expensesContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
  },
  title: {
    fontSize: 25,
    margin: 10,
  },
  expenseList: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  expenseAmount: {
    margin: 10,
    padding: 10,
  },
  expenseCategory: {
    margin: 10,
    padding: 10,
  },
  expenseDate: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    padding: 10,
    margin: 10,
  },
});
