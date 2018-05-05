import { SURVEY_COMPLETED } from '../types.js';

export default (surveyResults) => ({
  type: SURVEY_COMPLETED,
  payload: { surveyResults }
});
