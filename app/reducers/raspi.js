// @flow
import {
  REQUEST_STATUS,
  RECEIVE_STATUS
} from '../actions/raspi';

const INITIAL_STATE = {
  isLightOn: true,
  isFanOn: true,
  isLoading: true
};

export default function raspi(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_STATUS:
      return Object.assign({}, state, {
        isLoading: true
      });
    case RECEIVE_STATUS:
      return Object.assign({}, state, {
        isLightOn: action.isLightOn,
        isFanOn: action.isFanOn,
        isLoading: false
      });
    default:
      return state;
  }
}
