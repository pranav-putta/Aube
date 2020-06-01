/**
 * AppStackNavigator.js
 * @author: Pranav Putta
 * @date: 06/01/2020
 */
import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Home Screen </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
