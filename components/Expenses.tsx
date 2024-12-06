import { View, Text, FlatList, StyleSheet } from "react-native";
import { useAppSelector } from "../hooks/hooks";
import { Table } from "./Table";

export const Expenses = () => {
  const expenses = useAppSelector((state) => state.expensesReducer.expenses);
  return (
    <View style={styles.expensesContainer}>
      <Text style={styles.title}>Expenses</Text>
      {expenses.length === 0 && (
        <View>
          <Text>No expenses available</Text>
        </View>
      )}
      <Table expenses={expenses} />
      <View>
        <Text>Filter</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  expensesContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 50,
  },
  title: {
    fontSize: 25,
    margin: 10,
  },
  expenseList: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 500,
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
});
