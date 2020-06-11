import * as React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Input } from "react-native-elements";
import colors from "../util/colors";

function Form(props) {
  // if values are inputted, display them
  return (
    <ScrollView style={props.containerStyle}>
      {props.formItems.map((item) => {
        return (
          <FormItem
            name={item.key}
            ival={props.values[item.key]}
            label={item.name}
            placeholder={item.name}
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
  values: {},
};

function FormItem({ name, label, ival, placeholder, callback, enabled }) {
  const [inputValue, setInputValue] = React.useState(ival);
  return (
    <Input
      disabled={!enabled}
      key={name}
      value={inputValue}
      label={label.toUpperCase()}
      placeholder={placeholder}
      containerStyle={styles.containerStyle}
      inputContainerStyle={styles.inputStyle}
      labelStyle={styles.labelStyle}
      onChangeText={(text) => {
        setInputValue(text);
        callback(name, text);
      }}
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
