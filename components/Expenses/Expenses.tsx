import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { useAppSelector } from "../../hooks/hooks";
import { Table } from "./Table";
import { FilterExpenses } from "./FilterExpenses";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export const Expenses = () => {
  const expenses = useAppSelector((state) => state.expensesReducer.expenses);
  return (
    <SafeAreaProvider>
      <SafeAreaView>
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  expensesContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    margin: 10,
  },
  expenseList: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
    maxHeight: 300,
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
