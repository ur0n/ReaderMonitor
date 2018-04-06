import { combineReducers } from 'redux';
import { antennaListReducer } from './antennaList';

export * from './antennaList';

export const rootReducer = combineReducers({
  antennaList: antennaListReducer
})
