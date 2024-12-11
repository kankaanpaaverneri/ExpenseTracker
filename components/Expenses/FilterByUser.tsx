import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { UserFilters } from "../../util/types";
import { mainColor } from "../../util/colors";

interface FilterByUserProps {
  userFilters: UserFilters[];
  onPressUserFilter: (userId: number) => void;
}

export function FilterByUser({
  userFilters,
  onPressUserFilter,
}: FilterByUserProps) {
  return (
    <FlatList
      style={styles.usersContainer}
      data={userFilters}
      renderItem={({ item }) => {
        return (
          <View key={item.userId} style={styles.userItem}>
            <Pressable onPress={() => onPressUserFilter(item.userId)}>
              <Text
                style={
                  item.selected ? styles.selectedUserText : styles.userText
                }
              >
                {item.username}
              </Text>
            </Pressable>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  usersContainer: {
    flexDirection: "column",
    padding: 1,
    width: 300,
    height: 100,
  },
  userItem: {
    padding: 1,
  },
  userText: {
    textAlign: "center",
    fontSize: 15,
    padding: 10,
  },
  selectedUserText: {
    fontSize: 15,
    textAlign: "center",
    backgroundColor: mainColor,
    color: "white",
    padding: 10,
  },
});
