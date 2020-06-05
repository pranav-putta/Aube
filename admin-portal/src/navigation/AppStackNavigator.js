/**
 * AppStackNavigator.js
 * @author: Pranav Putta
 * @date: 05/31/2020
 */
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Platform } from "react-native";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();
const HorizontalTransition = {
  gestureDirection: "horizontal",
};

/**
 * app stack navigator
 *
 * @returns creates main navigation container
 */
function AppStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
            gestureDirection: "vertical",
            animationEnabled: true,
          }}
          name={screenKeys.login}
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            animationEnabled: true,
            gestureDirection: "vertical",
            headerShown: false,
            headerTitle: "Home",
          }}
          name={screenKeys.home}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const screenKeys = {
  login: "loginscreen",
  home: "homescreen",
};

export default AppStackNavigator;
