import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import DashboardTabScreen from "./home/DashboardTabScreen";
import DoctorsTabScreen from "./home/DoctorsTabScreen";

const Drawer = createDrawerNavigator();

class HomeScreen extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Drawer.Navigator initialRouteName="Doctors">
        <Drawer.Screen name="Dashboard" component={DashboardTabScreen} />
        <Drawer.Screen name="Doctors" component={DoctorsTabScreen} />
      </Drawer.Navigator>
    );
  }
}

export default HomeScreen;
