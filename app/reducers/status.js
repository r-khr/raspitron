// @flow
import {
  SET_ADDRESS,
  SENT_PI_REQUEST,
  RECEIVED_PI_REQUEST
} from '../actions/status';

const INITIAL_STATE = {
  address: '',
  pins: [],
  isLoading: true
};

export default function status(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_ADDRESS:
      return Object.assign({}, state, {
        address: action.address
      });
    case SENT_PI_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });
    case RECEIVED_PI_REQUEST:
      return Object.assign({}, state, {
        pins: action.pins,
        isLoading: false
      });
    default:
      return state;
  }
}
