// @flow
import { getStatus } from '../api/endpoints/hardware';

export const SCAN_HARDWARE = 'SCAN_HARDWARE';
export const ADD_HARDWARE = 'ADD_HARDWARE';
export const SET_HARDWARE = 'SET_HARDWARE';

function requestStatus() {
  return {
    type: ADD_HARDWARE
  };
}

function recieveStatus() {
  return {
    type: SET_HARDWARE
  };
}

export function fetchStatus() {
  return (dispatch) => {
    dispatch(requestStatus());
    return getStatus()
      .then(json => dispatch(recieveStatus(json)));
  };
}
