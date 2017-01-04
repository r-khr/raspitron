import API_BASE from '../constants/raspberry_pi';

// --------------------------------------------------
// Rest Util Functions
// --------------------------------------------------

export function getEndpoint(endpoint) {
  return Array.isArray(endpoint) ? API_BASE + endpoint.join('/') : API_BASE + endpoint;
}

export function buildEndpoint(address, endpoint) {
  return Array.isArray(endpoint) ? address + endpoint.join('/') : address + endpoint;
}
