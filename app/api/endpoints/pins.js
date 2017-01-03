// @flow
import { get, post } from '../rest';


export function getPins() {
  return get('status');
}

export function postPin(pinNumber, pinAction) {
  return post(['status', pinNumber, pinAction], {});
}

