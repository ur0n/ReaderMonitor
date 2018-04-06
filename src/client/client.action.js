import { dispatch } from 'redux';
import {
  UPDATE_ANTENNA_HEALTH,
  ANTENNA_HEALTH_CALL_CHANGE_STATUS,
  ANTENNA_HEALTH_CALL_ERR,
} from './type';

import { MonitorClient }  from '../lib';

const updateAntennaHealth = message => {
  return {
    type: UPDATE_ANTENNA_HEALTH,
    message
  };
}

const antennaHealthCallChangeStatus = status => {
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
