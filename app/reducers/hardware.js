// @flow
import Devices from '../constants/devices';

import {
  ADD_HARDWARE,
  UPDATE_HARDWARE,
  REMOVE_HARDWARE,
  TEST_HARDWARE,
  SCAN_HARDWARE_SUCCESS,
  SCAN_HARDWARE_ERROR
} from '../actions/hardware';

const INITIAL_STATE = {
  devices: Devices
};

export default function status(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_HARDWARE:
      return Object.assign({}, state, {
        devices: [
          ...state.devices,
          action.device
        ]
      });
    case UPDATE_HARDWARE:
      return Object.assign({}, state, {
        devices: state.devices.map(device => {
          if (device.id === action.device.id) {
            return Object.assign({}, device, {
              name: action.device.name,
              address: action.device.address
            });
          }
          return device;
        })
      });
    case REMOVE_HARDWARE:
      return Object.assign({}, state, {
        devices: state.devices.filter(device => device !== action.device)
      });
    case TEST_HARDWARE:
      return Object.assign({}, state, {
        devices: state.devices.map(device => {
          if (device.id === action.device.id) {
            return Object.assign({}, device, {
              isLoading: true,
              isAvailable: false
            });
          }
          return device;
        })
      });
    case SCAN_HARDWARE_SUCCESS:
      return Object.assign({}, state, {
        devices: state.devices.map(device => {
          if (device.id === action.device.id) {
            return Object.assign({}, device, {
              isLoading: false,
              isAvailable: true
            });
          }
          return device;
        })
      });
    case SCAN_HARDWARE_ERROR:
      return Object.assign({}, state, {
        devices: state.devices.map(device => {
          if (device.id === action.device.id) {
            return Object.assign({}, device, {
              isLoading: false,
              isAvailable: false
            });
          }
          return device;
        })
      });
    default:
      return state;
  }
}
