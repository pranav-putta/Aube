/**
 * Login Screen
 * @author: Pranav Putta
 * @date: 05/31/2020
 */

import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
  Keyboard,
} from "react-native";
import colors from "../util/colors";
import { Icon } from "native-base";
import * as Animatable from "react-native-animatable";

const SCREEN_HEIGHT = Dimensions.get("window").height;

class LoginScreen extends React.Component {
  constructor() {
    super();
    this.loginHeight = new Animated.Value(150);
  }

  zoomInLoginAnimation = () => {
    Animated.timing(this.loginHeight, {
      toValue: SCREEN_HEIGHT,
      duration: 500,
    }).start(() => {
      this.refs.textInputMobile.focus();
    });
  };

  zoomOutLoginAnimation = () => {
    Keyboard.dismiss();
    Animated.timing(this.loginHeight, {
      toValue: 150,
      duration: 500,
    }).start();
  };
  render() {
    const headerTextOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [1, 0],
    });
    const headerBackArrowOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0, 1],
    });
    const forwardArrowOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0, 1],
    });
    const phoneNumberMarginTop = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: ["5%", "15%"],
    });
    const loginBorder = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [10, 0],
    });
    const titleTextLeft = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [100, 25],
    });
    const titleTextBottom = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0, 50],
    });
    const titleTextOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0, 1],
    });

    return (
      <View style={styles.background}>
        <Animated.View
          style={{
            position: "absolute",
            height: 60,
            width: 60,
            marginTop: "7%",
            left: 25,
            zIndex: 100,
            opacity: headerBackArrowOpacity,
          }}
        >
          <TouchableOpacity onPress={() => this.zoomOutLoginAnimation()}>
            <Icon name="md-arrow-back" style={{ color: "black" }} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            height: 60,
            width: 60,
            right: 10,
            bottom: 10,
            opacity: forwardArrowOpacity,
            zIndex: 100,
            backgroundColor: "#000",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
          }}
        >
          <TouchableOpacity>
            <Icon name="md-arrow-forward" style={{ color: "white" }} />
          </TouchableOpacity>
        </Animated.View>
        {/* logo view */}
        <View style={styles.container}>
          <Animatable.View
            style={styles.logoView}
            animation="zoomIn"
            duration={400}
            iterationCount={1}
          >
            <Image
              style={styles.logoImage}
              source={require("../../assets/logo.png")}
            />
          </Animatable.View>
        </View>
        {/* sign in view, with phone number and email login options */}
        <Animatable.View
          animation="slideInUp"
          iterationCount={1}
          duration={400}
        >
          <Animated.View
            style={[
              styles.phoneNumberContainer,
              {
                height: this.loginHeight,
                borderTopLeftRadius: loginBorder,
                borderTopRightRadius: loginBorder,
              },
            ]}
          >
            {/* get started as a psr */}
            <Animated.View
              style={[styles.signInText, { opacity: headerTextOpacity }]}
            >
              <Text style={{ fontSize: 24, fontFamily: "sans-serif" }}>
                Get started as a PSR
              </Text>
            </Animated.View>
            {/* row for phone number entry */}
            <TouchableOpacity onPress={() => this.zoomInLoginAnimation()}>
              <Animated.View
                style={[
                  styles.phoneNumberView,
                  {
                    marginTop: phoneNumberMarginTop,
                    borderBottomWidth: this.borderBottomWidth,
                  },
                ]}
                pointerEvents="none"
              >
                <Animated.Text
                  style={{
                    fontSize: 24,
                    color: "gray",
                    position: "absolute",
                    bottom: titleTextBottom,
                    left: titleTextLeft,
                    opacity: titleTextOpacity,
                  }}
                >
                  Enter your Phone Number
                </Animated.Text>
                <Image
                  source={require("../../assets/temp_flag.png")}
                  style={styles.flagImage}
                />
                <Text style={styles.phoneCountryCode}>+91</Text>
                <TextInput
                  ref="textInputMobile"
                  style={styles.phoneNumberEntry}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
          <View style={styles.userIdView}>
            <Text style={styles.userIdText}> Or login with your user ID </Text>
          </View>
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  logoView: {
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
    height: "20%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  logoImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "center",
  },
  userIdView: {
    height: 60,
    backgroundColor: "white",
    alignItems: "flex-start",
    justifyContent: "center",
    borderTopColor: "#e8e8ec",
    borderTopWidth: 1,
    paddingHorizontal: 15,
  },
  userIdText: {
    color: colors.primary,
    fontSize: 15,
  },
  phoneNumberContainer: {
    backgroundColor: "white",
  },
  signInText: {
    alignItems: "flex-start",
    paddingHorizontal: 25,
    marginTop: 25,
  },
  phoneNumberView: {
    paddingHorizontal: 25,
    flexDirection: "row",
  },
  flagImage: {
    height: 35,
    width: 35,
    alignSelf: "center",
    resizeMode: "contain",
  },
  phoneCountryCode: {
    fontSize: 20,
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  phoneNumberEntry: {
    fontSize: 20,
    alignSelf: "center",
  },
});

export default LoginScreen;
