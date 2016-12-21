// @flow
import { getStatus, setPinStatus, postStatus } from '../api/endpoints/status';

export const SENT_PI_REQUEST = 'SENT_PI_REQUEST';
export const RECEIVED_PI_REQUEST = 'RECEIVED_PI_REQUEST';

function requestStatus() {
  return {
    type: SENT_PI_REQUEST
  };
}

function recieveStatus(json) {
  return {
    type: RECEIVED_PI_REQUEST,
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
