/*
 用 action 来描述“发生了什么”，和使用 reducers 来根据 action 更新 state 的用法。

 Store 就是把它们联系到一起的对象。Store 有以下职责：

 维持应用的 state；
 提供 getState() 方法获取 state；
 提供 dispatch(action) 方法更新 state；
 通过 subscribe(listener) 注册监听器;
 通过 subscribe(listener) 返回的函数注销监听器。
 再次强调一下 Redux 应用只有一个单一的 store。当需要拆分数据处理逻辑时，你应该使用 reducer 组合 而不是创建多个 store
 */


import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '../reducers/rootReducer';

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
    diff: true
  }
);

let initialState = {};

// 开发环境打印 action 日志
let developMiddleware = applyMiddleware(thunkMiddleware, loggerMiddleware);

// 线上环境不打印 action 日志
let productionMiddleware = applyMiddleware(thunkMiddleware);

let createStoreWithMiddleware = __DEV__ ? developMiddleware(createStore) : productionMiddleware(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}