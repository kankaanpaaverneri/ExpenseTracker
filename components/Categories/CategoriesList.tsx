import { View, Pressable, FlatList, Text, StyleSheet } from "react-native";
import { Category } from "../../util/types";
import { mainColor } from "../../util/colors";

interface CategoriesListProps {
  categories: Category[];
  removeCategory: (categoryId: number) => void;
}

export const CategoriesList = ({
  categories,
  removeCategory,
}: CategoriesListProps) => {
  return (
    <View style={styles.categoriesList}>
      {categories.length === 0 && <Text>No categories</Text>}
      <FlatList
        style={{ paddingLeft: 20, paddingRight: 20 }}
        data={categories}
        renderItem={({ item }) => {
          return (
            <View style={styles.category}>
              <View style={styles.categoryItem}>
                <View style={styles.categoryNameContainer}>
                  <Text style={styles.categoryText}>{item.categoryName}</Text>
                </View>
              </View>
              {item.categoryId !== 1 && (
                <View style={styles.removePressableContainer}>
                  <Pressable onPress={() => removeCategory(item.categoryId)}>
                    <Text style={styles.deleteButtonText}>🗑️</Text>
                  </Pressable>
                </View>
              )}
            </View>
          );
        }}
        keyExtractor={(item) => item.categoryId.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesList: {
    margin: 10,
    height: 300,
    padding: 10,
  },
  category: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  categoryItem: {
    width: 200,
    margin: 5,
    backgroundColor: mainColor,
    borderRadius: 15,
    padding: 20,
  },

  categoryNameContainer: {
    margin: 10,
  },
  removePressableContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },

  categoryText: {
    textAlign: "center",
    color: "white",
  },
  deleteButtonText: {
    color: "black",
  },
});
