// AuthRoutes.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginHomeScreen from "../screens/Auth/LoginHomeScreen";
import LoginCredentials from "../screens/Auth/LoginCredentials";
import OtpInputScreen from "../screens/Auth/OtpInputScreen";
import ResetPasswordScreen from "../screens/Auth/ResetPasswordScreen";

const Stack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="LoginHomeScreen">
      <Stack.Screen
        name="LoginHomeScreen"
        component={LoginHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginCredentials"
        component={LoginCredentials}
        options={{}}
      />
      <Stack.Screen
        name="OtpInputScreen"
        component={OtpInputScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
