import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

interface CustomPressableProps {
  onPress: () => void;
  children: React.ReactNode;
}

export const CustomPressable = ({
  onPress,
  children,
}: CustomPressableProps) => {
  return (
    <View>
      <Pressable onPress={onPress}>{children}</Pressable>
    </View>
  );
};
