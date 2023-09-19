import React from "react";
import { Image, Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LogoImage from "../assets/icon.png";
import Anchor from "./Anchor";
import req from "../api/req";

import * as SecureStore from "expo-secure-store";
import STORE from "../constants";

import { useLoading } from "../context/LoadingContext";
import LoadingScreen from "../components/LoadingScreen"

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
    const { isLoading, showLoading, hideLoading } = useLoading();

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
                            const refresh_token = await SecureStore.getItemAsync( STORE.REFRESH_TOKEN);
                            if(!refresh_token) return navigation.navigate("LoginHomeScreen")

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
                            await SecureStore.deleteItemAsync(STORE.ACCESS_TOKEN);
                            await SecureStore.deleteItemAsync(STORE.REFRESH_TOKEN);

                            hideLoading();
                            // Redirect to the login screen or perform other actions
                            navigation.navigate("LoginHomeScreen"); // Uncomment if you want to redirect
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
        <>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === "Home") {
                            iconName = "home";
                        } else if (route.name === "Profile") {
                            iconName = "person";
                        }

                        // Customize icon style here
                        return (
                            <Ionicons
                                name={iconName}
                                color={color}
                                size={19}
                                style={
                                    {
                                        /* Add your custom icon style here */
                                    }
                                }
                            />
                        );
                    },
                    headerTitle: route.name, // Set your app name as the header title
                    headerTitleAlign: "left", // Align the header title to the left
                    headerLeft: () => (
                        <Image
                            source={LogoImage} // Use your logo image source
                            style={{
                                width: 40, // Set the width of your logo
                                height: 40, // Set the height of your logo
                                marginLeft: 13, // Adjust the margin as needed
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
                    tabBarLabel: route.name,
                    tabBarActiveTintColor: "blue",
                    tabBarInactiveTintColor: "grey",
                    tabBarLabelStyle: {
                        fontSize: 10,
                        fontWeight: "bold",
                    },
                    tabBarStyle: {
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        backgroundColor: "white",
                        height: 40,
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>

            {isLoading ? <LoadingScreen /> : null}
        </>
    );
};

export default TabNavigator;
