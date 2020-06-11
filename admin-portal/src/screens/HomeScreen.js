import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import DashboardTabScreen from "./home/DashboardTabScreen";
import DoctorsTabScreen from "./home/DoctorsTabScreen";
import SalesRepsTabScreen from "./home/SalesRepsTabScreen";
import firebase from "firebase";
import CampaignTabScreen from "./home/CampaignTabScreen";
import ReportsTabScreen from "./home/ReportsTabScreen"

const Drawer = createDrawerNavigator();

class HomeScreen extends React.Component {
  constructor() {
    super();
  }
  render() {
//    firebase.functions().useFunctionsEmulator("http://localhost:5001")
    return (
      <Drawer.Navigator initialRouteName="Campaign Manager">
        <Drawer.Screen name="Dashboard" component={DashboardTabScreen} />
        <Drawer.Screen name="Doctors" component={DoctorsTabScreen} />
        <Drawer.Screen name="Sales Reps" component={SalesRepsTabScreen} />
        <Drawer.Screen name="Campaign Manager" component={CampaignTabScreen} />
        <Drawer.Screen name="Reports" component={ReportsTabScreen} />
      </Drawer.Navigator>
    );
  }
}

export default HomeScreen;
