import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SecureStore from "expo-secure-store";

import SplashScreen from "./screens/SplashScreen";
import TabNavigator from "./components/TabNavigator";
import STORE from "./constants";
import { LoadingProvider } from "./context/LoadingContext";
import { CredentailsProvider } from "./context/CredentialsContext";
import AuthRoutes from "./routes/AuthRoutes";
import HomeScreen from "./screens/HomeScreen";
import AppErrorBoundary from "./components/ErrorBoundary";

const Stack = createStackNavigator();

const App = () => {
    const [fontsLoaded] = useFonts({
        Andika: require("./assets/fonts/Andika-Regular.ttf"),
        AndikaBold: require("./assets/fonts/Andika-Bold.ttf"),
    });
    const [initialRouteName, setInitialRouteName] = useState(null); // track user already logged in or not

    useEffect(() => {
        (async () => {
            try {
                const access_token = await SecureStore.getItemAsync(
                    STORE.ACCESS_TOKEN
                );

                if (!access_token)
                    return setInitialRouteName("LoginHomeScreen");

                setInitialRouteName({
                    name: "TabNavigator",
                    data: access_token,
                });
            } catch (error) {
                console.log(error);
                setInitialRouteName({ name: "AuthRoutes" });
            }
        })();
    }, []);

    if (!(fontsLoaded && initialRouteName)) {
        return <AppErrorBoundary><SplashScreen /></AppErrorBoundary>;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppErrorBoundary>
                <LoadingProvider>
                    <CredentailsProvider>
                        <NavigationContainer>
                            <Stack.Navigator
                                initialRouteName={initialRouteName.name}
                            >
                                {/* Auth or Entry Routes */}
                                <Stack.Screen
                                    name="AuthRoutes"
                                    component={AuthRoutes}
                                    options={{ headerShown: false }}
                                />

                                {/* Home Routes */}
                                <Stack.Screen
                                    name="TabNavigator"
                                    component={TabNavigator}
                                    options={{ headerShown: false }}
                                    initialParams={{
                                        access_token: initialRouteName.data,
                                    }}
                                />

                                <Stack.Screen
                                    name="Home"
                                    component={HomeScreen}
                                    options={{ headerShown: false }}
                                />
                            </Stack.Navigator>
                        </NavigationContainer>
                    </CredentailsProvider>
                </LoadingProvider>
            </AppErrorBoundary>
        </SafeAreaView>
    );
};

export default App;
