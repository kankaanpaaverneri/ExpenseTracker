import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ProfileScreenRouteProp } from "../App";
import { mainColor } from "../util/colors";
import { AddNewCategoryModal } from "./AddNewCategoryModal";

export const Categories = () => {
  const route = useRoute<ProfileScreenRouteProp>();
  const { categories } = route.params;
  const [showAddNewCategoryModal, setShowAddNewCategoryModal] =
    useState<boolean>(false);

  function addNewCategory(categoryName: string): void {
    setShowAddNewCategoryModal(false);

    const newCategory = {
      categoryName: categoryName,
      categoryId: categories.length + 1,
    };
  }

  return (
    <View style={styles.categoriesContainer}>
      <View>
        <Text style={styles.title}>Categories</Text>
      </View>
      <View style={styles.categoriesList}>
        <FlatList
          data={categories}
          renderItem={({ item }) => {
            return (
              <View style={styles.categoryItem}>
                <Text style={styles.categoryText}>{item.categoryName}</Text>
              </View>
            );
          }}
          keyExtractor={(item) => item.categoryId.toString()}
        />
      </View>
      <View>
        <Pressable onPress={() => setShowAddNewCategoryModal(true)}>
          <Text>Add new Category</Text>
        </Pressable>
      </View>
      <AddNewCategoryModal
        showAddNewCategoryModal={showAddNewCategoryModal}
        addNewCategory={addNewCategory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 20,
  },
  categoriesList: {
    margin: 10,
    height: 300,
    padding: 10,
  },

  categoryItem: {
    margin: 5,
    backgroundColor: mainColor,
    borderRadius: 15,
  },

  categoryText: {
    textAlign: "center",
    color: "white",
    padding: 20,
  },
});
