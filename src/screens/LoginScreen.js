/**
 * Login Screen 
 * @author: Pranav Putta
 * @date: 05/31/2020
 */

 import React from 'react'
 import { StyleSheet, View, Text, Button } from 'react-native'

 class LoginScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text> Hello Pranav </Text>
      </View>
    )
  }
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#fff'
   }
 })

 export default LoginScreen