import { NEARBY_REPORTS_ERROR } from '../types.js';

export default (error) => ({
  type: NEARBY_REPORTS_ERROR,
  payload: { error }
});
