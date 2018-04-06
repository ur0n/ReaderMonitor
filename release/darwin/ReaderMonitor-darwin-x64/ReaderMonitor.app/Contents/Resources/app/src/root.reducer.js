import { combineReducers } from 'redux';

const initialState = {
  name: 'test'
};

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TEST':
      return {
        ...this.state
      };
      break;
    default:
     return {
       ...state
     };
  }
}

export const rootReducer = combineReducers({
  testReducer,
});
