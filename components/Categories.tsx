import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { errorColor, mainColor } from "../util/colors";
import { fetchDelete, fetchPost } from "../http/http";
import { addNewCategoryUrl, removeCategoryUrl } from "../http/url";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { modalAction } from "../slice/modalSlice";
import { CustomModal } from "./CustomModal";
import { CustomPressable } from "./CustomPressable";
import { useState } from "react";
import { isCategoryNameValid } from "../util/isCategoryNameValid";
import { updateData } from "../slice/updateSlice";

export const Categories = () => {
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories,
  );
  const dispatch = useAppDispatch();
  const [categoryName, setCategoryName] = useState<string>("");
  const [invalidCategory, setInvalidCategory] = useState<string>("");

  function openModal() {
    dispatch(modalAction(true));
  }

  async function closeModal() {
    if (!isCategoryNameValid(categoryName)) {
      setInvalidCategory("Category name not valid");
      return;
    }
    let categoryIsUsed = false;
    categories.forEach((category) => {
      if (category.categoryName === categoryName) {
        categoryIsUsed = true;
        return;
      }
    });

    if (categoryIsUsed) {
      setInvalidCategory("Category name is used");
      return;
    }

    setInvalidCategory("");
    setCategoryName("");
    await fetchPost(addNewCategoryUrl, { categoryName: categoryName });
    dispatch(modalAction(false));
    dispatch(updateData(true));
  }

  async function removeCategory(categoryId: number) {
    if (categoryId === 0) return;
    console.log(`${removeCategoryUrl}${categoryId}`);
    try {
      await fetchDelete(`${removeCategoryUrl}${categoryId}`);
      dispatch(updateData(true));
    } catch (error) {
      console.log("Something went wrong: ", error);
    }
  }

  return (
    <View style={styles.categoriesContainer}>
      <View>
        <Text style={styles.title}>Categories</Text>
      </View>
      <View style={styles.categoriesList}>
        {categories.length === 0 && <Text>No categories</Text>}
        <FlatList
          style={{ paddingLeft: 20, paddingRight: 20 }}
          data={categories}
          renderItem={({ item }) => {
            return (
              <View style={styles.categoryItem}>
                <View style={styles.categoryNameContainer}>
                  <Text style={styles.categoryText}>{item.categoryName}</Text>
                </View>
                <View style={styles.removePressableContainer}>
                  <Pressable onPress={() => removeCategory(item.categoryId)}>
                    <Text style={styles.categoryText}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.categoryId.toString()}
        />
      </View>
      <View style={{ margin: 50 }}>
        <Pressable onPress={openModal}>
          <Text>Add new Category</Text>
        </Pressable>
      </View>
      <CustomModal>
        <Text style={styles.title}>Add new Category</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Type category name"
          onChangeText={(e) => {
            setCategoryName(e);
          }}
          value={categoryName}
          maxLength={20}
        />
        {invalidCategory.length > 0 && (
          <Text style={{ color: errorColor }}>{invalidCategory}</Text>
        )}
        <CustomPressable onPress={closeModal} />
      </CustomModal>
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
    fontWeight: "bold",
  },

  textInput: {
    margin: 50,
  },
  categoriesList: {
    margin: 10,
    height: 300,
    padding: 10,
  },

  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    backgroundColor: mainColor,
    borderRadius: 15,
    padding: 20,
  },

  categoryNameContainer: {
    margin: 10,
  },
  removePressableContainer: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },

  categoryText: {
    color: "white",
  },
});
