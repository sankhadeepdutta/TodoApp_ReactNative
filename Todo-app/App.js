import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import TodoItem from "./components/TodoItem";

export default function App() {
  const [task, setTask] = useState({
    id: 0,
    task: "",
  });

  const [taskItems, setTaskItems] = useState([]);

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(taskItems);
      await AsyncStorage.setItem("@todos", jsonValue);
    } catch (e) {
      alert("Error");
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@todos");
      setTaskItems(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      alert("Error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    storeData();
  }, [taskItems]);

  const handleAddTask = async () => {
    Keyboard.dismiss();
    if (!task.task.trim().length) {
      alert("Please enter a task");
      return;
    }

    setTaskItems((prevValues) => {
      return [...prevValues, task];
    });
    setTask({ id: task.id, task: "" });
  };

  const completeTask = async (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo List</Text>
      <View style={styles.tasksContainer}>
        <ScrollView>
          {taskItems.map((item, index) => {
            return (
              <TodoItem
                key={index}
                title={item.task}
                onPress={() => {
                  completeTask(index);
                }}
              />
            );
          })}
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.inputText}
          placeholder="Write a task"
          value={task.task}
          onChangeText={(text) => {
            setTask({
              id:
                taskItems.length === 0
                  ? 0
                  : taskItems[taskItems.length - 1].id + 1,
              task: text,
            });
          }}
        />

        <TouchableOpacity
          style={styles.addItem}
          onPress={() => handleAddTask()}
        >
          <Ionicons name="add-circle-sharp" size={50} color="black" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  addItem: {
    marginLeft: 10,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#FFFCDC",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputText: {
    fontSize: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    marginLeft: 15,
    width: "85%",
  },
  tasksContainer: {
    height: "80%",
    backgroundColor: "#FFFCDC",
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    marginLeft: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
