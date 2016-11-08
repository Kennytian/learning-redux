import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import TodoItem1 from './todoItem';

export  default class TodoList1 extends Component {
  static propTypes = {
    onTodoClick: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    }).isRequired).isRequired,
  };

  render() {
    return (
      <View>
        {
          this.props.todos.map((item, index) => {
            console.debug('props.todos.map-todo:',item);
            return  <TodoItem1 key={index} onClick={() => this.props.onTodoClick(index)} {...item} />;
          })
        }
      </View>
    );
  }
}