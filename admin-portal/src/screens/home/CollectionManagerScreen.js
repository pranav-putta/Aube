import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SectionList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import MenuHeaderComponent from "../../navigation/MenuHeaderComponent";
import DropDownPicker from "react-native-dropdown-picker";
import colors from "../../util/colors";
import { screenKeys } from "../../navigation/AppStackNavigator";
import Button from "../../components/Button";
import ExpandableItem from "../../components/ExpandableItem";
import firebase from "firebase";

const screenWidth = Dimensions.get("screen").width;

class CollectionManagerScreen extends React.Component {
  state = {
    refreshing: false,
    data: [],
    expanded: {},
  };

  constructor(props) {
    super(props);

    // deconstruct props
    this.collection = props.mod.collection;
    this.name = props.mod.name;
    this.singularName = props.mod.singularName;
    this.filterItems = props.mod.filterItems;
    this.displayKeys = props.mod.displayKeys;
    this.navigation = props.navigation;
  }

  /**
   * Refresh data as soon as data is refreshed
   *
   * @memberof DBManagerScreen
   */
  componentDidMount() {
    this.refresh();
  }

  /**
   * Refresh data according to the collection data
   *
   * @memberof CollectionManagerScreen
   */
  refresh = () => {
    this.setState({ refreshing: true });
    firebase
      .functions()
      .httpsCallable("getAll")({
        collection: this.collection,
      })
      .then((response) => {
        // collect data and set it
        this.setState({ data: response.data.data });
        this.setState({ refreshing: false });
      })
      .catch((response) => {
        // throw error message
        this.setState({ refreshing: false });
        alert(response);
      });
  };

  /**
   * Delete particular item given the UID
   *
   * @memberof CollectionManagerScreen
   */
  deleteItem = (uid) => {
    firebase
      .functions()
      .httpsCallable("delete")({
        uid: uid,
        collection: this.collection,
      })
      .then((response) => {
        alert(JSON.stringify(response.data));
        this.refresh();
      })
      .catch((response) => {
        alert(response.data);
        this.refresh();
      });
  };

  /**
   *  Separator between items in a list
   *
   * @memberof CollectionManagerScreen
   */
  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0, width: "100%", backgroundColor: colors.grey }}
      />
    );
  };

  /**
   * Layout for the list header item
   *
   * @memberof CollectionManagerScreen
   */
  ListHeader = ({ section }) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>
          {section.title.toUpperCase()}
        </Text>
      </View>
    );
  };

  // list item to display for each item
  ListItem = ({ item }) => {
    //TODO: add verified property compatibility
    const rowItems = this.displayKeys.slice(1).map((key) => {
      return (
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.listItemKey}>{key[1]}:</Text>
          <Text style={styles.listItemValue}>{item[key[0]]}</Text>
        </View>
      );
    });
    return (
      <ExpandableItem
        style={styles.listItem}
        expanded={this.state.expanded[item.uid]}
        parent={
          <TouchableOpacity
            style={{ padding: 20 }}
            onPress={() => {
              let expanded = this.state.expanded;
              expanded[item.uid] = !expanded[item.uid];
              this.setState({ expanded: expanded });
            }}
          >
            <View
              style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
            >
              <Text style={styles.listItemTitle}>
                Dr. {item[this.displayKeys[0][0]]}
              </Text>
              <Button
                title="Delete"
                uppercase={true}
                callback={() => this.deleteItem(item.uid)}
                containerStyle={styles.listItemButton}
                textStyle={styles.listItemButtonText}
              />
              <Button
                title="Edit"
                uppercase={true}
                callback={() =>
                  this.navigation.navigate(screenKeys.updateItem, {
                    collection: this.collection,
                    name: this.name,
                    data: item,
                  })
                }
                containerStyle={styles.listItemButton}
                textStyle={styles.listItemButtonText}
              />
            </View>
          </TouchableOpacity>
        }
        child={
          <View
            style={{
              padding: 15,
              flex: 1,
              backgroundColor: colors.grey,
            }}
          >
            {rowItems}
          </View>
        }
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <MenuHeaderComponent name={this.name} nav={this.navigation} />
        <View style={styles.filterContainer}>
          <DropDownPicker
            containerStyle={styles.filterPicker}
            items={this.filterItems}
            placeholder="Filter by"
            itemStyle={{ backgroundColor: "white" }}
            placeholderStyle={{ color: colors.blue }}
            dropDownStyle={{ backgroundColor: "white" }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.navigation.navigate(screenKeys.newItem, {
                collection: this.collection,
                name: this.name,
              });
            }}
          >
            <Text style={styles.buttonText}>New {this.singularName}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Import Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.navigation.navigate(screenKeys.editFields, {
                collection: this.collection,
                name: this.name,
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
              title: this.name,
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

CollectionManagerScreen.defaultProps = {
  mod: {
    collection: "doctors",
    name: "Doctors",
    filterItems: [
      { label: "Name", value: "label" },
      { label: "Area", value: "area" },
      { label: "Visits", value: "visits" },
    ],
    displayKeys: [
      ["name", "Name"],
      ["address", "Address"],
      ["phone_number", "Phone Number"],
      ["specialty", "Specialty"],
      ["qualification", "Qualification"],
      ["practitioner_id", "Practitioner ID"],
      ["verified", "Verified"],
    ],
  },
};

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
  listItemKey: {
    color: "black",
    margin: 5,
    fontWeight: "bold",
  },
  listItemValue: {
    color: "black",
    margin: 5,
    marginHorizontal: 10,
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
export default CollectionManagerScreen;
