// @flow
import { get } from './rest';


export function getStatus() {
  return get('/status');
}

export function setStatus() {
  return fetch('http://192.168.2.157/status')
      .then(response => response.json());
}
