// CompletedTasksScreen.js
import React, { useEffect, useMemo, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useLoadingTodos } from "../../context/LoadingTaskContext";
import TaskCard from "../../components/TaskCard";
import * as SecureStore from "expo-secure-store";
import STORE from "../../constants";
import IsTaskEmpty from "../../shared/IsTaskEmpty";
import { useCount } from "../../context/CompeleteTask";

const CompletedTasksScreen = () => {
    const { todos, setTodos } = useLoadingTodos();
    const [ openForDelete, setOpenForDelete] = useState(null)
    const { setCompleteTaskCount } = useCount()

    // Filter completed tasks based on your criteria
    const completedTasks = useMemo(() => todos.filter((task) => task.isCompleted), [todos]);

    useEffect(() => {
        setCompleteTaskCount(completedTasks.length)
    }, [completedTasks])

    async function DeleteTask(index){
        const tasks = todos.filter((todo) => todo.id !== completedTasks[index].id)
    
        setTodos([...tasks])
    
        try {
          await SecureStore.setItemAsync(STORE.TODO_LIST, JSON.stringify(tasks))
        } catch (error) {
          console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={completedTasks}
                keyExtractor={(task) => task.id}
                renderItem={({ item: task , index}) => (
                  <TaskCard
                    task={task}
                    openForDelete={openForDelete}
                    setIsOpenForDelete={setOpenForDelete}
                    onDelete={DeleteTask}
                    index={index}
                  ></TaskCard>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // padding: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
    },
    emptyContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    animation: {
        width: 380,
        opacity: 0.7
    }
});

const WrapperComplete = IsTaskEmpty(CompletedTasksScreen, { completed: true})


export default WrapperComplete;
