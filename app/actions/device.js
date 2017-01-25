// @flow
import * as PinActions from './pins';

export const SET_DEVICE = 'SET_DEVICE';
export const SENT_REQUEST_TO_DEVICE = 'SENT_REQUEST_TO_DEVICE';
export const RECIEVED_REQUEST_FROM_DEVICE = 'RECIEVED_REQUEST_FROM_DEVICE';

function linkDevice(device) {
  return {
    type: SET_DEVICE,
    payload: device
  };
}

export function sentRequest() {
  return {
    type: SET_DEVICE,
    payload: {
      isLoading: true
    }
  };
}

export function recievedRequest() {
  return {
    type: RECIEVED_REQUEST_FROM_DEVICE,
    payload: {
      isLoading: false
    }
  };
}

export function connectToDevice(device) {
  return (dispatch) => {
    dispatch(linkDevice(device));
    dispatch(PinActions.fetchPins(device.address));
  };
}