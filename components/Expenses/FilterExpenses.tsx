import {
  Animated,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  useAnimatedValue,
} from "react-native";
import { FilterByDate } from "./FilterByDate";
import { FilterByCategory } from "./FilterByCategory";
import { mainColor } from "../../util/colors";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useState, useEffect } from "react";
import { dateFilterValid } from "../../util/dateFilterValid";
import { DateFilters, CategoryFilters, DateFilterType } from "../../util/types";
import { updateData } from "../../slice/updateSlice";
import { updateExpenseFilters } from "../../slice/expensesSlice";
import { FilterByNavigation } from "./FilterByNavigation";
import { FilterNavigationItemId } from "../../util/types";
import { FilterByUser } from "./FilterByUser";
import { UserFilters } from "../../util/types";

export const FilterExpenses = () => {
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories,
  );
  const users = useAppSelector((state) => state.usersReducer.users);
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

  const [userFilters, setUserFilters] = useState<UserFilters[]>([]);

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
    const filteredCategoryFilters = categoryFilters.filter(
      (category) => category.selected,
    );
    const filteredUserFilters = userFilters.filter((user) => user.selected);
    dispatch(
      updateExpenseFilters({
        categoryFilters: filteredCategoryFilters,
        dateFilters: dateFilters,
        userFilters: filteredUserFilters,
      }),
    );
    setCurrentNavigationItem(FilterNavigationItemId.None);
    dispatch(updateData(true));
  }

  function onPressClearFilters() {
    setUserFilters((prev) => {
      const updated = [...prev];
      return updated.map((user) => {
        return {
          ...user,
          selected: false,
        };
      });
    });
    setCategoryFilters((prev) => {
      const updated = [...prev];
      return updated.map((category) => {
        return {
          ...category,
          selected: false,
        };
      });
    });
    setDateFilters((prev) => {
      const updated = { ...prev };
      updated.from = "";
      updated.to = "";
      return updated;
    });
    setErrorInDates(() => {
      return {
        from: "",
        to: "",
      };
    });
    dispatch(
      updateExpenseFilters({
        categoryFilters: categoryFilters,
        dateFilters: {
          from: "",
          to: "",
        },
        userFilters: userFilters,
      }),
    );
    setCurrentNavigationItem(FilterNavigationItemId.None);
    dispatch(updateData(true));
  }

  useEffect(() => {
    dispatch(
      updateExpenseFilters({
        categoryFilters: [],
        dateFilters: {
          from: "",
          to: "",
        },
        userFilters: [],
      }),
    );
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
    setUserFilters(() => {
      return users.map((user) => {
        return {
          userId: user.userId,
          username: user.username,
          selected: false,
        };
      });
    });
    dispatch(updateData(true));
  }, []);

  const [currentNavigationItem, setCurrentNavigationItem] = useState<number>(
    FilterNavigationItemId.None,
  );

  function onPressNavigationItem(id: FilterNavigationItemId): void {
    if (id !== currentNavigationItem) {
      setCurrentNavigationItem(id);
    } else {
      setCurrentNavigationItem(FilterNavigationItemId.None);
    }
  }

  function onPressUserFilter(userId: number) {
    setUserFilters((prev) => {
      const updated = [...prev];
      return updated.map((user) => {
        if (user.userId === userId) {
          return {
            ...user,
            selected: user.selected ? false : true,
          };
        }
        return user;
      });
    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.filterExpensesContainer}>
        <Text style={styles.filterBy}>Filter by</Text>
        <FilterByNavigation
          currentNavigationSelected={currentNavigationItem}
          onPressNavigationItem={onPressNavigationItem}
        />
        <View style={styles.filterByContainer}>
          {currentNavigationItem === FilterNavigationItemId.Category && (
            <View style={styles.filterByData}>
              <Text style={styles.title}>Category</Text>
              <FilterByCategory
                categoryFilters={categoryFilters}
                onPressCategory={onPressCategory}
              />
            </View>
          )}
          {currentNavigationItem === FilterNavigationItemId.Date && (
            <View style={styles.filterByData}>
              <Text style={styles.title}>Date</Text>
              <FilterByDate
                dateFilters={dateFilters}
                onChangeDateFilters={onChangeDateFilters}
                errorInDates={errorInDates}
              />
            </View>
          )}
          {currentNavigationItem === FilterNavigationItemId.User && (
            <View style={styles.filterByData}>
              <Text style={styles.title}>User</Text>
              <FilterByUser
                userFilters={userFilters}
                onPressUserFilter={onPressUserFilter}
              />
            </View>
          )}
        </View>
        <View style={styles.filterPressableContainer}>
          <Pressable onPress={onPressFilter}>
            <Text style={styles.filterPressableText}>Filter</Text>
          </Pressable>
          <Pressable onPress={onPressClearFilters}>
            <Text style={styles.clearFilterText}>Clear filters</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  filterExpensesContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
  },
  filterBy: {
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 15,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  filterByContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterByData: {
    margin: 10,
  },
  filterPressableContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterPressableText: {
    backgroundColor: mainColor,
    color: "white",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  clearFilterText: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
});
