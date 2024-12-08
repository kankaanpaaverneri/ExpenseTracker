import { StyleSheet, View, Text, TextInput } from "react-native";
import { DateFilters, DateFilterType } from "../util/types";
import { errorColor } from "../util/colors";
import { formatDate } from "../util/getDate";

interface FilterByDateProps {
  dateFilters: DateFilters;
  onChangeDateFilters: (event: string, dateFilter: DateFilterType) => void;
  errorInDates: DateFilters;
}

export const FilterByDate = ({
  dateFilters,
  onChangeDateFilters,
  errorInDates,
}: FilterByDateProps) => {
  const currentDate = new Date();
  const placeHolderDate = formatDate(currentDate);

  return (
    <View style={styles.filterByDateContainer}>
      <View style={styles.dateInputContainer}>
        <Text style={styles.dateInputLabel}>From</Text>
        <TextInput
          value={dateFilters.from}
          onChangeText={(e) => onChangeDateFilters(e, DateFilterType.FROM)}
          maxLength={10}
          style={styles.dateInput}
          placeholder="01.06.2024"
        />
        {errorInDates.from.length > 0 && (
          <Text style={{ color: errorColor }}>{errorInDates.from}</Text>
        )}
      </View>
      <View style={styles.dateInputContainer}>
        <Text style={styles.dateInputLabel}>To</Text>
        <TextInput
          value={dateFilters.to}
          onChangeText={(e) => onChangeDateFilters(e, DateFilterType.TO)}
          maxLength={10}
          style={styles.dateInput}
          placeholder={`${placeHolderDate.day}.${placeHolderDate.month}.${placeHolderDate.year}`}
        />
        {errorInDates.to.length > 0 && (
          <Text style={{ color: errorColor }}>{errorInDates.to}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterByDateContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    padding: 10,
  },
  dateInputContainer: {
    flexDirection: "column",
    margin: 1,
  },
  dateInputLabel: {
    textAlign: "center",
    fontSize: 15,
  },
  dateInput: {
    fontSize: 15,
  },
});
