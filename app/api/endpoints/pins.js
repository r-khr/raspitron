// @flow
import { get, post } from '../rest';
import { getEndpoint } from '../../utils/api';


export function getPins() {
  return get(getEndpoint('status'));
}

export function postPin(pinNumber, pinAction) {
  return post(getEndpoint(['status', pinNumber, pinAction]), {});
}

