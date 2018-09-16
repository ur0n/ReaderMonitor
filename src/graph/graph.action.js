import { dispatch } from 'redux';
import { GET_GRAPH_REPORT, CLEAN_REPORT_LIST } from './graph.type'

export const getTagReport = (id, message)=> {
  return dispatch => {
    dispatch({
      type: GET_GRAPH_REPORT,
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
