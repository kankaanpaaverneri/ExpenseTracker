import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Category } from "../../util/types";
import { mainColor } from "../../util/colors";
import { useAppSelector } from "../../hooks/hooks";

interface AddExpenseCategoryProps {
  onSelectCategory: (categoryId: number) => void;
  selectedCategory: number;
}

export const AddExpenseCategory = ({
  onSelectCategory,
  selectedCategory,
}: AddExpenseCategoryProps) => {
  const categories: Category[] = useAppSelector(
    (state) => state.categoriesReducer.categories,
  );
  return (
    <FlatList
      style={styles.list}
      data={categories}
      renderItem={({ item }) => (
        <Pressable onPress={() => onSelectCategory(item.categoryId)}>
          <Text
            style={
              item.categoryId === selectedCategory
                ? styles.selectedPressable
                : styles.unselectedPressable
            }
          >
            {item.categoryName}
          </Text>
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  unselectedPressable: {
    padding: 10,
  },

  selectedPressable: {
    padding: 10,
    backgroundColor: mainColor,
    color: "white",
  },
  list: {
    flexDirection: "column",
    height: 200,
  },
});
