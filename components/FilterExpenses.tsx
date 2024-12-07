import { View, Text, StyleSheet, Pressable } from "react-native";
import { FilterByDate } from "./FilterByDate";
import { FilterByCategory } from "./FilterByCategory";
import { mainColor } from "../util/colors";
import { useAppSelector } from "../hooks/hooks";
import { useState, useEffect } from "react";
import { dateFilterValid } from "../slice/dateFilterValid";

export interface SelectedCategories {
  categoryName: string;
  categoryId: number;
  selected: boolean;
}

export interface DateFilters {
  from: string;
  to: string;
}

export enum DateFilterType {
  FROM,
  TO,
}

export const FilterExpenses = () => {
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories,
  );

  const [selectedCategories, setSelectedCategories] = useState<
    SelectedCategories[]
  >([]);

  const [dateFilters, setDateFilters] = useState<DateFilters>({
    from: "",
    to: "",
  });
  const [errorInDates, setErrorInDates] = useState<DateFilters>({
    from: "",
    to: "",
  });

  function onPressCategory(categoryId: number) {
    setSelectedCategories((prev) => {
      const recent = prev;
      const updated = recent.map((category) => {
        if (categoryId === category.categoryId) {
          category.selected = category.selected ? false : true;
        }
        return category;
      });
      return updated;
    });
  }

  function onChangeDateFilters(
    event: string,
    dateFilter: DateFilterType,
  ): void {
    if (dateFilter === DateFilterType.FROM) {
      setDateFilters((prev) => {
        return {
          ...prev,
          from: event,
        };
      });
    } else if (dateFilter === DateFilterType.TO) {
      setDateFilters((prev) => {
        return {
          ...prev,
          to: event,
        };
      });
    }
  }

  function onPressFilter() {
    setErrorInDates(() => {
      return {
        from: dateFilterValid(dateFilters.from) ? "" : "Not valid input",
        to: dateFilterValid(dateFilters.to) ? "" : "Not valid input",
      };
    });
  }

  useEffect(() => {
    setSelectedCategories(() => {
      const updated = categories.map((category) => {
        return {
          categoryName: category.categoryName,
          categoryId: category.categoryId,
          selected: false,
        };
      });
      return updated;
    });
  }, []);

  return (
    <View style={styles.filterExpensesContainer}>
      <Text style={styles.filterBy}>Filter by</Text>
      <View style={styles.filterByContainer}>
        <View style={styles.filterByData}>
          <Text style={styles.title}>Category</Text>
          <FilterByCategory
            selectedCategories={selectedCategories}
            onPressCategory={onPressCategory}
          />
        </View>
        <View style={styles.filterByData}>
          <Text style={styles.title}>Date</Text>
          <FilterByDate
            dateFilters={dateFilters}
            onChangeDateFilters={onChangeDateFilters}
            errorInDates={errorInDates}
          />
        </View>
      </View>
      <View style={styles.filterPressableContainer}>
        <Pressable onPress={onPressFilter}>
          <Text style={styles.filterPressableText}>Filter</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterExpensesContainer: {
    flexDirection: "column",
  },
  filterBy: {
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 15,
    textAlign: "center",
    margin: 10,
  },
  filterByContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterByData: {
    margin: 10,
  },
  filterPressableContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  filterPressableText: {
    backgroundColor: mainColor,
    color: "white",
    padding: 10,
    borderRadius: 5,
  },
});
