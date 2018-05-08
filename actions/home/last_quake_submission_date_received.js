import { LAST_QUAKE_SUBMISSION_DATE_RECEIVED } from '../types.js';


export default (lastQuakeSubmissionDate) => ({
  type: LAST_QUAKE_SUBMISSION_DATE_RECEIVED,
  payload: { lastQuakeSubmissionDate }
})
