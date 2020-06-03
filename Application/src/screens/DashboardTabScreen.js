import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

class CheckInTabScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Dashboard!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CheckInTabScreen;
