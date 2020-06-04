/**
 * App.js
 * @author: Pranav Putta
 * @date: 05/31/2020
 */

import React, {Component} from 'react';
import AppStackNavigator from './navigation/AppStackNavigator'


/**
 * Main app container
 * Holds app stack navigator
 *
 * @export
 * @class App
 * @extends {React.Component}
 */
export default class App extends React.Component {
  render() {
    return <AppStackNavigator />
  }
}