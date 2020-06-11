import * as React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Icon, Header } from "react-native-elements";
import colors from "../util/colors";

export const screenWidth = Dimensions.get("screen").width;

export const HeaderElements = ({ name, nav }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerIcon}>
        <Icon name="md-menu" type="ionicon" onPress={() => nav.openDrawer()} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{name}</Text>
    </View>
  );
};
export default function MenuHeaderComponent({ name, nav, containerStyle, rightButton }) {
  return (
    <Header
      containerStyle={[styles.headerContainer, containerStyle]}
      leftComponent={HeaderElements({ name, nav })}
      rightComponent={rightButton}
      backgroundColor={colors.white}
    />
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: "10%",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
  },
  headerIcon: {
    marginLeft: 7.5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: screenWidth * 0.025,
  },
});
