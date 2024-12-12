import { Text, View, StyleSheet } from "react-native";
import { useAppSelector } from "../../hooks/hooks";
import { mainColor } from "../../util/colors";

export const TotalAmountsRow = () => {
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
    color: "white",
  },
  tableColumn: {
    backgroundColor: mainColor,
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
  },
  tableRow: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
});
