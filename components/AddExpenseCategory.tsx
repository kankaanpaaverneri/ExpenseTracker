import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import { Category } from "../util/types";
import { mainColor } from "../util/colors";

interface AddExpenseCategoryProps {
  categories: Category[];
  onSelectCategory: (categoryId: number) => void;
  selectedCategory: number;
}

export const AddExpenseCategory = ({
  categories,
  onSelectCategory,
  selectedCategory,
}: AddExpenseCategoryProps) => {
  return (
    <FlatList
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
});
