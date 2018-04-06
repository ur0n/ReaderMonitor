import { combineReducers } from 'redux';
import { homeReducer } from './home';
import { logReducer } from './log';

export const rootReducer = combineReducers({
  home: homeReducer,
  log: logReducer,
});
