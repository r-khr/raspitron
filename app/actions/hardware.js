// @flow
import { getInfo } from '../api/endpoints/hardware';

export const TEST_HARDWARE = 'TEST_HARDWARE';
export const ADD_HARDWARE = 'ADD_HARDWARE';
export const REMOVE_HARDWARE = 'REMOVE_HARDWARE';
export const SCAN_HARDWARE_SUCCESS = 'SCAN_HARDWARE_SUCCESS';
export const SCAN_HARDWARE_ERROR = 'SCAN_HARDWARE_ERROR';

function testDevice(device) {
  return {
    type: TEST_HARDWARE,
    device
  };
}

function hardwareSuccess(device) {
  return {
    type: SCAN_HARDWARE_SUCCESS,
    device
  };
}

function hardwareError(device) {
  return {
    type: SCAN_HARDWARE_ERROR,
    device
  };
}

export function scanAllDevices(devices) {
  return (dispatch) => {
    devices.forEach(device => {
      dispatch(testDevice(device));
      getInfo(device.address)
        .then(json => dispatch(hardwareSuccess(device, json)))
        .catch(dispatch(hardwareError(device)));
    });
  };
}

export function addDevice(device) {
  return {
    type: ADD_HARDWARE,
    device
  };
}

export function deleteDevice(device) {
  return {
    type: REMOVE_HARDWARE,
    device
  };
}

