/**
 * AppStackNavigator.js
 * @author: Pranav Putta
 * @date: 06/01/2020
 */
import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../util/colors";
import { Icon } from "react-native-elements";
import CheckInTabScreen from "./DashboardTabScreen";
import DoctorsTabScreen from "./DoctorsTabScreen";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  console.disableYellowBox = true;
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.tabColor,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name == "Check In") {
            iconName = "trello";
          } else if (route.name == "Doctors") {
            iconName = "activity";
          }

          return (
            <Icon name={iconName} size={size} color={color} type="feather" />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.tabColor,
      }}
    >
      <Tab.Screen name="Check In" component={CheckInTabScreen} />
      <Tab.Screen name="Doctors" component={DoctorsTabScreen} />
    </Tab.Navigator>
  );
}
