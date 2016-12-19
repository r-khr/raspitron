// @flow
import { get, post } from '../rest';


export function getStatus() {
  return get('status');
}

export function setPinStatus(pinNumber, pinAction) {
  return post(['status', pinNumber, pinAction], {});
}

export function postStatus(json) {
  return post('status', json);
}
