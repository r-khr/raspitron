// @flow
import * as PinActions from './pins';

export const SET_RULE = 'SET_RULE';
export const DELETE_RULE = 'DELETE_RULE';
export const ORDER_RULES = 'ORDER_RULES';

function setRule(rule) {
  return {
    type: SET_RULE,
    payload: rule
  };
}

function deleteRule(rule) {
  return {
    type: DELETE_RULE,
    payload: rule
  };
}

function orderRules() {
  return {
    type: ORDER_RULES,
  };
}

export function setPinRule(rule) {
  return (dispatch) => {
    dispatch(setRule(rule));
    dispatch(orderRules());
  };
}

export function deletePinRule(rule) {
  return (dispatch) => {
    dispatch(deleteRule(rule));
    dispatch(orderRules());
  };
}