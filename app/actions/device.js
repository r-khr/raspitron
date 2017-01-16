// @flow
import { getPins, postPin } from '../api/endpoints/pins';

export const LINK_DEVICE = 'LINK_DEVICE';
export const ORDER_PIN_RULES = 'ORDER_PIN_RULES';
export const SET_PIN_RULE = 'SET_PIN_RULE';
export const DELETE_PIN_RULE = 'DELETE_PIN_RULE';
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

function linkDevice(device) {
  return {
    type: LINK_DEVICE,
    device
  };
}

function setPinRule(number, rule) {
  return {
    type: SET_PIN_RULE,
    number,
    rule
  };
}

function deletePinRule(number, rule) {
  return {
    type: DELETE_PIN_RULE,
    number,
    rule
  };
}

function orderPinRules(number) {
  return {
    type: ORDER_PIN_RULES,
    number
  };
}

export function connectToDevice(device) {
  return (dispatch) => {
    dispatch(linkDevice(device));
    dispatch(fetchPins(device.address));
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

export function setPinRuleAndOrder(number, rule) {
  return (dispatch) => {
    dispatch(setPinRule(number, rule));
    dispatch(orderPinRules(number, rule));
  };
}

export function deletePinRuleAndOrder(number, rule) {
  return (dispatch) => {
    dispatch(deletePinRule(number, rule));
    dispatch(orderPinRules(number, rule));
  };
}
