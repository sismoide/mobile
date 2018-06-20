import { NEARBY_REPORTS_RECEIVED } from '../types.js';

export default (reports) => ({
  type: NEARBY_REPORTS_RECEIVED,
  payload: { reports }
})
