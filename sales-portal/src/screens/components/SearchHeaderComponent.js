import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import colors from "../../util/colors";
import { TextInput } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { Androw } from "react-native-androw";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const expandedHeaderHeight = windowHeight * 0.14;
const collapsedHeaderHeight = windowHeight * 0.05;

class SearchHeader extends React.Component {
  state = {
    search: "",
  };
  constructor() {
    super();
    this.headerOpacity = new Animated.Value(1);
    this.headerHeight = new Animated.Value(expandedHeaderHeight);
  }

  /**
   * Animate the header search componenet upwards
   *
   * @memberof SearchHeader
   */
  startSearch = () => {
    Animated.timing(this.headerOpacity, {
      toValue: 0,
      duration: 250,
    }).start();
  };

  /**
   * Animate the header search component downwards
   *
   * @memberof SearchHeader
   */
  stopSearch = () => {
    Keyboard.dismiss();
    Animated.timing(this.headerOpacity, {
      toValue: 1,
      duration: 250,
    }).start();
  };

  render() {
    interpolateHeaderHeight = this.headerOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [collapsedHeaderHeight, expandedHeaderHeight],
    });
    interpolateCancelWidth = this.headerOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: ["12.5%", "0%"],
    });
    interpolateSearchWidth = this.headerOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: ["87.5%", "100%"],
    });
    return (
      <View style={styles.container}>
        {/* Header Text */}
        <Animated.View
          style={[
            styles.headerContainer,
            {
              height: interpolateHeaderHeight,
              opacity: this.headerOpacity,
              flexDirection: "row",
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>{this.props.title}</Text>
            <TouchableOpacity
              style={[
                styles.headerIcon,
                {
                  backgroundColor:
                    this.props.buttonBackground || colors.tabColor,
                },
              ]}
            >
              <Icon
                name={this.props.buttonIcon || "help-circle"}
                type="feather"
                size={20}
                color={this.props.buttonColor || "white"}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Search Bar Container */}
        <Animated.View style={styles.searchBarContainer}>
          {/* Search Input */}
          <Animated.View
            style={[
              styles.searchTextInputWrapper,
              { width: interpolateSearchWidth },
            ]}
          >
            {/* Icon */}
            <Icon
              name="search"
              size={searchFontSize}
              color={colors.darkGrey}
              style={styles.searchIcon}
            />
            {/* Text Input */}
            <TextInput
              placeholder="Search for a doctor"
              onChangeText={this.props.onSearch}
              onFocus={() => this.startSearch()}
              style={styles.searchTextInput}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.cancelButtonWrapper,
              { width: interpolateCancelWidth },
            ]}
          >
            <TouchableOpacity style={{}} onPress={() => this.stopSearch()}>
              <Text style={styles.cancelButton}> Cancel </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}

SearchHeader.defaultProps = {
  buttonColor: "white",
  buttonIcon: "help-circle",
  buttonBackground: colors.tabColor,
};

const searchFontSize = 20;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  headerContainer: { marginLeft: "7%" },
  header: {
    position: "absolute",
    bottom: "0%",
    width: "100%",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  headerIcon: {
    position: "absolute",
    right: "7%",
    padding: 7,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  searchBarContainer: {
    flexDirection: "row",
    height: 65,
    alignItems: "center",
  },
  searchTextInputWrapper: {
    flex: 1,
    bottom: 0,
    marginLeft: "6%",
    flexDirection: "row",
    backgroundColor: colors.grey,
    borderRadius: 10,
    paddingLeft: 10,
    alignItems: "center",
  },
  searchIcon: {},
  searchTextInput: {
    height: 40,
    width: "100%",
    paddingLeft: 5,
  },
  cancelButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    margin: "2.5%",
  },
  cancelButton: {
    color: colors.tabColor,
  },
});

export default SearchHeader;
