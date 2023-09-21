import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from "react-native";
import TaskTitleInput from "../components/TaskTitle";
import TaskDescriptionInput from "../components/TaskNarrative";
import Congrats from "../components/Congrats";

import * as SecureStore from "expo-secure-store";
import STORE from "../constants";
import TaskCard from "../components/TaskCard";
import Anchor from "../components/Anchor";
import { useLoadingTodos } from "../context/LoadingTaskContext";

function AddTaskScreen({ navigation }) {
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState("");
    const [ openForDelete, setOpenForDelete] = useState(null)
    const [description, setDescription] = useState("");
    const { todos, setTodos } = useLoadingTodos();

    const handleNext = (stepData) => {
        if (step === 1 && stepData?.length > 0) {
            setTitle(stepData);
            setStep(2);
        } else if (step === 2) {
            setDescription(stepData);
        }
    };

    const TaskAdded = async (data, setLoading) => {
        try {
            handleNext(data);
            if (step <= 1) return;

            setLoading(true);

            // const added_todos = await SecureStore.getItemAsync(STORE.TODO_LIST)
            const newTodo = { id: Date.now(), title, description: data, isCompleted: false };

            const _todos = [];

            if (!todos.length) _todos.push(newTodo);
            else _todos.push(...todos, newTodo);

            setTitle("");
            setDescription("");
            setTodos((prev) => [...prev, newTodo]);

            await SecureStore.setItemAsync(
                STORE.TODO_LIST,
                JSON.stringify(_todos)
            );
            setStep(3);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    async function DeleteTask(index){
      try {
        if(index < 0) throw new Error("index is undefined")

         // index is index of deleted task
        const tasks = [...todos] 
        tasks.splice(-(index + 1), 1)

        setTodos([...tasks])
  
        await SecureStore.setItemAsync(STORE.TODO_LIST, JSON.stringify(tasks))
      } catch (error) {
        console.log(error)
      }
  
  }

  async function CompleteTask(index){
    try {
        if(index < 0) throw new Error("index is undefined")

         // index is index of deleted task
        const tasks = [...todos] 
        tasks.at(-(index+1)).isCompleted = true

        setTodos([...tasks])
  
        await SecureStore.setItemAsync(STORE.TODO_LIST, JSON.stringify(tasks))
      } catch (error) {
        console.log(error)
      }
  }

    return (
        <View>
            {step === 1 && (
                <TaskTitleInput onNext={handleNext} cacheData={title} />
            )}
            {step === 2 && (
                <TaskDescriptionInput
                    onNext={TaskAdded}
                    onPrev={() => setStep((step) => step - 1)}
                />
            )}
            {step === 3 && (
                <Congrats
                    message={"Task Added"}
                    onClose={() => setStep(1)}
                    isVisible={step === 3}
                />
            )}

            {/* show previous last one added todo here */}

            {
              todos.length > 0 && (
                <View style={styles.lineContainer}>
                  <View style={styles.line} />
                  <Text style={styles.recentText}>Recents Added Task</Text>
                  <View style={styles.line} />
                </View>
              )
            }

            {todos.length > 0 && (
                <FlatList
                    data={todos.slice(-3).reverse()}
                    keyExtractor={(task) => task.id}
                    renderItem={({ item: task , index}) => (
                        <TaskCard 
                          task={task} 
                          openForDelete={openForDelete} 
                          setIsOpenForDelete={setOpenForDelete}  
                          index={index}
                          onDelete= {DeleteTask}
                          taskComplete={task.isCompleted}
                        />
                    )}
                />
            )}
            {/* only show top 3 recent added task */}
            {todos.length >= 3 && (
                <View style={styles.lineContainer}>
                    <View style={styles.line} />
                    <Anchor
                        fontSize={13}
                        onPress={() => navigation.navigate("Tasks")}
                    >
                        View All
                    </Anchor>
                    <View style={styles.line} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    lineContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#ccc",
    },
    recentText: {
        marginHorizontal: 16,
        fontFamily: "Andika",
        color: "#333",
    },
});

export default AddTaskScreen;
