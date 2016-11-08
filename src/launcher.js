'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import { Provider } from 'react-redux';
import App from './containers/app';
import rootStore from './stores/rootStore';

export default class react036 extends Component {
  render() {
    return (
      <Provider store={rootStore}>
        <App subscribe={rootStore.subscribe} getState={rootStore.getState}/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('react036', () => react036);
