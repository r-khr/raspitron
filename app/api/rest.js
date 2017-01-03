// @flow
import fetch from 'isomorphic-fetch';
import API_BASE from '../constants/raspberry_pi';

// Common Header
const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');


// --------------------------------------------------
// Default Rest Requests
// --------------------------------------------------
export function getDevice(endpoint) {
  return fetch(endpoint, {
    method: 'GET',
    headers
  })
    .then(response => response.json());
}


export function get(endpoint) {
  return fetch(getEndpoint(endpoint), {
    method: 'GET',
    headers
  })
    .then(response => response.json());
}

export function post(endpoint, json) {
  const body = JSON.stringify(json);
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
  return Array.isArray(endpoint) ? API_BASE + endpoint.join('/') : API_BASE + endpoint;
}
