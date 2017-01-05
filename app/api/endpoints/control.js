// @flow
import { get, post } from '../rest';
import { buildEndpoint } from '../../utils/api';


export function getControl(address) {
  return get(buildEndpoint(address, 'control'));
}

export function postControl(address, json) {
  return post(buildEndpoint(address, 'control'), json);
}
