import { Text, View, StyleSheet, Dimensions } from "react-native";
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
        <Text style={styles.bodyText}>{totalExpenses.toFixed(2)} €</Text>
      </View>
    </View>
  );
};

const deviceDimension = Dimensions.get("window");

const styles = StyleSheet.create({
  bodyText: {
    textAlign: "center",
    fontSize: 10,
    color: "white",
  },
  tableColumn: {
    backgroundColor: mainColor,
    flexDirection: "row",
    padding: deviceDimension.height > 800 ? 10 : 1,
    justifyContent: "center",
  },
  tableRow: {
    alignItems: "center",
    justifyContent: "center",
    margin: deviceDimension.height > 800 ? 10 : 1,
  },
});
