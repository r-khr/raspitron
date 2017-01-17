// @flow
import { fromJS } from 'immutable';
import Devices from '../constants/devices';

import {
  ADD_HARDWARE,
  UPDATE_HARDWARE,
  REMOVE_HARDWARE,
  TEST_HARDWARE,
  SCAN_HARDWARE_SUCCESS,
  SCAN_HARDWARE_ERROR
} from '../actions/hardware';

const INITIAL_STATE = fromJS({
  devices: Devices
});

console.log(INITIAL_STATE.devices);

export default function status(state = INITIAL_STATE, action) {
  function getDeviceIndex(id) {
    return state.get('devices').findIndex(device => device.get('id') === id);
  }

  switch (action.type) {
    case ADD_HARDWARE:
      return state.set('devices', state.get('devices').push(fromJS(action.payload)));
    case UPDATE_HARDWARE:
      return state.mergeIn(['devices', getDeviceIndex(action.payload.id)], fromJS(action.payload));
    case REMOVE_HARDWARE:
      return state.deleteIn(['devices', getDeviceIndex(action.payload.id)]);
    case TEST_HARDWARE:
      return state.mergeIn(['devices', getDeviceIndex(action.payload.id)], fromJS(action.payload));
    case SCAN_HARDWARE_SUCCESS:
      return state.mergeIn(['devices', getDeviceIndex(action.payload.id)], fromJS(action.payload));
    case SCAN_HARDWARE_ERROR:
      return state.mergeIn(['devices', getDeviceIndex(action.payload.id)], fromJS(action.payload));
    default:
      return state;
  }
}
