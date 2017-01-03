// @flow
import { getDevice, post } from '../rest';


export function getInfo(endpoint) {
  return getDevice(endpoint + 'info');
}

export function postInfo(json) {
  return post('info', json);
}
