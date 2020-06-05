/**
 * AppStackNavigator.js
 * @author: Pranav Putta
 * @date: 05/31/2020
 */
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import NewDoctorScreen from "../screens/NewDoctorScreen";
import EditFieldsScreen from "../screens/EditFieldsScreen";

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
        <Stack.Screen
          options={{
            animationEnabled: true,
            gestureDirection: "vertical",
            headerShown: true,
            headerTitle: "New Doctor",
          }}
          name={screenKeys.newDoctor}
          component={NewDoctorScreen}
        />
        <Stack.Screen
          options={{
            animationEnabled: true,
            gestureDirection: "vertical",
            headerShown: true,
            headerTitle: "Edit Doctor Fields",
          }}
          name={screenKeys.editFields}
          component={EditFieldsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const screenKeys = {
  login: "loginscreen",
  home: "homescreen",
  newDoctor: "newdoctor",
  editFields: "editfields",
};

export default AppStackNavigator;
