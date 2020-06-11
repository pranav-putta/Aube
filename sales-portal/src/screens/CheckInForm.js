import * as React from "react";

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Header from "../screens/components/HeaderComponent";
import Form from "../screens/components/Form";
import colors from "../util/colors";
import functions from "@react-native-firebase/functions";

class CheckInForm extends React.Component {
  data = this.props.route.params.data;

  state = {
    enabled: true,
    formItems: [],
  };

  Refresh = () => {
    this.setState({ enabled: false });

    functions()
      .httpsCallable("getFields")({
        collection: "reports",
      })
      .then((response) => {
        this.setState({ formItems: response.data.data });
        this.setState({ enabled: true });
      })
      .catch((response) => {
        this.setState({ enabled: true });
        alert(response);
      });
  };

  componentDidMount() {
    this.Refresh();
  }

  ChangeFormState = (key, value) => {
    let x = this.state.data;
    x[key] = value;
    this.setState({ data: x });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{this.data.name}</Text>
          <Text style={styles.headerSubText}>261 DOVER CIRCLE</Text>
        </View>
        <Form
          containerStyle={styles.form}
          formItems={this.state.formItems}
          enabled={this.state.enabled}
          callback={this.ChangeFormState}
        />
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    paddingLeft: "7.5%",
    paddingTop: "5%",
  },
  headerText: {
    fontSize: 36,
    fontWeight: "700",
  },
  headerSubText: {
    fontSize: 20,
    color: colors.darkGrey,
    letterSpacing: 1,
  },
  form: {
    flex: 1,
    padding: "5%",
    marginTop: "5%",
  },
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
    backgroundColor: colors.tabColor,
  },
  submitButtonText: {
    fontSize: 20,
    color: "white",
  },
});
export default CheckInForm;
