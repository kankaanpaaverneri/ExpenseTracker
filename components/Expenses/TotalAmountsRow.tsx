import { Text, View, StyleSheet } from "react-native";
import { useAppSelector } from "../../hooks/hooks";
import { Expense } from "../../util/types";

interface TotalAmountRowProps {
  expenses: Expense[];
}

export const TotalAmountsRow = ({ expenses }: TotalAmountRowProps) => {
  const totalExpenses = useAppSelector(
    (state) => state.expensesReducer.totalExpenses,
  );
  return (
    <View style={styles.tableColumn}>
      <View style={styles.tableRow}>
        <Text style={styles.bodyText}>Total</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.bodyText}>{totalExpenses} €</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyText: {
    textAlign: "center",
    fontSize: 10,
  },
  tableColumn: {
    backgroundColor: "lightgray",
    flexDirection: "row",
    margin: 10,
  },
  tableRow: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
  },
});
