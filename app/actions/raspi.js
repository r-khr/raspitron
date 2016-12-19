// @flow
import { getStatus } from '../api/endpoints/status';

export const SET_STATUS = 'SET_STATUS';
export const REQUEST_STATUS = 'REQUEST_STATUS';
export const RECEIVE_STATUS = 'RECEIVE_STATUS';

function requestStatus() {
  return {
    type: REQUEST_STATUS
  };
}

function recieveStatus(json) {
  const isFanOn = json.pins[4].state === 0;
  const isLightOn = json.pins[14].state === 0;

  return {
    type: RECEIVE_STATUS,
    isLightOn,
    isFanOn
  };
}

export function fetchStatus() {
  return (dispatch) => {
    dispatch(requestStatus());
    return getStatus()
      .then(json => dispatch(recieveStatus(json)));
  };
}

export function setStatus() {
  return (dispatch) => {
    dispatch();
    return setStatus()
      .then(json => dispatch(recieveStatus(json)));
  };
}
