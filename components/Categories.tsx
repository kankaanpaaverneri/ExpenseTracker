import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { errorColor, mainColor } from "../util/colors";
import { fetchPost } from "../http/http";
import { addNewCategoryUrl } from "../http/url";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { modalAction } from "../slice/modalSlice";
import { CustomModal } from "./CustomModal";
import { CustomPressable } from "./CustomPressable";
import { useState } from "react";
import { isCategoryNameValid } from "../util/isCategoryNameValid";

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
    setInvalidCategory("");
    await fetchPost(addNewCategoryUrl, { categoryName: categoryName });
    dispatch(modalAction(false));
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
                <Text style={styles.categoryText}>{item.categoryName}</Text>
              </View>
            );
          }}
          keyExtractor={(item) => item.categoryId.toString()}
        />
      </View>
      <View>
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
