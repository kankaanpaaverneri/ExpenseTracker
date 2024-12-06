import { StyleSheet, View, Text, FlatList } from "react-native";
import { Expense } from "../util/types";
import { mainColor } from "../util/colors";
interface TableProps {
  expenses: Expense[];
}

export const Table = ({ expenses }: TableProps) => {
  return (
    <View>
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
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    justifyContent: "center",
    alignItems: "center",
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
  },
  tableRow: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    margin: 10,
  },
  headText: {
    textAlign: "center",
    padding: 10,
    color: "white",
  },
  bodyText: {
    textAlign: "center",
    padding: 2,
    margin: 1,
  },
});
