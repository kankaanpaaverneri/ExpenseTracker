import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import { Expense } from "../../util/types";
import { mainColor } from "../../util/colors";
import { fetchDelete } from "../../http/http";
import { removeExpenseUrl } from "../../http/url";
import { useAppDispatch } from "../../hooks/hooks";
import { updateData } from "../../slice/updateSlice";
import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";
import { TotalAmountsRow } from "./TotalAmountsRow";
interface TableProps {
  expenses: Expense[];
}

export const Table = ({ expenses }: TableProps) => {
  const dispatch = useAppDispatch();
  async function deleteExpense(expenseId: number) {
    await fetchDelete(`${removeExpenseUrl}${expenseId}`);
    dispatch(updateData(true));
  }
  return (
    <View style={styles.tableContainer}>
      <TableHead />
      <TableBody expenses={expenses} deleteExpense={deleteExpense} />
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "column",
    margin: 20,
  },
});
