/**
 * AppStackNavigator.js
 * @author: Pranav Putta
 * @date: 05/31/2020
 */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();


/**
 * app stack navigator
 *
 * @returns creates main navigation container
 */
function AppStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="LoginScreen"
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStackNavigator;
