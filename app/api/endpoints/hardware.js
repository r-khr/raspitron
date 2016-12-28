// @flow
import { get, post } from '../rest';


export function getInfo() {
  return get('info');
}

export function postInfo(json) {
  return post('info', json);
}
