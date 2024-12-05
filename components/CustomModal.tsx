import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { modalAction } from "../slice/modalSlice";

interface CustomModalProps {
  children: React.ReactNode;
}

export const CustomModal = ({ children }: CustomModalProps) => {
  const showModal = useAppSelector((state) => state.modalReducer.showModal);

  return (
    <Modal animationType="slide" visible={showModal}>
      <View style={styles.modal}>{children}</View>
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
});
