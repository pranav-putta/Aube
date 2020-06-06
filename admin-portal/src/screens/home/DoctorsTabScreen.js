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
import Button from "../../components/Button";
import ExpandableItem from "../../components/ExpandableItem";
import { material } from "../../util/colors";
import firebase from "firebase";

const filterItems = [
  { label: "Name", value: "label" },
  { label: "Area", value: "area" },
  { label: "Visits", value: "visits" },
];
const sectionTitles = ["Doctors"];
const screenWidth = Dimensions.get("screen").width;

class DoctorsTabScreen extends React.Component {
  refresh = () => {
    this.setState({ refreshing: true });
    firebase.functions().useFunctionsEmulator("http://localhost:5001");
    firebase
      .functions()
      .httpsCallable("getAllDoctors")({
        collection: "doctors",
      })
      .then((response) => {
        this.setState({ data: response.data.data });
        this.setState({ refreshing: false });
      })
      .catch((response) => {
        this.setState({ refreshing: false });
        alert(response.data.message);
      });
  };
  componentDidMount() {
    this.refresh();
  }

  deleteItem = (uid) => {
    firebase
      .functions()
      .httpsCallable("deleteDoctor")({ uid: uid })
      .then((response) => {
        alert(JSON.stringify(response.data));
        this.refresh();
      })
      .catch((response) => {
        alert(response.data);
        this.refresh();
      });
  };

  state = {
    refreshing: false,
    data: [],
    modalVisible: false,
  };

  toggleModal(visible) {
    this.setState({ modalVisible: visible });
  }

  GetSectionListItem = (item) => {
    alert("hi");
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
        <Text style={styles.sectionHeaderTitle}>
          {section.title.toUpperCase()}
        </Text>
      </View>
    );
  };

  ListItem = ({ item }) => {
    // Single Comes here which will be repeatative for the FlatListItems

    return (
      <ExpandableItem
        style={styles.listItem}
        expanded={item.expanded}
        parent={
          <TouchableOpacity
            style={{ padding: 20 }}
            onPress={() => {
              item.expanded = !item.expanded;
              this.forceUpdate();
            }}
          >
            <View
              style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
            >
              <Text style={styles.listItemTitle}>
                Dr. {item.first_name} {item.last_name}
              </Text>
              <Button
                title="Delete"
                uppercase={true}
                callback={() => this.deleteItem(item.uid)}
                containerStyle={styles.listItemButton}
                textStyle={styles.listItemButtonText}
              />
            </View>
          </TouchableOpacity>
        }
        child={
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              backgroundColor: material.Blue["100"].color,
            }}
          >
            <Text style={styles.listItemTitle}>More information here</Text>
          </View>
        }
      />
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
              this.props.navigation.navigate(screenKeys.newItem, {
                collection: "doctors",
                name: "Doctor",
              });
            }}
          >
            <Text style={styles.buttonText}>New Doctor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Import Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate(screenKeys.editFields, {
                collection: "doctors",
                name: "Doctor",
              });
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
              data: this.state.data,
              counter: 10,
              color: colors.green,
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
  },
  sectionHeaderTitle: {
    flex: 1,
    marginHorizontal: "5%",
    fontSize: 20,
    fontWeight: "bold",
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
    borderWidth: 1,
    borderColor: colors.grey,
    marginVertical: "0.5%",
    borderRadius: 5,
    marginHorizontal: "5%",
  },
  listItemButton: {
    padding: 10,
    right: 0,
    position: "absolute",
    marginHorizontal: "2%",
  },
  listItemButtonText: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.blue,
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
export default DoctorsTabScreen;
