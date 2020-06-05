import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MenuHeaderComponent from "../../navigation/MenuHeaderComponent";

class DashboardTabScreen extends React.Component {
  state = {
    refreshing: false,
    data: [
      [
        { id: "1", name: "Dr. Pranav Putta" },
        { id: "2", name: "Dr. Ramnath Putta" },
      ],
      [
        { id: "4", name: "Benin" },
        { id: "5", name: "Bhutan" },
        { id: "6", name: "Bosnia" },
        { id: "7", name: "Botswana" },
        { id: "8", name: "Brazil" },
        { id: "9", name: "Brunei" },
        { id: "10", name: "Bulgaria" },
      ],
    ],
  };

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
