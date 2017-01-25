// @flow
import {
  SET_DEVICE,
  SENT_REQUEST_TO_DEVICE,
  RECIEVED_REQUEST_FROM_DEVICE
} from '../actions/device';

const INITIAL_STATE = {
  id: '',
  address: '',
  name: '',
  isLoading: true
};

export default function status(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_DEVICE:
    case SENT_REQUEST_TO_DEVICE:
    case RECIEVED_REQUEST_FROM_DEVICE:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
