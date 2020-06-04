/**
 * AppStackNavigator.js
 * @author: Pranav Putta
 * @date: 05/31/2020
 */
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import CheckInForm from "../screens/CheckInForm";

import colors from "../util/colors";

const Stack = createStackNavigator();

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
          options={{ headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.grey,
            },
            headerBackTitle: "Doctors",
            headerTitle: "",
          }}
          name="CheckInForm"
          component={CheckInForm}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStackNavigator;
