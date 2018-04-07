import { dispatch } from 'redux';
import { GET_TAG_REPORT, CLEAN_REPORT_LIST } from './log.type'

export const getTagReport = (id, message)=> {
  console.log("============ LOG ACTION ==============");
  console.log(id);
  console.log("======================================");
  return dispatch => {
    dispatch({
      type: GET_TAG_REPORT,
      message,
      id
    });
  };
}

export const cleanReportList = id => {
  return dispatch => {
    dispatch({
      type: CLEAN_REPORT_LIST,
      id
    })
  }
}
