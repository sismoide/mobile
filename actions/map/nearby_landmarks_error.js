import { NEARBY_LANDMARKS_ERROR } from '../types.js';

export default (error) => ({
  type: NEARBY_LANDMARKS_ERROR,
  payload: { error }
});
