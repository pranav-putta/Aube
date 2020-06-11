import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ProgressDialog } from "../components/ProgressDialog";
import Form from "../components/Form";
import colors from "../util/colors";
import firebase from "firebase";

const Drawer = createDrawerNavigator();

class UpdateItemScreen extends React.Component {
  state = {
    verified: true,
    enabled: true,
    showProgress: false,
    formItems: [],
  };

  componentDidMount() {
    this.setState({ enabled: false });
    this.setState({ data: this.props.route.params.data });
    firebase
      .functions()
      .httpsCallable("getFields")({
        collection: this.props.route.params.collection,
      })
      .then((response) => {
        this.setState({ formItems: response.data.data });
        this.setState({ enabled: true });
      })
      .catch((response) => {
        this.setState({ enabled: true });
        alert(response);
      });
  }

  changeFormState = (key, value) => {
    let x = this.state.data;
    x[key] = value;
    this.setState({ data: x });
  };

  submitData = () => {
    this.setState({ enabled: false });
    let col = this.props.route.params.collection;
    let f = "updateDoctor";
    if (col == "doctors") {
      f = "updateDoctor";
    } else if (col == "sales-reps") {
      f = "updateSalesRep";
    }
    firebase
      .functions()
      .httpsCallable(f)(this.state.data)
      .then((response) => {
        this.setState({ enabled: true });
      })
      .catch((response) => {
        this.setState({ enabled: true });
      });
  };

  constructor() {
    super();
  }
  render() {
    this.props.navigation.setOptions({
      headerTitle: "Update " + this.props.route.params.name,
    });
    return (
      <View style={styles.container}>
        <Form
          containerStyle={styles.form}
          formItems={this.state.formItems}
          values={this.props.route.params.data}
          callback={this.changeFormState}
          enabled={this.state.enabled}
        />
        <TouchableOpacity
          disabled={!this.state.enabled}
          style={styles.button}
          onPress={this.submitData}
        >
          {this.state.enabled ? (
            <Text style={styles.buttonText}>Update</Text>
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

export default UpdateItemScreen;
