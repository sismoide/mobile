import { USER_LOCATION_RECEIVED } from '../types.js';

export default (position) => ({
  type: USER_LOCATION_RECEIVED,
  payload: { position }
});
