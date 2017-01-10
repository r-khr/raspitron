// @flow
import {
  SET_PIN_RULE,
} from '../actions/control';

const INITIAL_STATE = {
  rules: []
};

export default function status(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_PIN_RULE:
      return Object.assign({}, state, {
        device: action.device
      });
    default:
      return state;
  }
}
