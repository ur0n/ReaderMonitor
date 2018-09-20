import { combineReducers } from 'redux';
import { homeReducer } from './home';
import { graphReducer } from './graph';

export const rootReducer = combineReducers({
  home: homeReducer,
  graph: graphReducer,
});
