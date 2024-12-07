import { FlatList, Text, StyleSheet, Pressable } from "react-native";
import { mainColor } from "../util/colors";
import { SelectedCategories } from "./FilterExpenses";
interface FilterByCategoryProps {
  selectedCategories: SelectedCategories[];
  onPressCategory: (categoryId: number) => void;
}

export const FilterByCategory = ({
  selectedCategories,
  onPressCategory,
}: FilterByCategoryProps) => {
  return (
    <FlatList
      style={styles.listContainer}
      data={selectedCategories}
      keyExtractor={(item) => item.categoryId.toString()}
      renderItem={({ item }) => {
        return (
          <Pressable
            onPress={() => {
              onPressCategory(item.categoryId);
            }}
            style={styles.listItem}
          >
            <Text
              style={
                item.selected
                  ? styles.listItemTextSelected
                  : styles.listItemText
              }
            >
              {item.categoryName}
            </Text>
          </Pressable>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "column",
    height: 100,
    padding: 10,
  },
  listItem: {
    margin: 1,
  },

  listItemText: {
    fontSize: 15,
    textAlign: "center",
    padding: 10,
  },
  listItemTextSelected: {
    backgroundColor: mainColor,
    color: "white",
    textAlign: "center",
    fontSize: 15,
    padding: 10,
  },
});
