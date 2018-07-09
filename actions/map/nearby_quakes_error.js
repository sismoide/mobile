import { NEARBY_QUAKES_ERROR } from '../types.js';

export default (error) => ({
  type: NEARBY_QUAKES_ERROR,
  payload: { error }
});
