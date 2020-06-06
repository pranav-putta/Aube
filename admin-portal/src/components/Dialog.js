import * as React from "react";
import { StyleSheet, View, Dimensions, Text, Animated } from "react-native";
import colors from "../util/colors";

const screenHeight = Dimensions.get("screen").height;

class Dialog extends React.Component {
  static View = View;

  state = {
    showing: false,
    animation: new Animated.Value(0),
    opacity: new Animated.Value(0),
  };

  animate = (val) => {
    Animated.sequence([
      Animated.timing(this.state.animation, {
        toValue: val,
        duration: 300,
      }),
      Animated.timing(this.state.opacity, {
        toValue: val,
        duration: 300,
      }),
    ]).start();
  };

  constructor() {
    super();
    this.top = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [screenHeight, 0],
    });
  }

  render() {
    if (this.props.show != this.state.showing) {
      // animate if the user has shifted property to show
      this.setState({ showing: this.props.show });
      this.animate(this.props.show ? 1 : 0);
    }
    return (
      <Animated.View
        style={[
          styles.container,
          { opacity: this.state.opacity, top: this.top },
        ]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

Dialog.defaultProps = {
  show: false,
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    flex: 1,
    backgroundColor: colors.translucent,
    zIndex: 10000,
    width: "100%",
    height: "100%",
  },
});

export default Dialog;
