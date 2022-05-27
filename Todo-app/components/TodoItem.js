import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function TodoItem({ title, onPress }) {
  return (
    <View style={styles.noteItem}>
      <View style={styles.itemBullet} />
      <Text style={styles.noteText}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <MaterialIcons name="done" size={24} size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemBullet: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  noteItem: {
    backgroundColor: "#FF6D6D",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 20,
    width: "100%",
    marginBottom: 10,
  },
  noteText: {
    fontSize: 20,
    fontFamily: "Roboto",
    color: "#fff",
    width: "80%",
  },
});

export default TodoItem;
