import * as React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Input } from "react-native-elements";
import colors from "../../util/colors";
import { ScrollView } from "react-native-gesture-handler";

function Form(props) {
  return (
    <ScrollView style={props.containerStyle}>
      {props.formItems.map((item) => {
        return (
          <FormItem
            name={item.key}
            label={item.label}
            placeholder={item.placeholder}
          />
        );
      })}
    </ScrollView>
  );
}

Form.defaultProps = {
  containerStyle: {},
  formItems: [],
};

FormItemInput = () => {
  return <View />;
};

function FormItem({ name, label, placeholder }) {
  return (
    <Input
      key={name}
      label={label.toUpperCase()}
      placeholder={placeholder}
      inputContainerStyle={styles.inputStyle}
      labelStyle={styles.labelStyle}
    />
  );
}

const styles = StyleSheet.create({
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
