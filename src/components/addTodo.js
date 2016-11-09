import React, { Component, PropTypes } from 'react';
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
      <View style={styles.wrapper}>
        <TextInput underlineColorAndroid='transparent' style={styles.input} placeholder={'Please input a todo item'} onChangeText={(t) => this.handleValue(t)}/>
        <TouchableHighlight style={styles.button} onPress={(e) => this.handleClick(e)}>
          <Text>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }

  handleClick(e) {
    let text = this.state.data;
    this.props.onAddClick(text);
  }

  handleValue(text) {
    this.setState({
      data: text.trim()
    });
  }
}


let styles = {
  wrapper:{
    marginLeft:15,
    marginRight:15,
    marginTop:40,
    marginBottom:20,
    flexDirection:'row'
  },
  input: {
    flex:1,
    height:30,
    borderColor:'gray',
    borderWidth:1,
  },
  button:{
    marginLeft:5,
    borderWidth:1,
    paddingLeft:2,
    paddingRight:2,
    justifyContent:'center'
  },
};