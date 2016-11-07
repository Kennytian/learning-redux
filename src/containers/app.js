import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import AddTodo from './../components/addTodo';
import TodoList from './../components/todoList';
import Footer from '../components/footer';
import { addTodo, completeTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from './../actions/action';

class App extends Component {
  static propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    })),
    visibilityFilter: PropTypes.oneOf([
      'SHOW_ALL',
      'SHOW_COMPLETED',
      'SHOW_ACTIVE'
    ]).isRequired
  };

  render() {
    const {dispatch, visibleTodos, visibilityFilter} = this.props;
    return (
      <View>
        <AddTodo onAddClick={text => {
          let result = `待办：${text}于${new Date()}`;
          console.log('AddTodo text:', result);
          console.debug('this.props:', this.props);
          dispatch(addTodo(result))
        }}/>

        <TodoList todos={visibleTodos} onTodoClick={index => {
          console.log('TodoList: todo clicked:', visibleTodos[index]);
          console.debug('this.props:', this.props);
          dispatch(toggleTodo(index))
        }}/>

        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          }/>
      </View>
    )
  }
}

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
  }
}

function select(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

export default connect(select)(App);