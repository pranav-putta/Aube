import * as React from "react";
import {
  Animated,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import colors from "../util/colors";
import Dialog from "../components/Dialog";

class ProgressDialog extends React.Component {
  state = {
    top: new Animated.Value(900),
    opacity: 0,
  };

  render() {
    /*<Animated.View style={styles.container}>
        <Text>{this.props.title}</Text>
        <View style={styles.progressContainer}>
          <ActivityIndicator size="large" color={this.props.color} />
          <Text>{this.props.label}</Text>
        </View>
      </Animated.View>*/
    return (
      <Dialog show={this.props.show}>
        <View style={styles.container}>
          <Text style={styles.title}>{this.props.title}</Text>
          <View style={styles.progressContainer}>
            <ActivityIndicator size="large" color="blue" />
            <Text style={styles.label}>{this.props.label}</Text>
          </View>
        </View>
      </Dialog>
    );
  }
}

ProgressDialog.defaultProps = {
  title: "Please wait",
  color: colors.blue,
  label: "Loading data...",
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 150,
    alignSelf: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
  },
  label: {
    marginHorizontal: 15,
  },
  progressContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ProgressDialog;
