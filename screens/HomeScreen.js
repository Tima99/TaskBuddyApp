import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { useLoadingTodos } from "../context/LoadingTaskContext";
import * as SecureStore from "expo-secure-store";
import STORE from "../constants";
import PendingTasksScreen from "./TaskStatus/PendingTaskScreen";
import CompletedTasksScreen from "./TaskStatus/CompletedTaskScreen";

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
    const { setTodos } = useLoadingTodos();

    useEffect(() => {
        (async () => {
            try {
                const added_todos = await SecureStore.getItemAsync(
                    STORE.TODO_LIST
                );
                if (!added_todos) throw new Error("");
                setTodos((prev) => JSON.parse(added_todos));
            } catch (error) {
                setTodos([]);
            }
        })();
    }, []);

    return (
        <Tab.Navigator initialRouteName="Pending">
            <Tab.Screen name="Pending" component={PendingTasksScreen} />
            <Tab.Screen name="Completed" component={CompletedTasksScreen} />
        </Tab.Navigator>
    );
};


export default HomeScreen;