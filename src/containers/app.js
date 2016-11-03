import React, { Component } from 'react';
import { View } from 'react-native';
import AddTodo from './../components/addTodo1';
import TodoList from './../components/todoList1';
import Footer from './../components/footer1';

export default class App extends Component {
  render() {
    return (
      <View>
        <AddTodo onAddClick={text => console.log(text)}/>

        <TodoList todos={[{text: 'Use Redux', completed: true}, {text: 'Learn to connect it to React', completed: false}]} onTodoClick={todo => console.log('todo clicked!')}/>

        <Footer filter='SHOW_ALL' onFilterChange={filter => console.log('filter change', filter)}/>
      </View>
    )
  }
}