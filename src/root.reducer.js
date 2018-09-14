import { combineReducers } from 'redux';
import { homeReducer } from './home';
import { logReducer } from './log';
import { graphReducer } from './graph';

export const rootReducer = combineReducers({
  home: homeReducer,
  log: logReducer,
  graph: graphReducer,
});
