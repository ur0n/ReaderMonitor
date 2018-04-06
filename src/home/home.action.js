import { dispatch } from 'redux';
import {
  GET_ANTENNA_LIST,
  GET_ANTENNA_LIST_SUCCESS,
  GET_ANTENNA_LIST_FAILURE,
  UPDATE_ANTENNA_HEALTH,
  ANTENNA_HEALTH_CALL_CHANGE_STATUS,
  ANTENNA_HEALTH_CALL_ERR,
} from './home.type';


export const getAntennaListFromMonitorServer = client => {
  return dispatch => {
    dispatch(getAntennaList());
    client.serverList()
    .then(response => {
      return response.serverList.reduce((p, id) => {
        const host = id.split(':')[0];
        const antenna = {id, status: true}
        if(host in p) {
          p[host].push(antenna);
        } else {
          p[host] = [antenna];
        }

        return p;
      }, {})
    }).then(antennaList => {
      dispatch(getAntennaListSuccess(antennaList));
    }).catch(err => {
      dispatch(getAntennaListFailure(err));
    })
  };
}

export const antennaHealthCheck = message => {
  return dispatch => {
    dispatch(updateAntennaHealth(message));
  };
}

export const antennaHealthCallChangeStatus = status => {
  return dispatch => {
    dispatch(antennaHealthCallChangeStatus(status));
  };
}

export const antennaHealthCallNotifyErr = err => {
  return dispatch => {
    dispatch(antennaHealthCallErr(err));
  };
}

const getAntennaList = () => {
  return {
    type: GET_ANTENNA_LIST
  };
}

const getAntennaListSuccess = antennaList => {
  return {
    type: GET_ANTENNA_LIST_SUCCESS,
    antennaList
  }
}

const getAntennaListFailure = err => {
  return {
    type: GET_ANTENNA_LIST_FAILURE,
    err
  };
}

const updateAntennaHealth = message => {
  return {
    type: UPDATE_ANTENNA_HEALTH,
    message
  };
}

const antennaHealthCallStatus = status => {
  return {
    type: ANTENNA_HEALTH_CALL_CHANGE_STATUS,
    status
  };
}

const antennaHealthCallErr = err => {
  return {
    type: ANTENNA_HEALTH_CALL_ERR,
    err
  };
}
