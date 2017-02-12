// @flow
import { get, post } from '../rest';
import { buildEndpoint } from '../../utils/api';

export function getInfo(address) {
  return get(buildEndpoint(address, 'info'));
}
