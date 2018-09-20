import { dispatch } from 'redux';
import { GET_GRAPH_REPORT, CLEAN_REPORT_LIST } from './graph.type'

export const getTagReport = (message)=> {
  return dispatch => {
    dispatch({
      type: GET_GRAPH_REPORT,
      message
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
