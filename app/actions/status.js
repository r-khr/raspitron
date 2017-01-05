// @flow
import { getPins, postPin } from '../api/endpoints/pins';

export const LINK_DEVICE = 'LINK_DEVICE';
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

export function linkDevice(device) {
  console.log(device);
  return {
    type: LINK_DEVICE,
    deviceId: device.id
  };
}

export function fetchPins(address) {
  return (dispatch) => {
    dispatch(requestStatus());
    return getPins(address)
      .then(json => dispatch(recieveStatus(json)));
  };
}

export function setPin(address, number, action) {
  return (dispatch) => {
    dispatch(requestStatus());
    return postPin(address, number, action)
      .then(json => dispatch(recieveStatus(json)));
  };
}
