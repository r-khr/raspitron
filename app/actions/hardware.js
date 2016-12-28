// @flow
import { getStatus, setPinStatus, postStatus } from '../api/endpoints/status';

export const ADD_HARDWARE = 'ADD_HARDWARE';
export const SET_HARDWARE = 'SET_HARDWARE';

function requestStatus() {
  return {
    type: ADD_HARDWARE
  };
}

function recieveStatus(json) {
  return {
    type: SET_HARDWARE,
    pins: json.pins
  };
}

export function fetchStatus() {
  return (dispatch) => {
    dispatch(requestStatus());
    return getStatus()
      .then(json => dispatch(recieveStatus(json)));
  };
}

export function setPin(number, action) {
  return (dispatch) => {
    dispatch(requestStatus());
    return setPinStatus(number, action)
      .then(json => dispatch(recieveStatus(json)));
  };
}

export function setStatus(data) {
  return (dispatch) => {
    dispatch(requestStatus());
    return postStatus(data)
      .then(json => dispatch(recieveStatus(json)));
  };
}
