import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Expense } from "../../util/types";
import { useAppSelector } from "../../hooks/hooks";
import { TotalAmountsRow } from "./TotalAmountsRow";

interface TableBodyProps {
  expenses: Expense[];
  deleteExpense: (expenseId: number) => void;
}

export const TableBody = ({ expenses, deleteExpense }: TableBodyProps) => {
  const currentUserId = useAppSelector((state) => state.userReducer.userId);
  return (
    <View style={styles.tableBody}>
      <FlatList
        showsVerticalScrollIndicator={true}
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
                <Text style={styles.bodyText}>{item.username}</Text>
              </View>
              {item.userId === currentUserId && (
                <View style={styles.tableRow}>
                  <Pressable
                    onPress={() => {
                      deleteExpense(item.expenseId);
                    }}
                  >
                    <Text style={styles.bodyText}>🗑️</Text>
                  </Pressable>
                </View>
              )}
            </View>
          );
        }}
      />
      <TotalAmountsRow />
    </View>
  );
};

const deviceDimension = Dimensions.get("window");

const styles = StyleSheet.create({
  tableBody: {
    maxHeight: deviceDimension.height > 800 ? 330 : 120,
    backgroundColor: "lightgray",
  },
  bodyText: {
    textAlign: "center",
    fontSize: 10,
  },
  deleteButton: {
    color: "black",
    padding: 5,
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
