// @flow
import { get, post } from '../rest';
import { buildEndpoint } from '../../utils/api';

export function getRules(address) {
  return get(buildEndpoint(address, 'rules'));
}

export function postRules(address, json) {
  return post(buildEndpoint(address, 'rules'), json);
}
