import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Expense } from "../util/types";

interface CustomModalProps {
  showModal: boolean;
  expense: Expense;
  closeModal: () => void;
}

export const CustomModal = ({
  showModal,
  expense,
  closeModal,
}: CustomModalProps) => {
  return (
    <Modal animationType="slide" visible={showModal}>
      <View style={styles.modal}>
        <Text style={styles.modalText}>
          {expense.expenseAmount.toFixed(2)}€ Spent
        </Text>
        <Text>{expense.expenseType.categoryName}</Text>
      </View>
      <View style={styles.pressableContainer}>
        <Pressable onPress={closeModal}>
          <Text style={styles.pressableText}>Ok</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalText: {
    fontSize: 25,
  },
  pressableContainer: {
    flex: 1,
  },

  pressableText: {
    fontSize: 20,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#465aa6",
    color: "white",
    borderRadius: 10,
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
