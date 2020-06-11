import * as React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import colors from "../util/colors";

export default function Button({
  title,
  callback,
  containerStyle,
  textStyle,
  uppercase,
  disabled,
}) {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={callback}
      disabled={disabled}
    >
      <Text
        style={[textStyle, { color: disabled ? colors.grey : colors.blue }]}
      >
        {uppercase ? title.toUpperCase() : title}
      </Text>
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  diabled: false,
};

const styles = StyleSheet.create({
  container: {},
  title: {
    color: colors.blue,
  },
});
