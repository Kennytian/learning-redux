import { is } from 'immutable';

export function deepCompare(instance, nextProps, nextState) {
  const thisProps = instance.props || {};
  const thisState = instance.state || {};

  nextProps = nextProps || {};
  nextState = nextState || {};

  if (Object.keys(thisProps).length !== Object.keys(nextProps).length || Object.keys(thisState).length !== Object.keys(nextState).length) {
    __DEV__ && console.debug('deepCompare length diff');
    return true;
  }

  for (let key in nextProps) {
    if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
      __DEV__ && console.debug('deepCompare props diff(key):', key);
      return true;
    }
  }

  for (let key in nextState) {
    if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
      __DEV__ && console.debug('deepCompare state diff(key):', key);
      return true;
    }
  }

  return false;
}