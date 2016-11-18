import { createSelectorCreator, defaultMemoize } from 'reselect';
import { is } from 'immutable';

export const createDeepEqualSelector = createSelectorCreator(defaultMemoize, is);