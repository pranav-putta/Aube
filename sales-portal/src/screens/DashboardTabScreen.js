import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  SectionList,
  Alert,
  RefreshControl,
} from "react-native";
import SearchHeader from "./components/SearchHeaderComponent";
import colors from "../util/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";

const sectionTitles = ["already visited", "unvisited"];

class CheckInTabScreen extends React.Component {
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

  GetSectionListItem = (item) => {
    this.props.navigation.navigate("CheckInForm", { data: item });
  };
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
          <View style={styles.avatar}>
            <Icon type="feather" color={colors.darkGrey} name="gitlab" />
          </View>

          <View style={{ marginHorizontal: "5%" }}>
            <Text style={styles.listItemTitle}>{item.name}</Text>
            <Text style={styles.listItemSubtitle}>05/20/2020</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  searchData = () => {};

  onRefresh = () => {};
  render() {
    return (
      <View style={styles.container}>
        <SearchHeader title="Check In" onSearch={this.searchData} />
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
        <TouchableOpacity
          style={{ alignItems: "center", margin: 25 }}
          onPress={() => this.props.navigation.navigate("CheckInForm")}
        >
          <Text style={{ color: colors.tabColor }}>Add a doctor</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  sectionHeader: {
    backgroundColor: "white",
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
    fontWeight: "bold",
    backgroundColor: "white",
  },
  listItemSubtitle: {
    fontSize: 16,
    marginTop: 2,
    color: colors.darkGrey,
    fontWeight: "200",
    backgroundColor: "white",
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginLeft: 10,
    backgroundColor: colors.grey,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  avatarText: {
    fontSize: 22,
    alignSelf: "center",
    textAlignVertical: "center",
    color: colors.darkGrey,
  },
  listItem: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  list: {},
});

export default CheckInTabScreen;
