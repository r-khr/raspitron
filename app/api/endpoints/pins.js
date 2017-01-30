// @flow
import { get, post } from '../rest';
import { buildEndpoint } from '../../utils/api';


export function getPins(address) {
  return get(buildEndpoint(address, 'status'));
}

export function postPin(address, pins) {
  return post(buildEndpoint(address, 'status'), pins);
}

