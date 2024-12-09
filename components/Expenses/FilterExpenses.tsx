import { View, Text, StyleSheet, Pressable } from "react-native";
import { FilterByDate } from "./FilterByDate";
import { FilterByCategory } from "./FilterByCategory";
import { mainColor } from "../../util/colors";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useState, useEffect } from "react";
import { dateFilterValid } from "../../util/dateFilterValid";
import { DateFilters, CategoryFilters, DateFilterType } from "../../util/types";
import { updateData } from "../../slice/updateSlice";
import { updateExpenseFilters } from "../../slice/expensesSlice";

export const FilterExpenses = () => {
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories,
  );
  const dispatch = useAppDispatch();

  const [categoryFilters, setCategoryFilters] = useState<CategoryFilters[]>([]);

  const [dateFilters, setDateFilters] = useState<DateFilters>({
    from: "",
    to: "",
  });
  const [errorInDates, setErrorInDates] = useState<DateFilters>({
    from: "",
    to: "",
  });

  function onPressCategory(categoryId: number) {
    setCategoryFilters((prev) => {
      const updated = prev.map((p) => p);
      return updated.map((category) => {
        const copy = { ...category };
        if (copy.categoryId === categoryId) {
          copy.selected = copy.selected ? false : true;
        }
        return copy;
      });
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

  async function onPressFilter() {
    let dateFiltersNotValid: boolean = false;
    setErrorInDates((prevError) => {
      const updatedError = { ...prevError };

      if (!dateFilterValid(dateFilters.from)) {
        updatedError.from = "Not valid input";
        dateFiltersNotValid = true;
      } else {
        updatedError.from = "";
      }

      if (!dateFilterValid(dateFilters.to)) {
        updatedError.to = "Not valid input";
        dateFiltersNotValid = true;
      } else {
        updatedError.to = "";
      }

      if (dateFilters.from.length > 0 && dateFilters.to.length === 0) {
        updatedError.to = "Both dates must be filled";
        dateFiltersNotValid = true;
      }

      if (dateFilters.to.length > 0 && dateFilters.from.length === 0) {
        updatedError.from = "Both dates must be filled";
        dateFiltersNotValid = true;
      }

      return updatedError;
    });

    if (dateFiltersNotValid) return;
    const filtered = categoryFilters.filter((category) => category.selected);

    dispatch(
      updateExpenseFilters({
        categoryFilters: filtered,
        dateFilters: dateFilters,
      }),
    );
    dispatch(updateData(true));
  }

  useEffect(() => {
    setCategoryFilters(() => {
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
            categoryFilters={categoryFilters}
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
