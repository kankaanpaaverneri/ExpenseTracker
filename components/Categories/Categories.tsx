import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { errorColor, mainColor } from "../../util/colors";
import { fetchDelete, fetchPost } from "../../http/http";
import { addNewCategoryUrl, removeCategoryUrl } from "../../http/url";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { modalAction } from "../../slice/modalSlice";
import { CustomModal } from "../Custom/CustomModal";
import { CustomPressable } from "../Custom/CustomPressable";
import { useState } from "react";
import {
  isCategoryNameValid,
  validateCategoryName,
} from "../../util/isCategoryNameValid";
import { updateData } from "../../slice/updateSlice";
import { CategoriesList } from "./CategoriesList";

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
    const errorMessage = validateCategoryName(categoryName, categories);
    if (errorMessage.length > 0) {
      setInvalidCategory(errorMessage);
      return;
    }

    setInvalidCategory("");
    setCategoryName("");
    try {
      await fetchPost(addNewCategoryUrl, { categoryName: categoryName });
    } catch (error) {
      console.error("Something went wrong");
      return;
    }

    dispatch(modalAction(false));
    dispatch(updateData(true));
  }

  function cancelModal() {
    dispatch(modalAction(false));
  }

  async function removeCategory(categoryId: number) {
    if (categoryId === 0) return;
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
      <CategoriesList categories={categories} removeCategory={removeCategory} />
      <View style={{ margin: 50 }}>
        <Pressable onPress={openModal}>
          <Text>Add new Category</Text>
        </Pressable>
      </View>
      <CustomModal>
        <Text style={styles.title}>Add new Category</Text>
        {invalidCategory.length > 0 && (
          <Text style={{ color: errorColor }}>{invalidCategory}</Text>
        )}
        <TextInput
          style={styles.textInput}
          placeholder="Type category name"
          onChangeText={(e) => {
            setCategoryName(e);
          }}
          value={categoryName}
          maxLength={20}
        />
        <CustomPressable onPress={closeModal}>
          <Text style={styles.okButton}>Ok</Text>
        </CustomPressable>
        <CustomPressable onPress={cancelModal}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </CustomPressable>
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
    margin: 10,
  },

  okButton: {
    fontSize: 20,
    backgroundColor: "#465aa6",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    margin: 10,
  },
  cancelButton: {
    fontSize: 20,
    backgroundColor: errorColor,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    margin: 10,
  },
});
