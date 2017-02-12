// @flow
import {
  SET_DEVICE,
  SENT_REQUEST_TO_DEVICE,
  RECEIVED_REQUEST_FROM_DEVICE
} from '../actions/device';

const INITIAL_STATE = {
  id: '',
  address: '',
  name: '',
  isLoading: true
};

export default function device(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_DEVICE:
    case SENT_REQUEST_TO_DEVICE:
    case RECEIVED_REQUEST_FROM_DEVICE:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
