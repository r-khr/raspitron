// @flow
import * as DeviceActions from './device';
import { getPins, postPin } from '../api/endpoints/pins';

export const SET_PINS = 'SET_PINS';


function setPins(pins) {
  return {
    type: SET_PINS,
    payload: pins
  };
}


export function fetchPins(address) {
  return (dispatch) => {
    dispatch(DeviceActions.requestStatus);
    return getPins(address)
      .then(json => dispatch(setPins(json)))
      .then(dispatch(DeviceActions.recieveStatus));
  };
}

export function setPin(address, number, action) {
  return (dispatch) => {
    dispatch(DeviceActions.requestStatus);
    return postPin(address, number, action)
      .then(json => dispatch(setPins(json)))
      .then(dispatch(DeviceActions.recieveStatus));
  };
}
