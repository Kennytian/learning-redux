import React, { Component, PropTypes } from 'react'
import { View, Text, TextInput, TouchableHighlight } from 'react-native';

export default class AddTodo1 extends Component {
  static propTypes = {
    onAddClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
  }

  render() {
    return (
      <View style={{padding:100}}>
        <TextInput style={styles.input} value="11111" onChangeText={(t) => this.handleValue(t)}/>
        <TouchableHighlight onPress={(e) => this.handleClick(e)}>
          <Text>添加</Text>
        </TouchableHighlight>
      </View>
    )
  }

  handleClick(e) {
    let text = this.state.data;
    this.props.onAddClick(text);
  }

  handleValue(text) {
    this.setState({
      data: text.trim()
    })
  }
}


let styles = {
  input: {
    width: 120,
  }
}