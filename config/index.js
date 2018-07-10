const SERVER_HOST='http://wangulen.dgf.uchile.cl:17014';
const SERVER_URL_NONCE = `${ SERVER_HOST }/mobile/nonce/`;
const SERVER_URL_CHALLENGE = `${ SERVER_HOST }/mobile/challenge/`;
const SERVER_URL_REPORTS = `${ SERVER_HOST }/mobile/reports/`;
const SERVER_URL_LANDMARKS = `${ SERVER_HOST }/map/landmarks/`;
const SERVER_URL_QUAKES = `${ SERVER_HOST }/mobile/nearbyquakes/`;
const SERVER_URL_NEARBY_REPORTS = `${ SERVER_HOST }/mobile/nearbyreports/`;

const LOCALE = 'America/Santiago';

export const SHOW_STUB_REPORTS = false;
export const SHOW_STUB_QUAKES = false;
export const SHOW_STUB_LANDMARKS = false;
export const USE_STUB_LOCATION = true;

export default {
  SERVER_URL_NONCE,
  SERVER_URL_CHALLENGE,
  SERVER_URL_REPORTS,
  SERVER_URL_LANDMARKS,
  SERVER_URL_QUAKES,
  SERVER_URL_NEARBY_REPORTS,
  LOCALE,
};
