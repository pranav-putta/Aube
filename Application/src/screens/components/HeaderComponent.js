import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";

class Header extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    bgColor: PropTypes.string,
  };
  static defaultProps = {
    title: "Header",
    color: "#000",
    bgColor: "#000",
  };

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[styles.container, {}]}>
        <Text style={[styles.headerText, { color: this.props.color }]}>
          {" "}
          {this.props.title}{" "}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "15%",
  },
  headerText: {
    position: "absolute",
    fontSize: 40,
    fontWeight: "bold",
    left: "5%",
    bottom: "0%",
  },
});

export default Header;
