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
  Alert,
} from "react-native";
import colors from "../util/colors";
import { Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import functions from "@react-native-firebase/functions";
import auth from "@react-native-firebase/auth";

/**
 * Constants
 */
const SCREEN_HEIGHT = Dimensions.get("window").height;
const START_HEIGHT = 150;
const FORWARD_ARROW_START_HEIGHT = 10;

class LoginScreen extends React.Component {
  state = {
    forwardArrowHeight: new Animated.Value(FORWARD_ARROW_START_HEIGHT),
    phoneNumber: "",
    confirmation: null,
  };

  constructor() {
    super();
    this.loginHeight = new Animated.Value(START_HEIGHT);
    // called when user is signed in
    auth().onAuthStateChanged((user) => {
      // if user signed in, navigate to home screen
      if (user) {
        console.log("navigating to home screen. ");
        this.props.navigation.navigate("HomeScreen");
      }
    });
  }

  /**
   * Install listeners
   */
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardWillShow",
      this._keyboardWillShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardWillHide",
      this._keyboardWillHide
    );
  }

  /**
   * Clean up listeners
   */
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  /**
   * Listener for when keyboard is opened
   * move up the forward button and show on screen
   */
  _keyboardWillShow = (e) => {
    Animated.timing(this.state.forwardArrowHeight, {
      toValue: e.endCoordinates.height + FORWARD_ARROW_START_HEIGHT,
      duration: e.duration,
    }).start();
  };

  /**
   * Listener for when keyboard is closed
   * move down the forward button
   */
  _keyboardWillHide = (e) => {
    Animated.timing(this.state.forwardArrowHeight, {
      toValue: FORWARD_ARROW_START_HEIGHT,
      duration: 200,
    }).start();
  };

  /**
   * Zoom in to the login page
   * Move up screen
   */
  zoomInLoginAnimation = () => {
    Animated.timing(this.loginHeight, {
      toValue: SCREEN_HEIGHT,
      duration: 500,
    }).start(() => {
      this.refs.textInputMobile.focus();
    });
  };

  /**
   * Zoom out of the login page
   */
  zoomOutLoginAnimation = () => {
    Keyboard.dismiss();
    Animated.timing(this.loginHeight, {
      toValue: START_HEIGHT,
      duration: 500,
    }).start();
  };

  /**
   * Handle sign in
   */
  handleSignInClick = () => {
    let phone = "+1" + this.state.phoneNumber;
    // TODO: validate format of phone number is correct

    // verify phone number
    functions()
      .httpsCallable("verifySalesUser")({ phoneNumber: phone })
      .then((response) => {
        if (response.data.result) {
          auth()
            .signInWithPhoneNumber(phone)
            .then((result) => {
              // TODO: make a full page for phone number code verification?
              Alert.prompt(
                "Confirmation code",
                "Enter the code sent to your phone",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "OK",
                    onPress: (password) =>
                      result
                        .confirm(password)
                        .then((result) => {
                          console.log(result);
                        })
                        .catch((error) => {
                          console.log("incorrect value sorry :(.");
                        }),
                  },
                ],
                "secure-text"
              );
            });
        } else {
          alert("Your number isn't registered! Contact Aube.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong.");
      });
  };

  /**
   * Render the UI elements
   */
  render() {
    const headerTextOpacity = this.loginHeight.interpolate({
      inputRange: [START_HEIGHT, SCREEN_HEIGHT],
      outputRange: [1, 0],
    });
    const headerBackArrowOpacity = this.loginHeight.interpolate({
      inputRange: [START_HEIGHT, SCREEN_HEIGHT],
      outputRange: [0, 1],
    });
    const forwardArrowOpacity = this.loginHeight.interpolate({
      inputRange: [START_HEIGHT, SCREEN_HEIGHT],
      outputRange: [0, 1],
    });
    const phoneNumberMarginTop = this.loginHeight.interpolate({
      inputRange: [START_HEIGHT, SCREEN_HEIGHT],
      outputRange: ["5%", "20%"],
    });
    const loginBorder = this.loginHeight.interpolate({
      inputRange: [START_HEIGHT, SCREEN_HEIGHT],
      outputRange: [10, 0],
    });
    const titleTextLeft = this.loginHeight.interpolate({
      inputRange: [START_HEIGHT, SCREEN_HEIGHT],
      outputRange: [100, 25],
    });
    const titleTextBottom = this.loginHeight.interpolate({
      inputRange: [START_HEIGHT, SCREEN_HEIGHT],
      outputRange: [0, 40],
    });
    const titleTextOpacity = this.loginHeight.interpolate({
      inputRange: [START_HEIGHT, SCREEN_HEIGHT],
      outputRange: [0, 1],
    });

    return (
      <View style={styles.background}>
        {/* back arrow button */}
        <Animated.View
          style={{
            position: "absolute",
            height: 60,
            width: 60,
            marginTop: "12%",
            left: 10,
            zIndex: 100,
            opacity: headerBackArrowOpacity,
          }}
        >
          <TouchableOpacity onPress={() => this.zoomOutLoginAnimation()}>
            <Icon type="feather" name="arrow-left" color="black" size={28} />
          </TouchableOpacity>
        </Animated.View>

        {/* forward arrow button */}
        <Animated.View
          style={{
            position: "absolute",
            height: 60,
            width: 60,
            right: 10,
            bottom: this.state.forwardArrowHeight,
            opacity: forwardArrowOpacity,
            zIndex: 100,
            backgroundColor: "#000",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={this.handleSignInClick}
          >
            <Icon type="feather" name="arrow-right" color="white" />
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
              <Text style={{ fontSize: 24 }}>Get started as a PSR</Text>
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
                    fontSize: 26,
                    color: "black",
                    position: "absolute",
                    bottom: titleTextBottom,
                    left: titleTextLeft,
                    opacity: titleTextOpacity,
                  }}
                >
                  Sign in to Aube
                </Animated.Text>
                <Image
                  source={require("../../assets/temp_flag.png")}
                  style={styles.flagImage}
                />
                <Text style={styles.phoneCountryCode}>+91</Text>
                <TextInput
                  ref="textInputMobile"
                  style={styles.phoneNumberEntry}
                  onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                  value={this.state.phoneNumber}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
          <View style={styles.userIdView}>
            <TouchableOpacity>
              <Text style={styles.userIdText}>
                {" "}
                Or login with your user ID{" "}
              </Text>
            </TouchableOpacity>
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
    height: 75,
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
