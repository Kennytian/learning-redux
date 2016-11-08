'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

// import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/app';
// import Reducer from './reducers/reducer';
// let store = createStore(Reducer);
import store from './stores/root';


export default class react036 extends Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('react036', () => react036);
