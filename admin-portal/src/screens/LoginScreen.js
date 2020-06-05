import * as React from "react";
import { View, Text, TextInput, StyleSheet, Platform } from "react-native";
import { CheckBox } from "react-native-elements";
import colors from "../util/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { screenKeys } from "../navigation/AppStackNavigator";
import * as firebase from "../util/firebase";

class LoginScreen extends React.Component {
  state = {
    email: "",
    password: "",
    checked: true,
  };

  constructor() {
    super();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate(screenKeys.home);
      }
    });
  }

  onSignIn = () => {
    firebase
      .signIn(this.state.email, this.state.password, this.state.checked)
      .then(() => {
        console.log("logged in.");
      })
      .catch((err) => {
        alert(err);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginForm}>
          <Text style={styles.loginHeaderText}>{styleTexts.loginText}</Text>
          <TextInput
            style={styles.loginInput}
            placeholder={styleTexts.emailPlaceholder}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.loginInput}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={styleTexts.passwordPlaceholder}
          />
          <CheckBox
            title={styleTexts.rememberMe}
            checked={this.state.checked}
            checkedIcon="check-circle-o"
            uncheckedIcon="circle-o"
            onPress={() => this.setState({ checked: !this.state.checked })}
            style={styles.rememberMe}
          />
          <TouchableOpacity style={styles.loginButton} onPress={this.onSignIn}>
            <Text style={styles.loginButtonText}>
              {styleTexts.loginButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styleTexts = {
  loginText: "Aube Admin Portal",
  emailPlaceholder: "Email",
  passwordPlaceholder: "Password",
  loginButtonText: "Sign In",
  rememberMe: "Remember Me",
};

const styleColors = {
  backgroundColor: colors.white,
  inputBackgroundColor: colors.grey,
  buttonBackgroundColor: colors.blue,
  buttonTextColor: colors.white,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: styleColors.backgroundColor,
  },
  loginForm: {
    width: "50%",
    height: "50%",
  },
  loginHeaderText: {
    fontSize: 30,
    marginTop: 20,
    width: "100%",
    marginBottom: "10%",
    textAlign: "center",
  },
  loginInput: {
    backgroundColor: styleColors.inputBackgroundColor,
    borderWidth: 0,
    padding: 10,
    borderRadius: 10,
    marginTop: "2.5%",
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: styleColors.buttonBackgroundColor,
    marginTop: 20,
    borderRadius: 10,
    padding: "2.5%",
  },
  loginButtonText: {
    color: styleColors.buttonTextColor,
    fontSize: 18,
  },
  rememberMe: {
    marginTop: 20,
  },
});

export default LoginScreen;
