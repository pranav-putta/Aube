import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MenuHeaderComponent from "../../navigation/MenuHeaderComponent";

class DashboardTabScreen extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>
        <MenuHeaderComponent name="Dashboard" nav={this.props.navigation} />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Dashboard</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default DashboardTabScreen;
