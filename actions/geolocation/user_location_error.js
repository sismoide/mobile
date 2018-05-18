import { USER_LOCATION_ERROR } from '../types.js';

export default (error) => ({
  type: USER_LOCATION_ERROR,
  payload: { error }
});
