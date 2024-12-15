import { Pressable, View, Text, StyleSheet } from "react-native";
import { FilterNavigationItem, FilterNavigationItemId } from "../../util/types";
import { mainColor } from "../../util/colors";

const filterItems: FilterNavigationItem[] = [
  { id: FilterNavigationItemId.Category, name: "Category" },
  { id: FilterNavigationItemId.Date, name: "Date" },
  { id: FilterNavigationItemId.User, name: "User" },
];

interface FilterByNavigationProps {
  currentNavigationSelected: FilterNavigationItemId;
  onPressNavigationItem: (id: FilterNavigationItemId) => void;
}

export function FilterByNavigation({
  currentNavigationSelected,
  onPressNavigationItem,
}: FilterByNavigationProps) {
  return (
    <View style={styles.filterByNavigationContainer}>
      {filterItems.map((item, index) => {
        return (
          <View key={index} style={styles.navigationItem}>
            <Pressable onPress={() => onPressNavigationItem(item.id)}>
              <Text
                style={
                  currentNavigationSelected === item.id
                    ? styles.textSelected
                    : styles.text
                }
              >
                {item.name}
              </Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  filterByNavigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navigationItem: {
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 100,
    minWidth: 50,
    margin: 5,
  },
  text: {
    maxWidth: 100,
    minWidth: 80,
    textAlign: "center",
    fontSize: 15,
    padding: 10,
  },

  textSelected: {
    maxWidth: 100,
    minWidth: 80,
    textAlign: "center",
    fontSize: 15,
    backgroundColor: mainColor,
    color: "white",
    padding: 10,
    borderRadius: 5,
  },
});
