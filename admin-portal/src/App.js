import * as React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import AppStackNavigator from "./navigation/AppStackNavigator"

class App extends React.Component {
  render() {
    return (
      <AppStackNavigator />
    );
  }
}



export default App;
