import  React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

export default class TodoItem1 extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  };

  _computeStyle() {
    let style = {
      fontSize: 14,
      marginTop: 10,
      marginLeft: 15
    };
    if (this.props.completed) {
      style.textDecorationLine = 'line-through';
    }

    return style;
  }

  render() {
    return (
      <Text onPress={this.props.onClick} style={this._computeStyle()}>
        {this.props.text}
      </Text>
    );
  }
}


