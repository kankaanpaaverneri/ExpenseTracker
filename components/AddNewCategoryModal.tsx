import { useState } from "react";
import {
  Modal,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { mainColor } from "../util/colors";

interface AddNewCategoryModalProps {
  showAddNewCategoryModal: boolean;
  addNewCategory: (categoryName: string) => void;
}

export const AddNewCategoryModal = ({
  showAddNewCategoryModal,
  addNewCategory,
}: AddNewCategoryModalProps) => {
  const [categoryName, setCategoryName] = useState<string>("");
  function onChangeCategoryName(event: string): void {
    setCategoryName(event);
  }

  return (
    <Modal visible={showAddNewCategoryModal} animationType="slide">
      <View style={styles.modalContainer}>
        <View>
          <Text style={styles.title}>Category name</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            onChangeText={(event) => onChangeCategoryName(event)}
            placeholder="Type category name here"
          />
        </View>
        <View>
          <Pressable onPress={() => addNewCategory(categoryName)}>
            <Text style={styles.pressable}>Create</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: "column",
    alignItems: "center",
    margin: 50,
  },
  title: {
    margin: 50,
    fontSize: 25,
  },
  textInput: {
    margin: 50,
    fontSize: 20,
  },
  pressable: {
    margin: 50,
    fontSize: 20,
    backgroundColor: mainColor,
    color: "white",
    padding: 10,
    borderRadius: 15,
  },
});
