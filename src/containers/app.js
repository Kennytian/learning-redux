import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';

import AddTodo from './../components/addTodo';
import TodoList from './../components/todoList';
import Footer from '../components/footer';

import { addTodo, completeTodo, toggleTodo, setVisibilityFilter, VisibilityFilters,
  selectSubreddit, fetchPosts } from './../actions/action';

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
    __DEV__ && console.debug('print-render-this.props', this.props);
    // 通过调用 connect() 注入
    const {dispatch, visibleTodos, visibilityFilter, addTodo1} = this.props;
    return (
      <View>
        <AddTodo onAddClick={text => {
          let result = `待办：${text}于${new Date()}`;
          __DEV__ && console.debug('AddTodo text:', result);
          dispatch(addTodo(result));
        }}/>

        <TodoList todos={visibleTodos} onTodoClick={index => {
          console.log('TodoList: todo clicked:', visibleTodos[index]);
          dispatch(toggleTodo(index));
        }}/>

        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          }/>
        <Text onPress={() => {
          //dispatch(selectSubreddit('reactjs'));
          dispatch(fetchPosts('reactjs'));
        }}> List </Text>
      </View>
    );
  }

  componentDidMount() {
    const {dispatch, getState, subscribe} = this.props;

    let unSubscribe = subscribe(() => {
      // console.debug('print-unSubscribe:', getState());
    });

    dispatch(addTodo('Learn about actions'));
    dispatch(addTodo('Learn about reducers'));
    dispatch(addTodo('Learn about store'));
    dispatch(toggleTodo(0));
    dispatch(toggleTodo(2));
    dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ALL));

    // 停止监听 state 更新
    unSubscribe();
  }

  componentWillMount() {

  }

  componentWillReceiveProps(preProps, nextProps) {
    if (__DEV__) {
      console.debug('print-componentWillReceiveProps-preProps-nextProps:', preProps, nextProps);
    }
  }

  shouldComponentUpdate(props) {
    if (__DEV__) {
      console.debug('print-shouldComponentUpdate-props', props);
    }
    return true;
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

// 只要 Redux store 发生改变，mapStateToProps 函数就会被调用
function mapStateToProps(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  };
}

// http://cn.redux.js.org/docs/react-redux/api.html
export default connect(mapStateToProps)(App);