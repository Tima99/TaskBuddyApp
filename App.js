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
import AuthRoutes from "./routes/AuthRoutes";

const Stack = createStackNavigator();

const App = () => {
    const [fontsLoaded] = useFonts({
        Andika: require("./assets/fonts/Andika-Regular.ttf"),
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

                setInitialRouteName("TabNavigator");
            } catch (error) {
                console.log(error);
                setInitialRouteName("LoginHomeScreen");
            }
        })();
    }, []);

    if (!(fontsLoaded && initialRouteName)) {
        return <SplashScreen />;
    }

    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LoadingProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName={initialRouteName}>
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
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </LoadingProvider>
        </SafeAreaView>
    );
};

export default App;
