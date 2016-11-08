import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import todoReducer from './../reducers/todo';

let loggerMiddleware = createLogger(
  /* {
   level = 'log': 'log' | 'console' | 'warn' | 'error' | 'info', // console's level
   duration = false: Boolean, // Print the duration of each action?
   timestamp = true: Boolean, // Print the timestamp with each action?
   colors: ColorsObject, // Object with color getters. See the ColorsObject interface.
   logger = console: LoggerObject, // Implementation of the `console` API.
   logErrors = true: Boolean, // Should the logger catch, log, and re-throw errors?
   collapsed, // Takes a boolean or optionally a function that receives `getState` function for accessing current store state and `action` object as parameters. Returns `true` if the log group should be collapsed, `false` otherwise.
   predicate, // If specified this function will be called before each action is processed with this middleware.
   stateTransformer, // Transform state before print. Eg. convert Immutable object to plain JSON.
   actionTransformer, // Transform state before print. Eg. convert Immutable object to plain JSON.
   errorTransformer, // Transform state before print. Eg. convert Immutable object to plain JSON.
   titleFormatter, // Format the title used when logging actions.
   diff = false: Boolean, // Show diff between states.
   diffPredicate // Filter function for showing states diff.'
   }*/
  {
    level: 'log',
    duration: true,
    timestamp: true,
    colors: {
      title: () => 'inherit',
      prevState: () => '#9E9E9E',
      action: () => '#03A9F4',
      nextState: () => '#4CAF50',
      error: () => '#F20404',
    },
    logger: console,
    logErrors: true,
    collapsed: (getState, action) => {
      action.type === 'FORM_CHANGE';
    },
    predicate: (getState, action) => {
      action.type !== 'AUTH_REMOVE_TOKEN'; // 如果给 predicate 指定了 function，每调用一次 action，都会被调用一次
    },
    stateTransformer: (state) => {
      // if() { some judgement code}
      return state;
    },
    actionTransformer: (action) => {
      // if() { some judgement code}
      return action;
    },
    errorTransformer: (error) => {
      // if() {some judgement code}
      return error;
    },
    // titleFormatter: null,
    diff: true,
    diffPredicate: undefined,
  }
);

let enhancer = __DEV__ ? loggerMiddleware : undefined;

let store = createStore(
  todoReducer,
  applyMiddleware(
    thunkMiddleware, // 允许我们 dispatch() 函数
    enhancer  // 用来打印 action 日志
  )
);

export default store;