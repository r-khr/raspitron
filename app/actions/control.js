// @flow
// import { getPins, postPin } from '../api/endpoints/pins';
export const SET_PIN_RULE = 'SET_PIN_RULE';

export function setPinRules(pinNumber, rules) {
  return {
    type: SET_PIN_RULE,
    rules
  };
}


