// @flow
import * as PinActions from './pins';
import * as RuleActions from './rules';

export const SET_DEVICE = 'SET_DEVICE';
export const SENT_REQUEST_TO_DEVICE = 'SENT_REQUEST_TO_DEVICE';
export const RECEIVED_REQUEST_FROM_DEVICE = 'RECEIVED_REQUEST_FROM_DEVICE';

function linkDevice(device) {
  return {
    type: SET_DEVICE,
    payload: device
  };
}

export function requestStatus() {
  return {
    type: SENT_REQUEST_TO_DEVICE,
    payload: {
      isLoading: true
    }
  };
}

export function receivedRequest() {
  return {
    type: RECEIVED_REQUEST_FROM_DEVICE,
    payload: {
      isLoading: false
    }
  };
}

export function connectToDevice(device) {
  return (dispatch) => {
    dispatch(linkDevice(device));
    dispatch(PinActions.fetchPins(device.address));
    dispatch(RuleActions.fetchRules(device.address));
  };
}
