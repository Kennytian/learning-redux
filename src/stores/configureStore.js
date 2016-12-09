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
import { AsyncStorage } from 'react-native';
import { Iterable } from 'immutable';
import { applyMiddleware, createStore, compose } from 'redux';
import { autoRehydrate, persistStore, purgeStoredState } from 'redux-persist';
import reduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '../reducers/rootReducer';

let reduxMiddleware = [reduxThunk];

let reduxLogger = createLogger(
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
    collapsed : (getState, action) => (
      action.type === 'REACT_NATIVE_ROUTER_FLUX_FOCUS' ||
      action.type === 'REACT_NATIVE_ROUTER_FLUX_RESET'
    ),
    stateTransformer: (state) => {
      if (Iterable.isIterable(state)) {
        return state.toJS();
      }
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
    diff: true,
    diffPredicate: (getState, action) => (
      action.type === 'ADD_TODO' ||
      action.type === 'SET_VISIBILITY_FILTER' ||
      action.type === 'SHOW_ACTIVE'
    )
  }
);

if (__DEV__) {
  // 开发环境打印 action 日志
  reduxMiddleware.push(reduxLogger);
}

export let store = null;

let enhancers = compose(...[
  applyMiddleware(...reduxMiddleware),
  autoRehydrate()
]);

function hotReloading() {
  // https://github.com/gaearon/redux-devtools/issues/233#issuecomment-176210686
  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    let reducerPath = '../reducers/rootReducer';
    module.hot.accept(reducerPath, () => {
      let nextRootReducer = require(reducerPath).default;
      store.replaceReducer(nextRootReducer);
    });
  }
}

export default function configureStore(initialState = {}) {
  store = createStore(rootReducer, initialState, enhancers);

  hotReloading();

  setPersistStore();

  return store;
}

function setPersistStore() {
  // more information: http://gold.xitu.io/entry/57cac7b167f3560057bb00a7
  persistStore(store, {
    blacklist: ['signIn', 'someKey'], // 黑名单数组，可以忽略指定 reducers 中的 key
    // whitelist: ['auth'], // 白名单数组，一旦设置，其他的 key 都会被忽略。
    storage: AsyncStorage,
    // transforms: // 在 rehydration 和 storage 阶段被调用的转换器
    debounce: 100 // storage 操作被调用的频度, ms
    // store: // redux store 我们要存储的 store
    // config: // 对象
  }, () => {

  });
}

export function resetPersistStore() {
  purgeStoredState({storage: AsyncStorage});
}