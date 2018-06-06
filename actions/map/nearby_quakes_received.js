import { NEARBY_QUAKES_RECEIVED } from '../types.js';

export default (receivedQuakes) => ({
  type: NEARBY_QUAKES_RECEIVED,
  payload: { quakes: receivedQuakes }
});
