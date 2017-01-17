// @flow
import { getInfo } from '../api/endpoints/hardware';

export const TEST_HARDWARE = 'TEST_HARDWARE';
export const ADD_HARDWARE = 'ADD_HARDWARE';
export const UPDATE_HARDWARE = 'UPDATE_HARDWARE';
export const REMOVE_HARDWARE = 'REMOVE_HARDWARE';
export const SCAN_HARDWARE_SUCCESS = 'SCAN_HARDWARE_SUCCESS';
export const SCAN_HARDWARE_ERROR = 'SCAN_HARDWARE_ERROR';

function hardwareTestSuccess(device) {
  return {
    type: SCAN_HARDWARE_SUCCESS,
    payload: {
      isLoading: false,
      isAvailable: true,
      ...device
    }
  };
}

function hardwareTestError(device) {
  return {
    type: SCAN_HARDWARE_ERROR,
    payload: {
      isLoading: false,
      isAvailable: false,
      ...device
    }
  };
}

function addHardware(device) {
  return {
    type: ADD_HARDWARE,
    payload: device
  };
}

function updateHardware(device) {
  return {
    type: UPDATE_HARDWARE,
    payload: device
  };
}

function testDevice(device) {
  return {
    type: TEST_HARDWARE,
    payload: {
      isLoading: true,
      isAvailable: false,
      ...device
    }
  };
}

export function deleteDevice(device) {
  return {
    type: REMOVE_HARDWARE,
    payload: device
  };
}

export function scanAllDevices(devices) {
  return (dispatch) => {
    devices.forEach(device => {
      dispatch(testDevice(device));
      getInfo(device.address)
        .then(json => dispatch(hardwareTestSuccess(device, json)))
        .catch(dispatch(hardwareTestError(device)));
    });
  };
}

export function addDevice(device) {
  return (dispatch) => {
    dispatch(addHardware(device));
    dispatch(testDevice(device));
    getInfo(device.address)
      .then(json => dispatch(hardwareTestSuccess(device, json)))
      .catch(dispatch(hardwareTestError(device)));
  };
}

export function updateDevice(device) {
  return (dispatch) => {
    dispatch(updateHardware(device));
    dispatch(testDevice(device));
    getInfo(device.address)
      .then(json => dispatch(hardwareTestSuccess(device, json)))
      .catch(dispatch(hardwareTestError(device)));
  };
}
