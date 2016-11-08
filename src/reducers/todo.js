import { combineReducers } from 'redux';
import {
  ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters,
  SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT, REQUEST_POSTS, RECEIVE_POSTS
} from '../actions/action';

let {SHOW_ALL}  = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
  case SET_VISIBILITY_FILTER:
    return action.filter;
  default:
    return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
  case ADD_TODO:
    return [...state, {
      text: action.text,
      completed: false
    }];
  case TOGGLE_TODO:
    console.debug('todos-TOGGLE_TODO:', action);
    return state.map((todo, index) => {
      if (index === action.index) {
        return Object.assign({}, todo, {
          completed: !todo.completed
        });
      }
      return todo;
    });
  default:
    return state;
  }
}

function selectedSubreddit(state = 'reactjs', action) {
  console.debug('print-selectedSubreddit', action);
  switch (action.type) {
  case SELECT_SUBREDDIT:
    return action.subreddit;
  default:
    return state;
  }
}

function posts(state = {isFetching: false, didInvalidate: false, items: []}, action) {
  switch (action.type) {
  case INVALIDATE_SUBREDDIT:
    return Object.assign({}, state, {didInvalidate: true});
  case REQUEST_POSTS:
    return Object.assign({}, state, {isFetching: true, didInvalidate: false});
  case RECEIVE_POSTS:
    return Object.assign({}, state, {isFetching: false, didInvalidate: false, items: action.posts, lastUpdated: action.receiveAt});
  default:
    return state;
  }
}

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
  case INVALIDATE_SUBREDDIT:
  case RECEIVE_POSTS:
  case  REQUEST_POSTS:
    return Object.assign({}, state, {
      [action.subreddit]: posts(state[action.subreddit], action)
    });
  default:
    return state;
  }
}

let todoApp = combineReducers({
  visibilityFilter,
  todos
});

export default todoApp;