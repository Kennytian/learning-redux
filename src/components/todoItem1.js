import  React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

export default class TodoItem1 extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  };

  _computeStyle() {


  };

  render() {
    return (
      <Text onPress={this.props.onClick} style={{textDecoration:'lineThrough'}}>
        {this.props.text}
      </Text>
    )
  }
}


