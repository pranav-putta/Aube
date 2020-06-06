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
}) {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={callback}
    >
      <Text style={textStyle}>{uppercase ? title.toUpperCase() : title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    color: colors.blue,
  },
});
