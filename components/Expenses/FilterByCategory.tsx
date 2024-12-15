import { FlatList, Text, StyleSheet, Pressable, View } from "react-native";
import { mainColor } from "../../util/colors";
import { CategoryFilters } from "../../util/types";

interface FilterByCategoryProps {
  categoryFilters: CategoryFilters[];
  onPressCategory: (categoryId: number) => void;
}

export const FilterByCategory = ({
  categoryFilters,
  onPressCategory,
}: FilterByCategoryProps) => {
  return (
    <FlatList
      style={styles.listContainer}
      data={categoryFilters}
      keyExtractor={(item) => item.categoryId.toString()}
      renderItem={({ item }) => {
        return (
          <View style={styles.listItem}>
            <Pressable
              onPress={() => {
                onPressCategory(item.categoryId);
              }}
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
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    maxHeight: 100,
    maxWidth: 200,
  },
  listItem: {},

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
