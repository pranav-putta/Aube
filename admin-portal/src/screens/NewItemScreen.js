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

class NewItemScreen extends React.Component {
  state = {
    verified: true,
    enabled: true,
    showProgress: false,
    data: { verified: true },
    formItems: [],
  };

  componentDidMount() {
    this.setState({ enabled: false });
    firebase
      .functions()
      .httpsCallable("getFields")({
        collection: this.props.route.params.collection,
      })
      .then((response) => {
        this.setState({ formItems: response.data.data.fields });
        this.setState({ enabled: true });
      })
      .catch((response) => {
        this.setState({ enabled: true });
        alert(response.data.message);
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
    let f = "newDoctor";
    if (col == "doctors") {
      f = "newDoctor";
    } else if (col == "sales-reps") {
      f = "newSalesRep";
    }
    firebase
      .functions()
      .httpsCallable(f)(this.state.data)
      .then((response) => {
        this.setState({ enabled: true });
        alert(response.data.success);
      })
      .catch((response) => {
        alert(response.data.message);
        this.setState({ enabled: true });
      });
  };

  constructor() {
    super();
  }
  render() {
    this.props.navigation.setOptions({
      headerTitle: "New " + this.props.route.params.name,
    });
    return (
      <View style={styles.container}>
        <Form
          containerStyle={styles.form}
          formItems={this.state.formItems}
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

export default NewItemScreen;
