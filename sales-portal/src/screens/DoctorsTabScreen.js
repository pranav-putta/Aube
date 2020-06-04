import * as React from "react";
import { StyleSheet, View, Text, FlatList, Keyboard } from "react-native";
import SearchHeader from "./components/SearchHeaderComponent";

class DoctorsTabScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SearchHeader title="Doctors" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DoctorsTabScreen;
