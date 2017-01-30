// @flow
import {
  SET_PINS,
} from '../actions/pins';

export default function pins(state = [], action) {
  switch (action.type) {
    case SET_PINS:
      return action.payload;
    default:
      return state;
  }
}
