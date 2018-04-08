import {
  GET_ANTENNA_LIST,
  GET_ANTENNA_LIST_SUCCESS,
  GET_ANTENNA_LIST_FAILURE,
  UPDATE_ANTENNA_HEALTH,
  ANTENNA_HEALTH_CALL_CHANGE_STATUS,
  ANTENNA_HEALTH_CALL_ERR,
} from './home.type';

import { MonitorClient } from '../lib';

const initializeMonitorClient = () => {
  return new MonitorClient("localhost", 50051);
}

const initialState = {
  client: initializeMonitorClient(),
  isLoding: false,
  isFetched: false,
  antennaList: {},
  err: null
}

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ANTENNA_LIST:
      return {
        ...state,
        isLoding: true,
        isFetched: false,
        err: null,
      };
      break;
    case GET_ANTENNA_LIST_SUCCESS:
     return {
       ...state,
       isLoding: false,
       isFetched: true,
       antennaList: action.antennaList,
       err: null,
     }
     break;
    case GET_ANTENNA_LIST_FAILURE:
     return {
       ...state,
       isLoding: false,
       isFetched: true,
       err: action.err
     }
     break;
    case UPDATE_ANTENNA_HEALTH:
      const newAntennaList = Object.assign({}, state.antennaList);
      const ip = action.message.ip;
      const port = action.message.port;
      const status = action.message.status === 1? false : true;
      const newAntenna = { id: `${ip}:${port}`, status: status };
      if(newAntennaList[ip]) {
        newAntennaList[ip][port - 1] = newAntenna;
      }
      return {
        ...state,
        antennaList: newAntennaList
      };
    break;
    default:
      return {
        ...state
      };
      break;
  }
}
