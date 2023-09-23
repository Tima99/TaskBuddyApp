import React, { useEffect } from "react";
import { Image, Alert, KeyboardAvoidingView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Anchor from "./Anchor";
import req from "../api/req";

import * as SecureStore from "expo-secure-store";
import STORE from "../constants";

import { useLoading } from "../context/LoadingContext";
import LoadingScreen from "../components/LoadingScreen";
import LottieView from "lottie-react-native";
import AddTaskScreen from "../screens/AddTaskScreen";
import {
    LoadingProvider,
} from "../context/LoadingTaskContext";
import { useCredentials } from "../context/CredentialsContext";
import { CommonActions } from "@react-navigation/native";
import { CompleteCountProvider } from "../context/CompeleteTask";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation, route }) => {
    const { isLoading, showLoading, hideLoading } = useLoading();
    const { access_token } = route.params;
    const { setToken } = useCredentials()

    useEffect(() => {
        setToken(access_token)
    }, [])

    const logoutHandler = async () => {
        // Display a confirmation dialog
        Alert.alert(
            "Logout Confirmation",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Logout",
                    onPress: async () => {
                        try {
                            const refresh_token =
                                await SecureStore.getItemAsync(
                                    STORE.REFRESH_TOKEN
                                );
                            if (!refresh_token)
                                return navigation.dispatch(
                                    CommonActions.reset({
                                      index: 0,
                                      routes: [{ name: 'AuthRoutes' }],
                                    })
                                );

                            showLoading();

                            const res = await req.get("/logout", {
                                headers: {
                                    Authorization: refresh_token,
                                },
                            });

                            if (res.status !== 200)
                                throw new Error("Try Again");

                            // Handle successful logout here
                            // Clear local data (refresh_token, access_token)
                            await SecureStore.deleteItemAsync(
                                STORE.ACCESS_TOKEN
                            );
                            await SecureStore.deleteItemAsync(
                                STORE.REFRESH_TOKEN
                            );

                            hideLoading();
                            // Redirect to the login screen or perform other actions
                            navigation.dispatch(
                                CommonActions.reset({
                                  index: 0,
                                  routes: [{ name: 'AuthRoutes' }],
                                })
                            );
                        } catch (err) {
                            hideLoading();
                            // Handle errors gracefully
                            console.log(err?.message || err);
                            // Display an error message to the user if needed
                            Alert.alert(
                                "Error",
                                "An error occurred during logout."
                            );
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <LoadingProvider>
        <CompleteCountProvider>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="height" // or "height" or "position"
                enabled={false}
            >
                <Tab.Navigator
                    backBehavior="none"
                    initialRouteName="Tasks"
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => {
                            let iconName;

                            if (route.name === "Tasks") {
                                iconName = "tasks";
                            } else if (route.name === "Profile") {
                                iconName = "user-alt";
                            } else if (route.name === "Add") {
                                return (
                                    <Ionicons
                                        name="add-circle-sharp"
                                        size={26}
                                        color={color}
                                    />
                                );
                            }

                            // Customize icon style here
                            return (
                                <FontAwesome5
                                    name={iconName}
                                    color={color}
                                    size={23}
                                />
                            );
                        },
                        headerTitle: "TaskBuddy", // Set your app name as the header title
                        headerTitleStyle: {
                            fontFamily: "AndikaBold",
                            transform: [{ translateX: -7 }],
                        },
                        headerTitleAlign: "left", // Align the header title to the left
                        headerLeft: () => (
                            <LottieView
                                source={require("../assets/anim-icons/buddy_splash_icon.json")} // Replace with your animation file
                                autoPlay
                                loop
                                speed={1}
                                style={{
                                    width: 53,
                                    transform: [
                                        { translateX: 2 },
                                        { translateY: -2 },
                                    ],
                                }}
                            />
                        ),
                        headerRight: () => (
                            <Anchor
                                onPress={logoutHandler}
                                design={{ marginRight: 10 }}
                            >
                                {" "}
                                Logout{" "}
                            </Anchor>
                        ),
                        tabBarLabel: "",
                        tabBarActiveTintColor: "blue",
                        tabBarInactiveTintColor: "grey",
                        tabBarLabelStyle: {
                            fontSize: 9,
                            fontWeight: "bold",
                            display: "none",
                        },
                        tabBarStyle: {
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "white",
                            height: 50,
                        },
                    })}
                >
                    <Tab.Screen name="Tasks" component={HomeScreen} />
                    <Tab.Screen name="Add" component={AddTaskScreen} />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                </Tab.Navigator>

                {isLoading ? <LoadingScreen /> : null}
            </KeyboardAvoidingView>
        </CompleteCountProvider>
        </LoadingProvider>
    );
};

export default TabNavigator;
