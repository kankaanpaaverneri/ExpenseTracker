import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { Expense } from "../../util/types";
import { mainColor } from "../../util/colors";

interface TableBodyProps {
  expenses: Expense[];
  deleteExpense: (expenseId: number) => void;
}

export const TableBody = ({ expenses, deleteExpense }: TableBodyProps) => {
  return (
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
              <Text>Verneri</Text>
            </View>
            <View style={styles.tableRow}>
              <Pressable
                onPress={() => {
                  deleteExpense(item.expenseId);
                }}
              >
                <Text style={styles.deleteButton}>🗑️</Text>
              </Pressable>
            </View>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  tableBody: {
    maxHeight: 300,
    margin: 1,
    backgroundColor: "lightgray",
  },
  bodyText: {
    textAlign: "center",
    margin: 1,
    fontSize: 12,
  },
  deleteButton: {
    backgroundColor: "white",
    color: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  tableColumn: {
    flexDirection: "row",
    margin: 10,
  },
  tableRow: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
  },
});
