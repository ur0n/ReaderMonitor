import { dispatch } from 'redux';
import { GET_TAG_REPORT } from './log.type'

export const getTagReport = (id, message)=> {
  return dispatch => {
    dispatch({
      type: GET_TAG_REPORT,
      message,
      id
    });
  };
}
