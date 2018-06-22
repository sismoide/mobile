import { NEARBY_LANDMARKS_RECEIVED } from '../types.js';

export default (landmarks) => ({
  type: NEARBY_LANDMARKS_RECEIVED,
  payload: { landmarks }
})
