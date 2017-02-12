// @flow
import * as PinActions from './pins';
import * as DeviceActions from './device';

import { getRules, postRules } from '../api/endpoints/rules';

export const SET_RULES = 'SET_RULES';
export const ORDER_RULES = 'ORDER_RULES';

function setRules(rules) {
  return {
    type: SET_RULES,
    payload: rules
  };
}

function orderRules() {
  return {
    type: ORDER_RULES,
  };
}

export function fetchRules(address) {
  return (dispatch) => {
    dispatch(DeviceActions.requestStatus);
    return getRules(address)
      .then(json => dispatch(setRules(json.rules)))
      .then(dispatch(DeviceActions.receivedRequest));
  };
}

export function updateRules(address, rules) {
  return (dispatch) => {
    dispatch(DeviceActions.requestStatus);
    return postRules(address, rules)
      .then(json => dispatch(setRules(json.rules)))
      .then(dispatch(orderRules()))
      .then(dispatch(DeviceActions.receivedRequest));
  };
}
