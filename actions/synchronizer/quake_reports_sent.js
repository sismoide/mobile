import { QUAKE_REPORTS_SENT } from '../types';

export default (sentQuakesInfo) => ({
  type: QUAKE_REPORTS_SENT,
  payload: { info: sentQuakesInfo }
});
