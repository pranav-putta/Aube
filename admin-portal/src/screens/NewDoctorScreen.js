import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import Form from "../components/Form";
import colors from "../util/colors";
import firebase from "firebase";

const Drawer = createDrawerNavigator();

const doctorFormItems = [
  {
    key: "firstName",
    label: "First Name",
    placeholder: "First Name",
  },
  {
    key: "lastName",
    label: "Last Name",
    placeholder: "Last Name",
  },
  {
    key: "specialty",
    label: "Specialty",
    placeholder: "Specialty",
  },
  {
    key: "address",
    label: "Address",
    placeholder: "Address",
  },
  {
    key: "additionalInfo",
    label: "Additional Information",
    placeholder: "Additional Information",
  },
];

class NewDoctorScreen extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    specialty: "",
    address: "",
    additionalInfo: "",
    verified: true,
    enabled: true,
  };

  changeFormState = (key, value) => {
    this.setState({ [key]: value });
  };

  submitData = () => {
    this.setState({ enabled: false });
    firebase
      .functions()
      .httpsCallable("newDoctor")(this.state)
      .then((response) => {
        this.setState({ enabled: true });
        alert(response.data.success);
      })
      .catch((response) => {
        alert(response.data.err);
        this.setState({ enabled: true });
      });
  };

  constructor() {
    super();
  }
  render() {
    return (
      <View style={styles.container}>
        <Form
          containerStyle={styles.form}
          formItems={doctorFormItems}
          callback={this.changeFormState}
          enabled={this.state.enabled}
        />
        <TouchableOpacity
          disabled={!this.state.enabled}
          style={styles.button}
          onPress={this.submitData}
        >
          {this.state.enabled ? (
            <Text style={styles.buttonText}>Submit</Text>
          ) : (
            <ActivityIndicator size="small" color={colors.white} />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  form: {
    margin: "5%",
    padding: "2.5%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  button: {
    alignSelf: "center",
    marginBottom: "5%",
    width: "90%",
    alignItems: "center",
    height: "7.5%",
    backgroundColor: colors.blue,
    borderRadius: 5,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 22,
  },
});

export default NewDoctorScreen;
