import React, { useEffect, useMemo, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useLoadingTodos } from "../../context/LoadingTaskContext";
import TaskCard from "../../components/TaskCard";
import * as SecureStore from "expo-secure-store";
import STORE from "../../constants";
import IsTaskEmpty from "../../shared/IsTaskEmpty";
import { useCount } from "../../context/CompeleteTask";

const PendingTasksScreen = () => {
    const { todos, setTodos } = useLoadingTodos();
    const [ openForDelete, setOpenForDelete] = useState(null)
    const { setCompleteTaskCount } = useCount()

    // Filter pending tasks based on your criteria
    const pendingTasks = useMemo(() =>  todos.filter((task) => !task.isCompleted), [todos])

    useEffect(() => {
      setCompleteTaskCount(todos.length - pendingTasks.length)
    }, [pendingTasks])

    async function DeleteTask(index){
        // index is index of deleted task
        const tasks = todos.filter((todo) => todo.id !== pendingTasks[index].id)
        setTodos([...tasks])
        try {
          await SecureStore.setItemAsync(STORE.TODO_LIST, JSON.stringify(tasks))
        } catch (error) {
          console.log(error)
        }
    }
  
    async function CompleteTask(index){
        try {
          if(index < 0) throw new Error("index is undefined")
          const tasks = todos.map((todo) => {
            if(todo.id == pendingTasks[index].id)
              todo.isCompleted = true
            return todo
          })
          
          setTodos([...tasks])
          await SecureStore.setItemAsync(STORE.TODO_LIST, JSON.stringify(tasks))
        } catch (error) {
          console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={pendingTasks}
                keyExtractor={(task) => task.id}
                renderItem={({ item: task , index}) => (
                  <TaskCard
                    task={task}
                    openForDelete={openForDelete}
                    setIsOpenForDelete={setOpenForDelete}
                    onDelete={DeleteTask}
                    onStatusComplete={CompleteTask}
                    index={index}
                  ></TaskCard>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
    }
});

const WrapperPending = IsTaskEmpty(PendingTasksScreen, { completed : false })

export default WrapperPending;
