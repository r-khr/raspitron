// @flow
import {
  SET_PINS,
} from '../actions/pins';

export default function pins(state = [], action) {
  switch (action.type) {
    case SET_PINS:
      return state.merge({
        pins: action.pins,
        isLoading: false
      });
    default:
      return state;
  }
}
