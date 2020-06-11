import * as React from "react";
import { StyleSheet, Animated, View, TouchableOpacity } from "react-native";

class ExpandableItem extends React.Component {
  state = {
    expanded: false,
    animation: new Animated.Value(0),
  };

  constructor() {
    super();
  }

  animate = (x) => {
    Animated.timing(this.state.animation, {
      toValue: x,
      duration: 250,
    }).start();
  };

  render() {
    if (this.props.expanded != this.state.expanded) {
      this.setState({ expanded: !this.state.expanded });
      this.animate(this.props.expanded ? 1 : 0);
    }
    this.height = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.props.maxHeight],
    });
    this.opacity = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.parent}
        <Animated.View style={{ opacity: this.opacity, height: this.height }}>
          {this.props.child}
        </Animated.View>
      </View>
    );
  }
}

ExpandableItem.defaultProps = {
  callback: {},
  style: {},
  parent: [],
  child: [],
  maxHeight: 175,
  expanded: false,
};

const styles = StyleSheet.create({
  container: {},
});

export default ExpandableItem;
