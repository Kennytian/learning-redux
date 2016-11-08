'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import { Provider } from 'react-redux';
import App from './containers/app';
import store from './stores/root';


export default class react036 extends Component {
  render() {
    return (
      <Provider store={store}>
        <App subscribe={store.subscribe} getState={store.getState}/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('react036', () => react036);
