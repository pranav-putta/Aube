import * as React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Input } from "react-native-elements";
import colors from "../util/colors";

function Form(props) {
  return (
    <ScrollView style={props.containerStyle}>
      {props.formItems.map((item) => {
        return (
          <FormItem
            name={item.key}
            label={item.label}
            placeholder={item.placeholder}
            callback={props.callback}
            enabled={props.enabled}
          />
        );
      })}
    </ScrollView>
  );
}

Form.defaultProps = {
  containerStyle: { flex: 1 },
  formItems: [],
};

function FormItem({ name, label, placeholder, callback, enabled }) {
  return (
    <Input
      disabled={!enabled}
      key={name}
      label={label.toUpperCase()}
      placeholder={placeholder}
      containerStyle={styles.containerStyle}
      inputContainerStyle={styles.inputStyle}
      labelStyle={styles.labelStyle}
      onChangeText={(text) => callback(name, text)}
    />
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: "2.5%",
  },
  inputStyle: {
    backgroundColor: colors.grey,
    marginTop: 5,
    borderRadius: 7,
    borderBottomWidth: 0,
    paddingLeft: 10,
  },
  labelStyle: {
    fontSize: 14,
  },
});

export default Form;
