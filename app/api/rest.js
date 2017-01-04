// @flow
import fetch from 'isomorphic-fetch';

// Common Header
const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');


// --------------------------------------------------
// Default Rest Requests
// --------------------------------------------------
export function get(endpoint) {
  return fetch(endpoint, {
    method: 'GET',
    headers
  })
    .then(response => response.json());
}

export function post(endpoint, json) {
  const body = JSON.stringify(json);
  return fetch(endpoint, {
    method: 'POST',
    headers,
    body
  })
    .then(response => response.json());
}

