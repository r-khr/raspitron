// @flow
import Devices from '../constants/devices';

import {
  ADD_HARDWARE,
  UPDATE_HARDWARE,
  TEST_HARDWARE,
  REMOVE_HARDWARE,
  SCAN_HARDWARE_SUCCESS,
  SCAN_HARDWARE_ERROR,
} from '../actions/hardware';

const INITIAL_STATE = Devices;

export default function hardware(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_HARDWARE:
      return [
        ...state,
        action.payload
      ];
    case UPDATE_HARDWARE:
    case TEST_HARDWARE:
    case SCAN_HARDWARE_SUCCESS:
    case SCAN_HARDWARE_ERROR:
      return state.map(device => {
        if (device.id === action.payload.id) {
          return Object.assign({}, device, action.payload);
        }
        return device;
      });
    case REMOVE_HARDWARE:
      return state.filter(device => device.id !== action.payload.id);
    default:
      return state;
  }
}
