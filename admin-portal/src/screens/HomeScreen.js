import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DashboardTabScreen from "./home/DashboardTabScreen";
import {
  DoctorsTabScreen,
  SalesRepsTabScreen,
  VisitsTabScreen,
} from "./home/ManagerTabScreens";

import CampaignTabScreen from "./home/CampaignTabScreen";

const Drawer = createDrawerNavigator();

class HomeScreen extends React.Component {
  constructor() {
    super();
  }
  render() {
    //    firebase.functions().useFunctionsEmulator("http://localhost:5001")
    return (
      <Drawer.Navigator initialRouteName="Doctors">
        <Drawer.Screen name="Dashboard" component={DashboardTabScreen} />
        <Drawer.Screen name="Doctors" component={DoctorsTabScreen} />
        <Drawer.Screen name="Sales Reps" component={SalesRepsTabScreen} />
        <Drawer.Screen name="Campaign Manager" component={CampaignTabScreen} />
        <Drawer.Screen name="Visits" component={VisitsTabScreen} />
      </Drawer.Navigator>
    );
  }
}

export default HomeScreen;
