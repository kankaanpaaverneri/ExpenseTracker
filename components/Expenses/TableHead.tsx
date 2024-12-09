import { View, Text, StyleSheet } from "react-native";
import { mainColor } from "../../util/colors";

export const TableHead = () => {
  return (
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
          <Text style={styles.headText}>User</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.headText}>Delete</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableHead: {
    flexDirection: "column",
    margin: 1,
    backgroundColor: mainColor,
  },
  headText: {
    textAlign: "center",
    margin: 1,
    color: "white",
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
