import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { useLoadingTodos } from "../context/LoadingTaskContext";
import * as SecureStore from "expo-secure-store";
import STORE from "../constants";
import PendingTasksScreen from "./TaskStatus/PendingTaskScreen";
import CompletedTasksScreen from "./TaskStatus/CompletedTaskScreen";
import { useCount } from "../context/CompeleteTask";

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
    const { todos, setTodos } = useLoadingTodos();
    const {completeTaskCount, setCompleteTaskCount} = useCount()

    useEffect(() => {
        (async () => {
            try {
                const added_todos = await SecureStore.getItemAsync(
                    STORE.TODO_LIST
                );
                if (!added_todos) return setTodos([]);;
                setTodos((prev) => JSON.parse(added_todos));
            } catch (error) {
                console.log(error)
            }
        })();
    }, []);


    return (
        <Tab.Navigator backBehavior="none">
            <Tab.Screen name="Pending" component={PendingTasksScreen}  />
            <Tab.Screen name="Completed" component={CompletedTasksScreen} 
                options={{
                    tabBarLabel: `Completed (${completeTaskCount})`,
                }}
            />
        </Tab.Navigator>
    );
};


export default HomeScreen;