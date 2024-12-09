import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import { Expense } from "../../util/types";
import { mainColor } from "../../util/colors";
import { fetchDelete } from "../../http/http";
import { removeExpenseUrl } from "../../http/url";
import { useAppDispatch } from "../../hooks/hooks";
import { updateData } from "../../slice/updateSlice";
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
      <View style={styles.tableHead}>
        <View style={styles.tableColumn}>
          <View style={styles.tableRow}>
            <Text style={styles.headText}>Amount</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.headText}>Category</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.headText}>Date</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.headText}>Delete</Text>
          </View>
        </View>
      </View>
      <FlatList
        style={styles.tableBody}
        data={expenses}
        renderItem={({ item }) => {
          const date = item.date;
          const formatedDate = `${date.day}.${date.month}.${date.year}`;
          const formatedTime = `${date.hours}:${date.minutes}:${date.seconds}`;
          return (
            <View style={styles.tableColumn}>
              <View style={styles.tableRow}>
                <Text style={styles.bodyText}>
                  {item.expenseAmount.toFixed(2)}€
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.bodyText}>
                  {item.expenseType.categoryName}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.bodyText}>{formatedDate}</Text>
                <Text style={styles.bodyText}>{formatedTime}</Text>
              </View>
              <View style={styles.tableRow}>
                <Pressable
                  onPress={() => {
                    deleteExpense(item.expenseId);
                  }}
                >
                  <Text style={styles.deleteButton}>Delete</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "column",
  },
  tableHead: {
    flexDirection: "column",
    margin: 20,
    backgroundColor: mainColor,
  },

  tableBody: {
    maxHeight: 300,
    margin: 20,
    backgroundColor: "lightgray",
  },
  tableColumn: {
    flexDirection: "row",
    margin: 10,
  },
  tableRow: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 90,
  },
  headText: {
    textAlign: "center",
    padding: 10,
    color: "white",
  },
  bodyText: {
    textAlign: "center",
    margin: 2,
    fontSize: 12,
  },
  deleteButton: {
    backgroundColor: mainColor,
    color: "white",
    padding: 10,
    borderRadius: 5,
  },
});
