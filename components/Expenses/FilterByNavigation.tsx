import { Pressable, View, Text, StyleSheet } from "react-native";
import { NavigationItem, NavigationItemId } from "../../util/types";
import { mainColor } from "../../util/colors";

const filterItems: NavigationItem[] = [
  { id: NavigationItemId.Category, name: "Category" },
  { id: NavigationItemId.Date, name: "Date" },
  { id: NavigationItemId.User, name: "User" },
];

interface FilterByNavigationProps {
  currentNavigationSelected: NavigationItemId;
  onPressNavigationItem: (id: NavigationItemId) => void;
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
    width: 100,
    margin: 5,
  },
  text: {
    width: 100,
    textAlign: "center",
    fontSize: 15,
    padding: 10,
  },

  textSelected: {
    width: 100,
    textAlign: "center",
    fontSize: 15,
    backgroundColor: mainColor,
    color: "white",
    padding: 10,
    borderRadius: 5,
  },
});
