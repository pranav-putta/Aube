import * as React from "react";
import { StyleSheet, View, Text, FlatList, Keyboard } from "react-native";
import SearchHeader from "./components/SearchHeaderComponent";
import Header from "./components/HeaderComponent";
import {
  HeaderSearchBar,
  HeaderClassicSearchBar,
} from "react-native-header-search-bar";

class DoctorsTabScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SearchHeader title="My Doctors" />
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
