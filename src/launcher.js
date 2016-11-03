import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from './actions/action1';
import App from './containers/app';
import  Reducer from './reducers/reducer1';

let store = createStore(Reducer);

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
