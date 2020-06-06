import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SectionList,
  RefreshControl,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import MenuHeaderComponent from "../../navigation/MenuHeaderComponent";
import DropDownPicker from "react-native-dropdown-picker";
import colors from "../../util/colors";
import { screenKeys } from "../../navigation/AppStackNavigator";

const filterItems = [
  { label: "Name", value: "label" },
  { label: "Area", value: "area" },
  { label: "Visits", value: "visits" },
];
const sectionTitles = ["already visited", "unvisited"];
const screenWidth = Dimensions.get("screen").width;

class SalesRepTabScreen extends React.Component {
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
    modalVisible: false,
  };

  toggleModal(visible) {
    this.setState({ modalVisible: visible });
  }

  GetSectionListItem = (item) => {};
  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0, width: "100%", backgroundColor: colors.grey }}
      />
    );
  };

  ListHeader = ({ section }) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionHeaderCounter, { color: section.color }]}>
          {section.counter}
        </Text>
        <Text style={styles.sectionHeaderTitle}>
          {section.title.toUpperCase()}
        </Text>
      </View>
    );
  };

  ListItem = ({ item }) => {
    // Single Comes here which will be repeatative for the FlatListItems
    return (
      <TouchableOpacity onPress={this.GetSectionListItem.bind(this, item)}>
        <View style={styles.listItem}>
          <View style={{ marginHorizontal: "5%" }}>
            <Text style={styles.listItemTitle}>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <MenuHeaderComponent name="Doctors" nav={this.props.navigation} />
        <View style={styles.filterContainer}>
          <DropDownPicker
            containerStyle={styles.filterPicker}
            items={filterItems}
            placeholder="Filter by"
            itemStyle={{ backgroundColor: "white" }}
            placeholderStyle={{ color: colors.blue }}
            dropDownStyle={{ backgroundColor: "white" }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate(screenKeys.newDoctor);
            }}
          >
            <Text style={styles.buttonText}>New Sales Rep</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Import Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate(screenKeys.editFields, {collection: "sales-reps"});
            }}
          >
            <Text style={styles.buttonText}>Edit Fields</Text>
          </TouchableOpacity>
        </View>
        <SectionList
          style={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          ItemSeparatorComponent={this.FlatListItemSeparator}
          sections={[
            {
              title: sectionTitles[0],
              data: this.state.data[0],
              counter: 10,
              color: colors.green,
            },
            {
              title: sectionTitles[1],
              data: this.state.data[1],
              counter: 320,
              color: colors.red,
            },
          ]}
          renderSectionHeader={this.ListHeader}
          renderItem={this.ListItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const modalStyles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f7021a",
    padding: 100,
  },
  text: {
    color: "#3f2949",
    marginTop: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  filterContainer: {
    height: "7%",
    marginTop: "1%",
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    zIndex: 100,
    justifyContent: "flex-start",
  },
  filterPicker: {
    marginLeft: "5%",
    marginRight: "2%",
    backgroundColor: "white",
  },
  button: {
    borderRadius: 5,
    backgroundColor: colors.blue,
    padding: 10,
    marginRight: screenWidth * 0.01,
    right: 0,
  },
  buttonText: {
    color: "white",
  },
  sectionHeader: {
    paddingBottom: 5,
    paddingTop: "5%",
    borderColor: colors.darkGrey,
  },
  sectionHeaderTitle: {
    flex: 1,
    marginHorizontal: "5%",
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionHeaderCounter: {
    flex: 1,
    fontSize: 20,
    marginHorizontal: "5%",
    fontWeight: "bold",
    color: colors.tabColor,
  },
  listItemTitle: {
    fontSize: 18,
    color: "#000",
  },
  listItemSubtitle: {
    fontSize: 16,
    marginTop: 2,
    color: colors.darkGrey,
    fontWeight: "200",
  },
  listItem: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
    flex: 1,
    borderWidth: 1,
    marginTop: "2%",
    marginHorizontal: "5%",
    borderColor: colors.grey,
    borderRadius: 5,
  },
});
export default SalesRepTabScreen;
