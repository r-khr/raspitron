// @flow
import { getPins, postPin } from '../api/endpoints/pins';

export const SET_ADDRESS = 'SET_ADDRESS';
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

export function setAddress(address) {
  return {
    type: SET_ADDRESS,
    address
  };
}

export function fetchPins() {
  return (dispatch) => {
    dispatch(requestStatus());
    return getPins()
      .then(json => dispatch(recieveStatus(json)));
  };
}

export function setPin(number, action) {
  return (dispatch) => {
    dispatch(requestStatus());
    return postPin(number, action)
      .then(json => dispatch(recieveStatus(json)));
  };
}

