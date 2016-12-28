// @flow
import {
  ADD_HARDWARE,
  REMOVE_HARDWARE,
  SET_HARDWARE
} from '../actions/hardware';

const INITIAL_STATE = {
  devices: [
      {}
  ]
};

export default function status(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_HARDWARE:
      return Object.assign({}, state, {
        isLoading: true
      });
    case REMOVE_HARDWARE:
      return Object.assign({}, state, {
        isLoading: true
      });
    case SET_HARDWARE:
      return Object.assign({}, state, {
        hardware: action.pins
      });
    default:
      return state;
  }
}
