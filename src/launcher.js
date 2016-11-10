'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import { Provider } from 'react-redux';
import App from './containers/app';
import configureStore from './stores/configureStore';
import XhrRequest from './utils/xhrRequest';

let store = configureStore();

export default class react036 extends Component {
  render() {
    return (
      <Provider store={store}>
        <App subscribe={store.subscribe} getState={store.getState}/>
      </Provider>
    );
  }
}

XhrRequest.run();

AppRegistry.registerComponent('react036', () => react036);
