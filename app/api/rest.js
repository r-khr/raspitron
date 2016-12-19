// @flow
import fetch from 'isomorphic-fetch';
import { API_BASE } from '../constants/raspberrypi';

// Common Header
const headers = new Headers();
headers.append('Content-Type', 'application/json');


// --------------------------------------------------
// Default Rest Requests
// --------------------------------------------------

export function get(endpoint) {
  return fetch(getEndpoint(endpoint), {
    method: 'GET',
    headers
  })
    .then(response => response.json());
}

export function post(endpoint, body) {
  return fetch(getEndpoint(endpoint), {
    method: 'POST',
    headers,
    body
  })
      .then(response => response.json());
}

// --------------------------------------------------
// Rest Util Functions
// --------------------------------------------------

function getEndpoint(endpoint) {
  return Array.isArray(endpoint) ? API_BASE + endpoint.json('/') : API_BASE + endpoint;
}
